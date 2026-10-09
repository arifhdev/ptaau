import { Shell } from "@/components/Shell";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata("id");

export default function Layout({ children }: LayoutProps<"/">) {
  return <Shell locale="id">{children}</Shell>;
}
