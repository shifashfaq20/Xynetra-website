import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/roles";

/**
 * Server Components only. Redirects instead of throwing, so a
 * non-admin never sees an opaque "Server Components render" error.
 */
export async function requireAdmin(): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;

  if (!email) redirect("/login?next=/app/dashboard");
  if (!isAdminEmail(email)) redirect("/app/dashboard");

  return email;
}