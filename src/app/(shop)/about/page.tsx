import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { heroImages } from "@/lib/products";
import SmartImage from "@/components/SmartImage";

export const metadata: Metadata = { title: "Our Story" };

const values = [
  { title: "Timeless Design", text: "Silhouettes designed to outlive trends and become wardrobe favourites." },
  { title: "Refined Fabrics", text: "Satin, linen, crepe and wool blends selected for their touch and drape." },
  { title: "Small Collections", text: "Limited runs mean less waste and more attention to every detail." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="container-x flex flex-col items-center py-24 text-center">
          <Image src="/brand/logo.png" alt="Eyrez" width={140} height={140} className="rounded-full shadow-xl ring-1 ring-gold/40" />
          <p className="eyebrow mt-10">Our Story</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-tight sm:text-6xl">
            Elegance is not about being noticed, <em className="text-gold-gradient font-normal">it’s about being remembered.</em>
          </h1>
        </div>
      </section>

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden bg-cream">
          <SmartImage src={heroImages.lookbook[1]} alt="Eyrez atelier" className="h-full w-full" />
        </div>
        <div>
          <p className="eyebrow">The beginning</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">A house of quiet luxury</h2>
          <div className="gold-line mt-5" />
          <p className="mt-6 leading-relaxed text-cocoa">
            Eyrez began with a sketchbook and a vision: clothing that makes women feel graceful, confident and entirely themselves. Our
            monogram — an E and R gently intertwined by a ribbon of gold — symbolises the bond between craft and the woman who wears it.
          </p>
          <p className="mt-4 leading-relaxed text-cocoa">
            Today, every Eyrez piece is still imagined in small collections, with a palette inspired by warm sand, cream silk and deep
            espresso — colours that are effortless to wear and to layer.
          </p>
        </div>
      </section>

      <section className="bg-espresso py-24 text-ivory">
        <div className="container-x grid gap-10 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} className="border-t border-gold/40 pt-8">
              <p className="font-serif text-5xl text-gold-light">0{i + 1}</p>
              <h3 className="mt-4 text-3xl">{v.title}</h3>
              <p className="mt-3 text-ivory/70">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24 text-center">
        <h2 className="text-4xl sm:text-5xl">Discover the collection</h2>
        <Link href="/shop" className="btn-dark mt-10">Shop now</Link>
      </section>
    </>
  );
}
