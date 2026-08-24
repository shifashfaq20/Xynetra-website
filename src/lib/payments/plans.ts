


// export type BillingPeriod = "monthly" | "annual";

// export type PlanId = "starter" | "growth" | "scale";

// export type Region = "US" | "UK" | "AUS" | "GULF" | "PK";

// export type Plan = {
//   id: PlanId;
//   name: string;
//   tagline: string;
//   /** Display price / month when billed monthly */
//   monthly: number;
//   /** Display price / month when billed annually */
//   annual: number;
//   /** One-time setup fee (display) */
//   setup: number;
//   features: string[];
//   featured?: boolean;
//   /** Paddle price IDs — paste your real ones here */
//   priceIds: Record<BillingPeriod, string>;
//   /** Optional: a one-time Paddle price ID to charge the setup fee automatically. */
//   setupPriceId?: string;
// };

// export const CURRENCY = "$";

// export const PLANS: Plan[] = [
//   {
//     id: "starter",
//     name: "Starter",
//     tagline: "One system. One leak plugged.",
//     monthly: 497,
//     annual: 397,
//     setup: 997,
//     features: [
//       "1 core system (Recovery or Lead-to-Booking)",
//       "WhatsApp automation on your number",
//       "Up to 500 automated conversations / mo",
//       "Recovered-revenue dashboard",
//       "Email support (1-day response)",
//     ],
//     priceIds: {
//       monthly: "pri_01kx5ycc121x46tefe99vy8hhj",
//       annual: "pri_01kx5zxprpq95p3vf4v3a44xq5",
//     },
//     // Attached the global setup fee ID
//     setupPriceId: "pri_01kx60pvyvf8bcq444n3khcd6z",
//   },
//   {
//     id: "growth",
//     name: "Growth",
//     tagline: "Both core systems, working as one.",
//     monthly: 997,
//     annual: 797,
//     setup: 1997,
//     featured: true,
//     features: [
//       "Recovery + Lead-to-Booking, both live",
//       "WhatsApp + SMS channels",
//       "Up to 2,000 automated conversations / mo",
//       "Recovered-revenue dashboard",
//       "Monthly performance review call",
//       "Priority support (same-day response)",
//     ],
//     priceIds: {
//       monthly: "pri_01kx5zf321z7adb86stytpe41d",
//       annual: "pri_01kx606fn9fmgahgspyd15k9av",
//     },
//     // Attached the global setup fee ID
//     setupPriceId: "pri_01kx60pvyvf8bcq444n3khcd6z",
//   },
//   {
//     id: "scale",
//     name: "Scale",
//     tagline: "Automation without ceilings.",
//     monthly: 1997,
//     annual: 1597,
//     setup: 3497,
//     features: [
//       "Everything in Growth",
//       "Unlimited automated conversations",
//       "Custom integrations (CRM / booking tool)",
//       "Dedicated success manager",
//       "Weekly performance reviews + SLA",
//     ],
//     priceIds: {
//       monthly: "pri_01kx5zktzwcqrmt9sxnswemb7p",
//       annual: "pri_01kx60df302bqh9kj7hr7dzwmy",
//     },
//     // Attached the global setup fee ID
//     setupPriceId: "pri_01kx60pvyvf8bcq444n3khcd6z",
//   },
// ];

// export const PLAN_MAP = Object.fromEntries(
//   PLANS.map((p) => [p.id, p]),
// ) as Record<PlanId, Plan>;

// export const PADDLE_CLIENT_TOKEN =
//   process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";

// export const money = (n: number) =>
//   `${CURRENCY}${n.toLocaleString("en-US")}`;

// export const isPlanId = (x: unknown): x is PlanId =>
//   typeof x === "string" && x in PLAN_MAP;

// export const isBilling = (x: unknown): x is BillingPeriod =>
//   x === "monthly" || x === "annual";

// /* ---------------- localStorage handoff (client only) ---------------- */
// export const PENDING_CHECKOUT_KEY = "xynetra_pending_checkout";
// export const PENDING_TTL_MS = 24 * 60 * 60 * 1000; // 24h

// export type PendingCheckout = {
//   plan: PlanId;
//   billing: BillingPeriod;
//   region?: Region;
//   ts: number;
// };

// export function savePendingCheckout(plan: PlanId, billing: BillingPeriod, region?: Region) {
//   if (typeof window === "undefined") return;
//   window.localStorage.setItem(
//     PENDING_CHECKOUT_KEY,
//     JSON.stringify({ plan, billing, region, ts: Date.now() } satisfies PendingCheckout),
//   );
// }

// export function readPendingCheckout(): PendingCheckout | null {
//   if (typeof window === "undefined") return null;
//   try {
//     const raw = window.localStorage.getItem(PENDING_CHECKOUT_KEY);
//     if (!raw) return null;
//     const parsed = JSON.parse(raw) as PendingCheckout;
//     if (
//       !isPlanId(parsed.plan) ||
//       !isBilling(parsed.billing) ||
//       Date.now() - parsed.ts > PENDING_TTL_MS
//     ) {
//       clearPendingCheckout();
//       return null;
//     }
//     return parsed;
//   } catch {
//     return null;
//   }
// }

// export function clearPendingCheckout() {
//   if (typeof window === "undefined") return;
//   window.localStorage.removeItem(PENDING_CHECKOUT_KEY);
// }



export type BillingPeriod = "monthly" | "annual";

export type PlanId = "starter" | "growth" | "scale";

export type Region = "US" | "UK" | "AUS" | "GULF" | "PK";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Display price / month when billed monthly */
  monthly: number;
  /** Display price / month when billed annually */
  annual: number;
  /** One-time setup fee (display) */
  setup: number;
  features: string[];
  featured?: boolean;
  /** Paddle price IDs */
  priceIds: Record<BillingPeriod, string>;
  /** Optional one-time Paddle price ID for setup fee */
  setupPriceId?: string;
};

export const CURRENCY = "$";

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "One system. One leak plugged.",
    monthly: 497,
    annual: 397,
    setup: 997,
    features: [
      "1 core system (Recovery or Lead-to-Booking)",
      "WhatsApp automation on your number",
      "Up to 500 automated conversations / mo",
      "Recovered-revenue dashboard",
      "Email support (1-day response)",
    ],
    priceIds: {
      monthly: "pri_01kx5ycc121x46tefe99vy8hhj",
      annual: "pri_01kx5zxprpq95p3vf4v3a44xq5",
    },
    setupPriceId: "pri_01kx60pvyvf8bcq444n3khcd6z",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Both core systems, working as one.",
    monthly: 997,
    annual: 797,
    setup: 1997,
    featured: true,
    features: [
      "Recovery + Lead-to-Booking, both live",
      "WhatsApp + SMS channels",
      "Up to 2,000 automated conversations / mo",
      "Recovered-revenue dashboard",
      "Monthly performance review call",
      "Priority support (same-day response)",
    ],
    priceIds: {
      monthly: "pri_01kx5zf321z7adb86stytpe41d",
      annual: "pri_01kx606fn9fmgahgspyd15k9av",
    },
    setupPriceId: "pri_01kx60pvyvf8bcq444n3khcd6z",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Automation without ceilings.",
    monthly: 1997,
    annual: 1597,
    setup: 3497,
    features: [
      "Everything in Growth",
      "Unlimited automated conversations",
      "Custom integrations (CRM / booking tool)",
      "Dedicated success manager",
      "Weekly performance reviews + SLA",
    ],
    priceIds: {
      monthly: "pri_01kx5zktzwcqrmt9sxnswemb7p",
      annual: "pri_01kx60df302bqh9kj7hr7dzwmy",
    },
    setupPriceId: "pri_01kx60pvyvf8bcq444n3khcd6z",
  },
];

export const PLAN_MAP = Object.fromEntries(PLANS.map((p) => [p.id, p])) as Record<
  PlanId,
  Plan
>;

export const PADDLE_CLIENT_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";

export const money = (n: number) => `${CURRENCY}${n.toLocaleString("en-US")}`;

export const isPlanId = (x: unknown): x is PlanId =>
  typeof x === "string" && x in PLAN_MAP;

export const isBilling = (x: unknown): x is BillingPeriod =>
  x === "monthly" || x === "annual";

export const isRegion = (x: unknown): x is Region =>
  x === "US" || x === "UK" || x === "AUS" || x === "GULF" || x === "PK";

/* ---------------- localStorage handoff (client only) ---------------- */
export const PENDING_CHECKOUT_KEY = "xynetra_pending_checkout";
export const PENDING_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export type PendingCheckout = {
  plan: PlanId;
  billing: BillingPeriod;
  region?: Region;
  ts: number;
};

export function savePendingCheckout(
  plan: PlanId,
  billing: BillingPeriod,
  region?: Region
) {
  if (typeof window === "undefined") return;
  const payload: PendingCheckout = {
    plan,
    billing,
    region,
    ts: Date.now(),
  };
  window.localStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(payload));
}

export function readPendingCheckout(): PendingCheckout | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_CHECKOUT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingCheckout;
    if (
      !isPlanId(parsed.plan) ||
      !isBilling(parsed.billing) ||
      Date.now() - parsed.ts > PENDING_TTL_MS
    ) {
      clearPendingCheckout();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingCheckout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PENDING_CHECKOUT_KEY);
}

/** Build checkout URL with plan query (also pair with savePendingCheckout). */
export function checkoutPath(
  plan: PlanId,
  billing: BillingPeriod,
  region?: Region
): string {
  const q = new URLSearchParams({
    plan,
    billing,
    ...(region ? { region } : {}),
  });
  return `/app/checkout?${q.toString()}`;
}