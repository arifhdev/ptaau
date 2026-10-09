"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Ringkasan" },
  { href: "/admin/proyek", label: "Proyek" },
  { href: "/admin/testimoni", label: "Testimoni" },
  { href: "/admin/pesan", label: "Pesan masuk" },
  { href: "/admin/pengaturan", label: "Info perusahaan" },
  { href: "/admin/pengguna", label: "Pengguna admin" },
  { href: "/admin/akun", label: "Akun saya" },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Admin">
      {items.map((it) => {
        const active = it.href === "/admin" ? pathname === "/admin" : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`shrink-0 border-l-4 px-4 py-2.5 font-display text-[0.95rem] font-semibold uppercase tracking-wider transition-colors ${
              active ? "border-signal bg-white/10 text-white" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
