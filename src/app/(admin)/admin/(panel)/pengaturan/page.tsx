import { SettingsForm } from "@/components/admin/forms";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { SettingsRow } from "@/lib/data";

export const metadata = { title: "Info perusahaan" };

export default async function SettingsAdmin() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="max-w-4xl space-y-8">
      <PageHeader title="Info perusahaan" description="Kontak, alamat, dan dokumen yang tampil di header, footer, dan halaman Hubungi Kami." />
      {data ? (
        <SettingsForm settings={data as SettingsRow} />
      ) : (
        <p className="text-red-700">{error?.message ?? "Data pengaturan belum ada. Jalankan npm run db:setup."}</p>
      )}
    </div>
  );
}
