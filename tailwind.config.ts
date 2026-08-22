import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        // Sub-brand accents — one per surface (see brand book p.11)
        purple: "#763AA5", // Circuit Purple — masterbrand
        coral: "#E95E57", // Signal Coral — Xynetra Recovery
        blue: "#6280D8", // Data Blue — Xynetra Lead-to-Booking
        grey: {
          DEFAULT: "#6B6B6B",
          light: "#F2F2F2",
          mid: "#9A9A9A",
          line: "#E6E6E6",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
        body: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
        eyebrow: "0.2em", // +20% tracking for eyebrow labels
        caption: "0.15em",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
