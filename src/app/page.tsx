import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { heroImages, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";

export default function Home() {
  const newIn = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-x grid min-h-[calc(100svh-7.5rem)] items-center gap-10 py-12 lg:grid-cols-2 lg:py-0">
          <div className="relative z-10 animate-fade-up">
            <p className="eyebrow">Autumn · Winter 2026</p>
            <h1 className="mt-5 text-6xl leading-[0.95] text-espresso sm:text-7xl xl:text-8xl">
              The art of
              <br />
              <em className="text-gold-gradient font-normal">quiet elegance</em>
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-cocoa">
              Discover our new collection — fluid silhouettes, warm neutrals and refined details, designed to be worn and loved for years.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/shop?filter=new" className="btn-dark">
                Shop new in <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/shop" className="btn-outline">
                Explore all
              </Link>
            </div>
            <div className="mt-14 flex gap-10">
              {[["12+", "New pieces"], ["4.9★", "Client rating"], ["58", "Cities served"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl text-gold-dark">{n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cocoa">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[70vh] lg:h-[calc(100svh-11rem)]">
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] border border-gold/30">
              <SmartImage src={heroImages.main} alt="Eyrez new collection" eager className="h-full w-full" />
            </div>
            <div className="absolute -left-4 bottom-10 hidden rounded-full bg-ivory p-2 shadow-2xl sm:block lg:-left-12">
              <Image src="/brand/logo.png" alt="" width={120} height={120} className="rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* NEW IN */}
      <section className="bg-white py-24">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading align="left" eyebrow="Just landed" title="New Arrivals" />
            <Link href="/shop?filter=new" className="eyebrow inline-flex items-center gap-2 hover:text-espresso">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
            {newIn.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
