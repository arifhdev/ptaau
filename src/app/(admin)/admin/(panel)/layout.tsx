import Link from "next/link";
import { Suspense } from "react";
import { SidebarNav } from "@/components/admin/Sidebar";
import { signOut } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/auth";

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="lg:grid lg:min-h-svh lg:grid-cols-[16rem_1fr]">
      <aside className="bg-ink text-white lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col">
        <div className="hazard h-1.5" aria-hidden />
        <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-6 lg:py-6">
          <Link href="/admin" className="font-display text-2xl font-extrabold">
            PT.<span className="text-signal">AAU</span> <span className="text-white/50">Admin</span>
          </Link>
        </div>
        <div className="px-2 pb-3 lg:flex-1 lg:px-0">
          <Suspense>
            <SidebarNav />
          </Suspense>
        </div>
        <div className="hidden border-t border-white/10 px-6 py-5 text-sm lg:block">
          <Suspense fallback={<p className="text-white/40">…</p>}>
            <Account />
          </Suspense>
          <Link href="/" target="_blank" className="mt-3 block text-white/60 hover:text-signal">
            Lihat website ↗
          </Link>
        </div>
      </aside>
      <main className="min-w-0 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        <Suspense fallback={<p className="text-steel">Memuat…</p>}>{children}</Suspense>
      </main>
    </div>
  );
}

async function Account() {
  const { email } = await requireAdmin();
  return (
    <form action={signOut}>
      <p className="truncate text-white/80" title={email}>
        {email}
      </p>
      <button type="submit" className="mt-1 text-white/60 underline-offset-4 hover:text-white hover:underline">
        Keluar
      </button>
    </form>
  );
}
