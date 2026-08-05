// "use server";

// import { revalidatePath } from "next/cache";
// import { createClient } from "@/lib/supabase/server";
// import { createServiceClient, createAuthAdminClient } from "@/lib/supabase/service";
// import { isAdminEmail } from "@/lib/admin/roles";

// // Re-export the type only (erased at build time; safe in a server-action file).
// export type { AdminClient } from "@/lib/admin/roles";

// async function currentUserEmail(): Promise<string | null> {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getUser();
//   return (data.user && data.user.email) || null;
// }

// export async function requireAdmin(): Promise<string> {
//   const email = await currentUserEmail();
//   if (!isAdminEmail(email)) throw new Error("Admin access required");
//   return email;
// }

// /* list every real client (excludes admins) */
// export async function listClients() {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { data: profiles, error } = await svc
//     .from("profiles")
//     .select("id, full_name, business_name, billing_region, subscription_status");
//   if (error) throw new Error(error.message);

//   const auth = createAuthAdminClient();
//   const { data: users } = await auth.from("users").select("id, email");
//   const emailById = new Map<string, string>(
//     (users || []).map(function (u: any) { return [u.id, u.email]; })
//   );

//   return (profiles || [])
//     .filter(function (p: any) { return !!p.business_name; })
//     .map(function (p: any) {
//       return {
//         id: p.id,
//         email: emailById.get(p.id) || "",
//         business_name: p.business_name,
//         full_name: p.full_name,
//         billing_region: p.billing_region || "international",
//         subscription_status: p.subscription_status || "inactive",
//       };
//     })
//     .filter(function (c) { return c.email && ADMIN_LIST.indexOf(c.email.toLowerCase()) === -1; })
//     .sort(function (a, b) { return a.business_name.localeCompare(b.business_name); });
// }

// const ADMIN_LIST = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
//   .split(",")
//   .map(function (s) { return s.trim().toLowerCase(); })
//   .filter(Boolean);

// /* edit a client's region + subscription */
// export async function updateClientSettings(
//   userId: string,
//   input: { billing_region: string; subscription_status: string }
// ) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { error } = await svc
//     .from("profiles")
//     .update({
//       billing_region: input.billing_region,
//       subscription_status: input.subscription_status,
//     })
//     .eq("id", userId);
//   if (error) throw new Error(error.message);
//   revalidatePath("/app/dashboard");
//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// /* create a real, confirmed client account */
// export async function createClientAccount(input: {
//   email: string;
//   password: string;
//   business_name: string;
//   billing_region: string;
// }) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { data, error } = await svc.auth.admin.createUser({
//     email: input.email,
//     password: input.password,
//     email_confirm: true,
//     user_metadata: {
//       full_name: input.business_name,
//       business_name: input.business_name,
//       billing_region: input.billing_region,
//     },
//   });
//   if (error) throw new Error(error.message);

//   if (data.user) {
//     await svc
//       .from("profiles")
//       .update({ subscription_status: "active", plan: "pro" })
//       .eq("id", data.user.id)
//       .then(function () {})
//       .catch(function () {});
//   }
//   revalidatePath("/app/dashboard");
//   return { ok: true, userId: (data.user && data.user.id) || undefined };
// }

// /* seed live demo data for a client */
// export async function runSimulationForClient(userId: string) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const day = 86400000;
//   const now = Date.now();
//   const appts = [
//     { client_id: userId, customer_name: "Sim: Olivia Hart", appointment_time: new Date(now + 2 * day).toISOString(), status: "confirmed", timezone: "America/New_York", value: 140, recovered_from_waitlist: false },
//     { client_id: userId, customer_name: "Sim: Daniel Cho", appointment_time: new Date(now + 3 * day).toISOString(), status: "cancelled", timezone: "America/New_York", value: 180, recovered_from_waitlist: false },
//     { client_id: userId, customer_name: "Sim: Priya Nair", appointment_time: new Date(now + 4 * day).toISOString(), status: "confirmed", timezone: "Asia/Karachi", value: 220, recovered_from_waitlist: true },
//     { client_id: userId, customer_name: "Sim: Marco Rossi", appointment_time: new Date(now - 1 * day).toISOString(), status: "confirmed", timezone: "Europe/Rome", value: 160, recovered_from_waitlist: true },
//   ];
//   const { error } = await svc.from("appointments").insert(appts);
//   if (error) throw new Error(error.message);

//   await svc
//     .from("reminders")
//     .insert([
//       { client_id: userId, message: "24h reminder sent for Sim: Olivia Hart - appointment in 2 days", sent_at: new Date().toISOString() },
//       { client_id: userId, message: "Waitlist recovery: offered a cancelled slot to Sim: Priya Nair", sent_at: new Date(now - 3600000).toISOString() },
//     ])
//     .then(function () {})
//     .catch(function () {});

//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// /* stats for the admin preview (any period) */
// export async function getAdminStatsForClient(userId: string, period: "week" | "month") {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const limit = new Date();
//   limit.setDate(limit.getDate() - (period === "week" ? 7 : 30));
//   const { data } = await svc
//     .from("appointments")
//     .select("status, value, recovered_from_waitlist")
//     .eq("client_id", userId)
//     .gte("appointment_time", limit.toISOString());

//   const a = data || [];
//   return {
//     handled: a.length,
//     confirmed: a.filter(function (x: any) { return x.status === "confirmed"; }).length,
//     cancelled: a.filter(function (x: any) { return x.status === "cancelled"; }).length,
//     recovered: a.filter(function (x: any) { return x.recovered_from_waitlist; }).length,
//     revenueSaved: a
//       .filter(function (x: any) { return x.recovered_from_waitlist; })
//       .reduce(function (s: number, x: any) { return s + (Number(x.value) || 0); }, 0),
//   };
// }


// // src/lib/admin/actions.ts  (FULL REPLACEMENT)
// "use server";

// import { revalidatePath } from "next/cache";
// import { createClient } from "@/lib/supabase/server";
// import { createServiceClient, createAuthAdminClient } from "@/lib/supabase/service";
// import { isAdminEmail } from "@/lib/admin/roles";

// export interface AdminClient {
//   id: string;
//   email: string;
//   business_name: string;
//   full_name: string | null;
//   billing_region: string;
//   subscription_status: string;
//   whatsapp_phone_number_id: string | null;
//   phone_provisioning: any;
//   calendar_id: string | null;
//   is_active: boolean;
// }

// const ADMIN_LIST = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
//   .split(",")
//   .map(function (s) { return s.trim().toLowerCase(); })
//   .filter(Boolean);

// async function currentUserEmail(): Promise<string | null> {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getUser();
//   return (data.user && data.user.email) || null;
// }

// export async function requireAdmin(): Promise<string> {
//   const email = await currentUserEmail();
//   if (!isAdminEmail(email)) throw new Error("Admin access required");
//   return email!;
// }

// export async function listClients(): Promise<AdminClient[]> {
//   await requireAdmin();
//   const svc = createServiceClient();

//   const { data: profiles, error } = await svc
//     .from("profiles")
//     .select("id, full_name, business_name, billing_region, subscription_status");
//   if (error) throw new Error(error.message);

//   const { data: clientRows } = await svc
//     .from("clients")
//     .select("id, whatsapp_phone_number_id, phone_provisioning, calendar_id, is_active, subscription_status");
//   const opsById = new Map<string, any>((clientRows || []).map(function (r: any) { return [r.id, r]; }));

//   const auth = createAuthAdminClient();
//   const { data: users } = await auth.from("users").select("id, email");
//   const emailById = new Map<string, string>(
//     (users || []).map(function (u: any) { return [u.id, u.email]; })
//   );

//   return (profiles || [])
//     .filter(function (p: any) { return !!p.business_name; })
//     .map(function (p: any) {
//       const ops = opsById.get(p.id);
//       return {
//         id: p.id,
//         email: emailById.get(p.id) || "",
//         business_name: p.business_name,
//         full_name: p.full_name,
//         billing_region: p.billing_region || "international",
//         subscription_status: (ops && ops.subscription_status) || p.subscription_status || "inactive",
//         whatsapp_phone_number_id: (ops && ops.whatsapp_phone_number_id) || null,
//         phone_provisioning: (ops && ops.phone_provisioning) || null,
//         calendar_id: (ops && ops.calendar_id) || null,
//         is_active: !!(ops && ops.is_active),
//       };
//     })
//     .filter(function (c) { return c.email && ADMIN_LIST.indexOf(c.email.toLowerCase()) === -1; })
//     .sort(function (a, b) { return a.business_name.localeCompare(b.business_name); });
// }

// export async function updateClientSettings(
//   userId: string,
//   input: { billing_region: string; subscription_status: string }
// ) {
//   await requireAdmin();
//   const svc = createServiceClient();

//   const { error } = await svc
//     .from("profiles")
//     .update({
//       billing_region: input.billing_region,
//       subscription_status: input.subscription_status,
//     })
//     .eq("id", userId);
//   if (error) throw new Error(error.message);

//   // keep the n8n billing gate (clients.subscription_status, doc §7.1) in sync
//   await svc
//     .from("clients")
//     .upsert({ id: userId, subscription_status: input.subscription_status }, { onConflict: "id" });

//   revalidatePath("/app/dashboard");
//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// /* THE go-live switch: paste the Phone Number ID from Meta after registering
//    the client's number (doc §3). Next 15-minute n8n cycle starts serving them. */
// export async function setClientPhoneNumberId(userId: string, phoneNumberId: string) {
//   await requireAdmin();
//   const clean = (phoneNumberId || "").trim();
//   if (clean && !/^\d{5,20}$/.test(clean)) {
//     throw new Error("Phone Number ID should be the long numeric ID from Meta (digits only).");
//   }
//   const svc = createServiceClient();
//   const { error } = await svc
//     .from("clients")
//     .upsert(
//       { id: userId, whatsapp_phone_number_id: clean || null, updated_at: new Date().toISOString() },
//       { onConflict: "id" }
//     );
//   if (error) throw new Error(error.message);
//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// export async function createClientAccount(input: {
//   email: string;
//   password: string;
//   business_name: string;
//   billing_region: string;
// }) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { data, error } = await svc.auth.admin.createUser({
//     email: input.email,
//     password: input.password,
//     email_confirm: true,
//     user_metadata: {
//       full_name: input.business_name,
//       business_name: input.business_name,
//       billing_region: input.billing_region,
//     },
//   });
//   if (error) throw new Error(error.message);

//   if (data.user) {
//     await svc
//       .from("profiles")
//       .update({ subscription_status: "active", plan: "pro" })
//       .eq("id", data.user.id)
//       .then(function () {})
//       .catch(function () {});
//     // seed the ops row so admin can paste a Phone Number ID immediately
//     await svc
//       .from("clients")
//       .upsert(
//         { id: data.user.id, business_name: input.business_name, subscription_status: "active" },
//         { onConflict: "id" }
//       )
//       .then(function () {})
//       .catch(function () {});
//   }
//   revalidatePath("/app/dashboard");
//   return { ok: true, userId: (data.user && data.user.id) || undefined };
// }

// export async function runSimulationForClient(userId: string) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const day = 86400000;
//   const now = Date.now();
//   const appts = [
//     { client_id: userId, customer_name: "Sim: Olivia Hart", appointment_time: new Date(now + 2 * day).toISOString(), status: "confirmed", timezone: "America/New_York", value: 140, recovered_from_waitlist: false },
//     { client_id: userId, customer_name: "Sim: Daniel Cho", appointment_time: new Date(now + 3 * day).toISOString(), status: "cancelled", timezone: "America/New_York", value: 180, recovered_from_waitlist: false },
//     { client_id: userId, customer_name: "Sim: Priya Nair", appointment_time: new Date(now + 4 * day).toISOString(), status: "confirmed", timezone: "Asia/Karachi", value: 220, recovered_from_waitlist: true },
//     { client_id: userId, customer_name: "Sim: Marco Rossi", appointment_time: new Date(now - 1 * day).toISOString(), status: "confirmed", timezone: "Europe/Rome", value: 160, recovered_from_waitlist: true },
//   ];
//   const { error } = await svc.from("appointments").insert(appts);
//   if (error) throw new Error(error.message);

//   await svc
//     .from("reminders")
//     .insert([
//       { client_id: userId, message: "24h reminder sent for Sim: Olivia Hart - appointment in 2 days", sent_at: new Date().toISOString() },
//       { client_id: userId, message: "Waitlist recovery: offered a cancelled slot to Sim: Priya Nair", sent_at: new Date(now - 3600000).toISOString() },
//     ])
//     .then(function () {})
//     .catch(function () {});

//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// export async function getAdminStatsForClient(userId: string, period: "week" | "month") {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const limit = new Date();
//   limit.setDate(limit.getDate() - (period === "week" ? 7 : 30));
//   const { data } = await svc
//     .from("appointments")
//     .select("status, value, recovered_from_waitlist")
//     .eq("client_id", userId)
//     .gte("appointment_time", limit.toISOString());

//   const a = data || [];
//   return {
//     handled: a.length,
//     confirmed: a.filter(function (x: any) { return x.status === "confirmed"; }).length,
//     cancelled: a.filter(function (x: any) { return x.status === "cancelled"; }).length,
//     recovered: a.filter(function (x: any) { return x.recovered_from_waitlist; }).length,
//     revenueSaved: a
//       .filter(function (x: any) { return x.recovered_from_waitlist; })
//       .reduce(function (s: number, x: any) { return s + (Number(x.value) || 0); }, 0),
//   };
// }



// "use server";

// import { revalidatePath } from "next/cache";
// import { createClient } from "@/lib/supabase/server";
// import { createServiceClient, createAuthAdminClient } from "@/lib/supabase/service";
// import { isAdminEmail } from "@/lib/admin/roles";

// export type { AdminClient } from "@/lib/admin/roles";

// const ADMIN_LIST = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
//   .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

// async function currentUserEmail(): Promise<string | null> {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getUser();
//   return (data.user && data.user.email) || null;
// }

// export async function requireAdmin(): Promise<string> {
//   const email = await currentUserEmail();
//   if (!isAdminEmail(email)) throw new Error("Admin access required");
//   return email;
// }

// export async function listClients() {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { data: profiles, error } = await svc
//     .from("profiles")
//     .select("id, full_name, business_name, billing_region, subscription_status");
//   if (error) throw new Error(error.message);

//   const { data: tenantRows } = await svc
//     .from("clients")
//     .select("id, whatsapp_phone_number_id, phone_provisioning, timezone, owner_whatsapp");
//   const tenantById = new Map<string, any>((tenantRows || []).map((t: any) => [t.id, t]));

//   const auth = createAuthAdminClient();
//   const { data: users } = await auth.from("users").select("id, email");
//   const emailById = new Map<string, string>((users || []).map((u: any) => [u.id, u.email]));

//   return (profiles || [])
//     .filter((p: any) => !!p.business_name)
//     .map((p: any) => {
//       const t = tenantById.get(p.id);
//       return {
//         id: p.id,
//         email: emailById.get(p.id) || "",
//         business_name: p.business_name,
//         full_name: p.full_name,
//         billing_region: p.billing_region || "international",
//         subscription_status: p.subscription_status || "inactive",
//         whatsapp_phone_number_id: t?.whatsapp_phone_number_id || null,
//         phone_option: t?.phone_provisioning?.option || null,
//         phone_number: t?.phone_provisioning?.phone_number || null,
//         phone_country: t?.phone_provisioning?.country || null,
//         timezone: t?.timezone || null,
//         owner_whatsapp: t?.owner_whatsapp || null,
//       };
//     })
//     .filter((c) => c.email && ADMIN_LIST.indexOf(c.email.toLowerCase()) === -1)
//     .sort((a, b) => a.business_name.localeCompare(b.business_name));
// }

// export async function updateClientSettings(
//   userId: string,
//   input: { billing_region: string; subscription_status: string }
// ) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { error } = await svc
//     .from("profiles")
//     .update({
//       billing_region: input.billing_region,
//       subscription_status: input.subscription_status,
//     })
//     .eq("id", userId);
//   if (error) throw new Error(error.message);

//   // Mirror subscription_status into the tenant table — this is n8n's billing gate
//   await svc
//     .from("clients")
//     .update({ subscription_status: input.subscription_status, updated_at: new Date().toISOString() })
//     .eq("id", userId);

//   revalidatePath("/app/dashboard");
//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// /* THE go-live switch: paste the Phone Number ID from Meta after registering the line */
// export async function setClientPhoneNumberId(userId: string, phoneNumberId: string | null) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const value = phoneNumberId && phoneNumberId.trim() ? phoneNumberId.trim() : null;

//   const { data, error } = await svc
//     .from("clients")
//     .update({ whatsapp_phone_number_id: value, updated_at: new Date().toISOString() })
//     .eq("id", userId)
//     .select("id");
//   if (error) throw new Error(error.message);

//   if (!data || data.length === 0) {
//     // client hasn't finished onboarding yet — create a minimal row
//     const { error: upErr } = await svc
//       .from("clients")
//       .upsert({ id: userId, whatsapp_phone_number_id: value }, { onConflict: "id" });
//     if (upErr) throw new Error(upErr.message);
//   }

//   revalidatePath("/app/dashboard");
//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// export async function createClientAccount(input: {
//   email: string; password: string; business_name: string; billing_region: string;
// }) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const { data, error } = await svc.auth.admin.createUser({
//     email: input.email,
//     password: input.password,
//     email_confirm: true,
//     user_metadata: {
//       full_name: input.business_name,
//       business_name: input.business_name,
//       billing_region: input.billing_region,
//     },
//   });
//   if (error) throw new Error(error.message);

//   if (data.user) {
//     await svc.from("profiles")
//       .update({ subscription_status: "active", plan: "pro" })
//       .eq("id", data.user.id)
//       .then(() => {}).catch(() => {});
//   }
//   revalidatePath("/app/dashboard");
//   return { ok: true, userId: (data.user && data.user.id) || undefined };
// }

// export async function runSimulationForClient(userId: string) {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const day = 86400000;
//   const now = Date.now();
//   const appts = [
//     { client_id: userId, customer_name: "Sim: Olivia Hart", appointment_time: new Date(now + 2 * day).toISOString(), status: "confirmed", timezone: "America/New_York", value: 140, recovered_from_waitlist: false },
//     { client_id: userId, customer_name: "Sim: Daniel Cho", appointment_time: new Date(now + 3 * day).toISOString(), status: "cancelled", timezone: "America/New_York", value: 180, recovered_from_waitlist: false },
//     { client_id: userId, customer_name: "Sim: Priya Nair", appointment_time: new Date(now + 4 * day).toISOString(), status: "confirmed", timezone: "Asia/Karachi", value: 220, recovered_from_waitlist: true },
//     { client_id: userId, customer_name: "Sim: Marco Rossi", appointment_time: new Date(now - 1 * day).toISOString(), status: "confirmed", timezone: "Europe/Rome", value: 160, recovered_from_waitlist: true },
//   ];
//   const { error } = await svc.from("appointments").insert(appts);
//   if (error) throw new Error(error.message);

//   await svc.from("reminders").insert([
//     { client_id: userId, message: "24h reminder sent for Sim: Olivia Hart - appointment in 2 days", sent_at: new Date().toISOString() },
//     { client_id: userId, message: "Waitlist recovery: offered a cancelled slot to Sim: Priya Nair", sent_at: new Date(now - 3600000).toISOString() },
//   ]).then(() => {}).catch(() => {});

//   revalidatePath("/app/clients/" + userId);
//   return { ok: true };
// }

// export async function getAdminStatsForClient(userId: string, period: "week" | "month") {
//   await requireAdmin();
//   const svc = createServiceClient();
//   const limit = new Date();
//   limit.setDate(limit.getDate() - (period === "week" ? 7 : 30));
//   const { data } = await svc
//     .from("appointments")
//     .select("status, value, recovered_from_waitlist")
//     .eq("client_id", userId)
//     .gte("appointment_time", limit.toISOString());

//   const a = data || [];
//   return {
//     handled: a.length,
//     confirmed: a.filter((x: any) => x.status === "confirmed").length,
//     cancelled: a.filter((x: any) => x.status === "cancelled").length,
//     recovered: a.filter((x: any) => x.recovered_from_waitlist).length,
//     revenueSaved: a
//       .filter((x: any) => x.recovered_from_waitlist)
//       .reduce((s: number, x: any) => s + (Number(x.value) || 0), 0),
//   };
// }


// "use server";

// import { revalidatePath } from "next/cache";
// import { createClient } from "@/lib/supabase/server";
// import {
//   createServiceClient,
//   createAuthAdminClient,
// } from "@/lib/supabase/service";
// import { isAdminEmail } from "@/lib/admin/roles";

// export type AdminClient = {
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
// };

// const ADMIN_LIST = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
//   .split(",")
//   .map((email) => email.trim().toLowerCase())
//   .filter(Boolean);

// async function currentUserEmail(): Promise<string | null> {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getUser();

//   return data.user?.email ?? null;
// }

// export async function requireAdmin(): Promise<string> {
//   const email = await currentUserEmail();

//   if (!email || !isAdminEmail(email)) {
//     throw new Error("Admin access required");
//   }

//   return email;
// }

// export async function listClients(): Promise<AdminClient[]> {
//   await requireAdmin();

//   const svc = createServiceClient();

//   const { data: profiles, error } = await svc
//     .from("profiles")
//     .select(
//       "id, full_name, business_name, billing_region, subscription_status"
//     );

//   if (error) {
//     throw new Error(error.message);
//   }

//   const { data: tenantRows, error: tenantError } = await svc
//     .from("clients")
//     .select(
//       "id, whatsapp_phone_number_id, phone_provisioning, timezone, owner_whatsapp"
//     );

//   if (tenantError) {
//     throw new Error(tenantError.message);
//   }

//   const tenantById = new Map<string, any>(
//     (tenantRows || []).map((tenant: any) => [tenant.id, tenant])
//   );

//   const auth = createAuthAdminClient();

//   const { data: users, error: userError } = await auth
//     .from("users")
//     .select("id, email");

//   if (userError) {
//     throw new Error(userError.message);
//   }

//   const emailById = new Map<string, string>(
//     (users || []).map((user: any) => [user.id, user.email || ""])
//   );

//   const clients: AdminClient[] = (profiles || [])
//     .filter((profile: any) => Boolean(profile.business_name))
//     .map((profile: any): AdminClient => {
//       const tenant = tenantById.get(profile.id);

//       return {
//         id: profile.id,
//         email: emailById.get(profile.id) || "",
//         business_name: profile.business_name || "Unnamed business",
//         full_name: profile.full_name || null,
//         billing_region: profile.billing_region || "international",
//         subscription_status: profile.subscription_status || "inactive",
//         whatsapp_phone_number_id: tenant?.whatsapp_phone_number_id || null,
//         phone_option: tenant?.phone_provisioning?.option || null,
//         phone_number: tenant?.phone_provisioning?.phone_number || null,
//         phone_country: tenant?.phone_provisioning?.country || null,
//         timezone: tenant?.timezone || null,
//         owner_whatsapp: tenant?.owner_whatsapp || null,
//       };
//     })
//     .filter(
//       (client: AdminClient) =>
//         Boolean(client.email) &&
//         !ADMIN_LIST.includes(client.email.toLowerCase())
//     )
//     .sort((a: AdminClient, b: AdminClient) =>
//       a.business_name.localeCompare(b.business_name)
//     );

//   return clients;
// }

// export async function updateClientSettings(
//   userId: string,
//   input: {
//     billing_region: string;
//     subscription_status: string;
//   }
// ) {
//   await requireAdmin();

//   const svc = createServiceClient();

//   const { error } = await svc
//     .from("profiles")
//     .update({
//       billing_region: input.billing_region,
//       subscription_status: input.subscription_status,
//     })
//     .eq("id", userId);

//   if (error) {
//     throw new Error(error.message);
//   }

//   const { error: clientUpdateError } = await svc
//     .from("clients")
//     .update({
//       subscription_status: input.subscription_status,
//       updated_at: new Date().toISOString(),
//     })
//     .eq("id", userId);

//   if (clientUpdateError) {
//     throw new Error(clientUpdateError.message);
//   }

//   revalidatePath("/app/dashboard");
//   revalidatePath(`/app/clients/${userId}`);

//   return { ok: true };
// }

// export async function setClientPhoneNumberId(
//   userId: string,
//   phoneNumberId: string | null
// ) {
//   await requireAdmin();

//   const svc = createServiceClient();

//   const value =
//     phoneNumberId && phoneNumberId.trim() ? phoneNumberId.trim() : null;

//   const { data, error } = await svc
//     .from("clients")
//     .update({
//       whatsapp_phone_number_id: value,
//       updated_at: new Date().toISOString(),
//     })
//     .eq("id", userId)
//     .select("id");

//   if (error) {
//     throw new Error(error.message);
//   }

//   if (!data || data.length === 0) {
//     const { error: upsertError } = await svc.from("clients").upsert(
//       {
//         id: userId,
//         whatsapp_phone_number_id: value,
//       },
//       {
//         onConflict: "id",
//       }
//     );

//     if (upsertError) {
//       throw new Error(upsertError.message);
//     }
//   }

//   revalidatePath("/app/dashboard");
//   revalidatePath(`/app/clients/${userId}`);

//   return { ok: true };
// }

// export async function createClientAccount(input: {
//   email: string;
//   password: string;
//   business_name: string;
//   billing_region: string;
// }) {
//   await requireAdmin();

//   const svc = createServiceClient();

//   const { data, error } = await svc.auth.admin.createUser({
//     email: input.email,
//     password: input.password,
//     email_confirm: true,
//     user_metadata: {
//       full_name: input.business_name,
//       business_name: input.business_name,
//       billing_region: input.billing_region,
//     },
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   if (data.user) {
//     const { error: profileError } = await svc
//       .from("profiles")
//       .update({
//         subscription_status: "active",
//         plan: "pro",
//       })
//       .eq("id", data.user.id);

//     if (profileError) {
//       console.error("Could not update created user profile:", profileError);
//     }
//   }

//   revalidatePath("/app/dashboard");

//   return {
//     ok: true,
//     userId: data.user?.id,
//   };
// }

// export async function runSimulationForClient(userId: string) {
//   await requireAdmin();

//   const svc = createServiceClient();

//   const day = 86400000;
//   const now = Date.now();

//   const appointments = [
//     {
//       client_id: userId,
//       customer_name: "Sim: Olivia Hart",
//       appointment_time: new Date(now + 2 * day).toISOString(),
//       status: "confirmed",
//       timezone: "America/New_York",
//       value: 140,
//       recovered_from_waitlist: false,
//     },
//     {
//       client_id: userId,
//       customer_name: "Sim: Daniel Cho",
//       appointment_time: new Date(now + 3 * day).toISOString(),
//       status: "cancelled",
//       timezone: "America/New_York",
//       value: 180,
//       recovered_from_waitlist: false,
//     },
//     {
//       client_id: userId,
//       customer_name: "Sim: Priya Nair",
//       appointment_time: new Date(now + 4 * day).toISOString(),
//       status: "confirmed",
//       timezone: "Asia/Karachi",
//       value: 220,
//       recovered_from_waitlist: true,
//     },
//     {
//       client_id: userId,
//       customer_name: "Sim: Marco Rossi",
//       appointment_time: new Date(now - day).toISOString(),
//       status: "confirmed",
//       timezone: "Europe/Rome",
//       value: 160,
//       recovered_from_waitlist: true,
//     },
//   ];

//   const { error } = await svc.from("appointments").insert(appointments);

//   if (error) {
//     throw new Error(error.message);
//   }

//   const { error: reminderError } = await svc.from("reminders").insert([
//     {
//       client_id: userId,
//       message:
//         "24h reminder sent for Sim: Olivia Hart - appointment in 2 days",
//       sent_at: new Date().toISOString(),
//     },
//     {
//       client_id: userId,
//       message:
//         "Waitlist recovery: offered a cancelled slot to Sim: Priya Nair",
//       sent_at: new Date(now - 3600000).toISOString(),
//     },
//   ]);

//   if (reminderError) {
//     console.error("Could not create simulation reminders:", reminderError);
//   }

//   revalidatePath(`/app/clients/${userId}`);

//   return { ok: true };
// }

// export async function getAdminStatsForClient(
//   userId: string,
//   period: "week" | "month"
// ) {
//   await requireAdmin();

//   const svc = createServiceClient();

//   const limit = new Date();

//   limit.setDate(limit.getDate() - (period === "week" ? 7 : 30));

//   const { data, error } = await svc
//     .from("appointments")
//     .select("status, value, recovered_from_waitlist")
//     .eq("client_id", userId)
//     .gte("appointment_time", limit.toISOString());

//   if (error) {
//     throw new Error(error.message);
//   }

//   const appointments = data || [];

//   return {
//     handled: appointments.length,
//     confirmed: appointments.filter(
//       (appointment: any) => appointment.status === "confirmed"
//     ).length,
//     cancelled: appointments.filter(
//       (appointment: any) => appointment.status === "cancelled"
//     ).length,
//     recovered: appointments.filter(
//       (appointment: any) => appointment.recovered_from_waitlist
//     ).length,
//     revenueSaved: appointments
//       .filter((appointment: any) => appointment.recovered_from_waitlist)
//       .reduce(
//         (sum: number, appointment: any) =>
//           sum + (Number(appointment.value) || 0),
//         0
//       ),
//   };
// }




"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createServiceClient,
} from "@/lib/supabase/service";
import { isAdminEmail } from "@/lib/admin/roles";

export type AdminClient = {
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
};

const ADMIN_LIST = (process.env.ADMIN_EMAILS || "admin@xynetra.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

async function currentUserEmail(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return data.user?.email ?? null;
}

export async function requireAdmin(): Promise<string> {
  const email = await currentUserEmail();

  if (!email || !isAdminEmail(email)) {
    throw new Error("Admin access required");
  }

  return email;
}

export async function listClients(): Promise<AdminClient[]> {
  await requireAdmin();

  const svc = createServiceClient();

  const { data: profiles, error } = await svc
    .from("profiles")
    .select(
      "id, full_name, business_name, billing_region, subscription_status"
    );

  if (error) {
    throw new Error(error.message);
  }

  const { data: tenantRows, error: tenantError } = await svc
    .from("clients")
    .select(
      "id, whatsapp_phone_number_id, phone_provisioning, timezone, owner_whatsapp"
    );

  if (tenantError) {
    throw new Error(tenantError.message);
  }

  const tenantById = new Map<string, any>(
    (tenantRows || []).map((tenant: any) => [tenant.id, tenant])
  );

  // --- 🛠️ FIX APPLIED HERE 🛠️ ---
  // Using the secure Admin Auth API instead of querying the protected 'users' table directly
  const { data: authData, error: userError } = await svc.auth.admin.listUsers();

  if (userError) {
    throw new Error(userError.message);
  }

  const emailById = new Map<string, string>(
    (authData?.users || []).map((user: any) => [user.id, user.email || ""])
  );
  // -------------------------------

  const clients: AdminClient[] = (profiles || [])
    .filter((profile: any) => Boolean(profile.business_name))
    .map((profile: any): AdminClient => {
      const tenant = tenantById.get(profile.id);

      return {
        id: profile.id,
        email: emailById.get(profile.id) || "",
        business_name: profile.business_name || "Unnamed business",
        full_name: profile.full_name || null,
        billing_region: profile.billing_region || "international",
        subscription_status: profile.subscription_status || "inactive",
        whatsapp_phone_number_id: tenant?.whatsapp_phone_number_id || null,
        phone_option: tenant?.phone_provisioning?.option || null,
        phone_number: tenant?.phone_provisioning?.phone_number || null,
        phone_country: tenant?.phone_provisioning?.country || null,
        timezone: tenant?.timezone || null,
        owner_whatsapp: tenant?.owner_whatsapp || null,
      };
    })
    .filter(
      (client: AdminClient) =>
        Boolean(client.email) &&
        !ADMIN_LIST.includes(client.email.toLowerCase())
    )
    .sort((a: AdminClient, b: AdminClient) =>
      a.business_name.localeCompare(b.business_name)
    );

  return clients;
}

export async function updateClientSettings(
  userId: string,
  input: {
    billing_region: string;
    subscription_status: string;
  }
) {
  await requireAdmin();

  const svc = createServiceClient();

  const { error } = await svc
    .from("profiles")
    .update({
      billing_region: input.billing_region,
      subscription_status: input.subscription_status,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  const { error: clientUpdateError } = await svc
    .from("clients")
    .update({
      subscription_status: input.subscription_status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (clientUpdateError) {
    throw new Error(clientUpdateError.message);
  }

  revalidatePath("/app/dashboard");
  revalidatePath(`/app/clients/${userId}`);

  return { ok: true };
}

export async function setClientPhoneNumberId(
  userId: string,
  phoneNumberId: string | null
) {
  await requireAdmin();

  const svc = createServiceClient();

  const value =
    phoneNumberId && phoneNumberId.trim() ? phoneNumberId.trim() : null;

  const { data, error } = await svc
    .from("clients")
    .update({
      whatsapp_phone_number_id: value,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    const { error: upsertError } = await svc.from("clients").upsert(
      {
        id: userId,
        whatsapp_phone_number_id: value,
      },
      {
        onConflict: "id",
      }
    );

    if (upsertError) {
      throw new Error(upsertError.message);
    }
  }

  revalidatePath("/app/dashboard");
  revalidatePath(`/app/clients/${userId}`);

  return { ok: true };
}

export async function createClientAccount(input: {
  email: string;
  password: string;
  business_name: string;
  billing_region: string;
}) {
  await requireAdmin();

  const svc = createServiceClient();

  const { data, error } = await svc.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      full_name: input.business_name,
      business_name: input.business_name,
      billing_region: input.billing_region,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.user) {
    const { error: profileError } = await svc
      .from("profiles")
      .update({
        subscription_status: "active",
        plan: "pro",
      })
      .eq("id", data.user.id);

    if (profileError) {
      console.error("Could not update created user profile:", profileError);
    }
  }

  revalidatePath("/app/dashboard");

  return {
    ok: true,
    userId: data.user?.id,
  };
}

export async function runSimulationForClient(userId: string) {
  await requireAdmin();

  const svc = createServiceClient();

  const day = 86400000;
  const now = Date.now();

  const appointments = [
    {
      client_id: userId,
      customer_name: "Sim: Olivia Hart",
      appointment_time: new Date(now + 2 * day).toISOString(),
      status: "confirmed",
      timezone: "America/New_York",
      value: 140,
      recovered_from_waitlist: false,
    },
    {
      client_id: userId,
      customer_name: "Sim: Daniel Cho",
      appointment_time: new Date(now + 3 * day).toISOString(),
      status: "cancelled",
      timezone: "America/New_York",
      value: 180,
      recovered_from_waitlist: false,
    },
    {
      client_id: userId,
      customer_name: "Sim: Priya Nair",
      appointment_time: new Date(now + 4 * day).toISOString(),
      status: "confirmed",
      timezone: "Asia/Karachi",
      value: 220,
      recovered_from_waitlist: true,
    },
    {
      client_id: userId,
      customer_name: "Sim: Marco Rossi",
      appointment_time: new Date(now - day).toISOString(),
      status: "confirmed",
      timezone: "Europe/Rome",
      value: 160,
      recovered_from_waitlist: true,
    },
  ];

  const { error } = await svc.from("appointments").insert(appointments);

  if (error) {
    throw new Error(error.message);
  }

  const { error: reminderError } = await svc.from("reminders").insert([
    {
      client_id: userId,
      message:
        "24h reminder sent for Sim: Olivia Hart - appointment in 2 days",
      sent_at: new Date().toISOString(),
    },
    {
      client_id: userId,
      message:
        "Waitlist recovery: offered a cancelled slot to Sim: Priya Nair",
      sent_at: new Date(now - 3600000).toISOString(),
    },
  ]);

  if (reminderError) {
    console.error("Could not create simulation reminders:", reminderError);
  }

  revalidatePath(`/app/clients/${userId}`);

  return { ok: true };
}

export async function getAdminStatsForClient(
  userId: string,
  period: "week" | "month"
) {
  await requireAdmin();

  const svc = createServiceClient();

  const limit = new Date();

  limit.setDate(limit.getDate() - (period === "week" ? 7 : 30));

  const { data, error } = await svc
    .from("appointments")
    .select("status, value, recovered_from_waitlist")
    .eq("client_id", userId)
    .gte("appointment_time", limit.toISOString());

  if (error) {
    throw new Error(error.message);
  }

  const appointments = data || [];

  return {
    handled: appointments.length,
    confirmed: appointments.filter(
      (appointment: any) => appointment.status === "confirmed"
    ).length,
    cancelled: appointments.filter(
      (appointment: any) => appointment.status === "cancelled"
    ).length,
    recovered: appointments.filter(
      (appointment: any) => appointment.recovered_from_waitlist
    ).length,
    revenueSaved: appointments
      .filter((appointment: any) => appointment.recovered_from_waitlist)
      .reduce(
        (sum: number, appointment: any) =>
          sum + (Number(appointment.value) || 0),
        0
      ),
  };
}