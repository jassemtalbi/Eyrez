import { getOrders } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import OrdersTable from "@/components/admin/OrdersTable";

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [orders, { status }] = await Promise.all([getOrders(), searchParams]);
  return (
    <>
      <PageHeader title="Orders" subtitle={`${orders.length} orders in total`} />
      <OrdersTable orders={orders} initialStatus={status ?? "all"} />
    </>
  );
}
