import { requireAdmin } from "@/lib/admin";
import { Card, PageHeader } from "@/components/admin/ui";
import PasswordForm from "./PasswordForm";

export default async function AccountPage() {
  const username = await requireAdmin();
  return (
    <>
      <PageHeader title="Account" subtitle={`Signed in as ${username}`} />
      <Card className="max-w-md p-6">
        <h2 className="text-2xl">Change password</h2>
        <PasswordForm />
      </Card>
    </>
  );
}
