// "use server";

// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
// import { createClient } from "@/lib/supabase/server";

// export type AuthState = { error?: string; message?: string };

// const NOT_CONFIGURED =
//   "Authentication isn't connected yet. Add your Supabase keys to enable sign-in (see README).";

// function supabaseReady() {
//   return (
//     !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
//     !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
// }

// export async function signIn(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const next = String(formData.get("next") || "/app/dashboard");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) return { error: error.message };

//   redirect(next);
// }

// export async function signUp(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const fullName = String(formData.get("fullName") || "");
//   const businessName = String(formData.get("businessName") || "");
//   const billingRegion = String(formData.get("billingRegion") || "international");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback?next=/app/dashboard`,
//       data: {
//         full_name: fullName,
//         business_name: businessName,
//         billing_region: billingRegion,
//       },
//     },
//   });
//   if (error) return { error: error.message };

//   // If email confirmation is off, a session is returned immediately.
//   if (data.session) redirect("/app/dashboard");

//   return {
//     message:
//       "Check your email to confirm your account, then log in to reach your dashboard.",
//   };
// }

// export async function requestPasswordReset(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${origin}/auth/callback?next=/reset-password/update`,
//   });
//   if (error) return { error: error.message };
//   return {
//     message: "If that email has an account, we've sent a reset link. Check your inbox.",
//   };
// }

// export async function updatePassword(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const password = String(formData.get("password") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.updateUser({ password });
//   if (error) return { error: error.message };
//   redirect("/app/dashboard");
// }

// export async function signOut() {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   redirect("/login");
// }


// // src/lib/auth/actions.ts
// "use server";

// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
// import { createClient } from "@/lib/supabase/server";

// export type AuthState = { error?: string; message?: string };

// const NOT_CONFIGURED =
//   "Authentication isn't connected yet. Add your Supabase keys to enable sign-in (see README).";

// function supabaseReady() {
//   return (
//     !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
//     !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
// }

// export async function signIn(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const next = String(formData.get("next") || "/app/dashboard");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) return { error: error.message };

//   redirect(next);
// }

// export async function signUp(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const fullName = String(formData.get("fullName") || "");
//   const businessName = String(formData.get("businessName") || "");
//   const billingRegion = String(formData.get("billingRegion") || "international");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback?next=/app/dashboard`,
//       data: {
//         full_name: fullName,
//         business_name: businessName,
//         billing_region: billingRegion,
//       },
//     },
//   });
//   if (error) return { error: error.message };

//   // If email confirmation is off, a session is returned immediately.
//   if (data.session) redirect("/app/dashboard");

//   return {
//     message:
//       "Check your email to confirm your account, then log in to reach your dashboard.",
//   };
// }

// export async function requestPasswordReset(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${origin}/auth/callback?next=/reset-password/update`,
//   });
//   if (error) return { error: error.message };
//   return {
//     message:
//       "If that email has an account, we've sent a reset link. Check your inbox.",
//   };
// }

// export async function updatePassword(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const password = String(formData.get("password") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.updateUser({ password });
//   if (error) return { error: error.message };
//   redirect("/app/dashboard");
// }

// export async function signOut() {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   redirect("/login");
// }


// // src/lib/auth/actions.ts
// "use server";

// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
// import { createClient } from "@/lib/supabase/server";

// export type AuthState = { error?: string; message?: string };

// const NOT_CONFIGURED =
//   "Authentication isn't connected yet. Add your Supabase keys to enable sign-in (see README).";

// function supabaseReady() {
//   return (
//     !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
//     !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
// }

// export async function signIn(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const next = String(formData.get("next") || "/app/dashboard");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) return { error: error.message };

//   redirect(next);
// }

// export async function signUp(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const fullName = String(formData.get("fullName") || "");
//   const businessName = String(formData.get("businessName") || "");
//   const billingRegion = String(formData.get("billingRegion") || "international");

//   // Carry the checkout destination through signup
//   const plan = String(formData.get("plan") || "");
//   const billing = String(formData.get("billing") || "monthly");
//   const next = plan
//     ? `/app/checkout?plan=${plan}&billing=${billing}`
//     : String(formData.get("next") || "/app/checkout");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       // After email confirmation, land on checkout (not dashboard)
//       emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
//         next
//       )}`,
//       data: {
//         full_name: fullName,
//         business_name: businessName,
//         billing_region: billingRegion,
//       },
//     },
//   });
//   if (error) return { error: error.message };

//   // If email confirmation is off, a session is returned immediately.
//   if (data.session) redirect(next);

//   return {
//     message:
//       "Check your email to confirm your account, then log in to continue to checkout.",
//   };
// }

// export async function requestPasswordReset(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${origin}/auth/callback?next=/reset-password/update`,
//   });
//   if (error) return { error: error.message };
//   return {
//     message:
//       "If that email has an account, we've sent a reset link. Check your inbox.",
//   };
// }

// export async function updatePassword(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const password = String(formData.get("password") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.updateUser({ password });
//   if (error) return { error: error.message };
//   redirect("/app/dashboard");
// }

// export async function signOut() {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   redirect("/login");
// }


// // src/lib/auth/actions.ts
// "use server";

// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
// import { createClient } from "@/lib/supabase/server";

// export type AuthState = { error?: string; message?: string };

// const NOT_CONFIGURED =
//   "Authentication isn't connected yet. Add your Supabase keys to enable sign-in (see README).";

// function supabaseReady() {
//   return (
//     !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
//     !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
// }

// export async function signIn(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const next = String(formData.get("next") || "/app/dashboard");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) return { error: error.message };

//   redirect(next);
// }

// export async function signUp(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   const password = String(formData.get("password") || "");
//   const fullName = String(formData.get("fullName") || "");
//   const businessName = String(formData.get("businessName") || "");
//   const billingRegion = String(formData.get("billingRegion") || "international");

//   const plan = String(formData.get("plan") || "");
//   const billing = String(formData.get("billing") || "monthly");
//   const next = plan
//     ? `/app/checkout?plan=${plan}&billing=${billing}`
//     : String(formData.get("next") || "/app/checkout");

//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
//         next
//       )}`,
//       data: {
//         full_name: fullName,
//         business_name: businessName,
//         billing_region: billingRegion,
//       },
//     },
//   });
//   if (error) return { error: error.message || "Sign up failed." };

//   // If no confirmation required (email_confirm off), session exists immediately
//   if (data.session) redirect(next);

//   return {
//     message:
//       "Check your email to confirm your account, then log in to continue to checkout.",
//   };
// }

// export async function requestPasswordReset(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const email = String(formData.get("email") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const origin = (await headers()).get("origin") ?? "";
//   const supabase = await createClient();
//   const { error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo: `${origin}/auth/callback?next=/reset-password/update`,
//   });
//   if (error) return { error: error.message };
//   return {
//     message:
//       "If that email has an account, we've sent a reset link. Check your inbox.",
//   };
// }

// export async function updatePassword(
//   _prev: AuthState,
//   formData: FormData
// ): Promise<AuthState> {
//   const password = String(formData.get("password") || "");
//   if (!supabaseReady()) return { error: NOT_CONFIGURED };
//   const supabase = await createClient();
//   const { error } = await supabase.auth.updateUser({ password });
//   if (error) return { error: error.message };
//   redirect("/app/dashboard");
// }

// export async function signOut() {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
//   redirect("/login");
// }



// "use server";

// import { revalidatePath } from "next/cache";
// import { createClient } from "@/lib/supabase/server";

// export type AuthState = {
//   error?: string;
//   message?: string;
//   userId?: string;
//   /** true when user must click the email link before login */
//   needsEmailConfirmation?: boolean;
// };

// const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xynetra.com";

// function checkEnv(): string | null {
//   if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
//     return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_URL is missing.";
//   if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim())
//     return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.";
//   return null;
// }

// /** Supabase sometimes returns an error whose `message` stringifies to "{}". */
// function authMessage(scope: string, error: any, fallback: string): string {
//   console.error(
//     `[XYNETRA] ${scope}`,
//     JSON.stringify({
//       message: error?.message,
//       status: error?.status,
//       code: error?.code,
//       name: error?.name,
//     })
//   );
//   const m = error?.message;
//   if (!m || m === "{}" || m === "[object Object]") {
//     return error?.status ? `${fallback} (status ${error.status})` : fallback;
//   }
//   return m;
// }

// function str(fd: FormData, key: string): string {
//   const v = fd.get(key);
//   return typeof v === "string" ? v.trim() : "";
// }

// function isUnconfirmedLoginError(error: any): boolean {
//   const msg = String(error?.message ?? "").toLowerCase();
//   const code = String(error?.code ?? "").toLowerCase();
//   return (
//     code === "email_not_confirmed" ||
//     msg.includes("email not confirmed") ||
//     msg.includes("not confirmed")
//   );
// }

// export async function signUp(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const email = str(formData, "email").toLowerCase();
//     const password = String(formData.get("password") ?? "");
//     const fullName = str(formData, "fullName");
//     const businessName = str(formData, "businessName");
//     const rawRegion = str(formData, "billingRegion");
//     const billingRegion = ["international", "pakistan"].includes(rawRegion)
//       ? rawRegion
//       : "international";
//     const next = str(formData, "next") || "/app/checkout";

//     if (!email) return { error: "Work email is required." };
//     if (!password) return { error: "Password is required." };
//     if (password.length < 8) return { error: "Password must be at least 8 characters." };

//     const supabase = await createClient();

//     // After Confirm email is ON in Supabase, signUp returns user without session
//     // and sends the confirmation email automatically.
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: fullName,
//           business_name: businessName,
//           billing_region: billingRegion,
//         },
//         emailRedirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent(next)}`,
//       },
//     });

//     if (error) {
//       return { error: authMessage("signUp.auth", error, "Sign-up failed. Please try again.") };
//     }
//     if (!data.user) return { error: "No user returned from Supabase." };

//     // NOTE: profiles + clients are created by on_auth_user_created trigger.
//     // Do NOT upsert here — with email confirmation there is often no session yet (RLS).

//     revalidatePath("/", "layout");

//     // If Confirm email is ON → no session → user must confirm first.
//     // If Confirm email is OFF → session exists → they can continue immediately.
//     if (!data.session) {
//       return {
//         message:
//           "Account created. Check your email and click the confirmation link before logging in.",
//         userId: data.user.id,
//         needsEmailConfirmation: true,
//       };
//     }

//     // Session present (confirm email disabled in project settings)
//     return {
//       message: "Account created. You can continue.",
//       userId: data.user.id,
//       needsEmailConfirmation: false,
//     };
//   } catch (err: any) {
//     console.error("[XYNETRA] signUp.threw", {
//       message: err?.message,
//       code: err?.cause?.code,
//       host: err?.cause?.hostname,
//     });
//     return {
//       error: err?.cause?.code
//         ? `Could not reach the auth service (${err.cause.code}).`
//         : err?.message && err.message !== "{}"
//           ? err.message
//           : "Server error during signup.",
//     };
//   }
// }

// export async function signIn(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const email = str(formData, "email").toLowerCase();
//     const password = String(formData.get("password") ?? "");
//     if (!email || !password) return { error: "Email and password required." };

//     const supabase = await createClient();
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       if (isUnconfirmedLoginError(error)) {
//         return {
//           error:
//             "Please confirm your email before logging in. Check your inbox for the confirmation link.",
//           needsEmailConfirmation: true,
//         };
//       }
//       return { error: authMessage("signIn.auth", error, "Invalid email or password.") };
//     }

//     revalidatePath("/", "layout");
//     return { message: "Login successful.", userId: data.user?.id };
//   } catch (err: any) {
//     console.error("[XYNETRA] signIn.threw", { message: err?.message, code: err?.cause?.code });
//     return {
//       error:
//         err?.message && err.message !== "{}" ? err.message : "Server error during login.",
//     };
//   }
// }

// export async function requestPasswordReset(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const email = str(formData, "email").toLowerCase();
//     if (!email) return { error: "Email required." };

//     const supabase = await createClient();
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent("/reset-password/update")}`,
//     });

//     // Do not leak whether the address exists.
//     if (error) authMessage("requestPasswordReset", error, "reset error");

//     return { message: "If that email is registered, a reset link is on its way." };
//   } catch (err: any) {
//     console.error("[XYNETRA] requestPasswordReset.threw", err?.message);
//     return { message: "If that email is registered, a reset link is on its way." };
//   }
// }

// export async function updatePassword(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const password = String(formData.get("password") ?? "");
//     if (password.length < 8) return { error: "Password must be at least 8 characters." };

//     const supabase = await createClient();
//     const { error } = await supabase.auth.updateUser({ password });

//     if (error) {
//       return { error: authMessage("updatePassword", error, "Could not update password.") };
//     }

//     revalidatePath("/", "layout");
//     return { message: "Password updated." };
//   } catch (err: any) {
//     console.error("[XYNETRA] updatePassword.threw", err?.message);
//     return { error: "Server error while updating password." };
//   }
// }

// export async function signOut(): Promise<void> {
//   try {
//     const supabase = await createClient();
//     await supabase.auth.signOut();
//   } catch (err: any) {
//     console.error("[XYNETRA] signOut", err?.message);
//   }
//   revalidatePath("/", "layout");
// }



// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server";

// export type AuthState = {
//   error?: string;
//   message?: string;
//   userId?: string;
//   /** true when user must click the email link before login */
//   needsEmailConfirmation?: boolean;
// };

// const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xynetra.com";

// function checkEnv(): string | null {
//   if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
//     return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_URL is missing.";
//   if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim())
//     return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.";
//   return null;
// }

// /** Supabase sometimes returns an error whose `message` stringifies to "{}". */
// function authMessage(scope: string, error: any, fallback: string): string {
//   console.error(
//     `[XYNETRA] ${scope}`,
//     JSON.stringify({
//       message: error?.message,
//       status: error?.status,
//       code: error?.code,
//       name: error?.name,
//     })
//   );
//   const m = error?.message;
//   if (!m || m === "{}" || m === "[object Object]") {
//     return error?.status ? `${fallback} (status ${error.status})` : fallback;
//   }
//   return m;
// }

// function str(fd: FormData, key: string): string {
//   const v = fd.get(key);
//   return typeof v === "string" ? v.trim() : "";
// }

// function safePath(raw: string, fallback = "/app/dashboard"): string {
//   if (!raw) return fallback;
//   // block open redirects (only allow same-origin relative paths)
//   if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;
//   return raw;
// }

// function isUnconfirmedLoginError(error: any): boolean {
//   const msg = String(error?.message ?? "").toLowerCase();
//   const code = String(error?.code ?? "").toLowerCase();
//   return (
//     code === "email_not_confirmed" ||
//     msg.includes("email not confirmed") ||
//     msg.includes("not confirmed")
//   );
// }

// export async function signUp(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const email = str(formData, "email").toLowerCase();
//     const password = String(formData.get("password") ?? "");
//     const fullName = str(formData, "fullName");
//     const businessName = str(formData, "businessName");
//     const rawRegion = str(formData, "billingRegion");
//     const billingRegion = ["international", "pakistan"].includes(rawRegion)
//       ? rawRegion
//       : "international";
//     const next = safePath(str(formData, "next"), "/app/checkout");

//     if (!email) return { error: "Work email is required." };
//     if (!password) return { error: "Password is required." };
//     if (password.length < 8) return { error: "Password must be at least 8 characters." };

//     const supabase = await createClient();

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: fullName,
//           business_name: businessName,
//           billing_region: billingRegion,
//         },
//         emailRedirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent(next)}`,
//       },
//     });

//     if (error) {
//       return { error: authMessage("signUp.auth", error, "Sign-up failed. Please try again.") };
//     }
//     if (!data.user) return { error: "No user returned from Supabase." };

//     // profiles + clients come from on_auth_user_created trigger — do not upsert here.

//     revalidatePath("/", "layout");

//     if (!data.session) {
//       return {
//         message:
//           "Account created. Check your email and click the confirmation link before logging in.",
//         userId: data.user.id,
//         needsEmailConfirmation: true,
//       };
//     }

//     // Confirm email is OFF — session exists; send them into the app
//     redirect(next);
//   } catch (err: any) {
//     // redirect() throws a special error — rethrow it
//     if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;

//     console.error("[XYNETRA] signUp.threw", {
//       message: err?.message,
//       code: err?.cause?.code,
//       host: err?.cause?.hostname,
//     });
//     return {
//       error: err?.cause?.code
//         ? `Could not reach the auth service (${err.cause.code}).`
//         : err?.message && err.message !== "{}"
//           ? err.message
//           : "Server error during signup.",
//     };
//   }
// }

// export async function signIn(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const email = str(formData, "email").toLowerCase();
//     const password = String(formData.get("password") ?? "");
//     const next = safePath(str(formData, "next"), "/app/dashboard");

//     if (!email || !password) return { error: "Email and password required." };

//     const supabase = await createClient();
//     const { error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       if (isUnconfirmedLoginError(error)) {
//         return {
//           error:
//             "Please confirm your email before logging in. Check your inbox for the confirmation link.",
//           needsEmailConfirmation: true,
//         };
//       }
//       return { error: authMessage("signIn.auth", error, "Invalid email or password.") };
//     }

//     revalidatePath("/", "layout");

//     // Critical: actually leave /login and enter the app
//     redirect(next);
//   } catch (err: any) {
//     // redirect() throws a special error — rethrow it
//     if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;

//     console.error("[XYNETRA] signIn.threw", { message: err?.message, code: err?.cause?.code });
//     return {
//       error:
//         err?.message && err.message !== "{}" ? err.message : "Server error during login.",
//     };
//   }
// }

// export async function requestPasswordReset(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const email = str(formData, "email").toLowerCase();
//     if (!email) return { error: "Email required." };

//     const supabase = await createClient();
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent("/reset-password/update")}`,
//     });

//     if (error) authMessage("requestPasswordReset", error, "reset error");

//     return { message: "If that email is registered, a reset link is on its way." };
//   } catch (err: any) {
//     console.error("[XYNETRA] requestPasswordReset.threw", err?.message);
//     return { message: "If that email is registered, a reset link is on its way." };
//   }
// }

// export async function updatePassword(
//   _prev: AuthState | undefined,
//   formData: FormData
// ): Promise<AuthState> {
//   try {
//     const envErr = checkEnv();
//     if (envErr) return { error: envErr };

//     const password = String(formData.get("password") ?? "");
//     if (password.length < 8) return { error: "Password must be at least 8 characters." };

//     const supabase = await createClient();
//     const { error } = await supabase.auth.updateUser({ password });

//     if (error) {
//       return { error: authMessage("updatePassword", error, "Could not update password.") };
//     }

//     revalidatePath("/", "layout");
//     redirect("/app/dashboard");
//   } catch (err: any) {
//     if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;
//     console.error("[XYNETRA] updatePassword.threw", err?.message);
//     return { error: "Server error while updating password." };
//   }
// }

// export async function signOut(): Promise<void> {
//   try {
//     const supabase = await createClient();
//     await supabase.auth.signOut();
//   } catch (err: any) {
//     console.error("[XYNETRA] signOut", err?.message);
//   }
//   revalidatePath("/", "layout");
//   redirect("/login");
// }



"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/roles";

export type AuthState = {
  error?: string;
  message?: string;
  userId?: string;
  needsEmailConfirmation?: boolean;
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xynetra.com";

function checkEnv(): string | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
    return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_URL is missing.";
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim())
    return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.";
  return null;
}

function authMessage(scope: string, error: any, fallback: string): string {
  console.error(
    `[XYNETRA] ${scope}`,
    JSON.stringify({
      message: error?.message,
      status: error?.status,
      code: error?.code,
      name: error?.name,
    })
  );
  const m = error?.message;
  if (!m || m === "{}" || m === "[object Object]") {
    return error?.status ? `${fallback} (status ${error.status})` : fallback;
  }
  return m;
}

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function safePath(raw: string, fallback = "/app/checkout"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
}

function isUnconfirmedLoginError(error: any): boolean {
  const msg = String(error?.message ?? "").toLowerCase();
  const code = String(error?.code ?? "").toLowerCase();
  return (
    code === "email_not_confirmed" ||
    msg.includes("email not confirmed") ||
    msg.includes("not confirmed")
  );
}

export async function signUp(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const envErr = checkEnv();
    if (envErr) return { error: envErr };

    const email = str(formData, "email").toLowerCase();
    const password = String(formData.get("password") ?? "");
    const fullName = str(formData, "fullName");
    const businessName = str(formData, "businessName");
    const rawRegion = str(formData, "billingRegion");
    const billingRegion = ["international", "pakistan"].includes(rawRegion)
      ? rawRegion
      : "international";
    // Prefer checkout after confirm
    const next = safePath(str(formData, "next"), "/app/checkout");

    if (!email) return { error: "Work email is required." };
    if (!password) return { error: "Password is required." };
    if (password.length < 8)
      return { error: "Password must be at least 8 characters." };

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          business_name: businessName,
          billing_region: billingRegion,
        },
        emailRedirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      return {
        error: authMessage("signUp.auth", error, "Sign-up failed. Please try again."),
      };
    }
    if (!data.user) return { error: "No user returned from Supabase." };

    revalidatePath("/", "layout");

    if (!data.session) {
      return {
        message:
          "Account created. Check your email and click the confirmation link before logging in.",
        userId: data.user.id,
        needsEmailConfirmation: true,
      };
    }

    redirect("/app/checkout");
  } catch (err: any) {
    if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;
    console.error("[XYNETRA] signUp.threw", {
      message: err?.message,
      code: err?.cause?.code,
    });
    return {
      error: err?.cause?.code
        ? `Could not reach the auth service (${err.cause.code}).`
        : err?.message && err.message !== "{}"
          ? err.message
          : "Server error during signup.",
    };
  }
}

export async function signIn(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const envErr = checkEnv();
    if (envErr) return { error: envErr };

    const email = str(formData, "email").toLowerCase();
    const password = String(formData.get("password") ?? "");
    if (!email || !password) return { error: "Email and password required." };

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (isUnconfirmedLoginError(error)) {
        return {
          error:
            "Please confirm your email before logging in. Check your inbox for the confirmation link.",
          needsEmailConfirmation: true,
        };
      }
      return {
        error: authMessage("signIn.auth", error, "Invalid email or password."),
      };
    }

    revalidatePath("/", "layout");

    if (data.user?.email && isAdminEmail(data.user.email)) {
      redirect("/app/dashboard");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status, onboarding_completed_at")
      .eq("id", data.user!.id)
      .maybeSingle();

    // Unpaid → checkout (message or Paddle)
    if (profile?.subscription_status !== "active") {
      redirect("/app/checkout");
    }

    let onboarded = Boolean(profile?.onboarding_completed_at);
    if (!onboarded) {
      const { data: ob } = await supabase
        .from("onboarding")
        .select("completed_at")
        .eq("user_id", data.user!.id)
        .maybeSingle();
      onboarded = Boolean(ob?.completed_at);
    }
    if (!onboarded) redirect("/onboarding");

    redirect("/app/dashboard");
  } catch (err: any) {
    if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;
    console.error("[XYNETRA] signIn.threw", { message: err?.message });
    return {
      error:
        err?.message && err.message !== "{}"
          ? err.message
          : "Server error during login.",
    };
  }
}

export async function requestPasswordReset(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const envErr = checkEnv();
    if (envErr) return { error: envErr };

    const email = str(formData, "email").toLowerCase();
    if (!email) return { error: "Email required." };

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${APP_URL}/auth/callback?next=${encodeURIComponent("/reset-password/update")}`,
    });
    if (error) authMessage("requestPasswordReset", error, "reset error");
    return { message: "If that email is registered, a reset link is on its way." };
  } catch {
    return { message: "If that email is registered, a reset link is on its way." };
  }
}

export async function updatePassword(
  _prev: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const envErr = checkEnv();
    if (envErr) return { error: envErr };

    const password = String(formData.get("password") ?? "");
    if (password.length < 8)
      return { error: "Password must be at least 8 characters." };

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return {
        error: authMessage("updatePassword", error, "Could not update password."),
      };
    }
    revalidatePath("/", "layout");
    redirect("/app/dashboard");
  } catch (err: any) {
    if (err?.digest?.startsWith?.("NEXT_REDIRECT")) throw err;
    return { error: "Server error while updating password." };
  }
}

export async function signOut(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err: any) {
    console.error("[XYNETRA] signOut", err?.message);
  }
  revalidatePath("/", "layout");
  redirect("/login");
}