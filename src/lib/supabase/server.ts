import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseAdminConfigured } from "@/lib/env";

// Server-only admin client (service role). RLS bypass karta hai.
// SIRF server (API routes / server components / server actions) me use karo.
export function getAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(env.supabaseUrl!, env.supabaseServiceKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
