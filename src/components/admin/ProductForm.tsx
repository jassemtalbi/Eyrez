"use client";

import { useActionState, useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { categories, type Product } from "@/lib/products";
import { deleteProduct, saveProduct } from "@/app/admin/actions";
import { site } from "@/lib/config";
import { Card } from "./ui";
import SmartImage from "@/components/SmartImage";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One size"];

const field = "w-full rounded-md border border-sand bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold";
const label = "mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-cocoa";

export default function ProductForm({ product }: { product?: Product }) {
  const [state, action, saving] = useActionState(saveProduct, undefined);
  const [deleting, startDelete] = useTransition();
  const [images, setImages] = useState((product?.images ?? []).join("\n"));
  const previews = images.split("\n").map((s) => s.trim()).filter(Boolean);

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="space-y-6">
        <Card className="space-y-5 p-6">
          <div>
            <label className={label} htmlFor="name">Name *</label>
            <input id="name" name="name" required defaultValue={product?.name} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="slug">URL</label>
            <div className="flex items-center rounded-md border border-sand bg-white focus-within:border-gold">
              <span className="pl-3 text-sm text-cocoa">/product/</span>
              <input id="slug" name="slug" defaultValue={product?.slug} placeholder="generated from the name" className="w-full bg-transparent px-1 py-2.5 text-sm outline-none" />
            </div>
          </div>
          <div>
            <label className={label} htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={4} defaultValue={product?.description} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="details">Details & care <span className="normal-case tracking-normal">(one per line)</span></label>
            <textarea id="details" name="details" rows={4} defaultValue={product?.details.join("\n")} className={field} />
          </div>
        </Card>

        <Card className="space-y-5 p-6">
          <div>
            <label className={label} htmlFor="images">Images * <span className="normal-case tracking-normal">(one URL per line — the first is the main photo)</span></label>
            <textarea id="images" name="images" rows={3} value={images} onChange={(e) => setImages(e.target.value)} placeholder="/products/dress-1.jpg" className={`${field} font-mono text-xs`} />
          </div>
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={src + i} className="h-28 w-20 overflow-hidden rounded bg-cream ring-1 ring-sand"><SmartImage src={src} alt="" className="h-full w-full" /></div>
              ))}
            </div>
          )}
        </Card>

        <Card className="grid gap-5 p-6 sm:grid-cols-2">
          <div>
            <p className={label}>Sizes *</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="checkbox" name="sizes" value={s} defaultChecked={product?.sizes.includes(s)} className="peer sr-only" />
                  <span className="block rounded-md border border-sand px-3 py-1.5 text-sm transition peer-checked:border-espresso peer-checked:bg-espresso peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-gold">{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={label} htmlFor="colors">Colours * <span className="normal-case tracking-normal">(Name: #hex, one per line)</span></label>
            <textarea
              id="colors"
              name="colors"
              rows={3}
              defaultValue={product?.colors.map((c) => `${c.name}: ${c.hex}`).join("\n")}
              placeholder={"Cream: #F3E9DA\nCamel: #B8875A"}
              className={`${field} font-mono text-xs`}
            />
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="space-y-4 p-6">
          <label className="flex items-center justify-between text-sm">
            Visible in store
            <input type="checkbox" name="active" defaultChecked={product?.active !== false} className="h-4 w-4 accent-gold" />
          </label>
          <label className="flex items-center justify-between text-sm">
            Mark as “New”
            <input type="checkbox" name="isNew" defaultChecked={product?.isNew ?? true} className="h-4 w-4 accent-gold" />
          </label>
          <label className="flex items-center justify-between text-sm">
            Bestseller
            <input type="checkbox" name="bestseller" defaultChecked={product?.bestseller} className="h-4 w-4 accent-gold" />
          </label>
        </Card>

        <Card className="space-y-5 p-6">
          <div>
            <label className={label} htmlFor="category">Category *</label>
            <select id="category" name="category" required defaultValue={product?.category ?? ""} className={field}>
              <option value="" disabled>Choose…</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label} htmlFor="price">Price ({site.currency}) *</label>
              <input id="price" name="price" type="number" min="0" step="0.5" required defaultValue={product?.price} className={field} />
            </div>
            <div>
              <label className={label} htmlFor="compareAt">Compare at</label>
              <input id="compareAt" name="compareAt" type="number" min="0" step="0.5" defaultValue={product?.compareAt} placeholder="Old price" className={field} />
            </div>
          </div>
          <div>
            <label className={label} htmlFor="stock">Stock *</label>
            <input id="stock" name="stock" type="number" min="0" step="1" required defaultValue={product?.stock ?? 0} className={field} />
          </div>
        </Card>

        {state?.error && <p role="alert" className="rounded-md border border-[#f1c4c4] bg-[#fbecec] px-4 py-3 text-sm text-[#9b2c2c]">{state.error}</p>}

        <div className="flex gap-3">
          <button disabled={saving || deleting} className="btn-dark flex-1 rounded-md px-4">{saving ? "Saving…" : product ? "Save changes" : "Create product"}</button>
          {product && (
            <button
              type="button"
              disabled={saving || deleting}
              aria-label="Delete product"
              onClick={() => confirm(`Delete “${product.name}”? This cannot be undone.`) && startDelete(() => deleteProduct(product.id))}
              className="flex w-12 items-center justify-center rounded-md border border-sand text-[#9b2c2c] transition hover:border-[#c43d3d] hover:bg-[#fbecec] disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
