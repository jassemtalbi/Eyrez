"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/config";
import { useStore } from "@/context/store";
import SmartImage from "./SmartImage";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { wishlist, toggleWish, add } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  const oneSize = product.sizes.length === 1;

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            eager={priority}
            className="absolute inset-0 h-full w-full transition duration-[1200ms] ease-out group-hover:scale-105"
          />
          {product.images[1] && (
            <SmartImage
              src={product.images[1]}
              alt=""
              className="absolute inset-0 h-full w-full opacity-0 transition duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <span className="bg-ivory px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]">New</span>}
          {discount > 0 && <span className="bg-gold px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory">-{discount}%</span>}
        </div>

        <button
          onClick={() => toggleWish(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 backdrop-blur transition hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`} strokeWidth={1.5} />
        </button>

        {/* Quick add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {oneSize ? (
            <button
              onClick={() => add(product.id, product.sizes[0], product.colors[0].name)}
              className="w-full bg-ivory/95 py-3 text-[11px] uppercase tracking-[0.25em] backdrop-blur transition hover:bg-espresso hover:text-ivory"
            >
              Quick add
            </button>
          ) : (
            <div className="bg-ivory/95 p-2 backdrop-blur">
              <p className="pb-1.5 text-center text-[10px] uppercase tracking-[0.25em] text-cocoa">Quick add</p>
              <div className="flex justify-center gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => add(product.id, s, product.colors[0].name)}
                    className="min-w-9 border border-linen px-2 py-1.5 text-[11px] transition hover:border-espresso hover:bg-espresso hover:text-ivory"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`} className="font-serif text-lg leading-snug transition hover:text-gold">
            {product.name}
          </Link>
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((c) => (
              <span key={c.name} title={c.name} className="h-3 w-3 rounded-full ring-1 ring-linen ring-offset-1 ring-offset-ivory" style={{ background: c.hex }} />
            ))}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          {product.compareAt && <p className="text-xs text-cocoa/60 line-through">{formatPrice(product.compareAt)}</p>}
        </div>
      </div>
    </article>
  );
}
