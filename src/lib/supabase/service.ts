import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./env";

// Akses penuh (melewati RLS). Hanya dipakai di Server Action setelah requireAdmin().
export const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY belum diisi.");
  return createClient(supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
