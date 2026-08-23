// // src/lib/supabase/service.ts
// import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// // SERVER-ONLY. Do not import from client components.
// const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// function assertKeys() {
//   if (!url || !serviceKey) {
//     throw new Error(
//       "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
//     );
//   }
// }

// // Full DB access (bypasses RLS). Typed as any to avoid schema-generic friction.
// export function createServiceClient(): any {
//   assertKeys();
//   return createSupabaseClient(url, serviceKey, {
//     auth: { persistSession: false, autoRefreshToken: false },
//   });
// }

// // Reads auth.users (emails). Service role + auth schema.
// export function createAuthAdminClient(): any {
//   assertKeys();
//   return createSupabaseClient(url, serviceKey, {
//     db: { schema: "auth" },
//     auth: { persistSession: false, autoRefreshToken: false },
//   });
// }



import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function env() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url) throw new Error("CONFIG: NEXT_PUBLIC_SUPABASE_URL is not set at runtime");
  if (!key) throw new Error("CONFIG: SUPABASE_SERVICE_ROLE_KEY is not set at runtime");
  return { url, key };
}

/** Full DB access, bypasses RLS. Server-only. */
export function createServiceClient(): any {
  const { url, key } = env();
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * @deprecated Alias of createServiceClient.
 * The old version passed `db: { schema: "auth" }`, which never worked —
 * PostgREST only exposes `public` and `graphql_public`, so any
 * `.from("users")` call against it failed at runtime.
 * Use `createServiceClient().auth.admin.*` to reach auth users.
 */
export function createAuthAdminClient(): any {
  return createServiceClient();
}

/** Convenience: look up an auth user's email by id. */
export async function getUserEmailById(userId: string): Promise<string | null> {
  const svc = createServiceClient();
  const { data, error } = await svc.auth.admin.getUserById(userId);
  if (error) {
    console.error("[XYNETRA] getUserEmailById", error.message);
    return null;
  }
  return data?.user?.email ?? null;
}