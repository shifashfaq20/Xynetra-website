# Xynetra — Website & Client Portal

The public marketing site and authenticated client portal for **Xynetra**, an AI
automation agency. Xynetra is the masterbrand; it sells two productized systems
as endorsed child brands:

- **Xynetra Recovery** — no-show prevention & slot recovery (live)
- **Xynetra Lead-to-Booking** — WhatsApp lead conversion (Coming soon page)

Built as one app: statically-generated marketing pages for SEO, plus a
session-gated dashboard and billing area.

---

## Stack

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router) + React 19 + TypeScript               |
| Styling            | Tailwind CSS 3 with brand tokens (`tailwind.config.ts`)       |
| Fonts              | Space Grotesk + Inter via bundled Fontsource packages (no CDN) |
| Auth + DB          | Supabase (Postgres + Auth) via `@supabase/ssr`                |
| Payments (US/UK)   | Paddle Billing overlay checkout (`@paddle/paddle-js`)         |
| Payments (Pakistan)| Manual bank / EasyPaisa / JazzCash with "I've paid" flow      |

Marketing pages are static (fast + SEO-friendly). `/app/*` and auth routes are
server-rendered per session.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

The site **builds and runs without any env vars** — marketing pages, the 404,
and the auth screens all render. Sign-in, the dashboard, and billing need
Supabase configured (below).

---

## Environment variables

All variables live in `.env.local` (see `.env.example`). Only the
`NEXT_PUBLIC_*` ones reach the browser.

| Variable                          | Required for            | Notes                                            |
| --------------------------------- | ----------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`        | Auth, dashboard, billing| Supabase → Settings → API                        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Auth, dashboard, billing| Supabase → Settings → API                        |
| `NEXT_PUBLIC_PADDLE_ENV`          | Card payments           | `sandbox` (default) or `production`              |
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | Card payments           | Paddle client-side token                         |
| `NEXT_PUBLIC_PADDLE_PRICE_ID`     | Card payments           | Paddle Billing price ID for the subscription     |
| `PK_BANK_ACCOUNT_DETAILS`         | Pakistan billing        | Shown on the billing page                        |
| `PK_EASYPAISA_NUMBER`             | Pakistan billing        | Shown on the billing page                        |
| `PK_JAZZCASH_NUMBER`              | Pakistan billing        | Shown on the billing page                        |

### Placeholders you still need to fill

These ship as literal placeholders and must be replaced before the matching
feature goes live:

- `[PADDLE_CLIENT_TOKEN]` — from your Paddle account once approved (sandbox is fine to start).
- `[PADDLE_PRICE_ID]` — the Paddle Billing price ID for the recurring plan.
- `[BANK_ACCOUNT_DETAILS]` — your PKR bank account (name, bank, account/IBAN).
- `[EASYPAISA_NUMBER]` — your EasyPaisa number.
- `[JAZZCASH_NUMBER]` — your JazzCash number.

Until `PADDLE_CLIENT_TOKEN` / `PADDLE_PRICE_ID` are real, the international
billing page shows a "sandbox setup" note instead of opening the overlay — no
crash. Until the Pakistan numbers are real, they render greyed as placeholders.

---

## Supabase setup

1. Use your existing Supabase project (the one your products already run on) or
   create a new one.
2. Copy the project URL and anon key into `.env.local`.
3. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
   It creates:
   - `profiles` — mirrors sign-up metadata (name, business, billing region),
     auto-populated by a trigger on new sign-ups.
   - `invoice_status` — per-invoice status overrides used by the Pakistan
     "I've paid" flow (marks an invoice `pending_verification` for you to
     confirm manually).
   - `waitlist` — early-access signups from the Lead-to-Booking page.
   All tables have row-level security so each client sees only their own rows.
4. **Auth for the demo:** to test signup → dashboard without email round-trips,
   turn **off** "Confirm email" in Supabase → Authentication → Providers →
   Email. With it on, new users must confirm by email before their first login
   (the signup screen tells them to). Password reset always uses the email link.

### Billing region

Each account has a `billing_region` (`international` or `pakistan`), chosen at
signup. It decides which billing rail the billing page shows:

- **international** → Paddle overlay checkout (USD).
- **pakistan** → manual payment instructions + "I've paid" button (PKR).

The whole payments layer is one swappable module in
[`src/lib/payments/`](src/lib/payments/): `railForRegion()` picks the rail, and
the billing page renders `PaddleCheckout` or `PakistanBilling` accordingly.

---

## Demo data

Until the dashboard is wired to production reporting tables, per-account results
(appointments confirmed, slots recovered, leads answered under 60s, estimated
revenue recovered) and the invoice history are generated **deterministically per
account** from the user id — see [`src/lib/demo.ts`](src/lib/demo.ts). Each
account sees stable, distinct numbers. Swap these functions for real queries
when the production tables exist.

---

## Conversion links

- Primary CTA **Book a demo** → `https://calendar.app.google/uyPruZcWWqRrTPty9`
- Secondary CTA **WhatsApp** → `https://wa.me/923399113300` (with a short
  prefilled message per surface)

Both are defined once in [`src/lib/constants.ts`](src/lib/constants.ts).

---

## Routes

| Path                          | Type    | Notes                               |
| ----------------------------- | ------- | ----------------------------------- |
| `/`                           | Static  | Home (masterbrand, hero circuit X)  |
| `/services`                   | Static  | Services overview                   |
| `/services/recovery`          | Static  | Xynetra Recovery (coral)            |
| `/services/lead-to-booking`   | Static  | Lead-to-Booking — Coming soon (blue)|
| `/about`, `/contact`          | Static  | Company pages                       |
| `/privacy`, `/terms`          | Static  | Legal (Meta/WhatsApp compliance)    |
| `/signup`, `/login`, `/reset-password` | Static shells | Supabase auth          |
| `/app/dashboard`              | Dynamic | Per-product results (auth required) |
| `/app/billing`               | Dynamic | Plan, invoices, payment (auth req.) |
| `/robots.txt`, `/sitemap.xml` | Static  | SEO                                 |

`/app/*` is guarded by the request proxy ([`src/proxy.ts`](src/proxy.ts));
signed-out visitors are redirected to `/login`.

---

## Brand assets

All logo, mark, hero, and pattern files are copied into
[`public/brand/`](public/brand/) and referenced from there — the site does not
depend on any Desktop path. Components in `src/components/Logo.tsx` and the
footer use only these supplied files (never redrawn or recolored).

---

## Deploy (Vercel recommended)

1. Push the repo to GitHub.
2. Import it into Vercel (auto-detects Next.js).
3. Add every variable from the table above in Vercel → Project → Settings →
   Environment Variables.
4. In Supabase → Authentication → URL Configuration, add your production domain
   to the redirect allow-list (for email confirm + password reset callbacks).
5. Deploy. `npm run build` runs automatically.

Any Node host that runs `next build` + `next start` works too. Node 20.9+ required
(built and tested on Node 22).
