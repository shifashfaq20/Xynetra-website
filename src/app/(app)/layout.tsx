// import { redirect } from "next/navigation";
// import { getAccount } from "@/lib/account";
// import { AppShell } from "@/components/app/AppShell";
// import PendingCheckoutRedirect from "@/components/billing/PendingCheckoutRedirect";

// // Per-session portal — never prerendered.
// export const dynamic = "force-dynamic";

// // Authed shell. Middleware already guards /app; this also loads the account
// // and renders the portal chrome (masterbrand purple — company-level surface).


// export default async function AppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const account = await getAccount();
//   if (!account) redirect("/login");

//   return <AppShell account={account}>{children}</AppShell>;
// }


// import { redirect } from "next/navigation";
// import { getAccount } from "@/lib/account";
// import { AppShell } from "@/components/app/AppShell";
// import PendingCheckoutRedirect from "@/components/billing/PendingCheckoutRedirect";

// // Per-session portal — never prerendered.
// export const dynamic = "force-dynamic";

// // Authed shell. Middleware already guards /app; this also loads the account
// // and renders the portal chrome (masterbrand purple — company-level surface).

// export default async function AppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const account = await getAccount();
//   if (!account) redirect("/login");

//   return (
//     <>
//       <PendingCheckoutRedirect />
//       <AppShell account={account}>{children}</AppShell>
//     </>
//   );
// }

// import { redirect } from "next/navigation";
// import { getAccount } from "@/lib/account";
// import { AppShell } from "@/components/app/AppShell";

// // Per-session portal — never prerendered.
// export const dynamic = "force-dynamic";

// // Authed shell. Middleware already guards /app; this also loads the account
// // and renders the portal chrome (masterbrand purple — company-level surface).
// //
// // NOTE: PendingCheckoutRedirect was removed from here. It was running on every
// // (app) page and redirecting authenticated users to /pricing, which (combined
// // with the dashboard's onboarding gate) created the login -> dashboard ->
// // onboarding -> pricing loop.

// export default async function AppLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const account = await getAccount();
//   if (!account) redirect("/login");

//   return <AppShell account={account}>{children}</AppShell>;
// }


import { redirect } from "next/navigation";
import { getAccount } from "@/lib/account";
import { AppShell } from "@/components/app/AppShell";
import { isAdminEmail } from "@/lib/admin/roles";

// Per-session portal — never prerendered.
export const dynamic = "force-dynamic";

// Authed shell. Middleware already guards /app; this loads the account,
// resolves the admin role server-side, and renders the portal chrome
// (masterbrand purple — company-level surface).

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const account = await getAccount();
  if (!account) redirect("/login");

  return (
    <AppShell account={account} isAdmin={isAdminEmail(account.email)}>
      {children}
    </AppShell>
  );
}