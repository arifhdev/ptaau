import type { Metadata } from "next";
import { dictionaries } from "./content";
import { routes, type Locale, type RouteKey } from "./routes";

export const siteUrl = "https://www.pt-aau.com";

export function rootMetadata(locale: Locale): Metadata {
  const dict = dictionaries[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: "%s | PT Aditya Andhika Utama" },
    description: dict.meta.description,
    icons: { icon: "/images/brand/logo-circle.png", apple: "/images/brand/logo-circle.png" },
    openGraph: {
      type: "website",
      siteName: "PT Aditya Andhika Utama",
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [{ url: "/images/hero/slide1.jpg", width: 2414, height: 1494 }],
    },
  };
}

export function pageMetadata(locale: Locale, key: RouteKey, title?: string, suffix = ""): Metadata {
  return {
    ...(title ? { title } : {}),
    alternates: {
      canonical: routes[locale][key] + suffix,
      languages: { id: routes.id[key] + suffix, en: routes.en[key] + suffix },
    },
  };
}
