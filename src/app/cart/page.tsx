"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useStore } from "@/context/store";
import { formatPrice } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import QtyControl from "@/components/QtyControl";
import FreeShippingMeter from "@/components/FreeShippingMeter";

export default function CartPage() {
  const { lines, subtotal, shipping, total, setQty, remove } = useStore();

  return (
    <section className="container-x py-16">
      <h1 className="text-center text-5xl">Your Bag</h1>
      <div className="gold-line mx-auto mt-5" />

      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-2xl">Your bag is empty</p>
          <Link href="/shop" className="btn-dark mt-8">Continue shopping</Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="hidden grid-cols-[1fr_140px_120px] border-b border-sand pb-3 text-[11px] uppercase tracking-[0.25em] text-cocoa sm:grid">
              <span>Product</span><span className="text-center">Quantity</span><span className="text-right">Total</span>
            </div>
            <ul className="divide-y divide-sand">
              {lines.map((l) => (
                <li key={l.key} className="grid grid-cols-[1fr_auto] items-center gap-4 py-6 sm:grid-cols-[1fr_140px_120px]">
                  <div className="flex gap-5">
                    <Link href={`/product/${l.product.slug}`} className="h-32 w-24 shrink-0 overflow-hidden bg-cream">
                      <SmartImage src={l.product.images[0]} alt={l.product.name} className="h-full w-full" />
                    </Link>
                    <div>
                      <Link href={`/product/${l.product.slug}`} className="font-serif text-xl hover:text-gold">{l.product.name}</Link>
                      <p className="mt-1 text-xs uppercase tracking-widest text-cocoa">{l.color} · {l.size}</p>
                      <p className="mt-2 text-sm">{formatPrice(l.product.price)}</p>
                      <button onClick={() => remove(l.key)} className="mt-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-cocoa hover:text-gold">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center"><QtyControl small value={l.qty} max={l.product.stock} onChange={(v) => setQty(l.key, v)} /></div>
                  <p className="col-span-2 text-right font-medium sm:col-span-1">{formatPrice(l.product.price * l.qty)}</p>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="mt-6 inline-block text-xs uppercase tracking-[0.25em] text-gold underline underline-offset-4">← Continue shopping</Link>
          </div>

          <aside className="h-fit border border-sand bg-cream/60 p-8">
            <h2 className="font-serif text-2xl">Order summary</h2>
            <div className="mt-6"><FreeShippingMeter subtotal={subtotal} /></div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Delivery</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-sand pt-4 font-serif text-xl"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
            </dl>
            <Link href="/checkout" className="btn-dark mt-8 w-full">Proceed to checkout</Link>
            <p className="mt-4 text-center text-xs text-cocoa">Cash on delivery · Secure ordering</p>
          </aside>
        </div>
      )}
    </section>
  );
}
