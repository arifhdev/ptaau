"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { routes, switchLocalePath, type Locale } from "@/lib/routes";

type NavLabels = {
  home: string;
  about: string;
  projects: string;
  contact: string;
  cta: string;
  menu: string;
  close: string;
};

export function Header({ locale, labels, logo }: { locale: Locale; labels: NavLabels; logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = routes[locale];
  const links = [
    { href: r.home, label: labels.home },
    { href: r.about, label: labels.about },
    { href: r.projects, label: labels.projects },
    { href: r.contact, label: labels.contact },
  ];
  const isActive = (href: string) =>
    href === r.home ? pathname === href : pathname === href || pathname.startsWith(href + "/");
  const altHref = switchLocalePath(pathname, locale);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {logo}

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Utama">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative px-4 py-2 font-display text-[0.95rem] font-semibold uppercase tracking-wider transition-colors ${
                isActive(l.href) ? "text-signal" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
              {isActive(l.href) && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 bg-signal" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch locale={locale} altHref={altHref} />
          <Link
            href={`${r.contact}#form`}
            className="hidden bg-signal px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-white sm:inline-block"
          >
            {labels.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? labels.close : labels.menu}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-white/10 bg-ink lg:hidden">
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`border-b border-white/10 py-4 font-display text-xl font-bold uppercase tracking-wide ${
                isActive(l.href) ? "text-signal" : "text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`${r.contact}#form`}
            onClick={() => setOpen(false)}
            className="mt-5 bg-signal px-5 py-3.5 text-center font-display font-bold uppercase tracking-wider text-ink"
          >
            {labels.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function LangSwitch({ locale, altHref }: { locale: Locale; altHref: string }) {
  return (
    <div className="flex items-center border border-white/25 font-display text-xs font-bold uppercase tracking-wider">
      {(["id", "en"] as const).map((l) =>
        l === locale ? (
          <span key={l} className="bg-white px-2.5 py-1.5 text-ink" aria-current="true">
            {l}
          </span>
        ) : (
          <Link key={l} href={altHref} hrefLang={l} className="px-2.5 py-1.5 text-white/80 hover:text-white">
            {l}
          </Link>
        ),
      )}
    </div>
  );
}
