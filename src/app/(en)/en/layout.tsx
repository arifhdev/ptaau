import { Shell } from "@/components/Shell";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata("en");

export default function Layout({ children }: LayoutProps<"/en">) {
  return <Shell locale="en">{children}</Shell>;
}
