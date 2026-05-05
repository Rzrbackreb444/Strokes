# Stroke Lyfe

A 501(c)(3) nonprofit website that enriches the lives of stroke survivors through motivation and furthering recovery research. Accepts donations, gifts survivor scholarships, and publishes E-E-A-T blog content.

## Run & Operate

| Command | Purpose |
|---|---|
| `pnpm --filter @workspace/api-server run dev` | Start API server (port 8080) |
| `pnpm --filter @workspace/stroke-lyfe run dev` | Start frontend dev server (port 22585) |
| `pnpm --filter @workspace/db run push` | Push DB schema changes (dev only) |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API hooks from OpenAPI spec |
| `pnpm run typecheck` | Full typecheck across all packages |

**Required env vars:** `DATABASE_URL`, `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLIC_KEY`, `RESEND_API_KEY`, `ADMIN_SECRET`, `STRIPE_WEBHOOK_SECRET`, `INDEXNOW_KEY`

## Stack

- **Frontend:** React + Vite + Tailwind CSS + shadcn/ui (artifact: `stroke-lyfe`, port 22585)
- **Backend:** Express 5 + TypeScript (artifact: `api-server`, port 8080)
- **Database:** PostgreSQL + Drizzle ORM + drizzle-zod
- **Payments:** Stripe (Checkout Sessions + Webhooks)
- **Email:** Resend (HTML receipts + gift notifications)
- **Build:** esbuild, pnpm workspaces, TypeScript 5.9, Node 24

## Where things live

- `artifacts/stroke-lyfe/src/` — React pages and components
- `artifacts/stroke-lyfe/src/components/SEO.tsx` — per-page meta/OG/JSON-LD SEO component
- `artifacts/stroke-lyfe/src/pages/BlogPost.tsx` — blog post data (5 posts) + post template
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/api-server/src/routes/seo.ts` — `/sitemap.xml`, `/robots.txt`, `/api/indexnow/ping`
- `artifacts/api-server/src/lib/emails.ts` — Resend HTML email templates
- `lib/db/src/schema/` — DB schema (stories, donations, contact, siteConfig)
- `lib/api-spec/` — OpenAPI spec + Orval codegen → `lib/api-client-react/`

## Architecture decisions

- **Single production process:** API server (port 8080) serves the Vite-built frontend as static files in production via `express.static` + SPA fallback. Two separate dev servers in development.
- **Proxy routing:** `.replit` has ONE `[[ports]]` entry (8080 only). `api-server` artifact `paths = ["/api"]` only — adding `"/"` breaks the dev proxy.
- **SEO at component level:** No react-helmet. `SEO.tsx` uses `useEffect` DOM manipulation to set title, meta, canonical, OG, Twitter, and JSON-LD per page.
- **Sitemap + robots served from API:** Routes at root level in `app.ts` (before `/api` mount) so they work in production without needing a separate static file.
- **Stripe webhook idempotency:** Events are claimed atomically via `INSERT … ON CONFLICT DO NOTHING` before side effects. Failed handlers release the claim so Stripe can retry.
- **Blog is static data:** 5 posts defined as a typed array in `BlogPost.tsx`. No CMS needed yet.

## Product

- **Donate page** — one-time or recurring, preset/custom amounts, tribute gifts, fee coverage, Stripe Checkout
- **Gift a Scholarship** — 3 tiers ($97/$297/$997), recipient details → Stripe, two Resend emails
- **Thank You page** — verifies Stripe session, shows personalized confirmation
- **Blog** — 5 live E-E-A-T posts on neuroplasticity, mission, donation, recovery gap, caregiver grief
- **Stories** — public survivor stories, admin approval workflow
- **Transparency** — EIN, financials, board, donor rights
- **FAQ** — FAQPage JSON-LD schema for AEO/AI answer engines
- **SEO engine** — per-page meta, OG, JSON-LD (Organization, NGO, Article, FAQPage, WebSite), sitemap.xml, robots.txt, IndexNow ping

## User preferences

- No emojis in code or UI copy
- Keep api-server `paths = ["/api"]` only in artifact.toml — adding "/" breaks dev proxy
- `.replit` must have ONE `[[ports]]` entry (8080) — extra entries break deployment

## Gotchas

- `STRIPE_WEBHOOK_SECRET` required before going live. Register `https://strokelyfe.org/api/stripe/webhook` in Stripe Dashboard → select `checkout.session.completed` + `invoice.paid`.
- Stripe webhook raw body: `express.raw()` middleware applied at `/api/stripe/webhook` in `app.ts` before `express.json()`.
- DB migration: `pnpm --filter @workspace/db run push` (dev). For production schema changes, see database skill.
- `stories.publishedAt` (timestamp, nullable) is the published flag — NOT a boolean `published` column.

## Pointers

- Stripe Webhook Setup: Dashboard → Developers → Webhooks → add `https://strokelyfe.org/api/stripe/webhook`
- IndexNow key: set `INDEXNOW_KEY` env var; key file served at `/{key}.txt` by api-server
- Email from address: `Stroke Lyfe <noreply@strokelyfe.org>` — domain must be verified in Resend
