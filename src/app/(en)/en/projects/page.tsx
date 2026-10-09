import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ProjectsView } from "@/views";

export const metadata = pageMetadata("en", "projects", dictionaries.en.nav.projects);

export default function Page() {
  return <ProjectsView locale="en" />;
}
