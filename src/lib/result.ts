export type Result<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string; detail?: string };

export const ok = <T>(data: T): Result<T> => ({ ok: true, data });

export const bad = (error: string, code?: string, detail?: string): Result<never> => ({
  ok: false,
  error,
  code,
  detail,
});

/** Normalises Error / PostgrestError / AuthError / anything into readable text. */
export function describe(e: unknown): { error: string; code?: string; detail?: string } {
  if (typeof e === "string") return { error: e };

  if (e && typeof e === "object") {
    const o = e as any;

    if (typeof o.message === "string" && o.message && o.message !== "{}") {
      return {
        error: o.message,
        code: o.code ?? o.status ?? o.cause?.code,
        detail: [o.details, o.hint].filter(Boolean).join(" · ") || undefined,
      };
    }

    if (o.cause?.code) {
      return {
        error: `Network error: ${o.cause.code}`,
        code: o.cause.code,
        detail: o.cause.hostname,
      };
    }

    try {
      const s = JSON.stringify(o);
      if (s && s !== "{}" && s !== "null") return { error: s };
    } catch {
      /* circular */
    }
  }

  return { error: "Unexpected error" };
}

/** Logs the full shape server-side; returns a client-safe Result. */
export function fail(scope: string, e: unknown): Result<never> {
  const d = describe(e);
  console.error(`[XYNETRA] ${scope}`, JSON.stringify({ ...d, raw: String(e) }));
  return { ok: false, ...d };
}