// src/lib/supabase/service.ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// SERVER-ONLY. Do not import from client components.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function assertKeys() {
  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }
}

// Full DB access (bypasses RLS). Typed as any to avoid schema-generic friction.
export function createServiceClient(): any {
  assertKeys();
  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Reads auth.users (emails). Service role + auth schema.
export function createAuthAdminClient(): any {
  assertKeys();
  return createSupabaseClient(url, serviceKey, {
    db: { schema: "auth" },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}