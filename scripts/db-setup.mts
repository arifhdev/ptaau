// Menyiapkan database Supabase: skema + RLS + storage, data awal dari situs lama,
// dan akun admin. Aman dijalankan berulang kali (data yang sudah ada tidak ditimpa).
//
//   npm run db:setup
//
// Membaca .env.local: SUPABASE_DB_URL, NEXT_PUBLIC_SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY (opsional), ADMIN_EMAILS (dipisah koma).

import { readdirSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import postgres from "postgres";
import { defaultProjects, defaultSettings, defaultTestimonials } from "../src/lib/content.ts";

const env = (key: string) => {
  const v = process.env[key];
  if (!v) throw new Error(`Env ${key} belum diisi di .env.local`);
  return v;
};

const sql = postgres(env("SUPABASE_DB_URL"), { ssl: "require", max: 1, onnotice: () => {} });

try {
  console.log("1/4 Menjalankan migration…");
  const dir = new URL("../supabase/migrations/", import.meta.url);
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
    console.log(`   ${file}`);
    await sql.unsafe(readFileSync(new URL(file, dir), "utf8"));
  }

  console.log("2/4 Mengisi data awal…");
  const [{ count: projectCount }] = await sql`select count(*)::int from public.projects`;
  if (projectCount === 0) {
    for (const [i, p] of defaultProjects.entries()) {
      await sql`insert into public.projects ${sql({
        slug: p.slug,
        title: p.title,
        cargo_id: p.cargo.id,
        cargo_en: p.cargo.en,
        destination: p.destination ?? null,
        cover_url: p.cover,
        gallery: p.gallery,
        sort: (i + 1) * 10,
      })}`;
    }
    console.log(`   ${defaultProjects.length} proyek`);
  } else console.log(`   proyek sudah ada (${projectCount}), dilewati`);

  const [{ count: testimonialCount }] = await sql`select count(*)::int from public.testimonials`;
  if (testimonialCount === 0) {
    for (const [i, t] of defaultTestimonials.entries()) {
      await sql`insert into public.testimonials ${sql({ quote: t.quote, name: t.name, company: t.company, sort: (i + 1) * 10 })}`;
    }
    console.log(`   ${defaultTestimonials.length} testimoni`);
  } else console.log(`   testimoni sudah ada (${testimonialCount}), dilewati`);

  const s = defaultSettings;
  await sql`insert into public.settings ${sql({
    id: 1,
    email: s.email,
    phone: s.phone,
    phone_alt: s.phoneAlt,
    mobile: s.mobile,
    whatsapp: s.whatsapp,
    office_lines: s.office.lines,
    office_maps: s.office.maps,
    office_embed: s.office.embed,
    warehouse_lines: s.warehouse.lines,
    warehouse_maps: s.warehouse.maps,
    profile_pdf_id: s.profilePdf.id,
    profile_pdf_en: s.profilePdf.en,
    guestbook_form: s.guestbookForm,
  })} on conflict (id) do nothing`;

  console.log("3/4 Mendaftarkan admin…");
  const emails = env("ADMIN_EMAILS")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  for (const email of emails) await sql`insert into public.admins (email) values (${email}) on conflict do nothing`;

  console.log("4/4 Membuat akun login admin…");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.log("   SUPABASE_SERVICE_ROLE_KEY kosong, dilewati.");
    console.log("   Buat akunnya manual: Supabase → Authentication → Users → Add user → Create new user");
    console.log("   (centang Auto Confirm User) untuk: " + emails.join(", "));
  } else {
    const auth = createClient(env("NEXT_PUBLIC_SUPABASE_URL"), serviceKey, { auth: { persistSession: false } }).auth.admin;
    for (const email of emails) {
      const { data, error } = await auth.createUser({ email, email_confirm: true });
      if (data.user) await sql`update public.admins set user_id = ${data.user.id} where email = ${email}`;
      console.log(`   ${email}: ${error ? (error.code === "email_exists" ? "sudah ada" : error.message) : "dibuat"}`);
    }
  }

  // Sinkronkan user_id untuk akun yang dibuat manual lewat dashboard.
  await sql`update public.admins a set user_id = u.id from auth.users u where a.user_id is null and lower(u.email) = a.email`;

  console.log("\nSelesai. Login di /admin/login dengan email di atas.");
} finally {
  await sql.end();
}
