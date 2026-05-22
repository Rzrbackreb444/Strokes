import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { stories, siteConfig, donations } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import {
  AdminUpdateStoryBody,
  AdminUpdateStatsBody,
} from "@workspace/api-zod";

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

export default router;
