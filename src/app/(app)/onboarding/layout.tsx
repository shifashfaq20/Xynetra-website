import { redirect } from "next/navigation";
import { getAccount } from "@/lib/account";
import { isAdminEmail } from "@/lib/admin/roles";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Unpaid users never see onboarding UI.
 */
export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await getAccount();
  if (!account) redirect("/login?next=/onboarding");

  if (isAdminEmail(account.email)) redirect("/app/dashboard");

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", account.userId)
    .maybeSingle();

  if (profile?.subscription_status !== "active") {
    redirect("/app/checkout");
  }

  return <>{children}</>;
}