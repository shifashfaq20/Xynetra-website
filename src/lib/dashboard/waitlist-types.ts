// Plain TS module — NO "use server" directive.
// All shared types, constants, and helpers for the waitlist live here.

/** Allowed auto-remove windows (days) */
export const WAITLIST_TTL_OPTIONS = [7, 15, 30, 45, 60] as const;
export type WaitlistTtlDays = (typeof WAITLIST_TTL_OPTIONS)[number];

export const DEFAULT_TTL: WaitlistTtlDays = 15;

export type WaitlistEntry = {
  id: string;
  name: string;
  phone: string;
  created_at: string;
};

export type WaitlistPayload = {
  entries: WaitlistEntry[];
  autoExpire: boolean;
  ttlDays: WaitlistTtlDays;
};

export function normalizeTtl(value: unknown): WaitlistTtlDays {
  const n = Number(value);
  if ((WAITLIST_TTL_OPTIONS as readonly number[]).includes(n)) {
    return n as WaitlistTtlDays;
  }
  return DEFAULT_TTL;
}