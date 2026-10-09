"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import {
  addAdmin,
  changePassword,
  deleteMessage,
  deleteProject,
  deleteTestimonial,
  saveProject,
  saveSettings,
  saveTestimonial,
  removeAdmin,
  sendMagicLink,
  setMessageRead,
  signInWithPassword,
  setProjectPublished,
  type FormState,
} from "@/lib/actions/admin";
import type { ProjectRow, SettingsRow, TestimonialRow } from "@/lib/data";
import { GalleryInput, MediaInput } from "./MediaInput";
import { buttonClass, Field, inputClass, Notice } from "./ui";

function Feedback({ state }: { state: FormState }) {
  if (state.error) return <Notice tone="error">{state.error}</Notice>;
  if (state.ok && state.message) return <Notice tone="ok">{state.message}</Notice>;
  return null;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Login -----------------------------------------------------------------------

export function LoginForm() {
  const [mode, setMode] = useState<"password" | "link">("password");
  return mode === "password" ? (
    <PasswordLogin onForgot={() => setMode("link")} />
  ) : (
    <MagicLinkLogin onBack={() => setMode("password")} />
  );
}

function PasswordLogin({ onForgot }: { onForgot: () => void }) {
  const [state, action, pending] = useActionState(signInWithPassword, {});
  return (
    <form action={action} className="space-y-4">
      <Field label="Email">
        <input name="email" type="email" required autoComplete="username" autoFocus className={inputClass} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </Field>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className={`${buttonClass.accent} w-full py-3`}>
        {pending ? "Masuk…" : "Masuk"}
      </button>
      <button type="button" onClick={onForgot} className="w-full text-sm text-steel underline-offset-4 hover:text-ink hover:underline">
        Lupa password? Masuk lewat link email
      </button>
    </form>
  );
}

function MagicLinkLogin({ onBack }: { onBack: () => void }) {
  const [state, action, pending] = useActionState(sendMagicLink, {});
  return (
    <form action={action} className="space-y-4">
      <p className="text-sm text-steel">
        Kami kirim link login sekali pakai ke email Anda. Setelah masuk, buat password baru di menu <b>Akun saya</b>.
      </p>
      <Field label="Email admin">
        <input name="email" type="email" required autoComplete="email" autoFocus className={inputClass} />
      </Field>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className={`${buttonClass.accent} w-full py-3`}>
        {pending ? "Mengirim…" : "Kirim link login"}
      </button>
      <button type="button" onClick={onBack} className="w-full text-sm text-steel underline-offset-4 hover:text-ink hover:underline">
        ← Kembali ke login dengan password
      </button>
    </form>
  );
}

// Proyek ----------------------------------------------------------------------

export function ProjectForm({ project }: { project?: ProjectRow }) {
  const [state, action, pending] = useActionState(saveProject, {});
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <div className="space-y-5">
        <Field label="Judul proyek">
          <input
            name="title"
            required
            defaultValue={project?.title}
            onChange={(e) => !slugTouched && setSlug(slugify(e.target.value))}
            className={inputClass}
            placeholder="PC3000 Project To Palembang"
          />
        </Field>
        <Field label="Slug (URL)" hint={`pt-aau.com/proyek/${slug || "…"}`}>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Jenis muatan (Indonesia)">
            <input name="cargo_id" defaultValue={project?.cargo_id} className={inputClass} placeholder="Alat berat" />
          </Field>
          <Field label="Jenis muatan (English)">
            <input name="cargo_en" defaultValue={project?.cargo_en} className={inputClass} placeholder="Heavy equipment" />
          </Field>
        </div>
        <Field label="Tujuan / rute" hint="Kosongkan jika tidak ingin ditampilkan.">
          <input name="destination" defaultValue={project?.destination ?? ""} className={inputClass} placeholder="Palembang" />
        </Field>
        <Field label="Galeri dokumentasi">
          <GalleryInput name="gallery" defaultValue={project?.gallery} folder="projects" />
        </Field>
      </div>

      <div className="space-y-5">
        <Field label="Foto cover">
          <MediaInput name="cover_url" defaultValue={project?.cover_url} folder="projects" />
        </Field>
        <Field label="Urutan" hint="Angka kecil tampil lebih dulu.">
          <input name="sort" type="number" defaultValue={project?.sort ?? 0} className={inputClass} />
        </Field>
        <label className="flex items-center gap-3 border border-line bg-white px-4 py-3">
          <input type="checkbox" name="published" defaultChecked={project?.published ?? true} className="size-4 accent-ink" />
          <span className="text-sm font-semibold">Tampilkan di website</span>
        </label>
        <Feedback state={state} />
        <div className="flex gap-3">
          <button type="submit" disabled={pending} className={buttonClass.primary}>
            {pending ? "Menyimpan…" : "Simpan proyek"}
          </button>
          <Link href="/admin/proyek" className={buttonClass.ghost}>
            Batal
          </Link>
        </div>
      </div>
    </form>
  );
}

export function ProjectRowActions({ id, published, title }: { id: string; published: boolean; title: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => start(() => setProjectPublished(id, !published))}
        className={buttonClass.ghost}
      >
        {published ? "Sembunyikan" : "Tampilkan"}
      </button>
      <Link href={`/admin/proyek/${id}`} className={buttonClass.ghost}>
        Edit
      </Link>
      <button
        type="button"
        disabled={pending}
        onClick={() => confirm(`Hapus proyek "${title}"?`) && start(() => deleteProject(id))}
        className={buttonClass.danger}
      >
        Hapus
      </button>
    </div>
  );
}

// Testimoni -------------------------------------------------------------------

export function TestimonialForm({ item, onDone }: { item?: TestimonialRow; onDone?: () => void }) {
  const [state, action, pending] = useActionState(async (prev: FormState, fd: FormData) => {
    const res = await saveTestimonial(prev, fd);
    if (res.ok) onDone?.();
    return res;
  }, {});
  const [deleting, start] = useTransition();

  return (
    <form action={action} className="grid gap-4 p-5 sm:grid-cols-[1fr_1fr_6rem]">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <Field label="Isi testimoni" className="sm:col-span-3">
        <textarea name="quote" required rows={3} defaultValue={item?.quote} className={inputClass} />
      </Field>
      <Field label="Nama">
        <input name="name" required defaultValue={item?.name} className={inputClass} />
      </Field>
      <Field label="Perusahaan">
        <input name="company" defaultValue={item?.company} className={inputClass} />
      </Field>
      <Field label="Urutan">
        <input name="sort" type="number" defaultValue={item?.sort ?? 0} className={inputClass} />
      </Field>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
        <label className="mr-auto flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="size-4 accent-ink" />
          Tampilkan di website
        </label>
        {item && (
          <button
            type="button"
            disabled={deleting}
            onClick={() => confirm(`Hapus testimoni dari ${item.name}?`) && start(() => deleteTestimonial(item.id))}
            className={buttonClass.danger}
          >
            Hapus
          </button>
        )}
        <button type="submit" disabled={pending} className={buttonClass.primary}>
          {pending ? "Menyimpan…" : item ? "Simpan" : "Tambah testimoni"}
        </button>
      </div>
      {(state.error || state.ok) && (
        <div className="sm:col-span-3">
          <Feedback state={state} />
        </div>
      )}
    </form>
  );
}

export function NewTestimonial() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);
  if (!open)
    return (
      <button type="button" onClick={() => setOpen(true)} className={buttonClass.accent}>
        + Testimoni baru
      </button>
    );
  return (
    <div className="border-2 border-signal bg-white">
      <TestimonialForm
        key={key}
        onDone={() => {
          setKey((k) => k + 1);
          setOpen(false);
        }}
      />
    </div>
  );
}

// Pengaturan ------------------------------------------------------------------

export function SettingsForm({ settings }: { settings: SettingsRow }) {
  const [state, action, pending] = useActionState(saveSettings, {});
  return (
    <form action={action} className="space-y-8">
      <section className="grid gap-5 sm:grid-cols-2">
        <h2 className="font-display text-xl font-bold uppercase sm:col-span-2">Kontak</h2>
        <Field label="Email">
          <input name="email" type="email" required defaultValue={settings.email} className={inputClass} />
        </Field>
        <Field label="HP (tampilan)" hint="Contoh: 0813 88888 792">
          <input name="mobile" required defaultValue={settings.mobile} className={inputClass} />
        </Field>
        <Field label="Telepon kantor">
          <input name="phone" required defaultValue={settings.phone} className={inputClass} />
        </Field>
        <Field label="Telepon kantor 2" hint="Opsional">
          <input name="phone_alt" defaultValue={settings.phone_alt} className={inputClass} />
        </Field>
        <Field label="Nomor WhatsApp" hint="Untuk tombol WhatsApp. Awalan 0 otomatis diubah menjadi 62.">
          <input name="whatsapp" required defaultValue={settings.whatsapp} className={inputClass} inputMode="numeric" />
        </Field>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <h2 className="font-display text-xl font-bold uppercase sm:col-span-2">Alamat</h2>
        <Field label="Kantor" hint="Satu baris per baris alamat.">
          <textarea name="office_lines" rows={3} defaultValue={settings.office_lines.join("\n")} className={inputClass} />
        </Field>
        <Field label="Gudang" hint="Satu baris per baris alamat.">
          <textarea name="warehouse_lines" rows={3} defaultValue={settings.warehouse_lines.join("\n")} className={inputClass} />
        </Field>
        <Field label="Link Google Maps kantor">
          <input name="office_maps" type="url" defaultValue={settings.office_maps} className={inputClass} />
        </Field>
        <Field label="Link Google Maps gudang">
          <input name="warehouse_maps" type="url" defaultValue={settings.warehouse_maps} className={inputClass} />
        </Field>
        <Field label="URL embed peta (halaman Hubungi Kami)" className="sm:col-span-2" hint="Google Maps → Bagikan → Sematkan peta → salin isi src.">
          <input name="office_embed" type="url" defaultValue={settings.office_embed} className={inputClass} />
        </Field>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <h2 className="font-display text-xl font-bold uppercase sm:col-span-2">Dokumen & formulir</h2>
        <Field label="Company Profile (Indonesia)">
          <MediaInput name="profile_pdf_id" defaultValue={settings.profile_pdf_id} folder="docs" accept="application/pdf" />
        </Field>
        <Field label="Company Profile (English)">
          <MediaInput name="profile_pdf_en" defaultValue={settings.profile_pdf_en} folder="docs" accept="application/pdf" />
        </Field>
        <Field label="URL Google Form buku tamu" className="sm:col-span-2" hint="Gunakan link yang berakhiran ?embedded=true">
          <input name="guestbook_form" type="url" defaultValue={settings.guestbook_form} className={inputClass} />
        </Field>
      </section>

      <div className="sticky bottom-0 -mx-1 flex items-center gap-4 border-t border-line bg-paper px-1 py-4">
        <button type="submit" disabled={pending} className={buttonClass.primary}>
          {pending ? "Menyimpan…" : "Simpan pengaturan"}
        </button>
        <div className="flex-1">
          <Feedback state={state} />
        </div>
      </div>
    </form>
  );
}

// Pesan -----------------------------------------------------------------------

export function MessageActions({ id, read }: { id: string; read: boolean }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex gap-2">
      <button type="button" disabled={pending} onClick={() => start(() => setMessageRead(id, !read))} className={buttonClass.ghost}>
        {read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => confirm("Hapus pesan ini?") && start(() => deleteMessage(id))}
        className={buttonClass.danger}
      >
        Hapus
      </button>
    </div>
  );
}

// Akun & pengguna admin -------------------------------------------------------

export function ChangePasswordForm({ needsCurrent }: { needsCurrent: boolean }) {
  const [state, action, pending] = useActionState(changePassword, {});
  return (
    <form action={action} key={state.ok ? "done" : "form"} className="max-w-md space-y-4">
      {needsCurrent ? (
        <Field label="Password saat ini">
          <input name="current" type="password" required autoComplete="current-password" className={inputClass} />
        </Field>
      ) : (
        <Notice tone="ok">Anda baru masuk lewat link email, jadi password lama tidak diperlukan.</Notice>
      )}
      <Field label="Password baru" hint="Minimal 8 karakter.">
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
      </Field>
      <Field label="Ulangi password baru">
        <input name="confirm" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
      </Field>
      <Feedback state={state} />
      <button type="submit" disabled={pending} className={buttonClass.primary}>
        {pending ? "Menyimpan…" : "Ganti password"}
      </button>
    </form>
  );
}

export function AddAdminForm({ disabled }: { disabled?: boolean }) {
  const [state, action, pending] = useActionState(addAdmin, {});
  const [password, setPassword] = useState("");

  function generate() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    const bytes = crypto.getRandomValues(new Uint32Array(12));
    setPassword(Array.from(bytes, (n) => chars[n % chars.length]).join(""));
  }

  return (
    <form action={action} className="grid gap-4 p-5 sm:grid-cols-2">
      <Field label="Nama">
        <input name="name" className={inputClass} placeholder="Nama lengkap" disabled={disabled} />
      </Field>
      <Field label="Email">
        <input name="email" type="email" required className={inputClass} disabled={disabled} />
      </Field>
      <Field label="Password awal" hint="Bagikan secara pribadi; admin baru bisa menggantinya di menu Akun saya." className="sm:col-span-2">
        <div className="flex gap-2">
          <input
            name="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            className={`${inputClass} font-mono`}
            disabled={disabled}
          />
          <button type="button" onClick={generate} className={`${buttonClass.ghost} shrink-0`} disabled={disabled}>
            Buat acak
          </button>
        </div>
      </Field>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending || disabled} className={buttonClass.primary}>
          {pending ? "Menambahkan…" : "Tambah admin"}
        </button>
        <div className="flex-1">
          <Feedback state={state} />
        </div>
      </div>
    </form>
  );
}

export function RemoveAdminButton({ email }: { email: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  return (
    <div className="text-right">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          confirm(`Hapus ${email} dari admin? Akun login-nya juga akan dihapus.`) &&
          start(async () => setError((await removeAdmin(email)).error ?? ""))
        }
        className={buttonClass.danger}
      >
        Hapus
      </button>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
