// Site-wide constants. Conversion links per the brief.

export const SITE = {
  name: "Xynetra",
  tagline: "Automate Smarter. Scale Faster.",
  domain: "xynetra.com",
  url: "https://xynetra.com",
  description:
    "Xynetra builds AI systems that turn missed moments into booked revenue — appointments kept, leads answered in under 60 seconds, slots refilled automatically.",
  email: "hello@xynetra.com",
  brandEmail: "brand@xynetra.com",
};

// Primary CTA (sitewide) → Google Calendar booking
export const BOOK_DEMO_URL = "https://calendar.app.google/uyPruZcWWqRrTPty9";

// Secondary CTA → WhatsApp chat with prefilled message
const WHATSAPP_NUMBER = "923399113300";
export function whatsappUrl(
  message = "Hi Xynetra — I'd like to know how you can recover missed appointments and leads for my business."
) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export const WHATSAPP_URL = whatsappUrl();

// Accent per surface — one accent per surface (brand book p.11).
export type Accent = "purple" | "coral" | "blue";
export const ACCENT_HEX: Record<Accent, string> = {
  purple: "#763AA5", // masterbrand / company-level
  coral: "#E95E57", // Xynetra Recovery only
  blue: "#6280D8", // Xynetra Lead-to-Booking only
};

export const PRODUCTS = {
  recovery: {
    slug: "recovery",
    name: "Xynetra Recovery",
    descriptor: "Recovery",
    accent: "coral" as Accent,
    summary: "No-show prevention & slot recovery",
    live: true,
  },
  leadToBooking: {
    slug: "lead-to-booking",
    name: "Xynetra Lead-to-Booking",
    descriptor: "Lead-to-Booking",
    accent: "blue" as Accent,
    summary: "Inbound leads to confirmed bookings on WhatsApp",
    live: false, // Coming soon
  },
};
