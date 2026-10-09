import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin PT AAU" },
  robots: { index: false, follow: false },
  icons: { icon: "/images/brand/logo-circle.png" },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="id" className={`${fontVariables} antialiased`}>
      <body className="min-h-svh bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
