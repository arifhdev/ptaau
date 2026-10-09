import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { AboutView } from "@/views";

export const metadata = pageMetadata("en", "about", dictionaries.en.nav.about);

export default function Page() {
  return <AboutView locale="en" />;
}
