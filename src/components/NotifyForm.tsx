"use client";

import { useState } from "react";
import type { Accent } from "@/lib/constants";
import { IconCheck } from "./Icon";

const BG: Record<Accent, string> = {
  purple: "bg-purple",
  coral: "bg-coral",
  blue: "bg-blue",
};

// Lightweight early-access capture. Stores the address in Supabase if a
// public `waitlist` table exists; otherwise just confirms to the visitor.
export function NotifyForm({
  accent = "blue",
  product,
}: {
  accent?: Accent;
  product: string;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product }),
      });
    } catch {
      // Non-critical — confirm regardless so the visitor isn't blocked.
    }
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-start gap-3">
        <IconCheck className={accent === "blue" ? "text-blue" : "text-purple"} />
        <div>
          <p className="font-display text-lg font-bold">You&rsquo;re on the list.</p>
          <p className="body mt-1 text-sm text-ink/70">
            We&rsquo;ll email you the moment {product} opens in your area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="eyebrow text-ink/60">Work email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@business.com"
          className="mt-2 w-full border border-grey-line bg-paper px-4 py-3 font-body text-base text-ink outline-none focus:border-ink"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className={`btn w-full text-paper ${BG[accent]} hover:opacity-90 disabled:opacity-60`}
      >
        {loading ? "Adding you…" : "Notify me at launch"}
      </button>
    </form>
  );
}
