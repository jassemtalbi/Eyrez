import type { Metadata } from "next";
import { formatPrice, site } from "@/lib/config";

export const metadata: Metadata = { title: "Help & FAQ" };

const sections = [
  {
    id: "shipping",
    title: "Shipping",
    items: [
      ["How long does delivery take?", "Orders are delivered within 24–72 hours across Tunisia, excluding weekends and holidays."],
      ["How much is delivery?", `Delivery costs ${formatPrice(site.shippingFee)} and is free for orders over ${formatPrice(site.freeShippingThreshold)}.`],
      ["How do I pay?", "We offer cash on delivery — you pay when your order arrives. Our team calls to confirm every order."],
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    items: [
      ["Can I exchange an item?", "Yes. Exchanges are accepted within 7 days of receipt, for unworn items with original tags and packaging."],
      ["How do I request an exchange?", "Contact us by phone, WhatsApp or email with your order number and we’ll arrange everything."],
    ],
  },
  {
    id: "sizing",
    title: "Size Guide",
    items: [["How do your sizes fit?", "Our pieces fit true to size. Between two sizes? Choose the larger one for a relaxed fit."]],
  },
];

const sizes = [
  ["XS", "34", "80–84", "62–66", "88–92"],
  ["S", "36", "84–88", "66–70", "92–96"],
  ["M", "38", "88–92", "70–74", "96–100"],
  ["L", "40", "92–98", "74–80", "100–106"],
  ["XL", "42", "98–104", "80–86", "106–112"],
];

export default function FaqPage() {
  return (
    <section className="container-x max-w-4xl py-20">
      <div className="text-center">
        <p className="eyebrow">Help Centre</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">How can we help?</h1>
        <div className="gold-line mx-auto mt-5" />
      </div>
      {sections.map((s) => (
        <div key={s.id} id={s.id} className="mt-16 scroll-mt-32">
          <h2 className="text-3xl">{s.title}</h2>
          <div className="mt-6 divide-y divide-sand border-y border-sand">
            {s.items.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl">
                  {q}
                  <span className="text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-cocoa">{a}</p>
              </details>
            ))}
          </div>
          {s.id === "sizing" && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[480px] text-center text-sm">
                <thead className="bg-espresso text-[11px] uppercase tracking-[0.2em] text-ivory">
                  <tr>{["Size", "EU", "Bust (cm)", "Waist (cm)", "Hips (cm)"].map((h) => <th key={h} className="px-4 py-3 font-normal">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {sizes.map((r) => (
                    <tr key={r[0]} className="border-b border-sand odd:bg-cream/50">
                      {r.map((c, i) => <td key={i} className={`px-4 py-3 ${i === 0 ? "font-medium" : "text-cocoa"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
