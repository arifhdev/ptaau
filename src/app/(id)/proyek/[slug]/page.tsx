import type { Metadata } from "next";
import { getProject, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ProjectDetailView } from "@/views";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyek/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    ...pageMetadata("id", "projects", project?.title, `/${slug}`),
    openGraph: project ? { images: [project.cover] } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/proyek/[slug]">) {
  const { slug } = await params;
  return <ProjectDetailView locale="id" slug={slug} />;
}
