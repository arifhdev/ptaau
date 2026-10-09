import type { Metadata } from "next";
import { getProject, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ProjectDetailView } from "@/views";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    ...pageMetadata("en", "projects", project?.title, `/${slug}`),
    openGraph: project ? { images: [project.cover] } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  return <ProjectDetailView locale="en" slug={slug} />;
}
