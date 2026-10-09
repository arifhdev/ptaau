import type { Metadata } from "next";
import { getProject, getProjects } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { ProjectDetailView } from "@/views";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return {
    ...pageMetadata("en", "projects", project?.title, `/${slug}`),
    openGraph: project ? { images: [project.cover] } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  return <ProjectDetailView locale="en" slug={slug} />;
}
