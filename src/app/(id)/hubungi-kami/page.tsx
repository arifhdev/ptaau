import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { ContactView } from "@/views";

export const metadata = pageMetadata("id", "contact", dictionaries.id.nav.contact);

export default function Page() {
  return <ContactView locale="id" />;
}
