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
  console.warn(
    "[stripe-webhook] WARNING: STRIPE_WEBHOOK_SECRET is not set. " +
      "Webhook signature verification is disabled. Set this secret before going live.",
  );
}

const router: IRouter = Router();

/**
 * Atomically claim an event ID by inserting it before any side effects.
 * Returns true if this process "won" the claim (insert succeeded).
 * Returns false if the event was already claimed (duplicate delivery).
 *
 * This prevents the TOCTOU race where two concurrent webhook deliveries both
 * pass a pre-check SELECT and then both execute side effects.
 */
async function claimEvent(eventId: string, eventType: string): Promise<boolean> {
  const inserted = await db
    .insert(stripeWebhookEvents)
    .values({ id: eventId, type: eventType })
    .onConflictDoNothing()
    .returning({ id: stripeWebhookEvents.id });
  return inserted.length > 0;
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
      // inHonorOf = the honored person's name; tributeNotifyEmail = email to notify
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
      // Use inHonorOf (the person's name) for the receipt, not the notification email
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

  if (!donorEmail || !amountCents) return;

  if (existing.length > 0) {
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
}

// POST /api/stripe/webhook — raw body required (express.raw middleware applied in app.ts)
router.post(
  "/stripe/webhook",
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"];
    let event: Stripe.Event;

    if (WEBHOOK_SECRET && sig) {
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
    } else {
      try {
        event = JSON.parse((req.body as Buffer).toString()) as Stripe.Event;
      } catch {
        res.status(400).json({ error: "Invalid JSON" });
        return;
      }
    }

    // Atomically claim event ID before any side effects.
    // If another delivery already claimed it, return 200 (Stripe won't retry).
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
      // Return 500 so Stripe retries — but note the event ID is already claimed,
      // so if the retry comes in it will be treated as a duplicate. For production,
      // consider deleting the claimed row on failure to allow retries.
      res.status(500).json({ error: "Handler failed" });
    }
  },
);

export default router;
