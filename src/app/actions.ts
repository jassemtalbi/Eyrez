"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "@/lib/db";
import { site } from "@/lib/config";

type LineInput = { productId: string; size: string; color: string; qty: number };

export type PlaceOrderResult = { ok: true; number: string; total: number } | { ok: false; error: string };

const str = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").trim().slice(0, max);

export async function placeOrder(lines: LineInput[], form: FormData): Promise<PlaceOrderResult> {
  const customer = {
    firstName: str(form.get("firstName"), 60),
    lastName: str(form.get("lastName"), 60),
    phone: str(form.get("phone"), 30),
    email: str(form.get("email"), 120) || undefined,
    address: str(form.get("address")),
    city: str(form.get("city"), 80),
    governorate: str(form.get("governorate"), 40),
    notes: str(form.get("notes"), 500) || undefined,
  };
  if (!customer.firstName || !customer.lastName || !customer.address || !customer.city || !customer.governorate) {
    return { ok: false, error: "Please fill in all required fields." };
  }
  if (!/^[0-9+ ]{8,}$/.test(customer.phone)) return { ok: false, error: "Please enter a valid phone number." };
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) return { ok: false, error: "Your bag is empty." };

  try {
    const order = await createOrder((products) => {
      const items = lines.map((l) => {
        const p = products.find((x) => x.id === l.productId && x.active !== false);
        const qty = Math.floor(Number(l.qty));
        if (!p) throw new Error("One of the items is no longer available.");
        if (!p.sizes.includes(l.size) || !p.colors.some((c) => c.name === l.color)) throw new Error(`Please re-select options for ${p.name}.`);
        if (!(qty >= 1) || qty > p.stock) throw new Error(`Only ${p.stock} left of ${p.name}.`);
        // Prices always come from the catalogue, never from the browser.
        return { productId: p.id, name: p.name, slug: p.slug, image: p.images[0] ?? "", price: p.price, size: l.size, color: l.color, qty };
      });
      const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
      const shipping = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
      return { customer, items, subtotal, shipping, total: subtotal + shipping };
    });
    revalidatePath("/", "layout");
    return { ok: true, number: order.number, total: order.total };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong, please try again." };
  }
}
