import type { OrderStatus } from "@/lib/types";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-cocoa">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-sand bg-white ${className}`}>{children}</div>;
}

const statusStyle: Record<OrderStatus, { label: string; cls: string; dot: string }> = {
  pending: { label: "Pending", cls: "bg-[#fdf3e1] text-[#8a5a00]", dot: "bg-[#d99500]" },
  confirmed: { label: "Confirmed", cls: "bg-[#eef2fb] text-[#2f4a8a]", dot: "bg-[#4a6fc4]" },
  shipped: { label: "Shipped", cls: "bg-[#f1ecf8] text-[#5b3c8c]", dot: "bg-[#7f5bc0]" },
  delivered: { label: "Delivered", cls: "bg-[#e9f5ec] text-[#22663a]", dot: "bg-[#2e8b4e]" },
  cancelled: { label: "Cancelled", cls: "bg-[#fbecec] text-[#9b2c2c]", dot: "bg-[#c43d3d]" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = statusStyle[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-medium ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export const statusLabel = (s: OrderStatus) => statusStyle[s].label;

export function formatDate(iso: string, withTime = false) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}
