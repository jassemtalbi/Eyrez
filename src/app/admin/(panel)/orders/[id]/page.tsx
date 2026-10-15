import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getOrder } from "@/lib/db";
import { formatPrice } from "@/lib/config";
import { Card, StatusBadge, formatDate } from "@/components/admin/ui";
import OrderStatusControl from "@/components/admin/OrderStatusControl";
import SmartImage from "@/components/SmartImage";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const order = await getOrder((await params).id);
  if (!order) notFound();
  const c = order.customer;

  return (
    <>
      <Link href="/admin/orders" className="mb-4 inline-flex items-center gap-1 text-sm text-cocoa hover:text-espresso">
        <ArrowLeft className="h-4 w-4" /> Orders
      </Link>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-4xl">{order.number} <StatusBadge status={order.status} /></h1>
          <p className="mt-1 text-sm text-cocoa">Placed {formatDate(order.createdAt, true)}</p>
        </div>
        <OrderStatusControl id={order.id} status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <h2 className="border-b border-sand px-6 py-4 text-2xl">Items</h2>
          <ul className="divide-y divide-sand">
            {order.items.map((it, i) => (
              <li key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded bg-cream"><SmartImage src={it.image} alt="" className="h-full w-full" /></div>
                <div className="flex-1">
                  <Link href={`/product/${it.slug}`} target="_blank" className="hover:text-gold-dark">{it.name}</Link>
                  <p className="text-xs text-cocoa">{it.color} · {it.size} · {formatPrice(it.price)} × {it.qty}</p>
                </div>
                <p className="tabular-nums">{formatPrice(it.price * it.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-sand px-6 py-4 text-sm">
            <div className="flex justify-between"><dt className="text-cocoa">Subtotal</dt><dd className="tabular-nums">{formatPrice(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-cocoa">Delivery</dt><dd className="tabular-nums">{order.shipping ? formatPrice(order.shipping) : "Free"}</dd></div>
            <div className="flex justify-between text-base font-medium"><dt>Total · cash on delivery</dt><dd className="tabular-nums">{formatPrice(order.total)}</dd></div>
          </dl>
        </Card>

        <Card className="h-fit p-6">
          <h2 className="text-2xl">Customer</h2>
          <p className="mt-4 font-medium">{c.firstName} {c.lastName}</p>
          <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="mt-1 block text-sm text-gold-dark hover:underline">{c.phone}</a>
          {c.email && <a href={`mailto:${c.email}`} className="block text-sm text-gold-dark hover:underline">{c.email}</a>}
          <h3 className="mt-6 text-xs uppercase tracking-[0.15em] text-cocoa">Delivery address</h3>
          <p className="mt-2 text-sm leading-relaxed">{c.address}<br />{c.city}, {c.governorate}</p>
          {c.notes && (
            <>
              <h3 className="mt-6 text-xs uppercase tracking-[0.15em] text-cocoa">Notes</h3>
              <p className="mt-2 text-sm">{c.notes}</p>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
