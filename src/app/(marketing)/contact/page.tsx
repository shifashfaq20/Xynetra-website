import type { Metadata } from "next";
import { Section, Eyebrow, AccentRule } from "@/components/ui";
import { BookDemoButton, WhatsAppButton } from "@/components/CtaButtons";
import { SITE, BOOK_DEMO_URL } from "@/lib/constants";
import { IconChat, IconCalendar, IconMoney } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Xynetra. Book a 20-minute demo, message us on WhatsApp, or email the team. We reply fast.",
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="h1 mt-4 max-w-2xl">
          Two ways to start. Both are fast.
        </h1>
        <AccentRule />
        <p className="body-lg mt-8 max-w-2xl text-ink/80">
          Book a 20-minute walkthrough and we&rsquo;ll show you the revenue a
          Xynetra system would recover. Prefer to type? Message us on WhatsApp —
          you&rsquo;ll get a real reply, fast.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-between border border-grey-line p-8">
            <div>
              <span className="flex h-10 w-10 items-center justify-center text-purple">
                <IconCalendar />
              </span>
              <h2 className="h3 mt-4">Book a demo</h2>
              <p className="body mt-2 text-ink/70">
                A 20-minute call. We map where revenue leaks in your business
                and estimate what Xynetra would recover.
              </p>
            </div>
            <BookDemoButton className="mt-8 w-full sm:w-auto" />
          </div>

          <div className="flex flex-col justify-between border border-grey-line p-8">
            <div>
              <span className="flex h-10 w-10 items-center justify-center text-purple">
                <IconChat />
              </span>
              <h2 className="h3 mt-4">Chat on WhatsApp</h2>
              <p className="body mt-2 text-ink/70">
                Ask anything. We answer on the same channel your customers use —
                usually within minutes during business hours.
              </p>
            </div>
            <WhatsAppButton accent="purple" className="mt-8 w-full sm:w-auto" />
          </div>
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow accent="purple">Other ways to reach us</Eyebrow>
            <h2 className="h2 mt-4 text-paper">Prefer email or already a client?</h2>
            <AccentRule />
          </div>
          <div className="grid content-start gap-5">
            <Row
              icon={<IconMoney className="text-purple" />}
              label="General enquiries"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <Row
              icon={<IconChat className="text-purple" />}
              label="Brand & usage"
              value={SITE.brandEmail}
              href={`mailto:${SITE.brandEmail}`}
            />
            <Row
              icon={<IconCalendar className="text-purple" />}
              label="Book a demo"
              value="calendar.app.google"
              href={BOOK_DEMO_URL}
            />
          </div>
        </div>
        <p className="body mt-10 text-sm text-paper/60">
          Serving small businesses across the US, UK, and Pakistan.
        </p>
      </Section>
    </>
  );
}

function Row({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 border-t border-paper/20 pt-5 transition-colors hover:text-purple"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span>
        <span className="block eyebrow text-paper/50">{label}</span>
        <span className="mt-1 block font-body text-base text-paper">{value}</span>
      </span>
    </a>
  );
}
