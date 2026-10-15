"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/products";
import { useStore } from "@/context/store";
import { formatPrice } from "@/lib/config";
import ProductCard from "@/components/ProductCard";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

const allSizes = ["XS", "S", "M", "L", "XL", "One size"];
const priceRanges = [
  { value: "0-150", label: `Under ${formatPrice(150)}` },
  { value: "150-300", label: `${formatPrice(150)} – ${formatPrice(300)}` },
  { value: "300-9999", label: `Over ${formatPrice(300)}` },
];

export default function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { products } = useStore();

  const category = params.get("category") ?? "";
  const filter = params.get("filter") ?? "";
  const q = params.get("q") ?? "";
  const size = params.get("size") ?? "";
  const price = params.get("price") ?? "";
  const sort = params.get("sort") ?? "featured";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const results = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (filter === "new") list = list.filter((p) => p.isNew);
    if (filter === "sale") list = list.filter((p) => p.compareAt);
    if (filter === "best") list = list.filter((p) => p.bestseller);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((p) => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(s));
    }
    if (size) list = list.filter((p) => p.sizes.includes(size));
    if (price) {
      const [min, max] = price.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price < max);
    }
    switch (sort) {
      case "new": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [products, category, filter, q, size, price, sort]);

  const activeCat = categories.find((c) => c.slug === category);
  const title = q
    ? `Results for “${q}”`
    : activeCat?.name ?? (filter === "new" ? "New In" : filter === "sale" ? "Sale" : filter === "best" ? "Bestsellers" : "Shop All");
  const hasFilters = !!(category || filter || q || size || price);

  const FilterPanel = (
    <div className="space-y-10">
      <FilterGroup title="Category">
        <Chip active={!category} onClick={() => set("category", "")}>All</Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={category === c.slug} onClick={() => set("category", c.slug)}>{c.name}</Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Edit">
        {[["", "Everything"], ["new", "New In"], ["best", "Bestsellers"], ["sale", "Sale"]].map(([v, l]) => (
          <Chip key={l} active={filter === v} onClick={() => set("filter", v)}>{l}</Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Size">
        {allSizes.map((s) => (
          <Chip key={s} active={size === s} onClick={() => set("size", size === s ? "" : s)}>{s}</Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        {priceRanges.map((r) => (
          <Chip key={r.value} active={price === r.value} onClick={() => set("price", price === r.value ? "" : r.value)}>{r.label}</Chip>
        ))}
      </FilterGroup>
      {hasFilters && (
        <Link href="/shop" className="inline-block text-xs uppercase tracking-[0.25em] text-gold underline underline-offset-4">
          Clear all filters
        </Link>
      )}
    </div>
  );

  return (
    <>
      <section className="border-b border-sand bg-cream">
        <div className="container-x py-16 text-center">
          <p className="eyebrow">Eyrez Clothing</p>
          <h1 className="mt-3 text-5xl sm:text-6xl">{title}</h1>
          <div className="gold-line mx-auto mt-5" />
          {activeCat && <p className="mt-4 text-cocoa">{activeCat.description}</p>}
        </div>
      </section>

      <section className="container-x py-12">
        <div className="flex items-center justify-between gap-4 border-b border-sand pb-5">
          <button onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] lg:hidden">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.4} /> Filters
          </button>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-cocoa lg:block">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
            <span className="hidden text-cocoa sm:inline">Sort by</span>
            <select
              value={sort}
              onChange={(e) => set("sort", e.target.value === "featured" ? "" : e.target.value)}
              className="cursor-pointer appearance-none bg-transparent pr-6 uppercase tracking-[0.2em] outline-none"
            >
              {sorts.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5" />
          </label>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">{FilterPanel}</aside>

          <div>
            {results.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-3xl">No pieces found</p>
                <p className="mt-3 text-cocoa">Try adjusting your filters or search.</p>
                <Link href="/shop" className="btn-dark mt-8">View all</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:gap-x-6">
                {results.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 3} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters */}
      <div className={`fixed inset-0 z-50 lg:hidden ${filtersOpen ? "" : "pointer-events-none"}`}>
        <div onClick={() => setFiltersOpen(false)} className={`absolute inset-0 bg-ink/40 transition-opacity ${filtersOpen ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-ivory p-6 transition-transform duration-500 ${filtersOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="mb-8 flex items-center justify-between">
            <p className="font-serif text-2xl">Filters</p>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X className="h-5 w-5" /></button>
          </div>
          {FilterPanel}
          <button onClick={() => setFiltersOpen(false)} className="btn-dark mt-10 w-full">
            Show {results.length} pieces
          </button>
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-2.5">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`border px-3 py-1.5 text-sm transition lg:border-0 lg:p-0 lg:text-left ${
        active ? "border-espresso bg-espresso text-ivory lg:bg-transparent lg:text-gold-dark lg:underline lg:underline-offset-4" : "border-linen hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}
