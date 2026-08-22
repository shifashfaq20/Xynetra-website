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




import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAccount } from "@/lib/account";
import { isAdminEmail } from "@/lib/admin/roles";
import { createClient } from "@/lib/supabase/server";
import CheckoutView from "@/components/billing/CheckoutView";
import { CheckoutContinue } from "@/components/billing/CheckoutContinue";

export const metadata: Metadata = {
  title: "Checkout — Xynetra",
  description: "Complete your Xynetra plan with secure payment.",
};
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const account = (await getAccount())!;
  if (isAdminEmail(account.email)) redirect("/app/dashboard");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", account.userId)
    .single();

  // Already paid → go straight to setup
  if (profile?.subscription_status === "active") redirect("/onboarding");

  return (
    <div className="mx-auto max-w-2xl">
      <Suspense
        fallback={
          <div className="mx-auto max-w-xl px-6 py-24 text-neutral-500">
            Loading checkout…
          </div>
        }
      >
        <CheckoutView />
      </Suspense>

      {/* Manual check + silent 10s auto-poll → advances to /onboarding once paid */}
      <div className="px-6 pb-16">
        <CheckoutContinue />
        <p className="mt-4 text-center font-body text-xs text-ink/45">
          Trouble paying?{" "}
          <a href="mailto:support@xynetra.com" className="text-coral underline">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}


