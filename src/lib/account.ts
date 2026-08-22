// import { createClient } from "@/lib/supabase/server";
// import {
//   getInvoices,
//   type BillingRegion,
//   type Invoice,
// } from "@/lib/demo";

// export type Account = {
//   userId: string;
//   email: string;
//   fullName: string;
//   businessName: string;
//   billingRegion: BillingRegion;
// };

// // Reads the signed-in account. Name / business / region come from the sign-up
// // metadata (also mirrored into a `profiles` row by the schema trigger).
// export async function getAccount(): Promise<Account | null> {
//   // Without Supabase configured there's no session — treat as signed out.
//   if (
//     !process.env.NEXT_PUBLIC_SUPABASE_URL ||
//     !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   ) {
//     return null;
//   }

//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) return null;

//   const meta = user.user_metadata ?? {};
//   const region: BillingRegion =
//     meta.billing_region === "pakistan" ? "pakistan" : "international";

//   return {
//     userId: user.id,
//     email: user.email ?? "",
//     fullName: meta.full_name || "",
//     businessName: meta.business_name || "Your business",
//     billingRegion: region,
//   };
// }

// // Invoices with any per-invoice status overrides applied (e.g. a Pakistan
// // client pressed "I've paid" → pending_verification). Overrides live in the
// // optional `invoice_status` table; if it's absent we fall back to demo data.
// export async function getAccountInvoices(
//   account: Account
// ): Promise<Invoice[]> {
//   const base = getInvoices(account.userId, account.billingRegion);
//   const supabase = await createClient();

//   try {
//     const { data } = await supabase
//       .from("invoice_status")
//       .select("number, status")
//       .eq("user_id", account.userId);

//     if (data && data.length) {
//       const overrides = new Map(data.map((r) => [r.number, r.status]));
//       return base.map((inv) =>
//         overrides.has(inv.number)
//           ? { ...inv, status: overrides.get(inv.number) as Invoice["status"] }
//           : inv
//       );
//     }
//   } catch {
//     // Table not set up yet — return demo invoices unchanged.
//   }

//   return base;
// }



import { createClient } from "@/lib/supabase/server";
import {
  getInvoices,
  type BillingRegion,
  type Currency,
  type Invoice,
} from "@/lib/demo";

export type Account = {
  userId: string;
  email: string;
  fullName: string;
  businessName: string;
  billingRegion: BillingRegion;
};

export async function getAccount(): Promise<Account | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const meta = user.user_metadata ?? {};
  const region: BillingRegion =
    meta.billing_region === "pakistan" ? "pakistan" : "international";

  return {
    userId: user.id,
    email: user.email ?? "",
    fullName: meta.full_name || "",
    businessName: meta.business_name || "Your business",
    billingRegion: region,
  };
}

// Real invoices from the `invoices` table. Applies invoice_status overrides
// (Pakistan "I've paid" flow). Falls back to demo data only when there are
// no real invoices yet, so the UI never breaks.
export async function getAccountInvoices(
  account: Account
): Promise<Invoice[]> {
  const supabase = await createClient();

  let real: Invoice[] = [];
  try {
    const { data } = await supabase
      .from("invoices")
      .select("number, amount, currency, status, period, issued_at, due_at")
      .eq("user_id", account.userId)
      .order("issued_at", { ascending: false });

    if (data && data.length) {
      real = data.map((r) => ({
        number: r.number,
        period: r.period ?? "",
        issuedAt: (r.issued_at ?? "").toString().slice(0, 10),
        dueAt: (r.due_at ?? r.issued_at ?? "").toString().slice(0, 10),
        amount: Number(r.amount),
        currency: (r.currency as Currency) ?? "USD",
        status: r.status as Invoice["status"],
      }));
    }
  } catch {
    // table missing — ignore, fall back below
  }

  // Fallback: demo invoices when no real ones exist yet
  const base = real.length ? real : getInvoices(account.userId, account.billingRegion);

  // Apply per-invoice status overrides (Pakistan manual confirm)
  try {
    const { data } = await supabase
      .from("invoice_status")
      .select("number, status")
      .eq("user_id", account.userId);

    if (data && data.length) {
      const overrides = new Map(data.map((r) => [r.number, r.status]));
      return base.map((inv) =>
        overrides.has(inv.number)
          ? { ...inv, status: overrides.get(inv.number) as Invoice["status"] }
          : inv
      );
    }
  } catch {
    // ignore
  }

  return base;
}

// Admin: every client's invoices, joined with profile info. Uses the
// service-role client so RLS is bypassed. Imported lazily to keep this
// module usable in client-adjacent code paths.
export async function getAllInvoicesForAdmin() {
  const { createServiceClient } = await import("@/lib/supabase/service");
  const svc = createServiceClient();

  const [{ data: invoices }, { data: profiles }] = await Promise.all([
    svc
      .from("invoices")
      .select("number, amount, currency, status, period, issued_at, user_id")
      .order("issued_at", { ascending: false }),
    svc.from("profiles").select("id, business_name, full_name"),
  ]);

  const nameById = new Map(
    (profiles ?? []).map((p: any) => [
      p.id,
      p.business_name || p.full_name || "—",
    ])
  );

  return (invoices ?? []).map((inv: any) => ({
    number: inv.number,
    amount: Number(inv.amount),
    currency: inv.currency,
    status: inv.status,
    period: inv.period ?? "",
    issuedAt: (inv.issued_at ?? "").toString().slice(0, 10),
    client: nameById.get(inv.user_id) ?? "—",
  }));
}