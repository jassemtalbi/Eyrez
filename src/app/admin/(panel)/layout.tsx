import Sidebar from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/admin";
import { getOrders } from "@/lib/db";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const pending = (await getOrders()).filter((o) => o.status === "pending").length;
  return (
    <>
      <Sidebar pending={pending} />
      <div className="lg:pl-60">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</div>
      </div>
    </>
  );
}
