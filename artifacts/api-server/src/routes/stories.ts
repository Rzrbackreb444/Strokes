import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { stories } from "@workspace/db";
import { eq, and, desc, count } from "drizzle-orm";
import {
  GetStoriesQueryParams,
  SubmitStoryBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

// GET /api/stories
router.get("/stories", async (req: Request, res: Response): Promise<void> => {
  try {
    const query = GetStoriesQueryParams.parse(req.query);
    const conditions = [eq(stories.status, "approved")];

    if (query.focusArea) conditions.push(eq(stories.focusArea, query.focusArea));
    if (query.featured) conditions.push(eq(stories.isFeatured, true));

    const rows = await db
      .select()
      .from(stories)
      .where(and(...conditions))
      .orderBy(desc(stories.publishedAt), desc(stories.createdAt))
      .limit(query.limit)
      .offset(query.offset);

    const totalRows = await db
      .select({ count: count() })
      .from(stories)
      .where(and(...conditions));

    res.json({ stories: rows, total: totalRows[0]?.count ?? 0 });
  } catch {
    res.status(400).json({ error: "Invalid query parameters" });
  }
});

// GET /api/stories/featured
router.get("/stories/featured", async (_req: Request, res: Response): Promise<void> => {
  const rows = await db
    .select()
    .from(stories)
    .where(and(eq(stories.status, "approved"), eq(stories.isFeatured, true)))
    .orderBy(desc(stories.publishedAt))
    .limit(6);

  res.json(rows);
});

// GET /api/stories/:slug  (must come AFTER /stories/featured)
router.get("/stories/:slug", async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const row = await db
    .select()
    .from(stories)
    .where(and(eq(stories.slug, slug), eq(stories.status, "approved")))
    .limit(1);

  if (!row[0]) {
    res.status(404).json({ error: "Story not found" });
    return;
  }
  res.json(row[0]);
});

async function insertStory(body: ReturnType<typeof SubmitStoryBody.parse>) {
  const slug =
    body.handle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Date.now().toString(36);

  const [inserted] = await db
    .insert(stories)
    .values({
      slug,
      title: body.title,
      handle: body.handle,
      pullQuote: body.pullQuote,
      body: body.body,
      focusArea: body.focusArea ?? null,
      recoveryStage: body.recoveryStage ?? null,
      videoUrl: body.videoUrl ?? null,
      submitterEmail: body.submitterEmail ?? null,
      status: "pending",
      isApproved: false,
      isFeatured: false,
    })
    .returning();
  return inserted;
}

// POST /api/stories/submit (canonical submit endpoint, matches generated client)
router.post("/stories/submit", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = SubmitStoryBody.parse(req.body);
    const inserted = await insertStory(body);
    res.status(201).json({ id: inserted.id, slug: inserted.slug });
  } catch {
    res.status(400).json({ error: "Invalid story data" });
  }
});

// POST /api/stories (compatibility alias)
router.post("/stories", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = SubmitStoryBody.parse(req.body);
    const inserted = await insertStory(body);
    res.status(201).json({ id: inserted.id, slug: inserted.slug });
  } catch {
    res.status(400).json({ error: "Invalid story data" });
  }
});

export default router;
