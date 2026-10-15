"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/config";

type Day = { date: string; label: string; revenue: number; orders: number };

const H = 200;
const BAR = "#a8721f";

function niceMax(v: number) {
  if (v <= 0) return 100;
  const p = 10 ** Math.floor(Math.log10(v));
  return Math.ceil(v / p) * p;
}

export default function RevenueChart({ days }: { days: Day[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const max = niceMax(Math.max(...days.map((d) => d.revenue)));
  const ticks = [0, max / 2, max];
  const peak = days.reduce((m, d, i) => (d.revenue > days[m].revenue ? i : m), 0);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={() => setTable((t) => !t)} className="text-xs text-cocoa underline underline-offset-4 hover:text-espresso">
          {table ? "View as chart" : "View as table"}
        </button>
      </div>
      {table ? (
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-cocoa">
            <tr><th className="py-2 font-normal">Day</th><th className="py-2 text-right font-normal">Orders</th><th className="py-2 text-right font-normal">Revenue</th></tr>
          </thead>
          <tbody>
            {days.map((d) => (
              <tr key={d.date} className="border-t border-sand">
                <td className="py-2">{d.label}</td><td className="py-2 text-right tabular-nums">{d.orders}</td><td className="py-2 text-right tabular-nums">{formatPrice(d.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex gap-3">
          <div className="relative w-14 shrink-0 text-right text-[11px] text-cocoa" style={{ height: H }}>
            {ticks.map((t) => (
              <span key={t} className="absolute right-0 -translate-y-1/2 tabular-nums" style={{ top: H - (t / max) * H }}>
                {t >= 1000 ? `${t / 1000}K` : t}
              </span>
            ))}
          </div>
          <div className="relative flex-1">
            <div className="relative" style={{ height: H }}>
              {ticks.map((t) => (
                <div key={t} className="absolute inset-x-0 h-px bg-[#ece6dc]" style={{ top: H - (t / max) * H }} />
              ))}
              <div className="absolute inset-0 flex items-end">
                {days.map((d, i) => {
                  const h = (d.revenue / max) * H;
                  return (
                    <div
                      key={d.date}
                      className="relative flex h-full flex-1 cursor-default items-end justify-center px-px"
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                    >
                      {i === peak && d.revenue > 0 && hover === null && (
                        <span className="absolute whitespace-nowrap text-[11px] font-medium tabular-nums text-espresso" style={{ bottom: h + 4 }}>
                          {formatPrice(d.revenue)}
                        </span>
                      )}
                      <div
                        className="w-full max-w-6 rounded-t-[4px] transition-opacity"
                        style={{ height: Math.max(d.revenue > 0 ? 2 : 0, h), background: BAR, opacity: hover === null || hover === i ? 1 : 0.45 }}
                      />
                      {hover === i && (
                        <div
                          className="pointer-events-none absolute z-10 whitespace-nowrap rounded-md border border-sand bg-white px-3 py-2 text-xs shadow-lg"
                          style={{ bottom: h + 8 }}
                        >
                          <p className="text-cocoa">{d.label}</p>
                          <p className="mt-0.5 font-medium text-espresso tabular-nums">{formatPrice(d.revenue)}</p>
                          <p className="text-cocoa">{d.orders} {d.orders === 1 ? "order" : "orders"}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 flex text-[11px] text-cocoa">
              {days.map((d, i) => (
                <span key={d.date} className={`flex-1 whitespace-nowrap text-center ${i % 4 !== 0 ? "max-sm:invisible" : ""}`}>{i % 2 === 0 ? d.label : ""}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
