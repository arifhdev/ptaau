export type Locale = "id" | "en";

export const routes = {
  id: {
    home: "/",
    about: "/tentang-kami-sejarah",
    projects: "/proyek",
    contact: "/hubungi-kami",
    guestbook: "/buku-tamu",
    privacy: "/privacy-policy",
  },
  en: {
    home: "/en",
    about: "/en/about-us-history",
    projects: "/en/projects",
    contact: "/en/contact-us",
    guestbook: "/en/guestbook",
    privacy: "/en/privacy-policy",
  },
} as const;

export type RouteKey = keyof (typeof routes)["id"];

export const projectHref = (locale: Locale, slug: string) => `${routes[locale].projects}/${slug}`;

const keys = Object.keys(routes.id) as RouteKey[];

// Petakan path aktif ke padanannya di bahasa lain (slug proyek tetap sama).
export function switchLocalePath(pathname: string, from: Locale): string {
  const to: Locale = from === "id" ? "en" : "id";
  const path = pathname.replace(/\/$/, "") || "/";
  for (const key of keys) {
    const base = routes[from][key];
    if (path === base) return routes[to][key];
    if (key !== "home" && path.startsWith(base + "/")) return routes[to][key] + path.slice(base.length);
  }
  return routes[to].home;
}

