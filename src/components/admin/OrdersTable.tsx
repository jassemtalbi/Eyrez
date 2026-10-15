"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ORDER_STATUSES, type Order } from "@/lib/types";
import { formatPrice } from "@/lib/config";
import { Card, StatusBadge, formatDate, statusLabel } from "./ui";

export default function OrdersTable({ orders, initialStatus }: { orders: Order[]; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) c[o.status] = (c[o.status] ?? 0) + 1;
    return c;
  }, [orders]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return orders.filter(
      (o) =>
        (status === "all" || o.status === status) &&
        (!s || `${o.number} ${o.customer.firstName} ${o.customer.lastName} ${o.customer.phone} ${o.customer.city}`.toLowerCase().includes(s)),
    );
  }, [orders, status, q]);

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-3 border-b border-sand p-4">
        <div className="flex flex-wrap gap-1">
          {["all", ...ORDER_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-md px-3 py-1.5 text-sm transition ${status === s ? "bg-espresso text-ivory" : "text-cocoa hover:bg-cream"}`}
            >
              {s === "all" ? "All" : statusLabel(s as Order["status"])} <span className="opacity-60">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <label className="ml-auto flex items-center gap-2 rounded-md border border-sand px-3 py-1.5">
          <Search className="h-4 w-4 text-cocoa" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, name, phone…" className="w-52 bg-transparent text-sm outline-none" />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-cream/50 text-left text-xs uppercase tracking-[0.1em] text-cocoa">
            <tr>
              <th className="px-4 py-3 font-normal">Order</th>
              <th className="px-4 py-3 font-normal">Date</th>
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">City</th>
              <th className="px-4 py-3 font-normal">Items</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 text-right font-normal">Total</th>
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id} className="border-t border-sand hover:bg-cream/40">
                <td className="px-4 py-3"><Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-gold-dark">{o.number}</Link></td>
                <td className="px-4 py-3 text-cocoa">{formatDate(o.createdAt, true)}</td>
                <td className="px-4 py-3">
                  {o.customer.firstName} {o.customer.lastName}
                  <span className="block text-xs text-cocoa">{o.customer.phone}</span>
                </td>
                <td className="px-4 py-3 text-cocoa">{o.customer.city}</td>
                <td className="px-4 py-3 tabular-nums">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">{formatPrice(o.total)}</td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-cocoa">No orders match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
