import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./env";

// Klien tanpa sesi: hanya bisa membaca data publik & mengirim pesan (dibatasi RLS).
export function createPublicClient() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
