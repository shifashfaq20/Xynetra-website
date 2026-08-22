// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { Logo } from "@/components/Logo";
// import { signOut } from "@/lib/auth/actions";
// import type { Account } from "@/lib/account";
// import { IconGrowth, IconMoney } from "@/components/Icon";

// const NAV = [
//   { href: "/app/dashboard", label: "Dashboard", icon: IconGrowth },
//   { href: "/app/billing", label: "Billing", icon: IconMoney },
// ];

// export function AppShell({
//   account,
//   children,
// }: {
//   account: Account;
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const initials =
//     (account.fullName || account.businessName || "X")
//       .split(" ")
//       .map((s) => s[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase();

//   return (
//     <div className="flex min-h-screen flex-col lg:flex-row">
//       {/* Sidebar (Ink) — reversed logo on Ink surface. */}
//       <aside className="flex flex-col border-b border-paper/10 bg-ink text-paper lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
//         <div className="flex items-center justify-between p-5 lg:block">
//           <Link href="/app/dashboard">
//             <Logo variant="reversed" width={130} href={null} />
//           </Link>
//           <button
//             type="button"
//             aria-label="Toggle menu"
//             aria-expanded={open}
//             onClick={() => setOpen((v) => !v)}
//             className="lg:hidden"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
//               <path d={open ? "M5 5l14 14M19 5L5 19" : "M3 6h18M3 12h18M3 18h18"} />
//             </svg>
//           </button>
//         </div>

//         <nav className={`flex-1 flex-col gap-1 px-3 pb-4 ${open ? "flex" : "hidden"} lg:flex`}>
//           {NAV.map((item) => {
//             const active = pathname === item.href;
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={`flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-colors ${
//                   active
//                     ? "bg-purple text-paper"
//                     : "text-paper/70 hover:bg-paper/10 hover:text-paper"
//                 }`}
//               >
//                 <Icon size={18} />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className={`border-t border-paper/10 p-4 ${open ? "block" : "hidden"} lg:block`}>
//           <div className="flex items-center gap-3">
//             <span className="flex h-9 w-9 items-center justify-center bg-purple font-display text-sm font-bold text-paper">
//               {initials}
//             </span>
//             <div className="min-w-0">
//               <p className="truncate font-body text-sm font-semibold text-paper">
//                 {account.businessName}
//               </p>
//               <p className="truncate font-body text-xs text-paper/60">
//                 {account.email}
//               </p>
//             </div>
//           </div>
//           <form action={signOut} className="mt-3">
//             <button
//               type="submit"
//               className="w-full border border-paper/25 px-3 py-2 font-body text-sm text-paper/80 transition-colors hover:bg-paper hover:text-ink"
//             >
//               Sign out
//             </button>
//           </form>
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 bg-paper">
//         <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }



// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { Logo } from "@/components/Logo";
// import { signOut } from "@/lib/auth/actions";
// import type { Account } from "@/lib/account";
// import { IconGrowth, IconMoney } from "@/components/Icon";

// export function AppShell({
//   account,
//   children,
// }: {
//   account: Account;
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const initials =
//     (account.fullName || account.businessName || "X")
//       .split(" ")
//       .map((s) => s[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase();

//   // Role check: Define admin emails here
//   const isAdmin = account.email === "admin@xynetra.com"; 

//   const NAV = isAdmin 
//     ? [
//         { href: "/app/dashboard", label: "Admin Panel", icon: IconGrowth },
//         { href: "/app/billing", label: "Billing", icon: IconMoney },
//       ]
//     : [
//         { href: "/app/dashboard", label: "Dashboard", icon: IconGrowth },
//         { href: "/app/billing", label: "Billing", icon: IconMoney },
//       ];

//   return (
//     <div className="flex min-h-screen flex-col lg:flex-row">
//       <aside className="flex flex-col border-b border-paper/10 bg-ink text-paper lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
//         <div className="flex items-center justify-between p-5 lg:block">
//           <Link href="/app/dashboard">
//             <Logo variant="reversed" width={130} href={null} />
//           </Link>
//           <button
//             type="button"
//             aria-label="Toggle menu"
//             aria-expanded={open}
//             onClick={() => setOpen((v) => !v)}
//             className="lg:hidden"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
//               <path d={open ? "M5 5l14 14M19 5L5 19" : "M3 6h18M3 12h18M3 18h18"} />
//             </svg>
//           </button>
//         </div>

//         <nav className={`flex-1 flex-col gap-1 px-3 pb-4 ${open ? "flex" : "hidden"} lg:flex`}>
//           {NAV.map((item) => {
//             const active = pathname === item.href;
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={`flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-colors ${
//                   active
//                     ? "bg-purple text-paper"
//                     : "text-paper/70 hover:bg-paper/10 hover:text-paper"
//                 }`}
//               >
//                 <Icon size={18} />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className={`border-t border-paper/10 p-4 ${open ? "block" : "hidden"} lg:block`}>
//           <div className="flex items-center gap-3">
//             <span className="flex h-9 w-9 items-center justify-center bg-purple font-display text-sm font-bold text-paper">
//               {initials}
//             </span>
//             <div className="min-w-0">
//               <p className="truncate font-body text-sm font-semibold text-paper">
//                 {account.businessName}
//               </p>
//               <p className="truncate font-body text-xs text-paper/60">
//                 {account.email}
//               </p>
//             </div>
//           </div>
//           <form action={signOut} className="mt-3">
//             <button
//               type="submit"
//               className="w-full border border-paper/25 px-3 py-2 font-body text-sm text-paper/80 transition-colors hover:bg-paper hover:text-ink"
//             >
//               Sign out
//             </button>
//           </form>
//         </div>
//       </aside>

//       <main className="flex-1 bg-paper">
//         <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }




"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { signOut } from "@/lib/auth/actions";
import type { Account } from "@/lib/account";
import { IconGrowth, IconMoney } from "@/components/Icon";

function IconSettings({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function AppShell({
  account,
  isAdmin,
  children,
}: {
  account: Account;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const initials = (account.fullName || account.businessName || "X")
    .split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const NAV = isAdmin
    ? [
        { href: "/app/dashboard", label: "Admin Panel", icon: IconGrowth },
        { href: "/app/billing", label: "Billing", icon: IconMoney },
      ]
    : [
        { href: "/app/dashboard", label: "Dashboard", icon: IconGrowth },
        { href: "/app/settings", label: "Settings", icon: IconSettings },
        { href: "/app/billing", label: "Billing", icon: IconMoney },
      ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="flex flex-col border-b border-paper/10 bg-ink text-paper lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between p-5 lg:block">
          <Link href="/app/dashboard">
            <Logo variant="reversed" width={130} href={null} />
          </Link>
          <button
            type="button" aria-label="Toggle menu" aria-expanded={open}
            onClick={() => setOpen((v) => !v)} className="lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
              <path d={open ? "M5 5l14 14M19 5L5 19" : "M3 6h18M3 12h18M3 18h18"} />
            </svg>
          </button>
        </div>

        <nav className={`flex-1 flex-col gap-1 px-3 pb-4 ${open ? "flex" : "hidden"} lg:flex`}>
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-colors ${
                  active ? "bg-purple text-paper" : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-paper/10 p-4 ${open ? "block" : "hidden"} lg:block`}>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-purple font-display text-sm font-bold text-paper">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-body text-sm font-semibold text-paper">{account.businessName}</p>
              <p className="truncate font-body text-xs text-paper/60">{account.email}</p>
            </div>
          </div>
          <form action={signOut} className="mt-3">
            <button type="submit" className="w-full border border-paper/25 px-3 py-2 font-body text-sm text-paper/80 transition-colors hover:bg-paper hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 bg-paper">
        <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">{children}</div>
      </main>
    </div>
  );
}