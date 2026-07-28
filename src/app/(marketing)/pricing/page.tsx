// import type { Metadata } from "next";
// import PricingContent from "./PricingContent";

// export const metadata: Metadata = {
//   title: "Pricing — Xynetra",
//   description:
//     "Starter, Growth and Scale plans for AI automation that recovers lost revenue. Monthly or annual billing, one-time setup fee, and a 60-day performance guarantee.",
// };

// export default function PricingPage() {
//   return <PricingContent />;
// }


import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Xynetra",
  description:
    "Starter, Growth and Scale plans for Xynetra Recover. Compare pricing, estimate lost revenue, and choose the plan that fits your business.",
};

export default function PricingPage() {
  return <PricingContent />;
}