import { BOOK_DEMO_URL, whatsappUrl } from "@/lib/constants";
import { IconWhatsApp, IconArrow } from "./Icon";

// Primary CTA — Book a demo (Google Calendar). Inter SemiBold.
export function BookDemoButton({
  className = "",
  variant = "primary",
  label = "Book a demo",
}: {
  className?: string;
  variant?: "primary" | "outline" | "reversed";
  label?: string;
}) {
  const cls =
    variant === "outline"
      ? "btn-outline"
      : variant === "reversed"
      ? "btn bg-paper text-ink hover:bg-grey-line"
      : "btn-primary";
  return (
    <a
      href={BOOK_DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} ${className}`}
    >
      {label}
      <IconArrow size={18} />
    </a>
  );
}

// Secondary CTA — WhatsApp chat with a short prefilled message.
export function WhatsAppButton({
  className = "",
  message,
  label = "Chat on WhatsApp",
  accent = "ink",
}: {
  className?: string;
  message?: string;
  label?: string;
  accent?: "ink" | "purple" | "coral" | "blue" | "reversed";
}) {
  const color =
    accent === "purple"
      ? "border-2 border-purple text-purple hover:bg-purple hover:text-paper"
      : accent === "coral"
      ? "border-2 border-coral text-coral hover:bg-coral hover:text-paper"
      : accent === "blue"
      ? "border-2 border-blue text-blue hover:bg-blue hover:text-paper"
      : accent === "reversed"
      ? "border-2 border-paper text-paper hover:bg-paper hover:text-ink"
      : "btn-outline";
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${color} ${className}`}
    >
      <IconWhatsApp size={18} />
      {label}
    </a>
  );
}
