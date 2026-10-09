import { NewTestimonial, TestimonialForm } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { TestimonialRow } from "@/lib/data";

export const metadata = { title: "Testimoni" };

export default async function TestimonialsAdmin() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("testimonials").select("*").order("sort").order("created_at");
  const items = (data ?? []) as TestimonialRow[];

  return (
    <div className="space-y-6">
      <PageHeader title="Testimoni" description="Tampil di beranda pada bagian “Apa kata klien kami”." />
      <NewTestimonial />
      {items.map((t) => (
        <Card key={t.id} className={t.published ? "" : "opacity-60"}>
          <TestimonialForm key={`${t.id}-${t.quote}-${t.sort}-${t.published}`} item={t} />
        </Card>
      ))}
    </div>
  );
}
