import { Router, type IRouter, type Request, type Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-04-22.dahlia",
});

const VALID_TIERS: Record<number, string> = {
  97: "Survivor",
  297: "Mentored",
  997: "Elite",
};

const router: IRouter = Router();

function getOrigin(req: Request): string {
  const origin = req.headers.origin as string | undefined;
  if (origin) return origin.replace(/\/$/, "");
  const host = req.headers.host;
  const proto = (req.headers["x-forwarded-proto"] as string) ?? "https";
  return `${proto}://${host}`;
}

// POST /api/gift-scholarships/checkout
router.post("/gift-scholarships/checkout", async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      tier,
      recipientName,
      recipientEmail,
      giverName,
      giverEmail,
      message,
    } = req.body as {
      tier: number;
      recipientName: string;
      recipientEmail: string;
      giverName: string;
      giverEmail: string;
      message?: string;
    };

    const tierName = VALID_TIERS[tier];
    if (!tierName) {
      res.status(400).json({ error: "Invalid tier. Must be 97, 297, or 997." });
      return;
    }
    if (!recipientName || !recipientEmail || !giverName || !giverEmail) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const amountCents = tier * 100;
    const origin = getOrigin(req);

    const metadata: Record<string, string> = {
      kind: "gift",
      scholarshipTier: tierName,
      recipientName,
      recipientEmail,
      giverName,
      giverEmail,
    };
    if (message) metadata.giftMessage = message;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tierName} Scholarship Gift — Stroke Lyfe Inc.`,
              description: `Gift a ${tierName} Scholarship to ${recipientName} at Stroke Recovery Academy.`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: giverEmail,
      metadata,
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gift`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Gift scholarship checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
