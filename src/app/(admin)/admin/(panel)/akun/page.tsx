import { ChangePasswordForm } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { loggedInByEmailLinkRecently, requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Akun saya" };

export default async function AccountPage() {
  const { supabase, email } = await requireAdmin();
  const viaEmailLink = await loggedInByEmailLinkRecently(supabase);

  return (
    <div className="space-y-8">
      <PageHeader title="Akun saya" description={email} />
      <Card className="p-6 sm:p-8">
        <h2 className="mb-5 font-display text-xl font-bold uppercase">Ganti password</h2>
        <ChangePasswordForm needsCurrent={!viaEmailLink} />
      </Card>
    </div>
  );
}
