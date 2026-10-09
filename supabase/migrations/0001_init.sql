-- Skema konten website PT AAU + admin.
-- Bisa dijalankan ulang (idempotent) lewat `npm run db:setup` atau SQL Editor Supabase.

-- Admin: daftar email yang boleh mengelola konten -----------------------------
create table if not exists public.admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists "admins read self" on public.admins;
create policy "admins read self" on public.admins
  for select to authenticated using (public.is_admin());

-- updated_at otomatis ---------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Proyek ----------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  cargo_id text not null default '',
  cargo_en text not null default '',
  destination text,
  cover_url text not null,
  gallery text[] not null default '{}',
  sort integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

alter table public.projects enable row level security;

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "admin write projects" on public.projects;
create policy "admin write projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Testimoni -------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  company text not null default '',
  sort integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists testimonials_touch on public.testimonials;
create trigger testimonials_touch before update on public.testimonials
  for each row execute function public.touch_updated_at();

alter table public.testimonials enable row level security;

drop policy if exists "public read published testimonials" on public.testimonials;
create policy "public read published testimonials" on public.testimonials
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Info perusahaan (satu baris) ------------------------------------------------
create table if not exists public.settings (
  id smallint primary key default 1 check (id = 1),
  email text not null,
  phone text not null,
  phone_alt text not null default '',
  mobile text not null,
  whatsapp text not null check (whatsapp ~ '^[0-9]{8,15}$'),
  office_lines text[] not null default '{}',
  office_maps text not null default '',
  office_embed text not null default '',
  warehouse_lines text[] not null default '{}',
  warehouse_maps text not null default '',
  profile_pdf_id text not null default '',
  profile_pdf_en text not null default '',
  guestbook_form text not null default '',
  updated_at timestamptz not null default now()
);

drop trigger if exists settings_touch on public.settings;
create trigger settings_touch before update on public.settings
  for each row execute function public.touch_updated_at();

alter table public.settings enable row level security;

drop policy if exists "public read settings" on public.settings;
create policy "public read settings" on public.settings
  for select to anon, authenticated using (true);

drop policy if exists "admin update settings" on public.settings;
create policy "admin update settings" on public.settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Pesan dari form kontak ------------------------------------------------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  company text check (char_length(company) <= 160),
  email text check (char_length(email) <= 200),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 1 and 4000),
  locale text not null default 'id' check (locale in ('id', 'en')),
  read boolean not null default false,
  created_at timestamptz not null default now(),
  check (email is not null or phone is not null)
);

create index if not exists messages_created_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Pengunjung boleh mengirim, tapi tidak bisa membaca pesan siapa pun.
drop policy if exists "anyone can send message" on public.messages;
create policy "anyone can send message" on public.messages
  for insert to anon, authenticated with check (read = false);

drop policy if exists "admin manage messages" on public.messages;
create policy "admin manage messages" on public.messages
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Storage: bucket publik "media" untuk foto proyek & PDF ----------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
