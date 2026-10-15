"use client";

import { useState } from "react";
import { ChevronDown, Heart, RotateCcw, Truck, Wallet } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, site } from "@/lib/config";
import { useStore } from "@/context/store";
import SmartImage from "@/components/SmartImage";
import QtyControl from "@/components/QtyControl";

export default function ProductDetail({ product }: { product: Product }) {
  const { add, wishlist, toggleWish } = useStore();
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState<string | null>("details");
  const wished = wishlist.includes(product.id);

  const handleAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    add(product.id, size, color, qty);
  };

  const panels = [
    { id: "details", title: "Details & Care", body: <ul className="list-inside list-disc space-y-1.5">{product.details.map((d) => <li key={d}>{d}</li>)}</ul> },
    { id: "size", title: "Size & Fit", body: <p>Model is 175 cm and wears size S. This piece fits true to size — if you’re between sizes, we recommend taking the larger size for a relaxed fit.</p> },
    { id: "delivery", title: "Delivery & Exchanges", body: <p>Delivery in 24–72h across Tunisia. Free delivery from {formatPrice(site.freeShippingThreshold)}. Exchanges accepted within 7 days of receipt, items unworn with tags attached.</p> },
  ];

  return (
    <section className="container-x grid gap-10 py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* Gallery */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row">
        <div className="flex gap-3 sm:flex-col">
          {product.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-24 w-20 overflow-hidden bg-cream transition ${active === i ? "ring-1 ring-gold ring-offset-2 ring-offset-ivory" : "opacity-60 hover:opacity-100"}`}
            >
              <SmartImage src={img} alt="" className="h-full w-full" />
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1">
        <div className="group relative aspect-[3/4] w-full overflow-hidden bg-cream">
          <SmartImage key={active} src={product.images[active]} alt={product.name} eager className="absolute inset-0 h-full w-full animate-[fade-up_0.6s_ease] transition duration-700 group-hover:scale-105" />
          {product.isNew && <span className="absolute left-4 top-4 bg-ivory px-3 py-1 text-[10px] uppercase tracking-[0.25em]">New</span>}
        </div>
        </div>
      </div>

      {/* Info */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Eyrez Clothing</p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{product.name}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-cocoa">
          <span className="text-gold">{"★".repeat(Math.round(product.rating))}</span>
          {product.rating.toFixed(1)} · {product.reviews} reviews
        </div>
        <div className="mt-6 flex items-baseline gap-3">
          <span className="font-serif text-3xl">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <>
              <span className="text-cocoa/60 line-through">{formatPrice(product.compareAt)}</span>
              <span className="bg-gold px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-ivory">
                Save {formatPrice(product.compareAt - product.price)}
              </span>
            </>
          )}
        </div>
        <p className="mt-6 leading-relaxed text-cocoa">{product.description}</p>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em]">Colour — <span className="text-cocoa">{color}</span></p>
          <div className="mt-3 flex gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                aria-label={c.name}
                onClick={() => setColor(c.name)}
                className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-ivory transition ${color === c.name ? "ring-1 ring-espresso" : "ring-1 ring-linen hover:ring-gold"}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-xs uppercase tracking-[0.2em]">
            <p>Size {size && <span className="text-cocoa">— {size}</span>}</p>
            <a href="/faq#sizing" className="text-gold underline underline-offset-4">Size guide</a>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => { setSize(s); setError(false); }}
                className={`h-12 min-w-14 border px-4 text-sm transition ${size === s ? "border-espresso bg-espresso text-ivory" : "border-linen hover:border-espresso"}`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && <p className="mt-2 text-sm text-gold-dark">Please select a size.</p>}
          {product.stock <= 7 && <p className="mt-3 text-sm text-gold-dark">✦ Only {product.stock} left in stock</p>}
        </div>

        <div className="mt-8 flex gap-3">
          <QtyControl value={qty} max={product.stock} onChange={(v) => setQty(Math.max(1, v))} />
          <button onClick={handleAdd} className="btn-dark flex-1 whitespace-nowrap px-4">Add to bag · {formatPrice(product.price * qty)}</button>
          <button
            onClick={() => toggleWish(product.id)}
            aria-label="Toggle wishlist"
            aria-pressed={wished}
            className="flex h-12 w-12 shrink-0 items-center justify-center border border-linen transition hover:border-gold"
          >
            <Heart className={`h-5 w-5 ${wished ? "fill-gold text-gold" : ""}`} strokeWidth={1.4} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 border-y border-sand py-5 text-center text-[11px] uppercase tracking-[0.15em] text-cocoa">
          <div className="flex flex-col items-center gap-2"><Truck className="h-5 w-5 text-gold" strokeWidth={1.3} />24–72h delivery</div>
          <div className="flex flex-col items-center gap-2"><Wallet className="h-5 w-5 text-gold" strokeWidth={1.3} />Cash on delivery</div>
          <div className="flex flex-col items-center gap-2"><RotateCcw className="h-5 w-5 text-gold" strokeWidth={1.3} />7-day exchange</div>
        </div>

        <div className="mt-4 divide-y divide-sand">
          {panels.map((p) => (
            <div key={p.id}>
              <button onClick={() => setOpen(open === p.id ? null : p.id)} className="flex w-full items-center justify-between py-5 text-left text-xs uppercase tracking-[0.2em]">
                {p.title}
                <ChevronDown className={`h-4 w-4 transition ${open === p.id ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid text-sm leading-relaxed text-cocoa transition-all duration-500 ${open === p.id ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
