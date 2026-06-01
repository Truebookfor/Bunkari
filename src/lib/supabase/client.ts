import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

// Browser/anon client. Public read ke liye (products, blog).
// Agar configure nahi hai to null — caller local seed data use karega.
export const supabase = isSupabaseConfigured
  ? createClient(env.supabaseUrl!, env.supabaseAnonKey!, {
      auth: { persistSession: false },
    })
  : null;
