import { pageMetadata } from "@/lib/metadata";
import { HomeView } from "@/views";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
