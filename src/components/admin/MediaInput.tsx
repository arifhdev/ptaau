"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { buttonClass, inputClass } from "./ui";

// Upload langsung dari browser ke Supabase Storage (bucket "media"), jadi tidak
// terbatas ukuran body Server Action. Izin upload dijaga RLS: hanya admin.
async function upload(file: File, folder: string) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 60);
  const path = `${folder}/${Date.now().toString(36)}-${base}.${ext}`;
  const storage = createClient().storage.from("media");
  const { error } = await storage.upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}

const isPdf = (url: string) => url.toLowerCase().endsWith(".pdf");

export function MediaInput({
  name,
  defaultValue = "",
  folder,
  accept = "image/*",
}: {
  name: string;
  defaultValue?: string;
  folder: string;
  accept?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      setValue(await upload(file, folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {value && !isPdf(value) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="aspect-[4/3] w-full max-w-sm border border-line object-cover" />
      )}
      <div className="flex gap-2">
        <input name={name} value={value} onChange={(e) => setValue(e.target.value)} className={inputClass} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} className={`${buttonClass.ghost} shrink-0`}>
          {busy ? "Mengunggah…" : "Upload"}
        </button>
        {value && isPdf(value) && (
          <a href={value} target="_blank" rel="noreferrer" className={`${buttonClass.ghost} shrink-0`}>
            Lihat
          </a>
        )}
      </div>
      <input ref={fileRef} type="file" accept={accept} hidden onChange={(e) => onFile(e.target.files?.[0])} />
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}

export function GalleryInput({ name, defaultValue = [], folder }: { name: string; defaultValue?: string[]; folder: string }) {
  const [items, setItems] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const urls = await Promise.all(Array.from(files).map((f) => upload(f, folder)));
      setItems((prev) => [...prev, ...urls]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((url, i) => (
          <div key={url} className="group relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="aspect-[4/3] w-full border border-line object-cover" />
            <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => setItems((p) => p.map((x, j) => (j === i - 1 ? url : j === i ? p[i - 1] : x)))}
                className="bg-white/95 px-2 py-1 text-xs font-bold disabled:opacity-30"
                aria-label="Geser ke kiri"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setItems((p) => p.filter((_, j) => j !== i))}
                className="bg-red-600 px-2 py-1 text-xs font-bold text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="grid aspect-[4/3] place-items-center border-2 border-dashed border-line text-sm font-semibold text-steel hover:border-ink hover:text-ink"
        >
          {busy ? "Mengunggah…" : "+ Tambah foto"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}
