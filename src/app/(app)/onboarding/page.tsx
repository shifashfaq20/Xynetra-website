// // src/app/(app)/onboarding/page.tsx
// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { OnboardingWizard } from './OnboardingWizard'

// export default async function OnboardingPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ step?: string; gcal?: string; error?: string }>
// }) {
//   const supabase = await createClient()
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   // Check subscription
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('subscription_status, billing_region, business_name')
//     .eq('id', user.id)
//     .single()

//   if (!profile || profile.subscription_status !== 'active') {
//     redirect('/pricing')
//   }

//   // If onboarding is already completed, go to dashboard
//   const { data: onboarding } = await supabase
//     .from('onboarding')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   if (onboarding?.completed_at) {
//     redirect('/app/dashboard')
//   }

//   const params = await searchParams

//   return (
//     <OnboardingWizard
//       onboarding={onboarding}
//       profile={profile}
//       userEmail={user.email!}
//       urlStep={params.step ? parseInt(params.step, 10) : undefined}
//       gcalConnected={params.gcal === 'connected'}
//       urlError={params.error}
//     />
//   )
// }


// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { OnboardingWizard } from './OnboardingWizard'

// export default async function OnboardingPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ step?: string; gcal?: string; error?: string }>
// }) {
//   const supabase = await createClient()
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   // Billing gate — pay first, then set up
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('subscription_status, billing_region, business_name')
//     .eq('id', user.id)
//     .single()

//   if (!profile || profile.subscription_status !== 'active') {
//     redirect('/app/checkout')
//   }

//   // If onboarding is already completed, go to dashboard
//   const { data: onboarding } = await supabase
//     .from('onboarding')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   if (onboarding?.completed_at) {
//     redirect('/app/dashboard')
//   }

//   const params = await searchParams

//   return (
//     <OnboardingWizard
//       onboarding={onboarding}
//       profile={profile}
//       userEmail={user.email!}
//       urlStep={params.step ? parseInt(params.step, 10) : undefined}
//       gcalConnected={params.gcal === 'connected'}
//       urlError={params.error}
//     />
//   )
// }




// import { redirect } from 'next/navigation'
// import { createClient } from '@/lib/supabase/server'
// import { OnboardingWizard } from './OnboardingWizard'

// export default async function OnboardingPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ step?: string; gcal?: string; error?: string }>
// }) {
//   const supabase = await createClient()
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   if (!user) redirect('/login')

//   let profile: any = null
//   try {
//     const { data } = await supabase
//       .from('profiles')
//       .select('subscription_status, billing_region, business_name')
//       .eq('id', user.id)
//       .single()
//     profile = data
//   } catch {
//     profile = null
//   }

//   if (!profile || profile.subscription_status !== 'active') {
//     redirect('/app/checkout')
//   }

//   let onboarding: any = null
//   try {
//     const { data } = await supabase
//       .from('onboarding')
//       .select('*')
//       .eq('user_id', user.id)
//       .single()
//     onboarding = data
//   } catch {
//     onboarding = null
//   }

//   if (onboarding?.completed_at) {
//     redirect('/app/dashboard')
//   }

//   const params = await searchParams

//   return (
//     <OnboardingWizard
//       onboarding={onboarding}
//       profile={profile}
//       userEmail={user.email!}
//       urlStep={params.step ? parseInt(params.step, 10) : undefined}
//       gcalConnected={params.gcal === 'connected'}
//       urlError={params.error}
//     />
//   )
// }



import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/roles";
import { OnboardingWizard } from "./OnboardingWizard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; gcal?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/onboarding");
  if (user.email && isAdminEmail(user.email)) redirect("/app/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, billing_region, business_name, onboarding_completed_at")
    .eq("id", user.id)
    .maybeSingle();

  // Must pay before setup
  if (!profile || profile.subscription_status !== "active") {
    redirect("/app/checkout");
  }

  // Already finished → dashboard
  if (profile.onboarding_completed_at) {
    redirect("/app/dashboard");
  }

  const { data: onboarding } = await supabase
    .from("onboarding")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (onboarding?.completed_at) {
    redirect("/app/dashboard");
  }

  const params = await searchParams;
  const urlStep = params.step ? parseInt(params.step, 10) : undefined;

  return (
    <OnboardingWizard
      onboarding={onboarding}
      profile={profile}
      userEmail={user.email ?? ""}
      urlStep={Number.isFinite(urlStep) ? urlStep : undefined}
      gcalConnected={params.gcal === "connected"}
      urlError={params.error}
    />
  );
}