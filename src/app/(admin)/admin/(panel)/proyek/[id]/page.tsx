import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/forms";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { ProjectRow } from "@/lib/data";

export const metadata = { title: "Edit proyek" };

export default async function EditProject({ params }: PageProps<"/admin/proyek/[id]">) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (id === "baru") {
    return (
      <div className="space-y-8">
        <PageHeader title="Proyek baru" />
        <ProjectForm />
      </div>
    );
  }

  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const project = data as ProjectRow;
  return (
    <div className="space-y-8">
      <PageHeader title="Edit proyek" description={project.title} />
      <ProjectForm project={project} />
    </div>
  );
}
