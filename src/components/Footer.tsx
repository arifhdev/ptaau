import Link from "next/link";
import { companyName, type Dictionary } from "@/lib/content";
import { getSettings } from "@/lib/data";
import { routes, type Locale } from "@/lib/routes";
import { Logo } from "./Logo";

export async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const company = await getSettings();
  const r = routes[locale];
  const nav = [
    { href: r.about, label: dict.nav.about },
    { href: r.projects, label: dict.nav.projects },
    { href: r.contact, label: dict.nav.contact },
    { href: r.guestbook, label: dict.nav.guestbook },
    { href: r.privacy, label: dict.nav.privacy },
  ];

  return (
    <footer className="bg-ink text-white/70">
      <div className="hazard h-2" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo href={r.home} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{dict.footer.tagline}</p>
          <a
            href={company.profilePdf[locale]}
            className="mt-6 inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-signal hover:text-signal"
            download
          >
            <DownloadIcon /> {dict.cta.profile}
          </a>
        </div>

        <div>
          <h2 className="eyebrow text-signal">{dict.footer.company}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-signal">{dict.footer.contact}</h2>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p>
              {company.office.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <p>
              <a href={`tel:${company.phone.replace(/-/g, "")}`} className="hover:text-white">
                {company.phone}
                {company.phoneAlt && ` / ${company.phoneAlt}`}
              </a>
            </p>
            <p>
              <a href={`https://wa.me/${company.whatsapp}`} className="hover:text-white">
                {company.mobile}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs sm:px-6 lg:px-8">
          © {companyName}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden>
      <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12" strokeLinecap="square" />
    </svg>
  );
}
