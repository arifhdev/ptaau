import Image from "next/image";
import { LoginForm } from "@/components/admin/forms";
import { Notice } from "@/components/admin/ui";
import { hasSupabase } from "@/lib/supabase/env";
import logo from "../../../../../public/images/brand/logo-circle.png";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="hazard h-2" aria-hidden />
        <div className="bg-paper p-8">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="" width={48} height={48} className="size-12" />
            <div>
              <p className="font-display text-2xl font-extrabold leading-none">PT.AAU Admin</p>
              <p className="text-sm text-steel">Kelola konten website</p>
            </div>
          </div>
          <div className="mt-8">
            {hasSupabase ? (
              <LoginForm />
            ) : (
              <Notice tone="error">Supabase belum dikonfigurasi. Isi environment variable terlebih dahulu.</Notice>
            )}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-steel">
            Hanya akun yang terdaftar sebagai admin yang bisa masuk. Belum punya akun? Minta admin lain menambahkan Anda.
          </p>
        </div>
      </div>
    </main>
  );
}
