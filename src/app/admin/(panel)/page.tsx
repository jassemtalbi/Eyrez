import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getOrders, getProducts } from "@/lib/db";
import { formatPrice } from "@/lib/config";
import { Card, PageHeader, StatusBadge, formatDate } from "@/components/admin/ui";
import RevenueChart from "@/components/admin/RevenueChart";
import SmartImage from "@/components/SmartImage";

const DAYS = 14;

export default async function Dashboard() {
  const [orders, products] = await Promise.all([getOrders(), getProducts({ includeInactive: true })]);
  const valid = orders.filter((o) => o.status !== "cancelled");
  const since = Date.now() - 30 * 86400000;
  const recent30 = valid.filter((o) => +new Date(o.createdAt) >= since);
  const revenue30 = recent30.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const avg = recent30.length ? revenue30 / recent30.length : 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (DAYS - 1 - i));
    const key = d.toDateString();
    const dayOrders = valid.filter((o) => new Date(o.createdAt).toDateString() === key);
    return {
      date: d.toISOString(),
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      revenue: dayOrders.reduce((s, o) => s + o.total, 0),
      orders: dayOrders.length,
    };
  });

  const sold = new Map<string, { name: string; image: string; qty: number; revenue: number }>();
  for (const o of valid) for (const it of o.items) {
    const cur = sold.get(it.productId) ?? { name: it.name, image: it.image, qty: 0, revenue: 0 };
    cur.qty += it.qty;
    cur.revenue += it.qty * it.price;
    sold.set(it.productId, cur);
  }
  const top = [...sold.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const lowStock = products.filter((p) => p.stock <= 5).sort((a, b) => a.stock - b.stock);

  const kpis = [
    { label: "Revenue · 30 days", value: formatPrice(revenue30) },
    { label: "Orders · 30 days", value: String(recent30.length) },
    { label: "Average order", value: formatPrice(Math.round(avg)) },
    { label: "Pending orders", value: String(pending), href: "/admin/orders?status=pending" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="An overview of your store" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => {
          const body = (
            <Card className="h-full p-5 transition hover:border-gold/60">
              <p className="text-xs uppercase tracking-[0.15em] text-cocoa">{k.label}</p>
              <p className="mt-3 font-serif text-2xl tabular-nums sm:text-3xl">{k.value}</p>
            </Card>
          );
          return k.href ? <Link key={k.label} href={k.href}>{body}</Link> : <div key={k.label}>{body}</div>;
        })}
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-2xl">Revenue · last {DAYS} days</h2>
        <p className="text-xs text-cocoa">Excludes cancelled orders</p>
        <div className="mt-2"><RevenueChart days={days} /></div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-sand px-6 py-4">
            <h2 className="text-2xl">Recent orders</h2>
            <Link href="/admin/orders" className="flex items-center gap-1 text-xs text-gold-dark hover:underline">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-sand last:border-0 hover:bg-cream/40">
                    <td className="px-6 py-3"><Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-gold-dark">{o.number}</Link></td>
                    <td className="px-2 py-3">{o.customer.firstName} {o.customer.lastName}</td>
                    <td className="hidden px-2 py-3 text-cocoa sm:table-cell">{formatDate(o.createdAt)}</td>
                    <td className="px-2 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-6 py-3 text-right tabular-nums">{formatPrice(o.total)}</td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td className="px-6 py-10 text-center text-cocoa">No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="border-b border-sand px-6 py-4 text-2xl">Top products</h2>
            <ul className="divide-y divide-sand">
              {top.map((p) => (
                <li key={p.name} className="flex items-center gap-3 px-6 py-3">
                  <div className="h-10 w-8 shrink-0 overflow-hidden rounded bg-cream"><SmartImage src={p.image} alt="" className="h-full w-full" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{p.name}</p>
                    <p className="text-xs text-cocoa">{p.qty} sold</p>
                  </div>
                  <p className="text-sm tabular-nums">{formatPrice(p.revenue)}</p>
                </li>
              ))}
              {top.length === 0 && <li className="px-6 py-6 text-sm text-cocoa">No sales yet.</li>}
            </ul>
          </Card>
          <Card>
            <h2 className="border-b border-sand px-6 py-4 text-2xl">Low stock</h2>
            <ul className="divide-y divide-sand">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-6 py-3 text-sm">
                  <Link href={`/admin/products/${p.id}`} className="truncate hover:text-gold-dark">{p.name}</Link>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${p.stock === 0 ? "bg-[#fbecec] text-[#9b2c2c]" : "bg-[#fdf3e1] text-[#8a5a00]"}`}>
                    {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                  </span>
                </li>
              ))}
              {lowStock.length === 0 && <li className="px-6 py-6 text-sm text-cocoa">All products are well stocked.</li>}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
