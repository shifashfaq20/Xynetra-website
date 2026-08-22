import type { BillingRegion } from "@/lib/demo";

// Single swappable payments module. The account's billing region decides the
// rail; the billing page renders whichever the region resolves to.
export type PaymentRail = "paddle" | "pakistan";

export function railForRegion(region: BillingRegion): PaymentRail {
  return region === "pakistan" ? "pakistan" : "paddle";
}

// Placeholder config — filled from env once the accounts are approved.
export const paddleConfig = {
  environment:
    (process.env.NEXT_PUBLIC_PADDLE_ENV as "sandbox" | "production") ||
    "sandbox",
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || "[PADDLE_CLIENT_TOKEN]",
  priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || "[PADDLE_PRICE_ID]",
};

export function paddleConfigured(): boolean {
  return (
    !!paddleConfig.clientToken &&
    !paddleConfig.clientToken.startsWith("[") &&
    !!paddleConfig.priceId &&
    !paddleConfig.priceId.startsWith("[")
  );
}

// Manual-rail payment details for Pakistan (direct transfer / EasyPaisa /
// JazzCash). Placeholders until the real details are provided.
export const pakistanPayment = {
  bankDetails: process.env.PK_BANK_ACCOUNT_DETAILS || "[BANK_ACCOUNT_DETAILS]",
  easypaisa: process.env.PK_EASYPAISA_NUMBER || "[EASYPAISA_NUMBER]",
  jazzcash: process.env.PK_JAZZCASH_NUMBER || "[JAZZCASH_NUMBER]",
};
