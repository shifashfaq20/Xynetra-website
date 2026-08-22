// src/lib/admin/roles.ts
// Plain module: synchronous helpers + shared types. NOT a server-action file.

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
  .split(",")
  .map(function (s) { return s.trim().toLowerCase(); })
  .filter(Boolean);

export function isAdminEmail(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.indexOf(email.toLowerCase()) !== -1;
}

// export type AdminClient = {
//   id: string;
//   email: string;
//   business_name: string;
//   full_name: string | null;
//   billing_region: string;
//   subscription_status: string;
// };
export interface AdminClient {
  id: string
  email: string
  business_name: string
  full_name: string | null
  billing_region: string
  subscription_status: string
  // tenant state
  whatsapp_phone_number_id: string | null
  phone_option: string | null
  phone_number: string | null
  phone_country: string | null
  timezone: string | null
  owner_whatsapp: string | null
}