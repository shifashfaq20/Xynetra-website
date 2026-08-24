// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Check } from "lucide-react";
// import RevenueCalculator from "@/components/marketing/RevenueCalculator";
// import { Region } from "@/lib/payments/plans";

// type BillingPeriod = "monthly" | "annual";
// type PlanId = "starter" | "growth" | "scale";

// // Exact pricing matrix matched from Google Sheets
// const REGIONAL_PRICING = {
//   GULF: {
//     symbol: "$",
//     starter: { monthly: 119, annual: 1190, setup: 399 },
//     growth: { monthly: 229, annual: 2290, setup: 399 },
//     scale: { monthly: 459, annual: 4590, setup: 399 },
//   },
//   US: {
//     symbol: "$",
//     starter: { monthly: 99, annual: 990, setup: 299 },
//     growth: { monthly: 199, annual: 1990, setup: 299 },
//     scale: { monthly: 399, annual: 3990, setup: 299 },
//   },
//   UK: {
//     symbol: "£",
//     starter: { monthly: 79, annual: 790, setup: 249 },
//     growth: { monthly: 159, annual: 1590, setup: 249 },
//     scale: { monthly: 319, annual: 3190, setup: 249 },
//   },
//   AUS: {
//     symbol: "A$",
//     starter: { monthly: 149, annual: 1490, setup: 449 },
//     growth: { monthly: 299, annual: 2990, setup: 449 },
//     scale: { monthly: 599, annual: 5990, setup: 449 },
//   },
//   PK: {
//     symbol: "₨",
//     starter: { monthly: 6000, annual: 60000, setup: 15000 },
//     growth: { monthly: 12000, annual: 120000, setup: 15000 },
//     scale: { monthly: 25000, annual: 250000, setup: 15000 },
//   },
// };

// const PLANS = [
//   {
//     id: "starter" as PlanId,
//     name: "Starter",
//     tagline: "For owner-operators getting started",
//     featured: false,
//     features: [
//       "WhatsApp reminder automation",
//       "Basic calendar connection",
//       "1 business location",
//       "Email support",
//     ],
//   },
//   {
//     id: "growth" as PlanId,
//     name: "Growth",
//     tagline: "For clinics and studios recovering slots",
//     featured: true,
//     features: [
//       "Everything in Starter",
//       "Waitlist slot recovery",
//       "Up to 3 locations",
//       "Priority support",
//       "Revenue analytics dashboard",
//     ],
//   },
//   {
//     id: "scale" as PlanId,
//     name: "Scale",
//     tagline: "For high-volume teams and multi-location",
//     featured: false,
//     features: [
//       "Everything in Growth",
//       "Unlimited locations",
//       "Custom automation rules",
//       "Dedicated account manager",
//       "White-label options",
//     ],
//   },
// ];

// function formatMoney(amount: number, symbol: string) {
//   // Add commas to large numbers (e.g., PKR 120,000)
//   return `${symbol}${amount.toLocaleString("en-US")}`;
// }

// export default function PricingContent() {
//   const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
//   const [region, setRegion] = useState<Region>("US");

//   const currentPricing = REGIONAL_PRICING[region];
//   const growthPrices = currentPricing.growth;
  
//   const comparePlanPrice =
//     billingPeriod === "monthly" ? growthPrices.monthly : growthPrices.annual;
//   const comparePlanLabel =
//     billingPeriod === "monthly" ? "Growth monthly" : "Growth annual";

//   const introCopy: Record<PlanId, string> = {
//     starter:
//       "Best for owner-operators and smaller appointment-based businesses starting with automation.",
//     growth:
//       "Best for growing clinics, salons, and studios that want reminders plus slot recovery working together.",
//     scale:
//       "Best for higher-volume teams that need more automation capacity, support, and customisation.",
//   };

//   return (
//     <div className="min-h-screen bg-white px-4 py-20 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mx-auto max-w-3xl text-center">
//           <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
//             Pricing
//           </p>
//           <h1
//             className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
//             style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
//           >
//             Turn cancellations into recovered revenue
//           </h1>
//           <p className="mt-4 text-lg text-neutral-600">
//             Three plans. Real ROI. Choose the setup that fits your business now,
//             and upgrade as you grow.
//           </p>
//         </div>

//         <div className="mt-14">
//           <RevenueCalculator
//             comparePlanName="Growth"
//             comparePlanPrice={comparePlanPrice}
//             comparePlanLabel={comparePlanLabel}
//             ctaHref="#pricing-plans"
//             ctaLabel="See plans"
//           />
//         </div>

//         <div
//           id="pricing-plans"
//           className="mt-16 flex flex-col items-center justify-center gap-6"
//         >
//           {/* Region Dropdown */}
//           <div className="flex items-center gap-3">
//             <label htmlFor="region-select" className="text-sm font-medium text-neutral-600">
//               Select your region:
//             </label>
//             <select
//               id="region-select"
//               value={region}
//               onChange={(e) => setRegion(e.target.value as Region)}
//               className="cursor-pointer rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-3 pr-8 text-sm font-semibold text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 hover:bg-neutral-100"
//             >
//               <option value="US">United States (USD)</option>
//               <option value="UK">United Kingdom (GBP)</option>
//               <option value="AUS">Australia (AUD)</option>
//               <option value="GULF">Gulf Region (USD)</option>
//               <option value="PK">Pakistan (PKR)</option>
//             </select>
//           </div>

//           {/* Billing period toggle */}
//           <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
//             <button
//               type="button"
//               onClick={() => setBillingPeriod("monthly")}
//               className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
//                 billingPeriod === "monthly"
//                   ? "bg-neutral-900 text-white"
//                   : "text-neutral-600 hover:text-neutral-900"
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               type="button"
//               onClick={() => setBillingPeriod("annual")}
//               className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
//                 billingPeriod === "annual"
//                   ? "bg-neutral-900 text-white"
//                   : "text-neutral-600 hover:text-neutral-900"
//               }`}
//             >
//               Annual
//             </button>
//           </div>

//           <p className="text-sm text-neutral-500">
//             {billingPeriod === "annual"
//               ? "Annual pricing shown as monthly equivalent."
//               : "Monthly pricing shown."}
//           </p>
//         </div>

//         <div className="mt-10 grid gap-8 lg:grid-cols-3">
//           {PLANS.map((plan) => {
//             const planPrices = currentPricing[plan.id];
//             const displayPrice = billingPeriod === "monthly" ? planPrices.monthly : planPrices.annual;
//             const setupPrice = planPrices.setup;
//             const symbol = currentPricing.symbol;

//             // Send region to signup URL so checkout knows what they picked
//             const href = `/signup?plan=${plan.id}&billing=${billingPeriod}&region=${region}&next=/app/checkout`;

//             return (
//               <div
//                 key={plan.id}
//                 className={`relative flex flex-col justify-between rounded-3xl border bg-white p-8 ${
//                   plan.featured
//                     ? "border-neutral-900 shadow-xl"
//                     : "border-neutral-200 shadow-sm"
//                 }`}
//               >
//                 {plan.featured && (
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
//                     Most popular
//                   </div>
//                 )}

//                 <div>
//                   <h3
//                     className="text-2xl font-bold text-neutral-900"
//                     style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
//                   >
//                     {plan.name}
//                   </h3>

//                   <p className="mt-2 text-sm font-medium text-neutral-700">
//                     {plan.tagline}
//                   </p>

//                   <p className="mt-4 min-h-[72px] text-sm leading-6 text-neutral-600">
//                     {introCopy[plan.id as PlanId]}
//                   </p>

//                   <div className="mt-6 flex items-end gap-2">
//                     <span
//                       className="text-5xl font-bold tracking-tight text-neutral-900"
//                       style={{
//                         fontFamily: "'Space Grotesk', Inter, sans-serif",
//                       }}
//                     >
//                       {formatMoney(displayPrice, symbol)}
//                     </span>
//                     <span className="pb-2 text-neutral-500 font-medium">
//                       {billingPeriod === "annual" ? "/yr" : "/mo"}
//                     </span>
//                   </div>

//                   {billingPeriod === "annual" && (
//                     <p className="mt-1 text-sm font-medium text-neutral-500">
//                       billed annually
//                     </p>
//                   )}

//                   <p className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600 border border-neutral-100">
//                     One-time setup fee:{" "}
//                     <span className="font-semibold text-neutral-900">
//                       {formatMoney(setupPrice, symbol)}
//                     </span>
//                   </p>

//                   <ul className="mt-8 space-y-4">
//                     {plan.features.map((feature) => (
//                       <li key={feature} className="flex items-start gap-3">
//                         <Check className="mt-0.5 h-5 w-5 shrink-0 text-neutral-900" />
//                         <span className="text-sm leading-6 text-neutral-700">
//                           {feature}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <Link
//                   href={href}
//                   className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
//                 >
//                   Choose plan
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import RevenueCalculator from "@/components/marketing/RevenueCalculator";
import {
  type Region,
  type PlanId,
  type BillingPeriod,
  savePendingCheckout,
  checkoutPath,
} from "@/lib/payments/plans";
import { createClient } from "@/lib/supabase/client";

const REGIONAL_PRICING = {
  GULF: {
    symbol: "$",
    starter: { monthly: 119, annual: 1190, setup: 399 },
    growth: { monthly: 229, annual: 2290, setup: 399 },
    scale: { monthly: 459, annual: 4590, setup: 399 },
  },
  US: {
    symbol: "$",
    starter: { monthly: 99, annual: 990, setup: 299 },
    growth: { monthly: 199, annual: 1990, setup: 299 },
    scale: { monthly: 399, annual: 3990, setup: 299 },
  },
  UK: {
    symbol: "£",
    starter: { monthly: 79, annual: 790, setup: 249 },
    growth: { monthly: 159, annual: 1590, setup: 249 },
    scale: { monthly: 319, annual: 3190, setup: 249 },
  },
  AUS: {
    symbol: "A$",
    starter: { monthly: 149, annual: 1490, setup: 449 },
    growth: { monthly: 299, annual: 2990, setup: 449 },
    scale: { monthly: 599, annual: 5990, setup: 449 },
  },
  PK: {
    symbol: "₨",
    starter: { monthly: 6000, annual: 60000, setup: 15000 },
    growth: { monthly: 12000, annual: 120000, setup: 15000 },
    scale: { monthly: 25000, annual: 250000, setup: 15000 },
  },
};

const PLANS = [
  {
    id: "starter" as PlanId,
    name: "Starter",
    tagline: "For owner-operators getting started",
    featured: false,
    features: [
      "WhatsApp reminder automation",
      "Basic calendar connection",
      "1 business location",
      "Email support",
    ],
  },
  {
    id: "growth" as PlanId,
    name: "Growth",
    tagline: "For clinics and studios recovering slots",
    featured: true,
    features: [
      "Everything in Starter",
      "Waitlist slot recovery",
      "Up to 3 locations",
      "Priority support",
      "Revenue analytics dashboard",
    ],
  },
  {
    id: "scale" as PlanId,
    name: "Scale",
    tagline: "For high-volume teams and multi-location",
    featured: false,
    features: [
      "Everything in Growth",
      "Unlimited locations",
      "Custom automation rules",
      "Dedicated account manager",
      "White-label options",
    ],
  },
];

function formatMoney(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export default function PricingContent() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [region, setRegion] = useState<Region>("US");
  const [busyPlan, setBusyPlan] = useState<PlanId | null>(null);

  const currentPricing = REGIONAL_PRICING[region];
  const growthPrices = currentPricing.growth;

  const comparePlanPrice =
    billingPeriod === "monthly" ? growthPrices.monthly : growthPrices.annual;
  const comparePlanLabel =
    billingPeriod === "monthly" ? "Growth monthly" : "Growth annual";

  const introCopy: Record<PlanId, string> = {
    starter:
      "Best for owner-operators and smaller appointment-based businesses starting with automation.",
    growth:
      "Best for growing clinics, salons, and studios that want reminders plus slot recovery working together.",
    scale:
      "Best for higher-volume teams that need more automation capacity, support, and customisation.",
  };

  async function onChoosePlan(planId: PlanId) {
    setBusyPlan(planId);
    // Persist choice for checkout (survives signup / email confirm)
    savePendingCheckout(planId, billingPeriod, region);

    const checkout = checkoutPath(planId, billingPeriod, region);

    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        // Already logged in → go straight to Paddle checkout
        router.push(checkout);
        return;
      }
    } catch {
      /* fall through to signup */
    }

    // Logged out → signup, then after auth land on checkout with same plan
    const q = new URLSearchParams({
      plan: planId,
      billing: billingPeriod,
      region,
      next: checkout,
    });
    router.push(`/signup?${q.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Pricing
          </p>
          <h1
            className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
          >
            Turn cancellations into recovered revenue
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Three plans. Real ROI. Choose the setup that fits your business now,
            and upgrade as you grow.
          </p>
        </div>

        <div className="mt-14">
          <RevenueCalculator
            comparePlanName="Growth"
            comparePlanPrice={comparePlanPrice}
            comparePlanLabel={comparePlanLabel}
            ctaHref="#pricing-plans"
            ctaLabel="See plans"
          />
        </div>

        <div
          id="pricing-plans"
          className="mt-16 flex flex-col items-center justify-center gap-6"
        >
          <div className="flex items-center gap-3">
            <label
              htmlFor="region-select"
              className="text-sm font-medium text-neutral-600"
            >
              Select your region:
            </label>
            <select
              id="region-select"
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="cursor-pointer rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-3 pr-8 text-sm font-semibold text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 hover:bg-neutral-100"
            >
              <option value="US">United States (USD)</option>
              <option value="UK">United Kingdom (GBP)</option>
              <option value="AUS">Australia (AUD)</option>
              <option value="GULF">Gulf Region (USD)</option>
              <option value="PK">Pakistan (PKR)</option>
            </select>
          </div>

          <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                billingPeriod === "monthly"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("annual")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                billingPeriod === "annual"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Annual
            </button>
          </div>

          <p className="text-sm text-neutral-500">
            {billingPeriod === "annual"
              ? "Annual pricing shown as total per year."
              : "Monthly pricing shown."}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const planPrices = currentPricing[plan.id];
            const displayPrice =
              billingPeriod === "monthly"
                ? planPrices.monthly
                : planPrices.annual;
            const setupPrice = planPrices.setup;
            const symbol = currentPricing.symbol;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border bg-white p-8 ${
                  plan.featured
                    ? "border-neutral-900 shadow-xl"
                    : "border-neutral-200 shadow-sm"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm">
                    Most popular
                  </div>
                )}

                <div>
                  <h3
                    className="text-2xl font-bold text-neutral-900"
                    style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
                  >
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-neutral-700">
                    {plan.tagline}
                  </p>

                  <p className="mt-4 min-h-[72px] text-sm leading-6 text-neutral-600">
                    {introCopy[plan.id]}
                  </p>

                  <div className="mt-6 flex items-end gap-2">
                    <span
                      className="text-5xl font-bold tracking-tight text-neutral-900"
                      style={{
                        fontFamily: "'Space Grotesk', Inter, sans-serif",
                      }}
                    >
                      {formatMoney(displayPrice, symbol)}
                    </span>
                    <span className="pb-2 font-medium text-neutral-500">
                      {billingPeriod === "annual" ? "/yr" : "/mo"}
                    </span>
                  </div>

                  {billingPeriod === "annual" && (
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      billed annually
                    </p>
                  )}

                  <p className="mt-4 rounded-lg border border-neutral-100 bg-neutral-50 p-3 text-sm text-neutral-600">
                    One-time setup fee:{" "}
                    <span className="font-semibold text-neutral-900">
                      {formatMoney(setupPrice, symbol)}
                    </span>
                  </p>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-neutral-900" />
                        <span className="text-sm leading-6 text-neutral-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  disabled={busyPlan === plan.id}
                  onClick={() => onChoosePlan(plan.id)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-60"
                >
                  {busyPlan === plan.id ? "Continuing…" : "Choose plan"}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login?next=/app/checkout" className="font-semibold underline">
            Log in
          </Link>{" "}
          to complete payment.
        </p>
      </div>
    </div>
  );
}