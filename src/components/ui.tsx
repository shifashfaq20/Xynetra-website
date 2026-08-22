import { type ReactNode } from "react";
import { type Accent } from "@/lib/constants";

const ACCENT_TEXT: Record<Accent, string> = {
  purple: "text-purple",
  coral: "text-coral",
  blue: "text-blue",
};
const ACCENT_BORDER: Record<Accent, string> = {
  purple: "border-purple",
  coral: "border-coral",
  blue: "border-blue",
};
const ACCENT_BG: Record<Accent, string> = {
  purple: "bg-purple",
  coral: "bg-coral",
  blue: "bg-blue",
};

export function accentText(a: Accent) {
  return ACCENT_TEXT[a];
}
export function accentBorder(a: Accent) {
  return ACCENT_BORDER[a];
}
export function accentBg(a: Accent) {
  return ACCENT_BG[a];
}

// Eyebrow label — all caps, +20% tracking. Uses the single surface accent.
export function Eyebrow({
  children,
  accent = "purple",
  className = "",
}: {
  children: ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${ACCENT_TEXT[accent]} ${className}`}>{children}</p>
  );
}

export function Section({
  children,
  className = "",
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-ink text-paper" : "bg-paper text-ink"} ${className}`}
    >
      <div className="container-x py-16 sm:py-24">{children}</div>
    </section>
  );
}

// A short accent rule with an end node — echoes the brand book's divider.
export function AccentRule({ accent = "purple" }: { accent?: Accent }) {
  return (
    <div className="mt-6 flex items-center gap-0">
      <span className={`h-[3px] w-16 ${ACCENT_BG[accent]}`} />
      <span className={`h-2.5 w-2.5 rounded-full ${ACCENT_BG[accent]}`} />
    </div>
  );
}

// Big outcome number for stats. Space Grotesk (font-display) per hierarchy.
export function Stat({
  value,
  label,
  accent = "purple",
}: {
  value: string;
  label: string;
  accent?: Accent;
}) {
  return (
    <div className="border-t border-grey-line pt-5">
      <div className={`font-display text-4xl font-bold ${ACCENT_TEXT[accent]}`}>
        {value}
      </div>
      <div className="mt-2 font-body text-sm text-ink/70">{label}</div>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-grey-light p-7 ${className}`}>{children}</div>
  );
}
