import Link from "next/link";
import Image from "next/image";
import { ArrowRight, RotateCcw, ShieldCheck, Truck, Wallet } from "lucide-react";
import { categories, heroImages, products } from "@/lib/products";
import { formatPrice, site } from "@/lib/config";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import Newsletter from "@/components/Newsletter";

const perks = [
  { icon: Truck, title: "Free Delivery", text: `On orders over ${formatPrice(site.freeShippingThreshold)}` },
  { icon: Wallet, title: "Cash on Delivery", text: "Pay when you receive" },
  { icon: RotateCcw, title: "Easy Exchanges", text: "Within 7 days" },
  { icon: ShieldCheck, title: "Quality Promise", text: "Carefully crafted pieces" },
];

const testimonials = [
  { name: "Amira B.", text: "The satin dress is even more beautiful in person. The fabric, the cut, the packaging — everything feels luxurious.", city: "Tunis" },
  { name: "Salma K.", text: "Fast delivery and the fit is perfect. I’ve already ordered my second set. Eyrez is my new favourite.", city: "Sousse" },
  { name: "Nour H.", text: "Elegant, modest and timeless. The camel coat gets compliments every single day.", city: "Sfax" },
];

export default function Home() {
  const newIn = products.filter((p) => p.isNew).slice(0, 4);
  const best = products.filter((p) => p.bestseller).slice(0, 4);

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

      {/* PERKS */}
      <section className="border-y border-sand bg-ivory">
        <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.3} />
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.18em]">{title}</p>
                <p className="mt-0.5 text-xs text-cocoa">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-24">
        <SectionHeading eyebrow="Curated for you" title="Shop by Category" />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className={`group relative overflow-hidden bg-cream ${i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-[3/4]"}`}>
                <SmartImage src={c.image} alt={c.name} className="absolute inset-0 h-full w-full transition duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                  <h3 className={`${i === 0 ? "text-4xl" : "text-2xl"}`}>{c.name}</h3>
                  <p className="mt-1 hidden text-xs text-ivory/80 sm:block">{c.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold-light">
                    Discover <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW IN */}
      <section className="bg-cream py-24">
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

      {/* EDITORIAL BANNER */}
      <section className="relative overflow-hidden">
        <div className="relative h-[80vh] min-h-[520px]">
          <SmartImage src={heroImages.story} alt="Autumn Whispers collection" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
          <div className="container-x relative flex h-full items-center">
            <div className="max-w-lg text-ivory">
              <p className="eyebrow text-gold-light">The Collection</p>
              <h2 className="mt-4 text-5xl leading-tight sm:text-7xl">
                Autumn <em className="font-normal text-gold-light">Whispers</em>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-ivory/80">
                Warm camels, soft creams and deep espresso tones. A wardrobe of layered textures, made for the golden season.
              </p>
              <Link href="/shop?category=outerwear" className="btn-light mt-10">
                Discover the collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="container-x py-24">
        <SectionHeading eyebrow="Most loved" title="Bestsellers" subtitle="The pieces our clients return to again and again." />
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/shop" className="btn-outline">Shop all pieces</Link>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-espresso text-ivory">
        <div className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full border border-gold/30" />
            <div className="absolute inset-6 rounded-full border border-gold/20" />
            <Image src="/brand/logo.png" alt="Eyrez monogram" fill sizes="(max-width: 768px) 80vw, 400px" className="rounded-full p-12" />
          </div>
          <div>
            <p className="eyebrow text-gold-light">Our Story</p>
            <h2 className="mt-4 text-5xl leading-tight">
              Crafted with intention, <em className="font-normal text-gold-light">worn with grace.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ivory/75">
              Eyrez was born from a simple belief: true elegance is effortless. Each piece is designed in small collections, with
              carefully chosen fabrics and silhouettes that flatter, layer and last — far beyond a single season.
            </p>
            <p className="mt-4 leading-relaxed text-ivory/75">
              From the first sketch to the moment it reaches your door, every detail is considered.
            </p>
            <Link href="/about" className="btn-light mt-10">Read our story</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Kind words" title="Loved by our clients" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="border border-sand bg-ivory p-8 transition hover:-translate-y-1 hover:shadow-xl">
                <p className="text-gold">★★★★★</p>
                <blockquote className="mt-5 font-serif text-xl italic leading-relaxed text-espresso">“{t.text}”</blockquote>
                <figcaption className="mt-6 text-[11px] uppercase tracking-[0.25em] text-cocoa">
                  {t.name} — {t.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK / INSTAGRAM */}
      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="@eyrez" title="Wear it your way" subtitle="Tag us on Instagram to be featured in our lookbook." />
        </div>
        <div className="mt-14 grid grid-cols-2 gap-1 md:grid-cols-6">
          {[...heroImages.lookbook, ...products.slice(0, 3).map((p) => p.images[0])].map((src, i) => (
            <a key={i} href={site.instagram} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden bg-cream">
              <SmartImage src={src} alt="Eyrez lookbook" className="h-full w-full transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-[11px] uppercase tracking-[0.3em] text-ivory opacity-0 transition group-hover:bg-espresso/50 group-hover:opacity-100">
                View
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-sand bg-ivory py-24">
        <div className="container-x flex flex-col items-center text-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Join the Eyrez Circle</h2>
          <p className="mt-4 max-w-md text-cocoa">Be the first to discover new collections and receive <strong className="text-gold-dark">10% off</strong> your first order.</p>
          <div className="mt-8 flex w-full justify-center"><Newsletter /></div>
        </div>
      </section>
    </>
  );
}
