import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { contactMessages, mailingList } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SubmitContactBody, EmailSignupBody } from "@workspace/api-zod";

const router: IRouter = Router();

// POST /api/contact
router.post("/contact", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = SubmitContactBody.parse(req.body);
    await db.insert(contactMessages).values({
      name: body.name,
      email: body.email,
      topic: body.topic,
      message: body.message,
      ipAddress: req.ip ?? null,
    });
    res.status(201).json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid contact data" });
  }
});

// POST /api/email-signup
router.post("/email-signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = EmailSignupBody.parse(req.body);
    const existing = await db
      .select()
      .from(mailingList)
      .where(eq(mailingList.email, body.email))
      .limit(1);

    if (existing[0]) {
      res.status(409).json({ error: "Already subscribed" });
      return;
    }

    await db.insert(mailingList).values({
      email: body.email,
      source: body.source ?? "website",
    });

    res.status(201).json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid email" });
  }
});

export default router;
