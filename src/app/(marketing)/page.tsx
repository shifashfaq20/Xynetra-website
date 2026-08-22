// import Image from "next/image";
// import Link from "next/link";
// import type { Metadata } from "next";
// import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";
// import { Section, Eyebrow, AccentRule, Stat, accentText } from "@/components/ui";
// import DemoVideo from "@/components/marketing/DemoVideo";
// import {
//   IconReminder,
//   IconSpeed,
//   IconMoney,
//   IconArrow,
//   IconCheck,
// } from "@/components/Icon";
// import { PRODUCTS } from "@/lib/constants";

// export const metadata: Metadata = {
//   title: "Automate Smarter. Scale Faster.",
//   description:
//     "Xynetra builds AI systems that turn missed moments into booked revenue — appointments kept, leads answered in under 60 seconds, cancelled slots refilled automatically.",
// };

// export default function HomePage() {
//   return (
//     <>
//       {/* HERO — Ink surface, the single hero circuit X (≥400px, once per page). */}
//       <section className="bg-ink text-paper">
//         <div className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
//           <div>
//             <Eyebrow accent="purple" className="text-purple">
//               AI automation for small business
//             </Eyebrow>
//             <h1 className="h1 mt-5 text-paper">
//               Recover the revenue you&rsquo;re losing to missed moments.
//             </h1>
//             <p className="body-lg mt-6 max-w-xl text-paper/75">
//               The reminder that never got sent. The lead that sat unanswered
//               overnight. The cancelled slot nobody refilled. Xynetra installs
//               AI systems that handle this work automatically — and reports the
//               result in booked jobs and recovered revenue.
//             </p>
//             <div className="mt-9 flex flex-col gap-3 sm:flex-row">
//               <BookDemoButton variant="reversed" />
//               <WhatsAppButton accent="reversed" />
//             </div>
//             <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
//               <span className="inline-flex items-center gap-2">
//                 <IconCheck size={16} className="text-purple" /> Installs in days
//               </span>
//               <span className="inline-flex items-center gap-2">
//                 <IconCheck size={16} className="text-purple" /> Works on WhatsApp
//               </span>
//               <span className="inline-flex items-center gap-2">
//                 <IconCheck size={16} className="text-purple" /> Pays for itself
//                 in weeks
//               </span>
//             </div>
//           </div>

//           {/* Hero circuit X — brand floor is 400px; hidden on the narrowest
//               phones (header's primary logo carries the brand there instead). */}
//           <div className="hidden justify-center min-[480px]:flex lg:justify-end">
//             <Image
//               src="/brand/hero/xynetra-hero-circuit-transparent-2400.webp"
//               alt="Xynetra circuit X"
//               width={520}
//               height={520}
//               priority
//               className="h-auto w-full min-w-[400px] max-w-[440px] sm:max-w-[520px]"
//             />
//           </div>
//         </div>
//       </section>

//       {/* THE LEAK — problem framing */}
//       <Section>
//         <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
//           <div>
//             <Eyebrow>The invisible leak</Eyebrow>
//             <h2 className="h2 mt-4">
//               Every business loses money to work no one has time to do.
//             </h2>
//             <AccentRule />
//           </div>
//           <div className="space-y-6">
//             <p className="body-lg text-ink/80">
//               You don&rsquo;t need another dashboard or chatbot. You need the
//               work finished: appointments confirmed, leads answered, slots
//               refilled — without adding headcount.
//             </p>
//             <p className="body text-ink/70">
//               Xynetra names every product for the job it finishes, not the tech
//               inside it. The systems respond in seconds, at 2 a.m., on a Sunday.
//               And we measure success in money recovered, not messages sent.
//             </p>
//           </div>
//         </div>

//         <div className="mt-14 grid gap-8 sm:grid-cols-3">
//           <Promise
//             icon={<IconMoney className="text-purple" />}
//             title="Outcome first"
//             body="Every product is named for the result it delivers — booked jobs, filled slots, recovered revenue."
//           />
//           <Promise
//             icon={<IconSpeed className="text-purple" />}
//             title="Always on"
//             body="Systems that respond in seconds, at 2 a.m., on a Sunday — on the channels your customers already use."
//           />
//           <Promise
//             icon={<IconReminder className="text-purple" />}
//             title="Measured in money"
//             body="You see recovered revenue and booked jobs in your dashboard — not a count of messages sent."
//           />
//         </div>
//       </Section>

//       {/* PRODUCTS */}
//       <Section className="border-t border-grey-line">
//         <Eyebrow>What we build</Eyebrow>
//         <h2 className="h2 mt-4 max-w-2xl">
//           Task-specific systems that install in days.
//         </h2>
//         <div className="mt-12 grid gap-6 lg:grid-cols-2">
//           <ProductCard
//             slug={PRODUCTS.recovery.slug}
//             name={PRODUCTS.recovery.name}
//             accent="coral"
//             headline="Stop losing revenue to no-shows."
//             body="Xynetra Recovery confirms, reminds, and refills cancelled slots automatically on WhatsApp — so your front desk stops chasing confirmations."
//             stat="10–20%"
//             statLabel="of booked revenue lost to no-shows — recovered"
//             live
//           />
//           <ProductCard
//             slug={PRODUCTS.leadToBooking.slug}
//             name={PRODUCTS.leadToBooking.name}
//             accent="blue"
//             headline="Answer every lead in under 60 seconds."
//             body="Xynetra Lead-to-Booking replies to inbound leads in seconds and books the job on WhatsApp — before they call your competitor."
//             stat="< 60s"
//             statLabel="reply time, day or night"
//             live={false}
//           />
//         </div>
//       </Section>

//       {/* HOW IT WORKS */}
//       <Section dark>
//         <Eyebrow accent="purple">How it works</Eyebrow>
//         <h2 className="h2 mt-4 max-w-2xl text-paper">
//           From missed moment to booked revenue, in three steps.
//         </h2>
//         <div className="mt-12 grid gap-8 md:grid-cols-3">
//           {[
//             {
//               n: "01",
//               t: "We map the leak",
//               d: "In a 20-minute call we find where the revenue walks out — no-shows, slow lead response, empty slots.",
//             },
//             {
//               n: "02",
//               t: "We install the system",
//               d: "Your task-specific system goes live in days on WhatsApp and the tools you already run — no rip-and-replace.",
//             },
//             {
//               n: "03",
//               t: "You watch it pay off",
//               d: "Confirmations, bookings, and recovered revenue show up in your dashboard from week one.",
//             },
//           ].map((s) => (
//             <div key={s.n} className="border-t border-paper/20 pt-5">
//               <div className="font-display text-3xl font-bold text-purple">
//                 {s.n}
//               </div>
//               <h3 className="h3 mt-3 text-paper">{s.t}</h3>
//               <p className="body mt-3 text-paper/70">{s.d}</p>
//             </div>
//           ))}
//         </div>
//       </Section>

//       {/* WHO IT'S FOR */}
//       <Section className="border-t border-grey-line">
//         <div className="grid gap-10 lg:grid-cols-3">
//           <div className="lg:col-span-1">
//             <Eyebrow>Who it&rsquo;s for</Eyebrow>
//             <h2 className="h2 mt-4">Built for owners, not IT teams.</h2>
//             <AccentRule />
//           </div>
//           <div className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
//             <Audience
//               title="Appointment businesses"
//               body="Clinics, salons, studios, dental practices losing revenue to no-shows and empty slots."
//             />
//             <Audience
//               title="Home-services contractors"
//               body="HVAC, plumbing, roofing, and electrical firms where a slow lead response loses the job."
//             />
//             <Audience
//               title="E-commerce brands"
//               body="DTC and marketplace sellers handling support and order queries at volume on WhatsApp."
//             />
//           </div>
//         </div>
//       </Section>

//       {/* CTA BAND */}
//       <section className="bg-ink text-paper">
//         <div className="container-x flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h2 className="h2 max-w-xl text-paper">
//               See what you&rsquo;re leaving on the table.
//             </h2>
//             <p className="body-lg mt-4 max-w-lg text-paper/75">
//               Book a 20-minute walkthrough. We&rsquo;ll show you the revenue a
//               Xynetra system would recover for your business.
//             </p>
//           </div>
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <BookDemoButton variant="reversed" />
//             <WhatsAppButton accent="reversed" />
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// function Promise({
//   icon,
//   title,
//   body,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   body: string;
// }) {
//   return (
//     <div>
//       <div className="flex h-11 w-11 items-center justify-center">{icon}</div>
//       <h3 className="h3 mt-4">{title}</h3>
//       <p className="body mt-2 text-ink/70">{body}</p>
//     </div>
//   );
// }

// function Audience({ title, body }: { title: string; body: string }) {
//   return (
//     <div className="border-t-2 border-ink pt-4">
//       <h3 className="font-display text-lg font-bold">{title}</h3>
//       <p className="body mt-2 text-sm text-ink/70">{body}</p>
//     </div>
//   );
// }

// function ProductCard({
//   slug,
//   name,
//   accent,
//   headline,
//   body,
//   stat,
//   statLabel,
//   live,
// }: {
//   slug: string;
//   name: string;
//   accent: "coral" | "blue";
//   headline: string;
//   body: string;
//   stat: string;
//   statLabel: string;
//   live: boolean;
// }) {
//   return (
//     <Link
//       href={`/services/${slug}`}
//       className="group flex flex-col justify-between border border-grey-line p-8 transition-colors hover:border-ink"
//     >
//       <div>
//         <div className="flex items-center justify-between">
//           <span className={`eyebrow ${accentText(accent)}`}>{name}</span>
//           {!live && (
//             <span className="font-body text-xs font-semibold uppercase tracking-caption text-ink/50">
//               Coming soon
//             </span>
//           )}
//         </div>
//         <h3 className="h3 mt-4">{headline}</h3>
//         <p className="body mt-3 text-ink/70">{body}</p>
//       </div>
//       <div className="mt-8">
//         <Stat value={stat} label={statLabel} accent={accent} />
//         <span
//           className={`mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold ${accentText(
//             accent
//           )}`}
//         >
//           {live ? "Explore Recovery" : "See what's coming"}
//           <IconArrow
//             size={16}
//             className="transition-transform group-hover:translate-x-1"
//           />
//         </span>
//       </div>
//     </Link>
//   );
// }




import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";
import { Section, Eyebrow, AccentRule, Stat, accentText } from "@/components/ui";
import DemoVideo from "@/components/marketing/DemoVideo";
import {
  IconReminder,
  IconSpeed,
  IconMoney,
  IconArrow,
  IconCheck,
} from "@/components/Icon";
import { PRODUCTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Automate Smarter. Scale Faster.",
  description:
    "Xynetra builds AI systems that turn missed moments into booked revenue — appointments kept, leads answered in under 60 seconds, cancelled slots refilled automatically.",
};

export default function HomePage() {
  return (
    <>
      {/* HERO — Ink surface, the single hero circuit X (≥400px, once per page). */}
      <section className="bg-ink text-paper">
        <div className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
          <div>
            <Eyebrow accent="purple" className="text-purple">
              AI automation for small business
            </Eyebrow>
            <h1 className="h1 mt-5 text-paper">
              Recover the revenue you&rsquo;re losing to missed moments.
            </h1>
            <p className="body-lg mt-6 max-w-xl text-paper/75">
              The reminder that never got sent. The lead that sat unanswered
              overnight. The cancelled slot nobody refilled. Xynetra installs
              AI systems that handle this work automatically — and reports the
              result in booked jobs and recovered revenue.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookDemoButton variant="reversed" />
              <WhatsAppButton accent="reversed" />
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
              <span className="inline-flex items-center gap-2">
                <IconCheck size={16} className="text-purple" /> Installs in days
              </span>
              <span className="inline-flex items-center gap-2">
                <IconCheck size={16} className="text-purple" /> Works on WhatsApp
              </span>
              <span className="inline-flex items-center gap-2">
                <IconCheck size={16} className="text-purple" /> Pays for itself
                in weeks
              </span>
            </div>
          </div>

          {/* Hero circuit X — brand floor is 400px; hidden on the narrowest
              phones (header's primary logo carries the brand there instead). */}
          <div className="hidden justify-center min-[480px]:flex lg:justify-end">
            <Image
              src="/brand/hero/xynetra-hero-circuit-transparent-2400.webp"
              alt="Xynetra circuit X"
              width={520}
              height={520}
              priority
              className="h-auto w-full min-w-[400px] max-w-[440px] sm:max-w-[520px]"
            />
          </div>
        </div>
      </section>

      {/* THE LEAK — problem framing */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>The invisible leak</Eyebrow>
            <h2 className="h2 mt-4">
              Every business loses money to work no one has time to do.
            </h2>
            <AccentRule />
          </div>
          <div className="space-y-6">
            <p className="body-lg text-ink/80">
              You don&rsquo;t need another dashboard or chatbot. You need the
              work finished: appointments confirmed, leads answered, slots
              refilled — without adding headcount.
            </p>
            <p className="body text-ink/70">
              Xynetra names every product for the job it finishes, not the tech
              inside it. The systems respond in seconds, at 2 a.m., on a Sunday.
              And we measure success in money recovered, not messages sent.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <Promise
            icon={<IconMoney className="text-purple" />}
            title="Outcome first"
            body="Every product is named for the result it delivers — booked jobs, filled slots, recovered revenue."
          />
          <Promise
            icon={<IconSpeed className="text-purple" />}
            title="Always on"
            body="Systems that respond in seconds, at 2 a.m., on a Sunday — on the channels your customers already use."
          />
          <Promise
            icon={<IconReminder className="text-purple" />}
            title="Measured in money"
            body="You see recovered revenue and booked jobs in your dashboard — not a count of messages sent."
          />
        </div>
      </Section>

      {/* DEMO — cinematic proof, sandwiched between two light sections. */}
      <DemoVideo />

      {/* PRODUCTS */}
      <Section className="border-t border-grey-line">
        <Eyebrow>What we build</Eyebrow>
        <h2 className="h2 mt-4 max-w-2xl">
          Task-specific systems that install in days.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ProductCard
            slug={PRODUCTS.recovery.slug}
            name={PRODUCTS.recovery.name}
            accent="coral"
            headline="Stop losing revenue to no-shows."
            body="Xynetra Recovery confirms, reminds, and refills cancelled slots automatically on WhatsApp — so your front desk stops chasing confirmations."
            stat="10–20%"
            statLabel="of booked revenue lost to no-shows — recovered"
            live
          />
          <ProductCard
            slug={PRODUCTS.leadToBooking.slug}
            name={PRODUCTS.leadToBooking.name}
            accent="blue"
            headline="Answer every lead in under 60 seconds."
            body="Xynetra Lead-to-Booking replies to inbound leads in seconds and books the job on WhatsApp — before they call your competitor."
            stat="< 60s"
            statLabel="reply time, day or night"
            live={false}
          />
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section dark>
        <Eyebrow accent="purple">How it works</Eyebrow>
        <h2 className="h2 mt-4 max-w-2xl text-paper">
          From missed moment to booked revenue, in three steps.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "We map the leak",
              d: "In a 20-minute call we find where the revenue walks out — no-shows, slow lead response, empty slots.",
            },
            {
              n: "02",
              t: "We install the system",
              d: "Your task-specific system goes live in days on WhatsApp and the tools you already run — no rip-and-replace.",
            },
            {
              n: "03",
              t: "You watch it pay off",
              d: "Confirmations, bookings, and recovered revenue show up in your dashboard from week one.",
            },
          ].map((s) => (
            <div key={s.n} className="border-t border-paper/20 pt-5">
              <div className="font-display text-3xl font-bold text-purple">
                {s.n}
              </div>
              <h3 className="h3 mt-3 text-paper">{s.t}</h3>
              <p className="body mt-3 text-paper/70">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO IT'S FOR */}
      <Section className="border-t border-grey-line">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Eyebrow>Who it&rsquo;s for</Eyebrow>
            <h2 className="h2 mt-4">Built for owners, not IT teams.</h2>
            <AccentRule />
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
            <Audience
              title="Appointment businesses"
              body="Clinics, salons, studios, dental practices losing revenue to no-shows and empty slots."
            />
            <Audience
              title="Home-services contractors"
              body="HVAC, plumbing, roofing, and electrical firms where a slow lead response loses the job."
            />
            <Audience
              title="E-commerce brands"
              body="DTC and marketplace sellers handling support and order queries at volume on WhatsApp."
            />
          </div>
        </div>
      </Section>

      {/* CTA BAND */}
      <section className="bg-ink text-paper">
        <div className="container-x flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="h2 max-w-xl text-paper">
              See what you&rsquo;re leaving on the table.
            </h2>
            <p className="body-lg mt-4 max-w-lg text-paper/75">
              Book a 20-minute walkthrough. We&rsquo;ll show you the revenue a
              Xynetra system would recover for your business.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookDemoButton variant="reversed" />
            <WhatsAppButton accent="reversed" />
          </div>
        </div>
      </section>
    </>
  );
}

function Promise({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex h-11 w-11 items-center justify-center">{icon}</div>
      <h3 className="h3 mt-4">{title}</h3>
      <p className="body mt-2 text-ink/70">{body}</p>
    </div>
  );
}

function Audience({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t-2 border-ink pt-4">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="body mt-2 text-sm text-ink/70">{body}</p>
    </div>
  );
}

function ProductCard({
  slug,
  name,
  accent,
  headline,
  body,
  stat,
  statLabel,
  live,
}: {
  slug: string;
  name: string;
  accent: "coral" | "blue";
  headline: string;
  body: string;
  stat: string;
  statLabel: string;
  live: boolean;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex flex-col justify-between border border-grey-line p-8 transition-colors hover:border-ink"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className={`eyebrow ${accentText(accent)}`}>{name}</span>
          {!live && (
            <span className="font-body text-xs font-semibold uppercase tracking-caption text-ink/50">
              Coming soon
            </span>
          )}
        </div>
        <h3 className="h3 mt-4">{headline}</h3>
        <p className="body mt-3 text-ink/70">{body}</p>
      </div>
      <div className="mt-8">
        <Stat value={stat} label={statLabel} accent={accent} />
        <span
          className={`mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold ${accentText(
            accent
          )}`}
        >
          {live ? "Explore Recovery" : "See what's coming"}
          <IconArrow
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}