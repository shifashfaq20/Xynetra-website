"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Pakistan rail: the client presses "I've paid" → the invoice is marked
// pending-verification for manual confirmation. Stored in `invoice_status`.
export async function markInvoicePaid(
  invoiceNumber: string
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const { error } = await supabase.from("invoice_status").upsert(
    {
      user_id: user.id,
      number: invoiceNumber,
      status: "pending_verification",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,number" }
  );

  if (error) {
    return {
      ok: false,
      error:
        "Couldn't record payment yet. Make sure the invoice_status table exists (see README), or contact us.",
    };
  }

  revalidatePath("/app/billing");
  return { ok: true };
}
