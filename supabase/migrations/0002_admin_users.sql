-- Data tambahan untuk halaman "Pengguna admin".
alter table public.admins
  add column if not exists name text,
  add column if not exists user_id uuid references auth.users (id) on delete set null,
  add column if not exists created_by text;

-- Lengkapi user_id untuk admin yang akunnya sudah ada.
update public.admins a
set user_id = u.id
from auth.users u
where a.user_id is null and lower(u.email) = a.email;

-- Admin boleh menambah/menghapus admin lain (aplikasi mencegah menghapus diri sendiri).
drop policy if exists "admins manage admins" on public.admins;
create policy "admins manage admins" on public.admins
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Jangan sampai tidak ada admin sama sekali.
create or replace function public.keep_one_admin()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.admins) = 0 then
    raise exception 'Minimal harus ada satu admin.';
  end if;
  return null;
end;
$$;

drop trigger if exists admins_keep_one on public.admins;
create constraint trigger admins_keep_one after delete on public.admins
  for each row execute function public.keep_one_admin();
