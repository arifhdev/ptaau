import "server-only";
import { redirect } from "next/navigation";
import { hasSupabase } from "@/lib/supabase/env";
import { createSessionClient } from "@/lib/supabase/server";

// Data Access Layer admin: setiap halaman & action admin wajib lewat sini.
// RLS di database tetap menjadi pengaman terakhir.
export async function getAdmin() {
  if (!hasSupabase) return null;
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) return null;
  return { supabase, email: user.email };
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
