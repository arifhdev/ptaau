import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { PrivacyView } from "@/views";

export const metadata = pageMetadata("en", "privacy", dictionaries.en.nav.privacy);

export default function Page() {
  return <PrivacyView locale="en" />;
}
