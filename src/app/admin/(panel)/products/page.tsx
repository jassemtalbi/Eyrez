import Link from "next/link";
import { Plus } from "lucide-react";
import { getProducts } from "@/lib/db";
import { categories } from "@/lib/products";
import { formatPrice } from "@/lib/config";
import { Card, PageHeader } from "@/components/admin/ui";
import SmartImage from "@/components/SmartImage";

export default async function ProductsPage() {
  const products = await getProducts({ includeInactive: true });
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <PageHeader
        title="Products"
        subtitle={`${products.length} products`}
        action={<Link href="/admin/products/new" className="btn-dark px-5 py-3"><Plus className="h-4 w-4" /> Add product</Link>}
      />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-cream/50 text-left text-xs uppercase tracking-[0.1em] text-cocoa">
              <tr>
                <th className="px-4 py-3 font-normal">Product</th>
                <th className="px-4 py-3 font-normal">Category</th>
                <th className="px-4 py-3 font-normal">Price</th>
                <th className="px-4 py-3 font-normal">Stock</th>
                <th className="px-4 py-3 font-normal">Visibility</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-sand hover:bg-cream/40">
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${p.id}`} className="flex items-center gap-3 hover:text-gold-dark">
                      <div className="h-12 w-9 shrink-0 overflow-hidden rounded bg-cream"><SmartImage src={p.images[0]} alt="" className="h-full w-full" /></div>
                      <span>
                        <span className="font-medium">{p.name}</span>
                        <span className="mt-0.5 flex gap-1.5 text-[11px] text-cocoa">
                          {p.isNew && <span>New</span>}
                          {p.bestseller && <span>· Bestseller</span>}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-cocoa">{catName(p.category)}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {formatPrice(p.price)}
                    {p.compareAt && <span className="ml-2 text-xs text-cocoa line-through">{formatPrice(p.compareAt)}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tabular-nums ${p.stock === 0 ? "text-[#9b2c2c]" : p.stock <= 5 ? "text-[#8a5a00]" : ""}`}>
                      {p.stock === 0 ? "Out of stock" : p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.active === false ? <span className="text-cocoa">Hidden</span> : <span className="text-[#22663a]">Visible</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
