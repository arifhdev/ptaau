import { Barlow_Condensed, Inter } from "next/font/google";
import { company, dictionaries } from "@/lib/content";
import { routes, type Locale } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./sections";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
});

export function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = dictionaries[locale];
  return (
    <html lang={locale} className={`${inter.variable} ${barlow.variable} antialiased`}>
      <body className="flex min-h-svh flex-col font-sans">
        <Header locale={locale} labels={dict.nav} logo={<Logo href={routes[locale].home} />} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <a
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl shadow-black/25 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-7" />
        </a>
      </body>
    </html>
  );
}
