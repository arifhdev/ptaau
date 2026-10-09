import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ProjectsView } from "@/views";

export const metadata = pageMetadata("id", "projects", dictionaries.id.nav.projects);

export default function Page() {
  return <ProjectsView locale="id" />;
}
