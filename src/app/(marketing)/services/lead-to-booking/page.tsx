import type { Metadata } from "next";
import { Section, Eyebrow, AccentRule, Stat } from "@/components/ui";
import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";
import { NotifyForm } from "@/components/NotifyForm";
import { IconSpeed, IconChat, IconCalendar } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Xynetra Lead-to-Booking — Coming soon",
  description:
    "Xynetra Lead-to-Booking answers inbound leads in under 60 seconds and books the job on WhatsApp. Launching soon for home-services contractors. Book a demo to get early access.",
};

const ACCENT_MSG =
  "Hi Xynetra — I want early access to Xynetra Lead-to-Booking for my business.";

export default function LeadToBookingPage() {
  return (
    <>
      {/* HERO — blue accent only; clearly marked Coming soon */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Eyebrow accent="blue">Xynetra Lead-to-Booking</Eyebrow>
              <span className="inline-flex items-center gap-2 border border-blue px-2.5 py-1 font-body text-xs font-semibold uppercase tracking-caption text-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                Coming soon
              </span>
            </div>
            <h1 className="h1 mt-5">
              Answer every lead in under 60 seconds.
            </h1>
            <p className="body-lg mt-6 max-w-xl text-ink/80">
              A lead that waits an hour calls your competitor. Xynetra
              Lead-to-Booking replies in seconds, qualifies the job, and books
              it on WhatsApp — day or night. We&rsquo;re onboarding early
              contractors now.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookDemoButton label="Book a demo for early access" />
              <WhatsAppButton accent="blue" message={ACCENT_MSG} />
            </div>
          </div>

          <div className="grid content-start gap-5">
            <Stat
              value="< 60s"
              label="reply time to a new lead, day or night"
              accent="blue"
            />
            <Stat
              value="1st"
              label="business to reply usually wins the job"
              accent="blue"
            />
            <Stat
              value="24/7"
              label="booking straight to your calendar"
              accent="blue"
            />
          </div>
        </div>
      </Section>

      {/* WHAT'S COMING */}
      <Section dark>
        <Eyebrow accent="blue">What&rsquo;s coming</Eyebrow>
        <h2 className="h2 mt-4 max-w-2xl text-paper">
          From first message to booked job — automatically.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Feature
            icon={<IconSpeed className="text-blue" />}
            t="Instant first reply"
            d="Every inbound lead — from your site, an ad, or WhatsApp — gets a real answer in under 60 seconds."
          />
          <Feature
            icon={<IconChat className="text-blue" />}
            t="Qualifies the job"
            d="It asks the right questions, captures the details, and filters out time-wasters before they reach you."
          />
          <Feature
            icon={<IconCalendar className="text-blue" />}
            t="Books the calendar"
            d="Qualified leads get booked straight onto your calendar and confirmed — no back-and-forth."
          />
        </div>
      </Section>

      {/* NOTIFY / EARLY ACCESS */}
      <Section className="border-t border-grey-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow accent="blue">Get early access</Eyebrow>
            <h2 className="h2 mt-4">Be first in line when it launches.</h2>
            <AccentRule accent="blue" />
            <p className="body mt-8 text-ink/70">
              Leave your email and we&rsquo;ll tell you the moment
              Lead-to-Booking opens in your area. Want to talk sooner? Book a
              demo — we&rsquo;re taking a small number of early contractors now.
            </p>
          </div>
          <div className="bg-grey-light p-8">
            <NotifyForm accent="blue" product="Xynetra Lead-to-Booking" />
          </div>
        </div>
      </Section>
    </>
  );
}

function Feature({
  icon,
  t,
  d,
}: {
  icon: React.ReactNode;
  t: string;
  d: string;
}) {
  return (
    <div className="border-t-2 border-blue pt-5">
      <span className="flex h-9 w-9 items-center justify-center">{icon}</span>
      <h3 className="h3 mt-4 text-paper">{t}</h3>
      <p className="body mt-2 text-paper/70">{d}</p>
    </div>
  );
}
