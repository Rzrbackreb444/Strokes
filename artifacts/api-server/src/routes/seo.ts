import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { stories } from "@workspace/db/schema";
import { isNotNull } from "drizzle-orm";

const router: IRouter = Router();

const SITE_URL = "https://strokelyfe.org";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "strokelyfe2024x8f526849706a387";

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/programs", priority: "0.8", changefreq: "monthly" },
  { path: "/donate", priority: "0.9", changefreq: "weekly" },
  { path: "/gift", priority: "0.8", changefreq: "monthly" },
  { path: "/stories", priority: "0.7", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/vision", priority: "0.9", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/transparency", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.7", changefreq: "monthly" },
  { path: "/events", priority: "0.6", changefreq: "weekly" },
  { path: "/resources", priority: "0.7", changefreq: "monthly" },
  { path: "/legal/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/legal/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/legal/donor-rights", priority: "0.4", changefreq: "yearly" },
];

const BLOG_SLUGS = [
  "donate-stroke-recovery-academy",
  "stroke-lyfe-mission",
  "stroke-recovery-gap",
  "5-ways-donation-helps",
  "stroke-social-isolation",
  "neuroplasticity-stroke-recovery",
  "seven-years-after-stroke-nick-kremers",
  "stroke-lyfe-recovery-center-vision",
  "driving-after-stroke-vehicle-modifications",
  "experimental-stroke-recovery-treatments",
  "what-your-stroke-lyfe-donation-builds",
];

const TODAY = new Date().toISOString().split("T")[0];

router.get("/robots.txt", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  );
});

router.get("/sitemap.xml", async (_req: Request, res: Response) => {
  let storySlugs: string[] = [];
  try {
    const rows = await db
      .select({ slug: stories.slug })
      .from(stories)
      .where(isNotNull(stories.publishedAt));
    storySlugs = rows.map((r) => r.slug);
  } catch {
    storySlugs = [];
  }

  const urls: string[] = [];

  for (const page of STATIC_PAGES) {
    urls.push(`
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  for (const slug of BLOG_SLUGS) {
    urls.push(`
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  for (const slug of storySlugs) {
    urls.push(`
  <url>
    <loc>${SITE_URL}/stories/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(xml);
});

router.get(`/${INDEXNOW_KEY}.txt`, (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(INDEXNOW_KEY);
});

router.post("/api/indexnow/ping", async (req: Request, res: Response) => {
  const { urls } = req.body as { urls?: string[] };
  if (!urls?.length) {
    res.status(400).json({ error: "urls required" });
    return;
  }

  try {
    const body = JSON.stringify({
      host: "strokelyfe.org",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    });

    const [bing, yandex] = await Promise.allSettled([
      fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
      }),
      fetch("https://yandex.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
      }),
    ]);

    res.json({
      submitted: urls.length,
      bing: bing.status === "fulfilled" ? bing.value.status : "error",
      yandex: yandex.status === "fulfilled" ? yandex.value.status : "error",
    });
  } catch (err) {
    res.status(500).json({ error: "IndexNow ping failed" });
  }
});

export default router;
