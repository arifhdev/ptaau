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

// True bila sesi terakhir dibuat lewat link email (magic link / lupa password) dalam 15 menit terakhir.
export async function loggedInByEmailLinkRecently(supabase: Awaited<ReturnType<typeof createSessionClient>>) {
  const { data } = await supabase.auth.getClaims();
  const amr = (data?.claims.amr ?? []) as { method: string; timestamp: number }[];
  const latest = [...amr].sort((a, b) => b.timestamp - a.timestamp)[0];
  return Boolean(
    latest && ["otp", "magiclink", "recovery"].includes(latest.method) && Date.now() / 1000 - latest.timestamp < 15 * 60,
  );
}
