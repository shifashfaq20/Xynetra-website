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



"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string; userId?: string };

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xynetra.com";

function checkEnv(): string | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
    return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_URL is missing.";
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim())
    return "Server misconfiguration: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.";
  return null;
}

/** Supabase sometimes returns an error whose `message` stringifies to "{}". */
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

    if (!email) return { error: "Work email is required." };
    if (!password) return { error: "Password is required." };
    if (password.length < 8) return { error: "Password must be at least 8 characters." };

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
        emailRedirectTo: `${APP_URL}/auth/callback?next=/app/checkout`,
      },
    });

    if (error) {
      return { error: authMessage("signUp.auth", error, "Sign-up failed. Please try again.") };
    }
    if (!data.user) return { error: "No user returned from Supabase." };

    // NOTE: `profiles` and `clients` rows are created by the
    // `on_auth_user_created` trigger. Do NOT upsert here — with email
    // confirmation enabled there is no session yet, so RLS would reject it.

    revalidatePath("/", "layout");

    return data.session
      ? { message: "Account created.", userId: data.user.id }
      : { message: "Account created. Check your email to confirm.", userId: data.user.id };
  } catch (err: any) {
    console.error("[XYNETRA] signUp.threw", {
      message: err?.message,
      code: err?.cause?.code,
      host: err?.cause?.hostname,
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
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { error: authMessage("signIn.auth", error, "Invalid email or password.") };
    }

    revalidatePath("/", "layout");
    return { message: "Login successful.", userId: data.user?.id };
  } catch (err: any) {
    console.error("[XYNETRA] signIn.threw", { message: err?.message, code: err?.cause?.code });
    return { error: err?.message && err.message !== "{}" ? err.message : "Server error during login." };
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
      redirectTo: `${APP_URL}/auth/callback?next=/reset-password/update`,
    });

    // Do not leak whether the address exists.
    if (error) authMessage("requestPasswordReset", error, "reset error");

    return { message: "If that email is registered, a reset link is on its way." };
  } catch (err: any) {
    console.error("[XYNETRA] requestPasswordReset.threw", err?.message);
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
    if (password.length < 8) return { error: "Password must be at least 8 characters." };

    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return { error: authMessage("updatePassword", error, "Could not update password.") };
    }

    revalidatePath("/", "layout");
    return { message: "Password updated." };
  } catch (err: any) {
    console.error("[XYNETRA] updatePassword.threw", err?.message);
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
}