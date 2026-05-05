import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { siteConfig } from "@workspace/db";

const router: IRouter = Router();

// GET /api/stats
router.get("/stats", async (_req: Request, res: Response): Promise<void> => {
  const rows = await db.select().from(siteConfig);
  const cfg: Record<string, string> = {};
  for (const row of rows) cfg[row.key] = row.value;

  res.json({
    survivorsServed: parseInt(cfg["survivorsServed"] ?? "1247", 10),
    scholarshipsFunded: parseInt(cfg["scholarshipsFunded"] ?? "312", 10),
  });
});

export default router;
