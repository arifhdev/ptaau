import { dictionaries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { GuestbookView } from "@/views";

export const metadata = pageMetadata("en", "guestbook", dictionaries.en.nav.guestbook);

export default function Page() {
  return <GuestbookView locale="en" />;
}
