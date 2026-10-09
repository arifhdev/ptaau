import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ContactView } from "@/views";

export const metadata = pageMetadata("en", "contact", dictionaries.en.nav.contact);

export default function Page() {
  return <ContactView locale="en" />;
}
