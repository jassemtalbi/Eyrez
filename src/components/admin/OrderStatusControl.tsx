"use client";

import { useTransition } from "react";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";
import { setOrderStatus } from "@/app/admin/actions";
import { statusLabel } from "./ui";

export default function OrderStatusControl({ id, status }: { id: string; status: OrderStatus }) {
  const [pending, start] = useTransition();
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="text-cocoa">Status</span>
      <select
        value={status}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value as OrderStatus;
          if (next === "cancelled" && !confirm("Cancel this order? Its items will be returned to stock.")) return;
          start(() => setOrderStatus(id, next));
        }}
        className="rounded-md border border-sand bg-white px-3 py-2 outline-none focus:border-gold disabled:opacity-50"
      >
        {ORDER_STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
      </select>
      {pending && <span className="text-xs text-cocoa">Saving…</span>}
    </label>
  );
}
