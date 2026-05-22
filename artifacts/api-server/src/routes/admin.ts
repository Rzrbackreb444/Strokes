import { Router, type IRouter, type Request, type Response } from "express";
import Stripe from "stripe";
import { db } from "@workspace/db";
import { stories, siteConfig, donations } from "@workspace/db";
import { eq, desc, count, isNull, isNotNull } from "drizzle-orm";
import {
  AdminUpdateStoryBody,
  AdminUpdateStatsBody,
  AdminUpdateDonationBody,
} from "@workspace/api-zod";
import {
  sendDonationReceipt,
  sendGiftDonorConfirmation,
  sendGiftRecipientNotification,
  sendTributeNotification,
} from "../lib/emails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2026-04-22.dahlia",
});

const ADMIN_SECRET = process.env.ADMIN_SECRET;

function verifyToken(token: string | unknown, authHeader?: string): boolean {
  if (!ADMIN_SECRET) return false;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7) === ADMIN_SECRET;
  }
  return token === ADMIN_SECRET;
}

const router: IRouter = Router();

// GET /api/admin/donations
router.get("/admin/donations", async (req: Request, res: Response): Promise<void> => {
  const { token, limit: limitStr, offset: offsetStr } = req.query as Record<string, string | undefined>;
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const limit = parseInt(limitStr ?? "100", 10);
  const offset = parseInt(offsetStr ?? "0", 10);

  const rows = await db
    .select()
    .from(donations)
    .orderBy(desc(donations.createdAt))
    .limit(limit)
    .offset(offset);

  res.json(rows);
});

// GET /api/admin/stories
router.get("/admin/stories", async (req: Request, res: Response): Promise<void> => {
  const { token, limit: limitStr, offset: offsetStr } = req.query as Record<string, string | undefined>;
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const limit = parseInt(limitStr ?? "100", 10);
  const offset = parseInt(offsetStr ?? "0", 10);

  const rows = await db
    .select()
    .from(stories)
    .orderBy(desc(stories.createdAt))
    .limit(limit)
    .offset(offset);

  res.json(rows);
});

// PATCH /api/stories/:id (public alias for admin approval, matches task spec)
router.patch("/stories/:id", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const id = parseInt(req.params["id"] as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid story ID" });
      return;
    }
    const body = AdminUpdateStoryBody.parse(req.body);

    const updates: Partial<typeof stories.$inferInsert> = {};
    if (body.isApproved != null) {
      updates.isApproved = body.isApproved;
      updates.status = body.isApproved ? "approved" : "rejected";
    }
    if (body.isFeatured != null) updates.isFeatured = body.isFeatured;

    const [updated] = await db
      .update(stories)
      .set(updates)
      .where(eq(stories.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Story not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

// PATCH /api/admin/stories/:id
router.patch("/admin/stories/:id", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const id = parseInt(req.params["id"] as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid story ID" });
      return;
    }
    const body = AdminUpdateStoryBody.parse(req.body);

    const updates: Partial<typeof stories.$inferInsert> = {};
    if (body.isApproved != null) {
      updates.isApproved = body.isApproved;
      updates.status = body.isApproved ? "approved" : "rejected";
    }
    if (body.isFeatured != null) updates.isFeatured = body.isFeatured;

    const [updated] = await db
      .update(stories)
      .set(updates)
      .where(eq(stories.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Story not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

// GET /api/admin/stats
router.get("/admin/stats", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const rows = await db.select().from(siteConfig);
  const cfg: Record<string, string> = {};
  for (const row of rows) cfg[row.key] = row.value;

  const storiesCount = await db.select({ count: count() }).from(stories);
  const approvedCount = await db.select({ count: count() }).from(stories).where(eq(stories.status, "approved"));

  res.json({
    survivorsServed: parseInt(cfg["survivorsServed"] ?? "1247", 10),
    scholarshipsFunded: parseInt(cfg["scholarshipsFunded"] ?? "312", 10),
    totalStories: storiesCount[0]?.count ?? 0,
    approvedStories: approvedCount[0]?.count ?? 0,
  });
});

// PATCH /api/admin/stats
router.patch("/admin/stats", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const body = AdminUpdateStatsBody.parse(req.body);

    const upsert = async (key: string, value: number) => {
      const existing = await db.select().from(siteConfig).where(eq(siteConfig.key, key)).limit(1);
      if (existing[0]) {
        await db.update(siteConfig).set({ value: String(value), updatedAt: new Date() }).where(eq(siteConfig.key, key));
      } else {
        await db.insert(siteConfig).values({ key, value: String(value) });
      }
    };

    if (body.survivorsServed !== undefined) await upsert("survivorsServed", body.survivorsServed);
    if (body.scholarshipsFunded !== undefined) await upsert("scholarshipsFunded", body.scholarshipsFunded);

    const rows = await db.select().from(siteConfig);
    const cfg: Record<string, string> = {};
    for (const row of rows) cfg[row.key] = row.value;
    res.json({
      survivorsServed: parseInt(cfg["survivorsServed"] ?? "1247", 10),
      scholarshipsFunded: parseInt(cfg["scholarshipsFunded"] ?? "312", 10),
    });
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

// PATCH /api/admin/donations/:id
router.patch("/admin/donations/:id", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid donation ID" });
    return;
  }

  try {
    const body = AdminUpdateDonationBody.parse(req.body);

    const [existing] = await db.select().from(donations).where(eq(donations.id, id)).limit(1);
    if (!existing) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }

    const updates: Partial<typeof donations.$inferInsert> = {};
    if (body.tributeNotifyEmail !== undefined) {
      updates.tributeNotifyEmail = body.tributeNotifyEmail?.trim() || null;
    }

    const [updated] = await db
      .update(donations)
      .set(updates)
      .where(eq(donations.id, id))
      .returning();

    res.json(updated);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

// POST /api/admin/donations/:id/resend-receipt
router.post("/admin/donations/:id/resend-receipt", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid donation ID" });
    return;
  }

  const [donation] = await db.select().from(donations).where(eq(donations.id, id)).limit(1);
  if (!donation) {
    res.status(404).json({ error: "Donation not found" });
    return;
  }

  try {
    if (donation.kind === "gift") {
      const giverName = donation.donorName ?? "A friend";
      const recipientName = donation.recipientName ?? "";
      const recipientEmail = donation.recipientEmail ?? "";
      const tierName = donation.scholarshipTier ?? "Survivor";
      const message = donation.giftMessage ?? null;

      const emails: Promise<void>[] = [];
      emails.push(
        sendGiftDonorConfirmation({
          to: donation.donorEmail,
          giverName,
          recipientName,
          amountCents: donation.amountCents,
          tierName,
        }),
      );
      if (recipientEmail) {
        emails.push(
          sendGiftRecipientNotification({
            to: recipientEmail,
            recipientName,
            giverName,
            tierName,
            amountCents: donation.amountCents,
            message,
          }),
        );
      }
      await Promise.all(emails);
    } else {
      await sendDonationReceipt({
        to: donation.donorEmail,
        donorName: donation.donorName ?? "",
        amountCents: donation.amountCents,
        isRecurring: donation.isRecurring,
        tributeOf: donation.tributeOf ?? null,
      });
    }
  } catch (err) {
    console.error("[admin] Receipt resend failed:", err);
    res.status(502).json({ error: "Failed to send receipt email" });
    return;
  }

  const [updated] = await db
    .update(donations)
    .set({ receiptSentAt: new Date() })
    .where(eq(donations.id, id))
    .returning();

  res.json(updated);
});

// POST /api/admin/donations/:id/resend-tribute
router.post("/admin/donations/:id/resend-tribute", async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query as { token?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const id = parseInt(req.params["id"] as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid donation ID" });
    return;
  }

  const [donation] = await db.select().from(donations).where(eq(donations.id, id)).limit(1);
  if (!donation) {
    res.status(404).json({ error: "Donation not found" });
    return;
  }

  if (!donation.tributeOf) {
    res.status(400).json({ error: "This donation is not a tribute donation" });
    return;
  }

  const overrideEmail = typeof req.body?.tributeNotifyEmail === "string"
    ? req.body.tributeNotifyEmail.trim() || null
    : undefined;

  if (overrideEmail !== undefined && overrideEmail !== (donation.tributeNotifyEmail?.trim() ?? null)) {
    await db
      .update(donations)
      .set({ tributeNotifyEmail: overrideEmail })
      .where(eq(donations.id, id));
    donation.tributeNotifyEmail = overrideEmail;
  }

  const tributeNotifyEmail = donation.tributeNotifyEmail?.trim() ?? null;

  if (!tributeNotifyEmail) {
    res.status(422).json({ error: "No tribute notification email on record for this donation" });
    return;
  }

  try {
    await sendTributeNotification({
      to: tributeNotifyEmail,
      donorName: donation.donorName ?? "",
      honoredName: donation.tributeOf,
      amountCents: donation.amountCents,
    });
  } catch (err) {
    console.error("[admin] Tribute notification resend failed:", err);
    res.status(502).json({ error: "Failed to send tribute notification email" });
    return;
  }

  const [updated] = await db
    .update(donations)
    .set({ tributeNotificationSentAt: new Date() })
    .where(eq(donations.id, id))
    .returning();

  res.json(updated);
});

// POST /api/admin/donations/backfill-tribute-emails
// One-time backfill: for tribute donations missing tributeNotifyEmail, fetch the
// Stripe session metadata and write the email back to the DB.
router.post("/admin/donations/backfill-tribute-emails", async (req: Request, res: Response): Promise<void> => {
  const { token, sendEmails } = req.query as { token?: string; sendEmails?: string };
  if (!verifyToken(token, req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const shouldSendEmails = sendEmails === "true";

  const rows = await db
    .select()
    .from(donations)
    .where(isNull(donations.tributeNotifyEmail))
    // Only tribute donations (tributeOf is set)
    .then((all) => all.filter((d) => d.tributeOf != null));

  if (rows.length === 0) {
    res.json({ updated: 0, skipped: 0, total: 0, emailsSent: 0, emailsFailed: 0, message: "Nothing to backfill." });
    return;
  }

  let updated = 0;
  let skipped = 0;
  let emailsSent = 0;
  let emailsFailed = 0;
  const errors: string[] = [];

  for (const row of rows) {
    // Rows from sub-renewal synthetic sessions (sub_renewal_*) have no real Stripe
    // checkout session — skip them immediately.
    if (row.stripeSessionId.startsWith("sub_renewal_")) {
      console.log(`[backfill] Skipping synthetic session ${row.stripeSessionId} (id=${row.id})`);
      skipped++;
      continue;
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(row.stripeSessionId);
      const email = (session.metadata?.["tributeNotifyEmail"] ?? "").trim() || null;

      if (!email) {
        console.log(`[backfill] No tributeNotifyEmail in Stripe metadata for session ${row.stripeSessionId} (id=${row.id}) — skipping`);
        skipped++;
        continue;
      }

      await db
        .update(donations)
        .set({ tributeNotifyEmail: email })
        .where(eq(donations.id, row.id));

      console.log(`[backfill] Updated donation id=${row.id} with tributeNotifyEmail=${email}`);
      updated++;

      if (shouldSendEmails) {
        try {
          await sendTributeNotification({
            to: email,
            donorName: row.donorName ?? "",
            honoredName: row.tributeOf!,
            amountCents: row.amountCents,
          });
          await db
            .update(donations)
            .set({ tributeNotificationSentAt: new Date() })
            .where(eq(donations.id, row.id));
          console.log(`[backfill] Tribute notification sent for donation id=${row.id} to ${email}`);
          emailsSent++;
        } catch (emailErr) {
          const msg = `email failed for donation id=${row.id} (${email}): ${String(emailErr)}`;
          console.error(`[backfill] ${msg}`);
          errors.push(msg);
          emailsFailed++;
        }
      }
    } catch (err) {
      const msg = `donation id=${row.id} session=${row.stripeSessionId}: ${String(err)}`;
      console.error(`[backfill] Error processing ${msg}`);
      errors.push(msg);
      skipped++;
    }
  }

  const emailSummary = shouldSendEmails ? ` ${emailsSent} emails sent, ${emailsFailed} failed.` : "";
  res.json({
    total: rows.length,
    updated,
    skipped,
    emailsSent: shouldSendEmails ? emailsSent : undefined,
    emailsFailed: shouldSendEmails ? emailsFailed : undefined,
    errors: errors.length > 0 ? errors : undefined,
    message: `Backfill complete. ${updated} updated, ${skipped} skipped out of ${rows.length} candidate rows.${emailSummary}`,
  });
});

export default router;
