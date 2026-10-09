import Link from "next/link";
import { Card, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Ringkasan" };

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const count = (table: string, filter?: [string, boolean]) => {
    let q = supabase.from(table).select("*", { count: "exact", head: true });
    if (filter) q = q.eq(filter[0], filter[1]);
    return q.then((r) => r.count ?? 0);
  };
  const [projects, testimonials, unread, recent] = await Promise.all([
    count("projects", ["published", true]),
    count("testimonials", ["published", true]),
    count("messages", ["read", false]),
    supabase.from("messages").select("id, name, company, message, created_at, read").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Proyek tampil", value: projects, href: "/admin/proyek" },
    { label: "Testimoni tampil", value: testimonials, href: "/admin/testimoni" },
    { label: "Pesan belum dibaca", value: unread, href: "/admin/pesan", accent: unread > 0 },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Ringkasan" description="Perubahan yang Anda simpan langsung tampil di pt-aau.com." />
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`block border p-6 transition-colors ${s.accent ? "border-signal bg-signal" : "border-line bg-white hover:border-ink"}`}>
            <p className="font-display text-5xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-sm font-medium">{s.label}</p>
          </Link>
        ))}
      </div>
      <Card>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-xl font-bold uppercase">Pesan terbaru</h2>
          <Link href="/admin/pesan" className="text-sm font-semibold underline decoration-signal decoration-2 underline-offset-4">
            Semua pesan
          </Link>
        </div>
        {recent.data?.length ? (
          <ul className="divide-y divide-line">
            {recent.data.map((m) => (
              <li key={m.id} className="flex gap-4 px-6 py-4">
                <span className={`mt-2 size-2 shrink-0 rounded-full ${m.read ? "bg-line" : "bg-signal-deep"}`} aria-label={m.read ? "Sudah dibaca" : "Belum dibaca"} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">
                    {m.name} {m.company && <span className="font-normal text-steel">· {m.company}</span>}
                  </p>
                  <p className="truncate text-sm text-steel">{m.message}</p>
                </div>
                <time className="shrink-0 text-xs text-steel">{formatDate(m.created_at)}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-8 text-steel">Belum ada pesan dari form kontak.</p>
        )}
      </Card>
    </div>
  );
}
