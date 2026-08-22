import type { Metadata } from "next";
import { Section, Eyebrow, AccentRule, Stat } from "@/components/ui";
import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";
import { IconCheck, IconReminder, IconCalendar, IconMoney } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Xynetra Recovery — No-show prevention & slot recovery",
  description:
    "Xynetra Recovery confirms, reminds, and refills cancelled slots automatically on WhatsApp. Recover the 10–20% of booked revenue that no-shows cost service businesses.",
};

const ACCENT_MSG =
  "Hi Xynetra — I run an appointment business and want to cut no-shows with Xynetra Recovery.";

export default function RecoveryPage() {
  return (
    <>
      {/* HERO — coral accent only on this surface */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Eyebrow accent="coral">Xynetra Recovery</Eyebrow>
            <h1 className="h1 mt-5">
              Recover the revenue you&rsquo;re losing to no-shows.
            </h1>
            <p className="body-lg mt-6 max-w-xl text-ink/80">
              Missed appointments cost service businesses 10–20% of booked
              revenue. Xynetra Recovery confirms, reminds, and refills cancelled
              slots — automatically, on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookDemoButton />
              <WhatsAppButton accent="coral" message={ACCENT_MSG} />
            </div>
          </div>

          <div className="grid content-start gap-5">
            <Stat
              value="10–20%"
              label="of booked revenue lost to no-shows"
              accent="coral"
            />
            <Stat
              value="~12 hrs"
              label="a week your front desk stops chasing confirmations"
              accent="coral"
            />
            <Stat
              value="24/7"
              label="confirmations and reminders, even at 2 a.m."
              accent="coral"
            />
          </div>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section dark>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow accent="coral">The problem</Eyebrow>
            <h2 className="h2 mt-4 text-paper">
              Empty chairs don&rsquo;t announce themselves.
            </h2>
            <AccentRule accent="coral" />
          </div>
          <div className="space-y-5">
            <p className="body-lg text-paper/80">
              A patient forgets. A client cancels an hour before. The slot sits
              empty, and no one has time to refill it. By the end of the week
              that&rsquo;s real money gone — quietly.
            </p>
            <p className="body text-paper/70">
              Your front desk can&rsquo;t call every booking to confirm, chase
              every reschedule, and work a waitlist at the same time. Xynetra
              Recovery does all three, automatically.
            </p>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section className="border-t border-grey-line">
        <Eyebrow accent="coral">How the flow works</Eyebrow>
        <h2 className="h2 mt-4 max-w-2xl">
          Confirm, remind, refill — without lifting a finger.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Step
            icon={<IconCheck className="text-coral" />}
            n="01"
            t="Confirm on booking"
            d="Every new appointment gets a plain-language WhatsApp confirmation. One tap to confirm, one to reschedule."
          />
          <Step
            icon={<IconReminder className="text-coral" />}
            n="02"
            t="Remind before the slot"
            d="A 24-hour reminder goes out automatically. Anyone who needs to move gets rescheduled on the spot."
          />
          <Step
            icon={<IconCalendar className="text-coral" />}
            n="03"
            t="Refill cancellations"
            d="When someone cancels, Recovery offers the open slot to your waitlist and books the first taker."
          />
        </div>
      </Section>

      {/* BEFORE / AFTER */}
      <Section className="border-t border-grey-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow accent="coral">The message your customer gets</Eyebrow>
            <h2 className="h2 mt-4">Reads like a text, not a brochure.</h2>
            <AccentRule accent="coral" />
            <p className="body mt-8 text-ink/70">
              Short lines, one question, real names and times. Because it feels
              human, people actually reply — and confirmed appointments show up.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <IconMoney className="text-coral" size={22} />
              <span className="body text-sm text-ink/70">
                Every reply is logged as recovered revenue in your dashboard.
              </span>
            </div>
          </div>

          {/* WhatsApp mock — chat has no logo; the copy carries the brand. */}
          <div className="rounded-lg bg-ink p-4 sm:p-6">
            <div className="mx-auto max-w-sm space-y-3">
              <Bubble side="in">
                Hi Sara — you&rsquo;re booked tomorrow at 3:00 PM with Dr. Khan.
                <br />
                Reply <strong>1</strong> to confirm, <strong>2</strong> to
                reschedule. Takes 5 seconds.
              </Bubble>
              <Bubble side="out">1</Bubble>
              <Bubble side="in">
                Confirmed ✓ See you tomorrow. Running late? Just message us here.
              </Bubble>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-ink text-paper">
        <div className="container-x flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="h2 max-w-xl text-paper">
              See how much no-shows are costing you.
            </h2>
            <p className="body-lg mt-4 max-w-lg text-paper/75">
              Book a 20-minute walkthrough. We&rsquo;ll estimate the revenue
              Xynetra Recovery would bring back — using your numbers.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookDemoButton variant="reversed" />
            <WhatsAppButton accent="reversed" message={ACCENT_MSG} />
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  icon,
  n,
  t,
  d,
}: {
  icon: React.ReactNode;
  n: string;
  t: string;
  d: string;
}) {
  return (
    <div className="border-t-2 border-coral pt-5">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center">{icon}</span>
        <span className="font-display text-2xl font-bold text-ink/20">{n}</span>
      </div>
      <h3 className="h3 mt-4">{t}</h3>
      <p className="body mt-2 text-ink/70">{d}</p>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "in" | "out";
  children: React.ReactNode;
}) {
  return (
    <div className={`flex ${side === "out" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${
          side === "out"
            ? "rounded-br-sm bg-[#DCF8C6] text-ink"
            : "rounded-bl-sm bg-paper text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
