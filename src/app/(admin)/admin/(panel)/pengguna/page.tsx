import { AddAdminForm, RemoveAdminButton } from "@/components/admin/forms";
import { Card, formatDate, Notice, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { hasServiceKey } from "@/lib/supabase/service";

export const metadata = { title: "Pengguna admin" };

export default async function AdminUsersPage() {
  const { supabase, email: me } = await requireAdmin();
  const { data } = await supabase.from("admins").select("email, name, created_at, created_by").order("created_at");
  const admins = data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader title="Pengguna admin" description="Semua admin punya akses penuh untuk mengelola konten website." />

      <Card>
        <h2 className="border-b border-line px-5 py-4 font-display text-xl font-bold uppercase">Tambah admin</h2>
        {!hasServiceKey && (
          <div className="px-5 pt-5">
            <Notice tone="error">Fitur ini butuh SUPABASE_SERVICE_ROLE_KEY di environment server.</Notice>
          </div>
        )}
        <AddAdminForm disabled={!hasServiceKey} />
      </Card>

      <Card>
        <ul className="divide-y divide-line">
          {admins.map((a) => (
            <li key={a.email} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <span className="grid size-10 shrink-0 place-items-center bg-ink font-display font-bold uppercase text-signal" aria-hidden>
                {(a.name || a.email).slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {a.name || a.email}
                  {a.email === me.toLowerCase() && <span className="ml-2 bg-signal px-2 py-0.5 text-xs font-bold uppercase">Anda</span>}
                </p>
                <p className="text-sm text-steel">
                  {a.name && `${a.email} · `}ditambahkan {formatDate(a.created_at)}
                  {a.created_by && ` oleh ${a.created_by}`}
                </p>
              </div>
              {a.email !== me.toLowerCase() && <RemoveAdminButton email={a.email} />}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
