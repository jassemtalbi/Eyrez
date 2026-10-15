"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/context/store";
import { formatPrice } from "@/lib/config";
import SmartImage from "./SmartImage";
import QtyControl from "./QtyControl";
import FreeShippingMeter from "./FreeShippingMeter";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQty, remove, count } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
      <div
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${cartOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cartOpen ? "translate-x-0 shadow-2xl" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <h2 className="font-serif text-2xl">
            Your Bag <span className="text-base text-cocoa">({count})</span>
          </h2>
          <button aria-label="Close bag" onClick={() => setCartOpen(false)} className="transition hover:rotate-90 hover:text-gold">
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
              <ShoppingBag className="h-8 w-8 text-gold" strokeWidth={1.2} />
            </div>
            <p className="font-serif text-2xl">Your bag is empty</p>
            <p className="text-sm text-cocoa">Discover pieces made to be treasured.</p>
            <Link href="/shop" onClick={() => setCartOpen(false)} className="btn-dark mt-2">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-sand px-6 py-4">
              <FreeShippingMeter subtotal={subtotal} />
            </div>
            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-5">
                  <Link href={`/product/${l.product.slug}`} onClick={() => setCartOpen(false)} className="h-28 w-22 shrink-0 overflow-hidden bg-cream">
                    <SmartImage src={l.product.images[0]} alt={l.product.name} className="h-full w-full" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link href={`/product/${l.product.slug}`} onClick={() => setCartOpen(false)} className="font-serif text-lg leading-tight hover:text-gold">
                        {l.product.name}
                      </Link>
                      <button aria-label="Remove" onClick={() => remove(l.key)} className="text-cocoa/60 transition hover:text-gold">
                        <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-widest text-cocoa">
                      {l.color} · {l.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyControl small value={l.qty} max={l.product.stock} onChange={(v) => setQty(l.key, v)} />
                      <span className="text-sm font-medium">{formatPrice(l.product.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-sand bg-cream/60 px-6 py-6">
              <div className="flex justify-between">
                <span className="text-sm uppercase tracking-[0.2em]">Subtotal</span>
                <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-cocoa">Shipping calculated at checkout. Cash on delivery available.</p>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn-dark w-full">
                Checkout
              </Link>
              <Link href="/cart" onClick={() => setCartOpen(false)} className="btn-outline w-full">
                View bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
