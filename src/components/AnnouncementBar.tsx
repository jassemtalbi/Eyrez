import { site, formatPrice } from "@/lib/config";

const messages = [
  `Free delivery on orders over ${formatPrice(site.freeShippingThreshold)}`,
  "Cash on delivery across Tunisia",
  "Free exchanges within 7 days",
  "New collection — Autumn Whispers",
];

export default function AnnouncementBar() {
  const items = [...messages, ...messages];
  return (
    <div className="overflow-hidden bg-espresso py-2.5 text-ivory">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-16 text-[11px] uppercase tracking-[0.3em]">
            {m}
            <span className="text-gold-light">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
