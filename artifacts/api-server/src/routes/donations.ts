import { Router, type IRouter, type Request, type Response } from "express";
import Stripe from "stripe";
import { db } from "@workspace/db";
import { donations } from "@workspace/db";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-04-22.dahlia",
});

const router: IRouter = Router();

function getOrigin(req: Request): string {
  const origin = req.headers.origin as string | undefined;
  if (origin) return origin.replace(/\/$/, "");
  const host = req.headers.host;
  const proto = (req.headers["x-forwarded-proto"] as string) ?? "https";
  return `${proto}://${host}`;
}

// POST /api/donations/checkout
router.post("/donations/checkout", async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      amount,
      isRecurring = false,
      coverFee = false,
      tributeOf,
      inHonorOf,
      donorEmail,
      donorName,
    } = req.body as {
      amount: number;
      isRecurring?: boolean;
      coverFee?: boolean;
      tributeOf?: string;
      inHonorOf?: string;
      donorEmail?: string;
      donorName?: string;
    };

    if (!amount || amount < 1) {
      res.status(400).json({ error: "Invalid amount" });
      return;
    }

    const baseCents = Math.round(amount * 100);
    const feeCents = coverFee ? Math.ceil(baseCents * 0.029 + 30) : 0;
    const totalCents = baseCents + feeCents;

    const origin = getOrigin(req);
    const metadata: Record<string, string> = {
      kind: "donation",
      baseCents: String(baseCents),
      coverFee: String(coverFee),
      isRecurring: String(isRecurring),
    };
    if (tributeOf) metadata.tributeOf = tributeOf;
    if (inHonorOf) metadata.inHonorOf = inHonorOf;
    if (donorName) metadata.donorName = donorName;

    let session: Stripe.Checkout.Session;

    if (isRecurring) {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Monthly Donation — Stroke Lyfe Inc.",
                description: "Monthly recurring donation to support stroke survivor scholarships.",
              },
              unit_amount: totalCents,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        customer_email: donorEmail || undefined,
        metadata,
        subscription_data: { metadata },
        success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/donate`,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "donate",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Donation — Stroke Lyfe Inc.",
                description: "One-time donation to support stroke survivor scholarships.",
              },
              unit_amount: totalCents,
            },
            quantity: 1,
          },
        ],
        customer_email: donorEmail || undefined,
        metadata,
        success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/donate`,
      });
    }

    res.json({ url: session.url });
  } catch (err) {
    console.error("Donation checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// GET /api/donations/verify?session_id=...
router.get("/donations/verify", async (req: Request, res: Response): Promise<void> => {
  const sessionId = req.query["session_id"] as string | undefined;
  if (!sessionId) {
    res.status(400).json({ error: "Missing session_id" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const meta = session.metadata ?? {};
    const amountCents =
      session.amount_total ??
      parseInt(meta["baseCents"] ?? "0", 10);
    const isRecurring = meta["isRecurring"] === "true";
    const kind = meta["kind"] ?? "donation";

    const dbRow = await db
      .select()
      .from(donations)
      .where(eq(donations.stripeSessionId, sessionId))
      .limit(1);

    res.json({
      sessionId,
      amountCents,
      donorName: meta["donorName"] ?? (session.customer_details?.name ?? null),
      donorEmail: session.customer_details?.email ?? null,
      isRecurring,
      kind,
      tributeOf: meta["tributeOf"] ?? null,
      recipientName: meta["recipientName"] ?? null,
      scholarshipTier: meta["scholarshipTier"] ?? null,
      paymentStatus: session.payment_status,
      receiptSent: dbRow[0]?.receiptSentAt != null,
    });
  } catch (err) {
    console.error("Verify session error:", err);
    res.status(500).json({ error: "Failed to verify session" });
  }
});

export default router;
