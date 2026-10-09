"use server";

import { refresh, updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loggedInByEmailLinkRecently, requireAdmin } from "@/lib/admin/auth";
import { TAGS } from "@/lib/data";
import { hasSupabase } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import { createSessionClient } from "@/lib/supabase/server";
import { createServiceClient, hasServiceKey } from "@/lib/supabase/service";

export type FormState = { ok?: boolean; error?: string; message?: string };

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const lines = (fd: FormData, key: string) =>
  text(fd, key)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

// Auth ------------------------------------------------------------------------

export async function sendMagicLink(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!hasSupabase) return { error: "Supabase belum dikonfigurasi." };
  const email = text(fd, "email").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Format email tidak valid." };

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("x-forwarded-host") ?? h.get("host")}`;
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    // Akun admin dibuat lewat `npm run db:setup`; email lain tidak bisa mendaftar sendiri.
    options: { shouldCreateUser: false, emailRedirectTo: `${origin}/auth/callback?next=/admin` },
  });

  if (error?.status === 429) return { error: "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi." };
  // Pesan sama untuk email terdaftar maupun tidak, supaya daftar admin tidak bisa ditebak.
  return { ok: true, message: `Jika ${email} terdaftar sebagai admin, link login sudah dikirim. Cek inbox Anda.` };
}

export async function signInWithPassword(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!hasSupabase) return { error: "Supabase belum dikonfigurasi." };
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: text(fd, "email").toLowerCase(),
    password: String(fd.get("password") ?? ""),
  });
  if (error) {
    if (error.status === 429) return { error: "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi." };
    return { error: "Email atau password salah." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// Proyek ----------------------------------------------------------------------

export async function saveProject(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(fd, "id");
  const slug = text(fd, "slug")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(text(fd, "gallery") || "[]");
  } catch {
    return { error: "Data galeri tidak valid." };
  }

  const row = {
    slug,
    title: text(fd, "title"),
    cargo_id: text(fd, "cargo_id"),
    cargo_en: text(fd, "cargo_en"),
    destination: text(fd, "destination") || null,
    cover_url: text(fd, "cover_url"),
    gallery,
    sort: Number(text(fd, "sort")) || 0,
    published: fd.get("published") === "on",
  };
  if (!row.title || !row.slug) return { error: "Judul dan slug wajib diisi." };
  if (!row.cover_url) return { error: "Foto cover wajib diunggah." };

  const { error } = id
    ? await supabase.from("projects").update(row).eq("id", id)
    : await supabase.from("projects").insert(row);
  if (error) {
    return { error: error.code === "23505" ? "Slug sudah dipakai proyek lain." : error.message };
  }
  updateTag(TAGS.projects);
  redirect("/admin/proyek");
}

export async function setProjectPublished(id: string, published: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ published }).eq("id", id);
  updateTag(TAGS.projects);
  refresh();
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").delete().eq("id", id);
  updateTag(TAGS.projects);
  refresh();
}

// Testimoni -------------------------------------------------------------------

export async function saveTestimonial(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(fd, "id");
  const row = {
    quote: text(fd, "quote"),
    name: text(fd, "name"),
    company: text(fd, "company"),
    sort: Number(text(fd, "sort")) || 0,
    published: fd.get("published") === "on",
  };
  if (!row.quote || !row.name) return { error: "Isi testimoni dan nama wajib diisi." };

  const { error } = id
    ? await supabase.from("testimonials").update(row).eq("id", id)
    : await supabase.from("testimonials").insert(row);
  if (error) return { error: error.message };
  updateTag(TAGS.testimonials);
  refresh();
  return { ok: true, message: "Tersimpan." };
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("testimonials").delete().eq("id", id);
  updateTag(TAGS.testimonials);
  refresh();
}

// Pengaturan ------------------------------------------------------------------

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const whatsapp = text(fd, "whatsapp").replace(/\D/g, "").replace(/^0/, "62");
  const row = {
    email: text(fd, "email"),
    phone: text(fd, "phone"),
    phone_alt: text(fd, "phone_alt"),
    mobile: text(fd, "mobile"),
    whatsapp,
    office_lines: lines(fd, "office_lines"),
    office_maps: text(fd, "office_maps"),
    office_embed: text(fd, "office_embed"),
    warehouse_lines: lines(fd, "warehouse_lines"),
    warehouse_maps: text(fd, "warehouse_maps"),
    profile_pdf_id: text(fd, "profile_pdf_id"),
    profile_pdf_en: text(fd, "profile_pdf_en"),
    guestbook_form: text(fd, "guestbook_form"),
  };
  if (!row.email || !row.phone || !row.mobile) return { error: "Email, telepon, dan HP wajib diisi." };
  if (!/^[0-9]{8,15}$/.test(whatsapp)) return { error: "Nomor WhatsApp tidak valid." };

  const { error } = await supabase.from("settings").update(row).eq("id", 1);
  if (error) return { error: error.message };
  updateTag(TAGS.settings);
  return { ok: true, message: "Pengaturan tersimpan dan sudah tampil di website." };
}

// Pesan -----------------------------------------------------------------------

export async function setMessageRead(id: string, read: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("messages").update({ read }).eq("id", id);
  refresh();
}

export async function deleteMessage(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("messages").delete().eq("id", id);
  refresh();
}

// Akun & pengguna admin -------------------------------------------------------

const MIN_PASSWORD = 8;

export async function changePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase, email } = await requireAdmin();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("password") ?? "");
  if (next.length < MIN_PASSWORD) return { error: `Password baru minimal ${MIN_PASSWORD} karakter.` };
  if (next !== String(fd.get("confirm") ?? "")) return { error: "Konfirmasi password tidak sama." };

  // Wajib password lama, kecuali baru saja masuk lewat link email (mis. lupa password).
  if (!(await loggedInByEmailLinkRecently(supabase))) {
    const { error } = await createPublicClient().auth.signInWithPassword({ email, password: current });
    if (error) return { error: "Password saat ini salah." };
  }

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) {
    return { error: error.code === "same_password" ? "Password baru harus berbeda dari yang lama." : error.message };
  }
  return { ok: true, message: "Password berhasil diganti." };
}

export async function addAdmin(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase, email: by } = await requireAdmin();
  if (!hasServiceKey) return { error: "SUPABASE_SERVICE_ROLE_KEY belum dipasang di server." };

  const email = text(fd, "email").toLowerCase();
  const name = text(fd, "name");
  const password = String(fd.get("password") ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Format email tidak valid." };
  if (password.length < MIN_PASSWORD) return { error: `Password awal minimal ${MIN_PASSWORD} karakter.` };

  const auth = createServiceClient().auth.admin;
  const { data, error } = await auth.createUser({ email, password, email_confirm: true, user_metadata: { name } });
  if (error && error.code !== "email_exists") return { error: error.message };

  // Kalau akunnya sudah ada (mis. pernah dibuat manual), cukup jadikan admin; password tidak diubah.
  const { error: insertError } = await supabase
    .from("admins")
    .upsert({ email, name: name || null, user_id: data.user?.id ?? null, created_by: by }, { onConflict: "email" });
  if (insertError) return { error: insertError.message };

  refresh();
  return {
    ok: true,
    message: data.user
      ? `${email} ditambahkan. Bagikan password awalnya secara pribadi dan minta ia menggantinya di menu Akun saya.`
      : `${email} sudah punya akun dan sekarang menjadi admin. Password-nya tidak diubah.`,
  };
}

export async function removeAdmin(email: string): Promise<FormState> {
  const { supabase, email: me } = await requireAdmin();
  if (email === me.toLowerCase()) return { error: "Anda tidak bisa menghapus akun sendiri." };

  const { data: target } = await supabase.from("admins").select("user_id").eq("email", email).maybeSingle();
  const { error } = await supabase.from("admins").delete().eq("email", email);
  if (error) return { error: error.message };

  // Hapus juga akun login-nya agar tidak bisa masuk lagi.
  if (target?.user_id && hasServiceKey) await createServiceClient().auth.admin.deleteUser(target.user_id);
  refresh();
  return { ok: true };
}
