# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Payments**: Stripe (test mode — keys in Secrets)
- **Email**: Resend (keys in Secrets)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Secrets Required

The following secrets must be set in the Replit Secrets panel:

| Secret | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (provisioned automatically) |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_... for test mode, sk_live_... for production) |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key (pk_test_... / pk_live_...) |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `ADMIN_SECRET` | Secret token for /admin panel access |
| `STRIPE_WEBHOOK_SECRET` | **Required before going live.** Obtain from Stripe Dashboard → Developers → Webhooks. Register the endpoint `https://strokelyfe.org/api/stripe/webhook` and copy the signing secret (whsec_...). Without this, webhook events are processed without signature verification — a security risk in production. |

## Stripe Webhook Setup (pre-launch checklist)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://strokelyfe.org/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `invoice.paid`
4. Copy the signing secret (starts with `whsec_`)
5. Add it as `STRIPE_WEBHOOK_SECRET` in Replit Secrets
6. Restart the API server

For local testing, use `stripe listen --forward-to localhost:8080/api/stripe/webhook` from the Stripe CLI.

## Payment Flows

### Donation flow
1. `POST /api/donations/checkout` — creates Stripe Checkout session (one-time or monthly subscription)
2. Stripe redirects to `/thank-you?session_id=...`
3. `GET /api/donations/verify?session_id=...` — verifies session and returns donor info
4. Webhook `checkout.session.completed` writes donation row + sends Resend receipt
5. Webhook `invoice.paid` handles monthly subscription renewals

### Gift scholarship flow
1. `POST /api/gift-scholarships/checkout` — creates Stripe Checkout session for $97/$297/$997 tier
2. Stripe redirects to `/thank-you?session_id=...`
3. Webhook `checkout.session.completed` sends two emails: donor confirmation + recipient notification with Academy activation link

## DB Schema

| Table | Purpose |
|---|---|
| `stories` | Survivor stories (status: pending/approved/rejected) |
| `donations` | Stripe donation records (one-time + recurring) |
| `contact_messages` | Contact form submissions |
| `mailing_list` | Footer email signups |
| `site_config` | Key/value store (survivorsServed, scholarshipsFunded stats) |
| `stripe_webhook_events` | Webhook event deduplication (keyed on Stripe event ID) |
