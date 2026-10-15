"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Wallet } from "lucide-react";
import { useStore } from "@/context/store";
import { formatPrice } from "@/lib/config";
import SmartImage from "@/components/SmartImage";
import { placeOrder } from "@/app/actions";

const governorates = [
  "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba", "Le Kef", "Siliana",
  "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine", "Tataouine",
  "Gafsa", "Tozeur", "Kébili",
];

type Order = { id: string; name: string; total: number };

export default function CheckoutPage() {
  const { lines, subtotal, shipping, total, clear } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setError("");
    const res = await placeOrder(
      lines.map(({ productId, size, color, qty }) => ({ productId, size, color, qty })),
      data,
    ).catch(() => ({ ok: false as const, error: "Connection problem, please try again." }));
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setOrder({ id: res.number, name: String(data.get("firstName")), total: res.total });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (order) {
    return (
      <section className="container-x flex flex-col items-center py-28 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-ivory">
          <Check className="h-9 w-9" strokeWidth={1.5} />
        </div>
        <p className="eyebrow mt-8">Order confirmed</p>
        <h1 className="mt-3 text-5xl">Thank you, {order.name}</h1>
        <p className="mt-5 max-w-md text-cocoa">
          Your order <strong className="text-espresso">{order.id}</strong> ({formatPrice(order.total)}) has been received. Our team will call you shortly to confirm delivery.
        </p>
        <Link href="/shop" className="btn-dark mt-10">Continue shopping</Link>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="container-x py-28 text-center">
        <h1 className="text-5xl">Checkout</h1>
        <p className="mt-6 text-cocoa">Your bag is empty.</p>
        <Link href="/shop" className="btn-dark mt-8">Discover the collection</Link>
      </section>
    );
  }

  return (
    <section className="container-x py-16">
      <h1 className="text-center text-5xl">Checkout</h1>
      <div className="gold-line mx-auto mt-5" />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_420px]">
        <form id="checkout" onSubmit={onSubmit} className="space-y-10">
          <fieldset>
            <legend className="eyebrow mb-5">1 · Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="firstName" required placeholder="First name *" className="input" autoComplete="given-name" />
              <input name="lastName" required placeholder="Last name *" className="input" autoComplete="family-name" />
              <input name="phone" required type="tel" pattern="[0-9+ ]{8,}" placeholder="Phone number *" className="input" autoComplete="tel" />
              <input name="email" type="email" placeholder="Email (optional)" className="input" autoComplete="email" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-5">2 · Delivery address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="address" required placeholder="Address *" className="input sm:col-span-2" autoComplete="street-address" />
              <input name="city" required placeholder="City *" className="input" autoComplete="address-level2" />
              <select name="governorate" required defaultValue="" className="input">
                <option value="" disabled>Governorate *</option>
                {governorates.map((g) => <option key={g}>{g}</option>)}
              </select>
              <textarea name="notes" rows={3} placeholder="Order notes (optional)" className="input sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-5">3 · Payment</legend>
            <label className="flex cursor-pointer items-center gap-4 border border-gold bg-cream/60 p-5">
              <input type="radio" name="payment" defaultChecked className="accent-gold" />
              <Wallet className="h-5 w-5 text-gold" strokeWidth={1.4} />
              <span>
                <span className="block text-sm font-medium">Cash on delivery</span>
                <span className="text-xs text-cocoa">Pay in cash when your order arrives.</span>
              </span>
            </label>
          </fieldset>

          {error && <p role="alert" className="border border-gold bg-cream px-4 py-3 text-sm text-gold-dark">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-dark w-full lg:hidden">
            {submitting ? "Placing order…" : `Place order — ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="h-fit border border-sand bg-cream/60 p-8 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl">Your order</h2>
          <ul className="mt-6 space-y-4">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-4">
                <div className="relative h-20 w-16 shrink-0 bg-cream">
                  <SmartImage src={l.product.images[0]} alt={l.product.name} className="h-full w-full" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-espresso text-[10px] text-ivory">{l.qty}</span>
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg leading-tight">{l.product.name}</p>
                  <p className="text-xs uppercase tracking-widest text-cocoa">{l.color} · {l.size}</p>
                </div>
                <p className="text-sm">{formatPrice(l.product.price * l.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-sand pt-6 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-sand pt-4 font-serif text-2xl"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          <button type="submit" form="checkout" disabled={submitting} className="btn-dark mt-8 hidden w-full lg:flex">
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </div>
    </section>
  );
}
