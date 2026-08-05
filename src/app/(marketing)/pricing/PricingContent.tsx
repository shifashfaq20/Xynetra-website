// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import {
//   PLANS,
//   money,
//   savePendingCheckout,
//   type Plan,
//   type BillingPeriod,
// } from "@/lib/payments/plans";

// function Check({ dark }: { dark?: boolean }) {
//   return (
//     <svg
//       viewBox="0 0 20 20"
//       fill="none"
//       className={`mt-0.5 h-5 w-5 shrink-0 ${
//         dark ? "text-violet-400" : "text-violet-600"
//       }`}
//       aria-hidden="true"
//     >
//       <path
//         d="M5 10.5l3.2 3.2L15 7"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function Arrow({ dark }: { dark?: boolean }) {
//   return (
//     <svg
//       viewBox="0 0 20 20"
//       fill="none"
//       className={`h-4 w-4 ${dark ? "text-black" : "text-white"}`}
//       aria-hidden="true"
//     >
//       <path
//         d="M4 10h11m0 0l-4-4m4 4l-4 4"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// export default function PricingContent() {
//   const router = useRouter();
//   const [billing, setBilling] = useState<BillingPeriod>("monthly");
//   const [busy, setBusy] = useState<string | null>(null);
//   const isAnnual = billing === "annual";

//   async function handleChoose(plan: Plan, period: BillingPeriod) {
//     const key = `${plan.id}-${period}`;
//     setBusy(key);
//     try {
//       const supabase = createClient();
//       const { data } = await supabase.auth.getSession();
//       if (data.session) {
//         // Already logged in → straight to the protected checkout.
//         router.push(`/checkout?plan=${plan.id}&billing=${period}`);
//       } else {
//         // Not logged in → remember the choice, send to signup.
//         // (Login link on the signup page works too: the choice is in localStorage.)
//         savePendingCheckout(plan.id, period);
//         router.push("/signup");
//       }
//     } finally {
//       setBusy(null);
//     }
//   }

//   return (
//     <section className="bg-[#f7f7f8] text-neutral-900">
//       <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
//         <div className="max-w-2xl">
//           <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
//             Pricing
//           </p>
//           <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
//             Simple plans. Real outcomes.
//           </h1>
//           <p className="mt-5 text-lg text-neutral-600">
//             No per-seat fees, no message credits to babysit. You pay a flat
//             monthly rate, a one-time setup fee, and we install the system that
//             does the work. Switch to annual and save 20%.
//           </p>
//         </div>

//         {/* Billing toggle */}
//         <div className="mt-10 flex flex-wrap items-center gap-4">
//           <div className="inline-flex rounded-full border border-neutral-300 bg-white p-1">
//             <button
//               type="button"
//               onClick={() => setBilling("monthly")}
//               className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
//                 !isAnnual
//                   ? "bg-black text-white"
//                   : "text-neutral-600 hover:text-neutral-900"
//               }`}
//             >
//               Monthly
//             </button>
//             <button
//               type="button"
//               onClick={() => setBilling("annual")}
//               className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
//                 isAnnual
//                   ? "bg-black text-white"
//                   : "text-neutral-600 hover:text-neutral-900"
//               }`}
//             >
//               Annual
//               <span
//                 className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
//                   isAnnual
//                     ? "bg-violet-500 text-white"
//                     : "bg-violet-100 text-violet-700"
//                 }`}
//               >
//                 −20%
//               </span>
//             </button>
//           </div>
//           <p className="text-sm text-neutral-500">
//             {isAnnual ? "Billed yearly" : "Billed month-to-month"} · cancel
//             anytime after the guarantee period
//           </p>
//         </div>

//         {/* Plans */}
//         <div className="mt-12 grid gap-6 md:grid-cols-3">
//           {PLANS.map((plan) => {
//             const dark = !!plan.featured;
//             const price = isAnnual ? plan.annual : plan.monthly;
//             const period: BillingPeriod = isAnnual ? "annual" : "monthly";
//             const key = `${plan.id}-${period}`;

//             return (
//               <div
//                 key={plan.id}
//                 className={`relative flex flex-col rounded-2xl border p-8 ${
//                   dark
//                     ? "border-black bg-black text-white shadow-xl md:-mt-4 md:mb-0"
//                     : "border-neutral-200 bg-white"
//                 }`}
//               >
//                 {plan.featured && (
//                   <span className="absolute -top-3 left-8 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
//                     Most popular
//                   </span>
//                 )}

//                 <h2 className="text-xl font-bold">{plan.name}</h2>
//                 <p
//                   className={`mt-1 text-sm ${
//                     dark ? "text-neutral-300" : "text-neutral-500"
//                   }`}
//                 >
//                   {plan.tagline}
//                 </p>

//                 <div className="mt-6 flex items-end gap-1">
//                   <span className="text-5xl font-bold tracking-tight">
//                     {money(price)}
//                   </span>
//                   <span
//                     className={`mb-1 text-sm ${
//                       dark ? "text-neutral-400" : "text-neutral-500"
//                     }`}
//                   >
//                     /mo
//                   </span>
//                 </div>
//                 <p
//                   className={`mt-1 text-xs ${
//                     dark ? "text-neutral-400" : "text-neutral-500"
//                   }`}
//                 >
//                   {isAnnual
//                     ? `${money(plan.annual * 12)} billed annually`
//                     : "billed monthly"}
//                 </p>

//                 <div
//                   className={`mt-5 flex items-center justify-between rounded-lg px-4 py-3 ${
//                     dark ? "bg-white/10" : "bg-neutral-100"
//                   }`}
//                 >
//                   <span
//                     className={`text-[11px] font-semibold uppercase tracking-wider ${
//                       dark ? "text-neutral-300" : "text-neutral-500"
//                     }`}
//                   >
//                     One-time setup fee
//                   </span>
//                   <span className="text-base font-bold">
//                     {money(plan.setup)}
//                   </span>
//                 </div>

//                 <button
//                   type="button"
//                   disabled={busy === key}
//                   onClick={() => handleChoose(plan, period)}
//                   className={`mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition disabled:opacity-60 ${
//                     dark
//                       ? "bg-white text-black hover:bg-neutral-200"
//                       : "bg-black text-white hover:bg-neutral-800"
//                   }`}
//                 >
//                   {busy === key ? "Redirecting…" : `Choose ${plan.name}`}
//                   {busy !== key && <Arrow dark={dark} />}
//                 </button>

//                 <ul className="mt-8 space-y-3">
//                   {plan.features.map((f) => (
//                     <li key={f} className="flex gap-3 text-sm">
//                       <Check dark={dark} />
//                       <span
//                         className={
//                           dark ? "text-neutral-200" : "text-neutral-700"
//                         }
//                       >
//                         {f}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             );
//           })}
//         </div>

//         {/* 60-day performance guarantee */}
//         <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-8 text-center">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700">
//             <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
//               <path
//                 d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M9 12l2 2 4-4"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <p className="text-lg font-bold">60-day performance guarantee</p>
//           <p className="max-w-2xl text-sm text-neutral-600">
//             Every plan is backed by our 60-day guarantee. If your Xynetra system
//             hasn&apos;t paid for itself within 60 days of going live, we refund
//             your one-time setup fee in full — no forms, no friction.
//           </p>
//           <p className="mt-1 text-xs text-neutral-400">
//             Prices shown in USD. Setup fee is charged once at onboarding.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }




// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import { Check } from "lucide-react";
// import RevenueCalculator from "@/components/marketing/RevenueCalculator";

// type BillingPeriod = "monthly" | "annual";

// const PLAN_MAP = {
//   starter: { monthly: 29, annual: 290 },
//   growth: { monthly: 79, annual: 790 },
//   scale: { monthly: 199, annual: 1990 },
// };

// type PlanId = "starter" | "growth" | "scale";

// const PLANS = [
//   {
//     id: "starter" as PlanId,
//     name: "Starter",
//     tagline: "For owner-operators getting started",
//     featured: false,
//     monthly: 29,
//     annual: 290,
//     setup: 99,
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
//     monthly: 79,
//     annual: 790,
//     setup: 249,
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
//     monthly: 199,
//     annual: 1990,
//     setup: 499,
//     features: [
//       "Everything in Growth",
//       "Unlimited locations",
//       "Custom automation rules",
//       "Dedicated account manager",
//       "White-label options",
//     ],
//   },
// ];

// function money(amount: number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export default function PricingContent() {
//   const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

//   const growthPlan = PLAN_MAP.growth;
//   const comparePlanPrice = billingPeriod === "monthly" ? growthPlan.monthly : growthPlan.annual;
//   const comparePlanLabel = billingPeriod === "monthly" ? "Growth monthly" : "Growth annual";

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
//           className="mt-16 flex flex-col items-center justify-center gap-4"
//         >
//           <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1">
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
//             const price = billingPeriod === "monthly" ? plan.monthly : plan.annual;
//             // FIXED: send to signup with plan + onboarding redirect
//             const href = `/signup?plan=${plan.id}&next=/onboarding`;

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
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
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
//                       style={{ fontFamily: "'Space Grotesk', Inter, sans-serif" }}
//                     >
//                       {money(price)}
//                     </span>
//                     <span className="pb-2 text-neutral-500">/mo</span>
//                   </div>

//                   {billingPeriod === "annual" && (
//                     <p className="mt-1 text-sm text-neutral-500">billed annually</p>
//                   )}

//                   <p className="mt-3 text-sm text-neutral-600">
//                     One-time setup fee:{" "}
//                     <span className="font-semibold text-neutral-900">
//                       {money(plan.setup)}
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
//                   className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
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


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Check } from "lucide-react";
// import RevenueCalculator from "@/components/marketing/RevenueCalculator";

// type BillingPeriod = "monthly" | "annual";

// const PLAN_MAP = {
//   starter: { monthly: 29, annual: 290 },
//   growth: { monthly: 79, annual: 790 },
//   scale: { monthly: 199, annual: 1990 },
// };

// type PlanId = "starter" | "growth" | "scale";

// const PLANS = [
//   {
//     id: "starter" as PlanId,
//     name: "Starter",
//     tagline: "For owner-operators getting started",
//     featured: false,
//     monthly: 29,
//     annual: 290,
//     setup: 99,
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
//     monthly: 79,
//     annual: 790,
//     setup: 249,
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
//     monthly: 199,
//     annual: 1990,
//     setup: 499,
//     features: [
//       "Everything in Growth",
//       "Unlimited locations",
//       "Custom automation rules",
//       "Dedicated account manager",
//       "White-label options",
//     ],
//   },
// ];

// function money(amount: number) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export default function PricingContent() {
//   const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

//   const growthPlan = PLAN_MAP.growth;
//   const comparePlanPrice =
//     billingPeriod === "monthly" ? growthPlan.monthly : growthPlan.annual;
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
//           className="mt-16 flex flex-col items-center justify-center gap-4"
//         >
//           <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1">
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
//             const price =
//               billingPeriod === "monthly" ? plan.monthly : plan.annual;

//             // CHANGED: send to signup, then checkout (Paddle), then onboarding
//             const href = `/signup?plan=${plan.id}&billing=${billingPeriod}&next=/app/checkout`;

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
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
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
//                       {money(price)}
//                     </span>
//                     <span className="pb-2 text-neutral-500">/mo</span>
//                   </div>

//                   {billingPeriod === "annual" && (
//                     <p className="mt-1 text-sm text-neutral-500">
//                       billed annually
//                     </p>
//                   )}

//                   <p className="mt-3 text-sm text-neutral-600">
//                     One-time setup fee:{" "}
//                     <span className="font-semibold text-neutral-900">
//                       {money(plan.setup)}
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
//                   className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
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





// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Check } from "lucide-react";
// import RevenueCalculator from "@/components/marketing/RevenueCalculator";

// type BillingPeriod = "monthly" | "annual";
// type Currency = "USD" | "GBP";

// // USD → GBP approximate conversion rate
// const USD_TO_GBP = 0.79;

// const PLAN_MAP = {
//   starter: { monthly: 29, annual: 290 },
//   growth: { monthly: 79, annual: 790 },
//   scale: { monthly: 199, annual: 1990 },
// };

// type PlanId = "starter" | "growth" | "scale";

// const PLANS = [
//   {
//     id: "starter" as PlanId,
//     name: "Starter",
//     tagline: "For owner-operators getting started",
//     featured: false,
//     monthly: 29,
//     annual: 290,
//     setup: 99,
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
//     monthly: 79,
//     annual: 790,
//     setup: 249,
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
//     monthly: 199,
//     annual: 1990,
//     setup: 499,
//     features: [
//       "Everything in Growth",
//       "Unlimited locations",
//       "Custom automation rules",
//       "Dedicated account manager",
//       "White-label options",
//     ],
//   },
// ];

// function convert(amount: number, currency: Currency) {
//   return currency === "USD" ? amount : Math.round(amount * USD_TO_GBP);
// }

// function money(amount: number, currency: Currency) {
//   return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-GB", {
//     style: "currency",
//     currency,
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export default function PricingContent() {
//   const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
//   const [currency, setCurrency] = useState<Currency>("USD");

//   const growthPlan = PLAN_MAP.growth;
//   const comparePlanPrice =
//     billingPeriod === "monthly" ? growthPlan.monthly : growthPlan.annual;
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
//           className="mt-16 flex flex-col items-center justify-center gap-4"
//         >
//           {/* Billing period toggle */}
//           <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1">
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

//           {/* Currency toggle (matches calculator style) */}
//           <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1">
//             <button
//               type="button"
//               onClick={() => setCurrency("USD")}
//               className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
//                 currency === "USD"
//                   ? "bg-neutral-900 text-white"
//                   : "text-neutral-600 hover:text-neutral-900"
//               }`}
//               aria-label="US Dollars"
//             >
//               $
//             </button>
//             <button
//               type="button"
//               onClick={() => setCurrency("GBP")}
//               className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
//                 currency === "GBP"
//                   ? "bg-neutral-900 text-white"
//                   : "text-neutral-600 hover:text-neutral-900"
//               }`}
//               aria-label="British Pounds"
//             >
//               £
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
//             const basePrice =
//               billingPeriod === "monthly" ? plan.monthly : plan.annual;
//             const price = convert(basePrice, currency);
//             const setupPrice = convert(plan.setup, currency);

//             // CHANGED: send to signup, then checkout (Paddle), then onboarding
//             const href = `/signup?plan=${plan.id}&billing=${billingPeriod}&next=/app/checkout`;

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
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
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
//                       {money(price, currency)}
//                     </span>
//                     <span className="pb-2 text-neutral-500">
//                       {billingPeriod === "annual" ? "/yr" : "/mo"}
//                     </span>
//                   </div>

//                   {billingPeriod === "annual" && (
//                     <p className="mt-1 text-sm text-neutral-500">
//                       billed annually
//                     </p>
//                   )}

//                   <p className="mt-3 text-sm text-neutral-600">
//                     One-time setup fee:{" "}
//                     <span className="font-semibold text-neutral-900">
//                       {money(setupPrice, currency)}
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
//                   className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
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
import { Check } from "lucide-react";
import RevenueCalculator from "@/components/marketing/RevenueCalculator";
import { Region } from "@/lib/payments/plans";

type BillingPeriod = "monthly" | "annual";
type PlanId = "starter" | "growth" | "scale";

// Exact pricing matrix matched from Google Sheets
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
  // Add commas to large numbers (e.g., PKR 120,000)
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export default function PricingContent() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [region, setRegion] = useState<Region>("US");

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
          {/* Region Dropdown */}
          <div className="flex items-center gap-3">
            <label htmlFor="region-select" className="text-sm font-medium text-neutral-600">
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

          {/* Billing period toggle */}
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
              ? "Annual pricing shown as monthly equivalent."
              : "Monthly pricing shown."}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const planPrices = currentPricing[plan.id];
            const displayPrice = billingPeriod === "monthly" ? planPrices.monthly : planPrices.annual;
            const setupPrice = planPrices.setup;
            const symbol = currentPricing.symbol;

            // Send region to signup URL so checkout knows what they picked
            const href = `/signup?plan=${plan.id}&billing=${billingPeriod}&region=${region}&next=/app/checkout`;

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
                    {introCopy[plan.id as PlanId]}
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
                    <span className="pb-2 text-neutral-500 font-medium">
                      {billingPeriod === "annual" ? "/yr" : "/mo"}
                    </span>
                  </div>

                  {billingPeriod === "annual" && (
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                      billed annually
                    </p>
                  )}

                  <p className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600 border border-neutral-100">
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

                <Link
                  href={href}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                >
                  Choose plan
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}