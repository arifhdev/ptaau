import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import {
  defaultProjects,
  defaultSettings,
  defaultTestimonials,
  type Project,
  type Settings,
  type Testimonial,
} from "./content";
import { createPublicClient } from "./supabase/public";
import { hasSupabase } from "./supabase/env";

// Tag cache: admin memanggil updateTag(tag) setelah menyimpan agar situs langsung ter-update.
export const TAGS = { projects: "projects", testimonials: "testimonials", settings: "settings" } as const;

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  cargo_id: string;
  cargo_en: string;
  destination: string | null;
  cover_url: string;
  gallery: string[];
  sort: number;
  published: boolean;
};

export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  company: string;
  sort: number;
  published: boolean;
};

export type SettingsRow = {
  email: string;
  phone: string;
  phone_alt: string;
  mobile: string;
  whatsapp: string;
  office_lines: string[];
  office_maps: string;
  office_embed: string;
  warehouse_lines: string[];
  warehouse_maps: string;
  profile_pdf_id: string;
  profile_pdf_en: string;
  guestbook_form: string;
};

export const toProject = (r: ProjectRow): Project => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  cover: r.cover_url,
  gallery: r.gallery ?? [],
  destination: r.destination ?? undefined,
  cargo: { id: r.cargo_id, en: r.cargo_en },
});

export const toSettings = (r: SettingsRow): Settings => ({
  email: r.email,
  phone: r.phone,
  phoneAlt: r.phone_alt,
  mobile: r.mobile,
  whatsapp: r.whatsapp,
  office: { lines: r.office_lines, maps: r.office_maps, embed: r.office_embed },
  warehouse: { lines: r.warehouse_lines, maps: r.warehouse_maps },
  profilePdf: { id: r.profile_pdf_id, en: r.profile_pdf_en },
  guestbookForm: r.guestbook_form,
});

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(TAGS.projects);
  cacheLife("max");
  if (!hasSupabase) return defaultProjects;

  const { data, error } = await createPublicClient()
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort")
    .order("created_at");
  if (error) throw new Error(`Gagal memuat proyek: ${error.message}`);
  return (data as ProjectRow[]).map(toProject);
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag(TAGS.testimonials);
  cacheLife("max");
  if (!hasSupabase) return defaultTestimonials;

  const { data, error } = await createPublicClient()
    .from("testimonials")
    .select("id, quote, name, company")
    .eq("published", true)
    .order("sort")
    .order("created_at");
  if (error) throw new Error(`Gagal memuat testimoni: ${error.message}`);
  return data;
}

export async function getSettings(): Promise<Settings> {
  "use cache";
  cacheTag(TAGS.settings);
  cacheLife("max");
  if (!hasSupabase) return defaultSettings;

  const { data, error } = await createPublicClient().from("settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(`Gagal memuat pengaturan: ${error.message}`);
  return data ? toSettings(data as SettingsRow) : defaultSettings;
}
