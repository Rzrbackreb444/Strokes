import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import seoRouter from "./routes/seo";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());

// Raw body required for Stripe webhook signature verification — must come BEFORE express.json()
app.use(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SEO routes served at root level (sitemap.xml, robots.txt, IndexNow key)
app.use(seoRouter);

app.use("/api", router);

// In production the API server also serves the Vite-built frontend.
// This keeps the deployment to a single process on a single port (8080).
if (process.env.NODE_ENV === "production") {
  const staticDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../stroke-lyfe/dist/public",
  );
  app.use(express.static(staticDir));
  // SPA fallback — any unmatched route returns index.html so client-side
  // routing (wouter) works correctly after a hard refresh or direct URL load.
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;
