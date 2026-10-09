import { ProjectRowActions } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { ProjectRow } from "@/lib/data";

export const metadata = { title: "Proyek" };

export default async function ProjectsAdmin() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("projects").select("*").order("sort").order("created_at");
  const projects = (data ?? []) as ProjectRow[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Proyek"
        description="Urutan di sini sama dengan urutan di website. Lima proyek teratas tampil di beranda."
        action={{ href: "/admin/proyek/baru", label: "+ Proyek baru" }}
      />
      {error && <p className="text-red-700">{error.message}</p>}
      <Card>
        <ul className="divide-y divide-line">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover_url} alt="" className={`aspect-[4/3] w-28 shrink-0 object-cover ${p.published ? "" : "opacity-40 grayscale"}`} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {p.title}{" "}
                  {!p.published && <span className="ml-1 bg-paper-2 px-2 py-0.5 text-xs font-bold uppercase text-steel">Disembunyikan</span>}
                </p>
                <p className="text-sm text-steel">
                  #{p.sort} · {p.cargo_id || "–"} {p.destination && `· ${p.destination}`} · {p.gallery.length} foto galeri
                </p>
              </div>
              <ProjectRowActions id={p.id} published={p.published} title={p.title} />
            </li>
          ))}
          {projects.length === 0 && <li className="p-8 text-steel">Belum ada proyek.</li>}
        </ul>
      </Card>
    </div>
  );
}
