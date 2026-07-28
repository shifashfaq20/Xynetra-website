// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Logo } from "./Logo";
// import { BookDemoButton } from "./CtaButtons";

// const NAV = [
//   { href: "/services", label: "Services" },
//   { href: "/services/recovery", label: "Recovery" },
//   { href: "/services/lead-to-booking", label: "Lead-to-Booking" },
//   { href: "/about", label: "About" },
//   { href: "/contact", label: "Contact" },
// ];

// export function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 border-b border-grey-line bg-paper/95 backdrop-blur">
//       <div className="container-x flex h-16 items-center justify-between gap-4">
//         <Logo width={132} priority />

//         <nav className="hidden items-center gap-7 lg:flex">
//           {NAV.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="font-body text-sm text-ink/80 transition-colors hover:text-ink"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden items-center gap-3 lg:flex">
//           <Link
//             href="/login"
//             className="font-body text-sm font-semibold text-ink hover:text-ink/60"
//           >
//             Client login
//           </Link>
//           <BookDemoButton className="px-4 py-2 text-sm" />
//         </div>

//         <button
//           type="button"
//           aria-label="Toggle menu"
//           aria-expanded={open}
//           onClick={() => setOpen((v) => !v)}
//           className="flex h-10 w-10 items-center justify-center lg:hidden"
//         >
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             strokeLinecap="square"
//           >
//             {open ? (
//               <path d="M5 5l14 14M19 5L5 19" />
//             ) : (
//               <path d="M3 6h18M3 12h18M3 18h18" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {open && (
//         <div className="border-t border-grey-line bg-paper lg:hidden">
//           <nav className="container-x flex flex-col py-4">
//             {NAV.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className="py-3 font-body text-base text-ink"
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <Link
//               href="/login"
//               onClick={() => setOpen(false)}
//               className="py-3 font-body text-base font-semibold text-ink"
//             >
//               Client login
//             </Link>
//             <BookDemoButton className="mt-3 w-full" />
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }




// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Logo } from "./Logo";
// import { BookDemoButton } from "./CtaButtons";

// const NAV = [
//   { href: "/services", label: "Services" },
//   { href: "/services/recovery", label: "Recovery" },
//   { href: "/services/lead-to-booking", label: "Lead-to-Booking" },
//   { href: "/pricing", label: "Pricing" },
//   { href: "/about", label: "About" },
//   { href: "/contact", label: "Contact" },
// ];

// export function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 border-b border-grey-line bg-paper/95 backdrop-blur">
//       <div className="container-x flex h-16 items-center justify-between gap-4">
//         <Logo width={132} priority />

//         <nav className="hidden items-center gap-7 lg:flex">
//           {NAV.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="font-body text-sm text-ink/80 transition-colors hover:text-ink"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden items-center gap-3 lg:flex">
//           <Link
//             href="/login"
//             className="font-body text-sm font-semibold text-ink hover:text-ink/60"
//           >
//             Client login
//           </Link>
//           <BookDemoButton className="px-4 py-2 text-sm" />
//         </div>

//         <button
//           type="button"
//           aria-label="Toggle menu"
//           aria-expanded={open}
//           onClick={() => setOpen((v) => !v)}
//           className="flex h-10 w-10 items-center justify-center lg:hidden"
//         >
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             strokeLinecap="square"
//           >
//             {open ? (
//               <path d="M5 5l14 14M19 5L5 19" />
//             ) : (
//               <path d="M3 6h18M3 12h18M3 18h18" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {open && (
//         <div className="border-t border-grey-line bg-paper lg:hidden">
//           <nav className="container-x flex flex-col py-4">
//             {NAV.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className="py-3 font-body text-base text-ink"
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <Link
//               href="/login"
//               onClick={() => setOpen(false)}
//               className="py-3 font-body text-base font-semibold text-ink"
//             >
//               Client login
//             </Link>
//             <BookDemoButton className="mt-3 w-full" />
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }



"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { BookDemoButton } from "./CtaButtons";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/services/recovery", label: "Recovery" },
  { href: "/services/lead-to-booking", label: "Lead-to-Booking" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-grey-line bg-paper/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo width={132} priority />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-sm text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/#demo"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-ink/80 transition-colors hover:text-ink"
          >
            <PlayIcon />
            Watch demo
          </a>
          <Link
            href="/login"
            className="font-body text-sm font-semibold text-ink hover:text-ink/60"
          >
            Client login
          </Link>
          <BookDemoButton className="px-4 py-2 text-sm" />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="square"
          >
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-grey-line bg-paper lg:hidden">
          <nav className="container-x flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-body text-base text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#demo"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 py-3 font-body text-base font-semibold text-ink"
            >
              <PlayIcon />
              Watch demo
            </a>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="py-3 font-body text-base font-semibold text-ink"
            >
              Client login
            </Link>
            <BookDemoButton className="mt-3 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}

function PlayIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}