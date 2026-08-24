// import { Suspense } from "react";
// import type { Metadata } from "next";
// import CheckoutView from "@/components/billing/CheckoutView";

// export const metadata: Metadata = {
//   title: "Checkout — Xynetra",
//   description: "Complete your Xynetra plan with secure payment.",
// };

// export default function CheckoutPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="mx-auto max-w-xl px-6 py-24 text-neutral-500">
//           Loading checkout…
//         </div>
//       }
//     >
//       <CheckoutView />
//     </Suspense>
//   );
// }




// import { Suspense } from "react";
// import type { Metadata } from "next";
// import { redirect } from "next/navigation";
// import { getAccount } from "@/lib/account";
// import { isAdminEmail } from "@/lib/admin/roles";
// import { createClient } from "@/lib/supabase/server";
// import CheckoutView from "@/components/billing/CheckoutView";
// import { CheckoutContinue } from "@/components/billing/CheckoutContinue";

// export const metadata: Metadata = {
//   title: "Checkout — Xynetra",
//   description: "Complete your Xynetra plan with secure payment.",
// };
// export const dynamic = "force-dynamic";

// export default async function CheckoutPage() {
//   const account = (await getAccount())!;
//   if (isAdminEmail(account.email)) redirect("/app/dashboard");

//   const supabase = await createClient();
//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("subscription_status")
//     .eq("id", account.userId)
//     .single();

//   // Already paid → go straight to setup
//   if (profile?.subscription_status === "active") redirect("/onboarding");

//   return (
//     <div className="mx-auto max-w-2xl">
//       <Suspense
//         fallback={
//           <div className="mx-auto max-w-xl px-6 py-24 text-neutral-500">
//             Loading checkout…
//           </div>
//         }
//       >
//         <CheckoutView />
//       </Suspense>

//       {/* Manual check + silent 10s auto-poll → advances to /onboarding once paid */}
//       <div className="px-6 pb-16">
//         <CheckoutContinue />
//         <p className="mt-4 text-center font-body text-xs text-ink/45">
//           Trouble paying?{" "}
//           <a href="mailto:support@xynetra.com" className="text-coral underline">
//             Contact support
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



// import { Suspense } from "react";
// import type { Metadata } from "next";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { getAccount } from "@/lib/account";
// import { isAdminEmail } from "@/lib/admin/roles";
// import { createClient } from "@/lib/supabase/server";
// import CheckoutView from "@/components/billing/CheckoutView";
// import { CheckoutContinue } from "@/components/billing/CheckoutContinue";

// export const metadata: Metadata = {
//   title: "Checkout — Xynetra",
//   description: "Choose a plan and complete payment to unlock Xynetra.",
// };
// export const dynamic = "force-dynamic";

// export default async function CheckoutPage() {
//   const account = await getAccount();
//   if (!account) redirect("/login?next=/app/checkout");
//   if (isAdminEmail(account.email)) redirect("/app/dashboard");

//   const supabase = await createClient();
//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("subscription_status")
//     .eq("id", account.userId)
//     .maybeSingle();

//   // Already paid → setup wizard (not dashboard yet)
//   if (profile?.subscription_status === "active") {
//     redirect("/onboarding");
//   }

//   return (
//     <div className="mx-auto max-w-2xl">
//       <div className="px-6 pt-10 pb-2">
//         <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
//           Payment required
//         </p>
//         <h1 className="mt-2 font-display text-2xl font-bold text-ink">
//           Activate your account
//         </h1>
//         <p className="mt-2 font-body text-sm text-ink/60">
//           Choose a plan and complete checkout to unlock onboarding and your
//           client dashboard. You can&apos;t continue until payment succeeds.
//         </p>
//       </div>

//       <Suspense
//         fallback={
//           <div className="mx-auto max-w-xl px-6 py-24 text-neutral-500">
//             Loading checkout…
//           </div>
//         }
//       >
//         <CheckoutView />
//       </Suspense>

//       <div className="px-6 pb-16">
//         <CheckoutContinue />
//         <p className="mt-6 text-center font-body text-xs text-ink/45">
//           Need help?{" "}
//           <a href="mailto:support@xynetra.com" className="text-coral underline">
//             Contact support
//           </a>
//           {" · "}
//           <Link href="/pricing" className="underline">
//             View pricing
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAccount } from "@/lib/account";
import { isAdminEmail } from "@/lib/admin/roles";
import { createClient } from "@/lib/supabase/server";
import CheckoutView from "@/components/billing/CheckoutView";
import { CheckoutContinue } from "@/components/billing/CheckoutContinue";

export const metadata: Metadata = {
  title: "Checkout — Xynetra",
  description: "Choose a plan and complete payment to unlock Xynetra.",
};
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const account = await getAccount();
  if (!account) redirect("/login?next=/app/checkout");
  if (isAdminEmail(account.email)) redirect("/app/dashboard");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", account.userId)
    .maybeSingle();

  if (profile?.subscription_status === "active") {
    redirect("/onboarding");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="px-6 pt-10 pb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
          Payment required
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink">
          Activate your account
        </h1>
        <p className="mt-2 font-body text-sm text-ink/60">
          Pick a plan on pricing (if you haven&apos;t), then complete checkout.
          Onboarding and your client dashboard unlock only after payment.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="mx-auto max-w-xl px-6 py-24 text-neutral-500">
            Loading checkout…
          </div>
        }
      >
        <CheckoutView />
      </Suspense>

      <div className="px-6 pb-16">
        <CheckoutContinue />
        <p className="mt-6 text-center font-body text-xs text-ink/45">
          Need help?{" "}
          <a href="mailto:support@xynetra.com" className="text-coral underline">
            Contact support
          </a>
          {" · "}
          <Link href="/pricing" className="underline">
            View pricing
          </Link>
        </p>
      </div>
    </div>
  );
}