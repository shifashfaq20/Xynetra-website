// // src/lib/admin/roles.ts
// // Plain module: synchronous helpers + shared types. NOT a server-action file.

// const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
//   .split(",")
//   .map(function (s) { return s.trim().toLowerCase(); })
//   .filter(Boolean);

// export function isAdminEmail(email?: string | null): boolean {
//   return !!email && ADMIN_EMAILS.indexOf(email.toLowerCase()) !== -1;
// }

// // export type AdminClient = {
// //   id: string;
// //   email: string;
// //   business_name: string;
// //   full_name: string | null;
// //   billing_region: string;
// //   subscription_status: string;
// // };
// export interface AdminClient {
//   id: string
//   email: string
//   business_name: string
//   full_name: string | null
//   billing_region: string
//   subscription_status: string
//   // tenant state
//   whatsapp_phone_number_id: string | null
//   phone_option: string | null
//   phone_number: string | null
//   phone_country: string | null
//   timezone: string | null
//   owner_whatsapp: string | null
// }



// // Plain module: synchronous helpers + shared types. NOT a server-action file.

// const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
//   .split(",")
//   .map((s) => s.trim().toLowerCase())
//   .filter(Boolean);

// export function isAdminEmail(email?: string | null): boolean {
//   return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
// }

// export interface AdminClient {
//   id: string;
//   email: string;
//   business_name: string;
//   full_name: string | null;
//   billing_region: string;
//   subscription_status: string;
//   whatsapp_phone_number_id: string | null;
//   phone_option: string | null;
//   phone_number: string | null;
//   phone_country: string | null;
//   timezone: string | null;
//   owner_whatsapp: string | null;
// }


// src/lib/admin/roles.ts
//
// Plain module: synchronous helpers + shared types.
// NOT a server-action file, and deliberately has no `server-only` import so
// client components can `import type { AdminClient }` from here.
//
// ⚠️ The functions below read process.env and must only be CALLED on the
// server (Server Components, Server Actions, proxy/middleware). Importing
// the *types* from a client component is always safe.

export const BILLING_REGIONS = ["international", "pakistan"] as const;
export type BillingRegion = (typeof BILLING_REGIONS)[number];

export const SUBSCRIPTION_STATUSES = [
  "active",
  "inactive",
  "past_due",
  "cancelled",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export function isBillingRegion(v: unknown): v is BillingRegion {
  return typeof v === "string" && (BILLING_REGIONS as readonly string[]).includes(v);
}

export function isSubscriptionStatus(v: unknown): v is SubscriptionStatus {
  return (
    typeof v === "string" && (SUBSCRIPTION_STATUSES as readonly string[]).includes(v)
  );
}

/**
 * Read at call time (not module scope) so a redeploy with a changed
 * ADMIN_EMAILS value takes effect without a cold-start cache surprise.
 */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "admin@xynetra.com")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return adminEmails().includes(email.trim().toLowerCase());
}

export interface AdminClient {
  id: string;
  email: string;
  business_name: string;
  full_name: string | null;
  billing_region: string;
  subscription_status: string;
  whatsapp_phone_number_id: string | null;
  phone_option: string | null;
  phone_number: string | null;
  phone_country: string | null;
  timezone: string | null;
  owner_whatsapp: string | null;
}

export interface ClientStats {
  handled: number;
  confirmed: number;
  cancelled: number;
  recovered: number;
  revenueSaved: number;
}

export const EMPTY_STATS: ClientStats = {
  handled: 0,
  confirmed: 0,
  cancelled: 0,
  recovered: 0,
  revenueSaved: 0,
};

export const PHONE_OPTION_LABEL: Record<string, string> = {
  client_sim: "Client bought a local SIM",
  landline: "Business landline (voice verification)",
  agency_virtual: "We procure a virtual number",
};