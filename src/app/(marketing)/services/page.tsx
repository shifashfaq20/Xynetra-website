import Link from "next/link";
import type { Metadata } from "next";
import { Section, Eyebrow, AccentRule, accentText } from "@/components/ui";
import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";
import { IconArrow, IconReminder, IconChat, IconGrowth } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Xynetra builds task-specific AI systems for small businesses: Xynetra Recovery for no-show prevention and slot recovery, and Xynetra Lead-to-Booking for WhatsApp lead conversion.",
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <Eyebrow>Services</Eyebrow>
        <h1 className="h1 mt-4 max-w-3xl">
          One team, one system, finished outcomes.
        </h1>
        <AccentRule />
        <p className="body-lg mt-8 max-w-2xl text-ink/80">
          Each Xynetra product is named for the job it finishes. We install it
          on the channels your customers already use, and report the result in
          money — recovered revenue and booked jobs.
        </p>
      </Section>

      <Section className="border-t border-grey-line pt-0 sm:pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <ServiceCard
            href="/services/recovery"
            name="Xynetra Recovery"
            accent="coral"
            live
            icon={<IconReminder />}
            headline="No-show prevention & slot recovery"
            body="Confirms every booking, sends reminders, and refills cancelled slots automatically on WhatsApp. Your front desk stops chasing confirmations; you keep the revenue that used to walk out with every no-show."
            points={[
              "24-hour confirmation and reminder flow",
              "Automatic waitlist refill for cancellations",
              "Recovered-revenue reporting from week one",
            ]}
          />
          <ServiceCard
            href="/services/lead-to-booking"
            name="Xynetra Lead-to-Booking"
            accent="blue"
            live={false}
            icon={<IconChat />}
            headline="Inbound leads to confirmed bookings"
            body="Answers new leads in under 60 seconds, qualifies them, and books the job on WhatsApp — before they call your competitor. Launching soon for home-services contractors."
            points={[
              "Replies to inbound leads in under 60 seconds",
              "Qualifies and books straight to your calendar",
              "Works day or night, every day",
            ]}
          />
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow accent="purple">The same system, every time</Eyebrow>
            <h2 className="h2 mt-4 text-paper">
              One masterbrand. One standard of quality.
            </h2>
            <AccentRule />
            <p className="body mt-8 text-paper/75">
              Every Xynetra product borrows the same engineering, the same
              plain-language communication, and the same reporting. You get a
              system that installs in days and pays for itself in weeks — not a
              six-month integration project.
            </p>
          </div>
          <div className="grid content-start gap-6">
            <FeatureRow
              icon={<IconGrowth className="text-purple" />}
              title="Installs in days"
              body="We connect to the tools you already run. No rip-and-replace, no new software for your team to learn."
            />
            <FeatureRow
              icon={<IconChat className="text-purple" />}
              title="Lives on WhatsApp"
              body="Your customers already message on WhatsApp. That's where Xynetra confirms, reminds, and books."
            />
            <FeatureRow
              icon={<IconReminder className="text-purple" />}
              title="Reports in money"
              body="A single dashboard shows recovered revenue and booked jobs — the numbers that matter to an owner."
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-grey-line">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="h2 max-w-xl">Not sure which fits?</h2>
            <p className="body mt-3 max-w-lg text-ink/70">
              Tell us where revenue leaks in your business. We&rsquo;ll point
              you to the system that recovers the most, fastest.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookDemoButton />
            <WhatsAppButton accent="purple" />
          </div>
        </div>
      </Section>
    </>
  );
}

function ServiceCard({
  href,
  name,
  accent,
  live,
  icon,
  headline,
  body,
  points,
}: {
  href: string;
  name: string;
  accent: "coral" | "blue";
  live: boolean;
  icon: React.ReactNode;
  headline: string;
  body: string;
  points: string[];
}) {
  return (
    <div className="flex flex-col border border-grey-line p-8">
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-3 ${accentText(accent)}`}>
          <span className="flex h-9 w-9 items-center justify-center">
            {icon}
          </span>
          <span className="eyebrow">{name}</span>
        </div>
        {!live && (
          <span className="font-body text-xs font-semibold uppercase tracking-caption text-ink/50">
            Coming soon
          </span>
        )}
      </div>
      <h2 className="h3 mt-5">{headline}</h2>
      <p className="body mt-3 text-ink/70">{body}</p>
      <ul className="mt-6 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 ${accent === "coral" ? "bg-coral" : "bg-blue"}`}
            />
            <span className="body text-sm text-ink/80">{p}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold ${accentText(accent)}`}
      >
        {live ? "Explore Xynetra Recovery" : "See what's coming"}
        <IconArrow size={16} />
      </Link>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4 border-t border-paper/20 pt-5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg font-bold text-paper">{title}</h3>
        <p className="body mt-1 text-sm text-paper/70">{body}</p>
      </div>
    </div>
  );
}
