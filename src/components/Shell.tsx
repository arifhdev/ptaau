import { dictionaries } from "@/lib/content";
import { getSettings } from "@/lib/data";
import { routes, type Locale } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./sections";
import { fontVariables } from "@/lib/fonts";
import "../app/globals.css";

export async function Shell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = dictionaries[locale];
  const company = await getSettings();
  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
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
