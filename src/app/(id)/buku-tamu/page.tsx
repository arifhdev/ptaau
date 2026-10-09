import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { GuestbookView } from "@/views";

export const metadata = pageMetadata("id", "guestbook", dictionaries.id.nav.guestbook);

export default function Page() {
  return <GuestbookView locale="id" />;
}
