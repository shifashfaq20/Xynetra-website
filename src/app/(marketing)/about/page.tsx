import type { Metadata } from "next";
import { Section, Eyebrow, AccentRule } from "@/components/ui";
import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Xynetra gives small businesses the operational leverage of a large one — by automating the complex, time-consuming tasks that stand between them and scale.",
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Eyebrow>About Xynetra</Eyebrow>
        <h1 className="h1 mt-4 max-w-3xl">
          We finish the work no one has time to do.
        </h1>
        <AccentRule />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-5">
            <p className="body-lg text-ink/80">
              Every small business loses money to the same invisible leak: work
              that has to happen, but that no one has time to do. The reminder
              that never got sent. The lead that sat unanswered overnight. The
              cancelled slot nobody refilled.
            </p>
            <p className="body text-ink/70">
              Xynetra builds AI systems that do this work automatically —
              around the clock, on the channels customers already use. We
              don&rsquo;t sell chatbots or dashboards. We sell specific,
              finished outcomes: appointments kept, leads booked, revenue
              recovered.
            </p>
            <p className="body text-ink/70">
              The name joins <strong>X</strong> — the unknown variable every
              business wants solved — with <em>netra</em>, Sanskrit for
              &ldquo;eye.&rdquo; Xynetra watches the moments a business
              can&rsquo;t, and acts on them.
            </p>
          </div>
          <div className="bg-ink p-8 text-paper">
            <Eyebrow accent="purple">Mission</Eyebrow>
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-paper">
              Give small businesses the operational leverage of a large one — by
              automating the complex, time-consuming tasks that stand between
              them and scale.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-grey-line">
        <Eyebrow>What we promise</Eyebrow>
        <h2 className="h2 mt-4 max-w-2xl">Three commitments, on every product.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Promise
            t="Outcome first"
            d="Every product is named for the job it finishes, not the tech inside it."
          />
          <Promise
            t="Always on"
            d="Systems that respond in seconds, at 2 a.m., on a Sunday."
          />
          <Promise
            t="Measured in money"
            d="We report recovered revenue and booked jobs — not messages sent."
          />
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <Eyebrow accent="purple">Who we serve</Eyebrow>
            <h2 className="h2 mt-4 text-paper">Small businesses, three ways.</h2>
            <AccentRule />
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-2">
            <Audience
              t="Appointment businesses"
              d="Clinics, salons, studios, and dental practices in the US, UK, and Pakistan."
            />
            <Audience
              t="Home-services contractors"
              d="HVAC, plumbing, roofing, and electrical firms in the US and UK."
            />
            <Audience
              t="E-commerce brands"
              d="DTC and marketplace sellers in WhatsApp-first markets."
            />
          </div>
        </div>
      </Section>

      <Section className="border-t border-grey-line">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="h2 max-w-xl">Let&rsquo;s find your leak.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookDemoButton />
            <WhatsAppButton accent="purple" />
          </div>
        </div>
      </Section>
    </>
  );
}

function Promise({ t, d }: { t: string; d: string }) {
  return (
    <div className="border-t-2 border-purple pt-5">
      <h3 className="h3">{t}</h3>
      <p className="body mt-2 text-ink/70">{d}</p>
    </div>
  );
}

function Audience({ t, d }: { t: string; d: string }) {
  return (
    <div className="border-t border-paper/20 pt-4">
      <h3 className="font-display text-lg font-bold text-paper">{t}</h3>
      <p className="body mt-2 text-sm text-paper/70">{d}</p>
    </div>
  );
}
