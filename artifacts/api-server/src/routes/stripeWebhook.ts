import { Router, type IRouter, type Request, type Response } from "express";
import Stripe from "stripe";
import { db } from "@workspace/db";
import { donations, stripeWebhookEvents } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  sendDonationReceipt,
  sendGiftDonorConfirmation,
  sendGiftRecipientNotification,
} from "../lib/emails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-04-22.dahlia",
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  if (process.env.NODE_ENV === "production") {
    // Fatal in production — a missing secret means forged events could be accepted.
    throw new Error(
      "[stripe-webhook] STRIPE_WEBHOOK_SECRET must be set in production. " +
        "Get it from Stripe Dashboard → Developers → Webhooks, then add it to Replit Secrets.",
    );
  }
  console.warn(
    "[stripe-webhook] WARNING: STRIPE_WEBHOOK_SECRET is not set. " +
      "Signature verification is disabled. This is only safe for local development.",
  );
}

const router: IRouter = Router();

/**
 * Atomically claim an event ID by inserting it BEFORE any side effects.
 *
 * Using INSERT … ON CONFLICT DO NOTHING with RETURNING means only one concurrent
 * request can win the insert. Any duplicate delivery will receive an empty RETURNING
 * array and be rejected immediately, preventing duplicate emails.
 *
 * Returns true if this process claimed the event (insert succeeded).
 * Returns false if already claimed (duplicate delivery).
 */
async function claimEvent(eventId: string, eventType: string): Promise<boolean> {
  const inserted = await db
    .insert(stripeWebhookEvents)
    .values({ id: eventId, type: eventType })
    .onConflictDoNothing()
    .returning({ id: stripeWebhookEvents.id });
  return inserted.length > 0;
}

/**
 * Release a previously claimed event so Stripe retries can reprocess it.
 * Called when side-effect processing fails after a successful claim.
 */
async function releaseEvent(eventId: string): Promise<void> {
  await db
    .delete(stripeWebhookEvents)
    .where(eq(stripeWebhookEvents.id, eventId));
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const meta = session.metadata ?? {};
  const kind = meta["kind"] ?? "donation";
  const isRecurring = meta["isRecurring"] === "true";
  const amountCents = session.amount_total ?? parseInt(meta["baseCents"] ?? "0", 10);
  const donorEmail = session.customer_details?.email ?? "";
  const donorName = meta["donorName"] ?? session.customer_details?.name ?? null;

  if (!donorEmail) {
    console.warn("[stripe-webhook] No donor email in session", session.id);
    return;
  }

  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : null;
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : null;

  await db
    .insert(donations)
    .values({
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      stripeSubscriptionId: subscriptionId,
      kind,
      amountCents,
      currency: session.currency ?? "usd",
      isRecurring,
      donorName,
      donorEmail,
      // inHonorOf = the honored person's name (distinct from tributeNotifyEmail)
      tributeOf: meta["inHonorOf"] ?? null,
      scholarshipTier: meta["scholarshipTier"] ?? null,
      recipientName: meta["recipientName"] ?? null,
      recipientEmail: meta["recipientEmail"] ?? null,
      giftMessage: meta["giftMessage"] ?? null,
    })
    .onConflictDoNothing();

  if (kind === "gift") {
    const giverName = meta["giverName"] ?? donorName ?? "A friend";
    const recipientName = meta["recipientName"] ?? "";
    const recipientEmail = meta["recipientEmail"] ?? "";
    const tierName = meta["scholarshipTier"] ?? "Survivor";
    const message = meta["giftMessage"] ?? null;

    const emails: Promise<void>[] = [];

    if (donorEmail) {
      emails.push(
        sendGiftDonorConfirmation({
          to: donorEmail,
          giverName: giverName ?? "",
          recipientName,
          amountCents,
          tierName,
        }),
      );
    }

    if (recipientEmail) {
      emails.push(
        sendGiftRecipientNotification({
          to: recipientEmail,
          recipientName,
          giverName: giverName ?? "",
          tierName,
          amountCents,
          message,
        }),
      );
    }

    await Promise.all(emails);
  } else {
    await sendDonationReceipt({
      to: donorEmail,
      donorName: donorName ?? "",
      amountCents,
      isRecurring,
      // Display the honored person's name in the receipt, not the notification email
      tributeOf: meta["inHonorOf"] ?? null,
    });
  }

  await db
    .update(donations)
    .set({ receiptSentAt: new Date() })
    .where(eq(donations.stripeSessionId, session.id));
}

async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  const inv = invoice as Stripe.Invoice & {
    subscription?: string | null;
    payment_intent?: string | null;
  };
  const subscriptionId = typeof inv.subscription === "string" ? inv.subscription : null;
  if (!subscriptionId) return;

  const existing = await db
    .select()
    .from(donations)
    .where(eq(donations.stripeSubscriptionId, subscriptionId))
    .limit(1);

  const donorEmail = invoice.customer_email ?? "";
  const amountCents = invoice.amount_paid;

  if (!donorEmail || !amountCents || existing.length === 0) return;

  const sessionId = `sub_renewal_${invoice.id}`;
  const paymentIntentId =
    typeof inv.payment_intent === "string" ? inv.payment_intent : null;

  await db
    .insert(donations)
    .values({
      stripeSessionId: sessionId,
      stripePaymentIntentId: paymentIntentId,
      stripeSubscriptionId: subscriptionId,
      kind: "donation",
      amountCents,
      currency: invoice.currency ?? "usd",
      isRecurring: true,
      donorName: existing[0].donorName,
      donorEmail,
    })
    .onConflictDoNothing();

  await sendDonationReceipt({
    to: donorEmail,
    donorName: existing[0].donorName ?? "",
    amountCents,
    isRecurring: true,
  });

  await db
    .update(donations)
    .set({ receiptSentAt: new Date() })
    .where(eq(donations.stripeSessionId, sessionId));
}

// POST /api/stripe/webhook — raw body required (express.raw middleware applied in app.ts)
router.post(
  "/stripe/webhook",
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"];
    let event: Stripe.Event;

    if (WEBHOOK_SECRET && sig) {
      // Normal path: verify Stripe signature
      try {
        event = stripe.webhooks.constructEvent(
          req.body as Buffer,
          sig,
          WEBHOOK_SECRET,
        );
      } catch (err) {
        console.error("[stripe-webhook] Signature verification failed:", err);
        res.status(400).json({ error: "Invalid signature" });
        return;
      }
    } else if (process.env.NODE_ENV !== "production") {
      // Development-only fallback: accept unsigned events for local CLI testing
      try {
        event = JSON.parse((req.body as Buffer).toString()) as Stripe.Event;
      } catch {
        res.status(400).json({ error: "Invalid JSON" });
        return;
      }
    } else {
      // Production with no secret configured — should never reach here because
      // the module-level check throws on startup, but guard defensively anyway.
      res.status(401).json({ error: "Webhook signature verification required" });
      return;
    }

    // Atomically claim event ID before any side effects.
    // If another delivery already claimed it, acknowledge without reprocessing.
    const claimed = await claimEvent(event.id, event.type);
    if (!claimed) {
      res.json({ received: true, duplicate: true });
      return;
    }

    try {
      if (event.type === "checkout.session.completed") {
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      } else if (event.type === "invoice.paid") {
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
      }

      res.json({ received: true });
    } catch (err) {
      console.error(`[stripe-webhook] Error handling ${event.type}:`, err);
      // Release the claim so Stripe's retry can reprocess this event
      await releaseEvent(event.id);
      res.status(500).json({ error: "Handler failed" });
    }
  },
);

export default router;
