import { MessageActions } from "@/components/admin/forms";
import { Card, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Pesan masuk" };

export default async function MessagesAdmin() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(200);
  const messages = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title="Pesan masuk" description="Dari form “Minta penawaran” di halaman Hubungi Kami." />
      {messages.length === 0 && <p className="text-steel">Belum ada pesan.</p>}
      {messages.map((m) => (
        <Card key={m.id} className={m.read ? "" : "border-l-4 border-l-signal-deep"}>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-6 py-4">
            <div>
              <p className="text-lg font-semibold">
                {m.name} {m.company && <span className="font-normal text-steel">· {m.company}</span>}
              </p>
              <p className="mt-1 flex flex-wrap gap-x-4 text-sm">
                {m.email && (
                  <a href={`mailto:${m.email}`} className="underline decoration-signal decoration-2 underline-offset-4">
                    {m.email}
                  </a>
                )}
                {m.phone && (
                  <a
                    href={`https://wa.me/${m.phone.replace(/\D/g, "").replace(/^0/, "62")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-signal decoration-2 underline-offset-4"
                  >
                    {m.phone}
                  </a>
                )}
              </p>
            </div>
            <div className="text-right text-xs text-steel">
              <time>{formatDate(m.created_at)}</time>
              <p className="uppercase">{m.locale === "en" ? "English" : "Indonesia"}</p>
            </div>
          </div>
          <p className="whitespace-pre-line px-6 py-5 leading-relaxed">{m.message}</p>
          <div className="border-t border-line px-6 py-3">
            <MessageActions id={m.id} read={m.read} />
          </div>
        </Card>
      ))}
    </div>
  );
}
