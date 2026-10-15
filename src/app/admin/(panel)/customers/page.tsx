import { getOrders } from "@/lib/db";
import { formatPrice } from "@/lib/config";
import { Card, PageHeader, formatDate } from "@/components/admin/ui";

export default async function CustomersPage() {
  const orders = await getOrders();
  const map = new Map<string, { name: string; phone: string; email?: string; city: string; orders: number; spent: number; last: string }>();
  for (const o of orders) {
    const key = o.customer.phone.replace(/\s/g, "");
    const cur = map.get(key) ?? { name: `${o.customer.firstName} ${o.customer.lastName}`, phone: o.customer.phone, email: o.customer.email, city: o.customer.city, orders: 0, spent: 0, last: o.createdAt };
    cur.orders += 1;
    if (o.status !== "cancelled") cur.spent += o.total;
    if (o.createdAt > cur.last) cur.last = o.createdAt;
    map.set(key, cur);
  }
  const customers = [...map.values()].sort((a, b) => b.spent - a.spent);

  return (
    <>
      <PageHeader title="Customers" subtitle={`${customers.length} customers, grouped by phone number`} />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-cream/50 text-left text-xs uppercase tracking-[0.1em] text-cocoa">
              <tr>
                <th className="px-4 py-3 font-normal">Customer</th>
                <th className="px-4 py-3 font-normal">City</th>
                <th className="px-4 py-3 font-normal">Orders</th>
                <th className="px-4 py-3 font-normal">Last order</th>
                <th className="px-4 py-3 text-right font-normal">Total spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.phone} className="border-t border-sand hover:bg-cream/40">
                  <td className="px-4 py-3">
                    <span className="font-medium">{c.name}</span>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="block text-xs text-cocoa hover:text-gold-dark">{c.phone}</a>
                  </td>
                  <td className="px-4 py-3 text-cocoa">{c.city}</td>
                  <td className="px-4 py-3 tabular-nums">{c.orders}</td>
                  <td className="px-4 py-3 text-cocoa">{formatDate(c.last)}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums">{formatPrice(c.spent)}</td>
                </tr>
              ))}
              {customers.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-cocoa">No customers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
