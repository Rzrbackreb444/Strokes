import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { scholarshipApplications } from "@workspace/db";

const router: IRouter = Router();

router.post("/api/applications", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const story = typeof body.story === "string" ? body.story.trim() : "";

    if (!name || !email || !story || story.length < 10 || !email.includes("@")) {
      res.status(400).json({ error: "Name, valid email, and story (min 10 chars) are required." });
      return;
    }

    const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() || null : null);

    await db.insert(scholarshipApplications).values({
      name,
      email,
      phone: str("phone"),
      state: str("state"),
      timeSinceStroke: str("timeSinceStroke"),
      currentTherapy: str("currentTherapy"),
      incomeBracket: str("incomeBracket"),
      story,
      programsInterested: str("programsInterested"),
      referralSource: str("referralSource"),
    });

    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

export default router;
