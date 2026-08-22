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

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
  message?: string;
  userId?: string;
};

export async function signUp(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const businessName = formData.get("businessName") as string;
    const billingRegion = (formData.get("billingRegion") as string) || "international";
    const nextPath = (formData.get("next") as string) || "/app/checkout";

    if (!email || !password) {
      return { error: "Email and password are required." };
    }

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || "",
          business_name: businessName || "",
          billing_region: billingRegion,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "https://xynetra.com"}${nextPath}`,
      },
    });

    if (signUpError) {
      return { error: signUpError.message };
    }

    const user = authData.user;
    if (!user) {
      return { error: "Signup succeeded but user object is missing." };
    }

    // Create/update profile
    const { error: profileErr } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName || "",
      business_name: businessName || "",
      billing_region: billingRegion,
      subscription_status: "inactive",
      created_at: new Date().toISOString(),
    }, { onConflict: "id" });

    if (profileErr) {
      console.error("Profile upsert error:", profileErr.message);
      // Don't fail the signup if profile insert has issues, but return warning
      return { error: profileErr.message, userId: user.id };
    }

    return { message: "Account created. Check your email.", userId: user.id };
  } catch (err: any) {
    console.error("signUp crashed:", err);
    return { error: err.message || "An unexpected error occurred. Please try again." };
  }
}

export async function signIn(
  prevState: AuthState | undefined,
  formData: FormData
): Promise<AuthState> {
  try {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { error: "Email and password are required." };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { message: "Login successful.", userId: data.user?.id };
  } catch (err: any) {
    console.error("signIn crashed:", err);
    return { error: err.message || "Login failed. Please try again." };
  }
}