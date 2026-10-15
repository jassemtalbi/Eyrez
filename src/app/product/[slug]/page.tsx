import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products } from "@/lib/products";
import ProductDetail from "./ProductDetail";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);
  const more = [...related, ...products.filter((p) => p.category !== product.category && p.bestseller)].slice(0, 4);

  return (
    <>
      <nav className="container-x pt-8 text-[11px] uppercase tracking-[0.2em] text-cocoa" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span className="mx-2 text-gold">/</span>
        <Link href="/shop" className="hover:text-gold">Shop</Link>
        {category && (
          <>
            <span className="mx-2 text-gold">/</span>
            <Link href={`/shop?category=${category.slug}`} className="hover:text-gold">{category.name}</Link>
          </>
        )}
        <span className="mx-2 text-gold">/</span>
        <span className="text-espresso">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <section className="bg-cream py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Complete the look" title="You may also love" />
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {more.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
