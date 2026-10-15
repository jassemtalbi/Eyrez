"use client";

import { formatPrice, site } from "@/lib/config";

export default function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, site.freeShippingThreshold - subtotal);
  const pct = Math.min(100, (subtotal / site.freeShippingThreshold) * 100);
  return (
    <div>
      <p className="text-xs tracking-wide text-cocoa">
        {remaining > 0 ? (
          <>
            You are <strong className="text-gold-dark">{formatPrice(remaining)}</strong> away from free delivery
          </>
        ) : (
          <>✦ You’ve unlocked <strong className="text-gold-dark">free delivery</strong></>
        )}
      </p>
      <div className="mt-2 h-[3px] w-full overflow-hidden bg-sand">
        <div className="h-full bg-gradient-to-r from-gold-dark to-gold-light transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
