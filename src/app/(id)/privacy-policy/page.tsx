import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { PrivacyView } from "@/views";

export const metadata = pageMetadata("id", "privacy", dictionaries.id.nav.privacy);

export default function Page() {
  return <PrivacyView locale="id" />;
}
