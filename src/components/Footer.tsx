// import Link from "next/link";
// import { Logo } from "./Logo";
// import { SITE } from "@/lib/constants";

// // Footer sits on Ink. The circuit strip is the only approved pattern use:
// // a thin edge strip (3–8% of surface) anchored to the top edge, on black.
// export function Footer() {
//   return (
//     <footer className="bg-ink text-paper">
//       {/* Circuit strip — anchored to the top edge, ~64px tall, no text on it. */}
//       <div
//         aria-hidden
//         className="h-8 w-full bg-repeat-x"
//         style={{
//           backgroundImage:
//             "url('/brand/pattern/xynetra-circuit-strip-tileable.webp')",
//           backgroundSize: "auto 100%",
//         }}
//       />

//       <div className="container-x py-14">
//         <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
//           <div>
//             <Logo variant="reversed" width={150} />
//             <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/70">
//               AI systems that turn missed moments into booked revenue. Around
//               the clock, on the channels your customers already use.
//             </p>
//           </div>

//           <FooterCol
//             title="Products"
//             links={[
//               { href: "/services/recovery", label: "Xynetra Recovery" },
//               {
//                 href: "/services/lead-to-booking",
//                 label: "Lead-to-Booking",
//               },
//               { href: "/services", label: "All services" },
//             ]}
//           />
//           <FooterCol
//             title="Company"
//             links={[
//               { href: "/about", label: "About" },
//               { href: "/contact", label: "Contact" },
//               { href: "/login", label: "Client login" },
//             ]}
//           />
//           <FooterCol
//             title="Legal"
//             links={[
//               { href: "/privacy", label: "Privacy Policy" },
//               { href: "/terms", label: "Terms of Service" },
//             ]}
//           />
//         </div>

//         <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
//           <p className="eyebrow text-paper/60">{SITE.tagline}</p>
//           <p className="font-body">
//             © {new Date().getFullYear()} {SITE.name}. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function FooterCol({
//   title,
//   links,
// }: {
//   title: string;
//   links: { href: string; label: string }[];
// }) {
//   return (
//     <div>
//       <h3 className="eyebrow text-paper/50">{title}</h3>
//       <ul className="mt-4 space-y-2.5">
//         {links.map((l) => (
//           <li key={l.href}>
//             <Link
//               href={l.href}
//               className="font-body text-sm text-paper/80 transition-colors hover:text-paper"
//             >
//               {l.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import Link from "next/link";
import { Logo } from "./Logo";
import { SITE } from "@/lib/constants";

// Footer sits on Ink. The circuit strip is the only approved pattern use:
// a thin edge strip (3–8% of surface) anchored to the top edge, on black.
export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      {/* Circuit strip — anchored to the top edge, ~64px tall, no text on it. */}
      <div
        aria-hidden
        className="h-8 w-full bg-repeat-x"
        style={{
          backgroundImage:
            "url('/brand/pattern/xynetra-circuit-strip-tileable.webp')",
          backgroundSize: "auto 100%",
        }}
      />

      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="reversed" width={150} />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/70">
              AI systems that turn missed moments into booked revenue. Around
              the clock, on the channels your customers already use.
            </p>
          </div>

          <FooterCol
            title="Products"
            links={[
              { href: "/services/recovery", label: "Xynetra Recovery" },
              {
                href: "/services/lead-to-booking",
                label: "Lead-to-Booking",
              },
              { href: "/services", label: "All services" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/login", label: "Client login" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/refund-policy", label: "Refund Policy" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-paper/60">{SITE.tagline}</p>
          <p className="font-body">
            © {new Date().getFullYear()} {SITE.name}. Shifa Ashfaq. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow text-paper/50">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-body text-sm text-paper/80 transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}