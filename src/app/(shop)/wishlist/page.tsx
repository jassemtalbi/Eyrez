"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/store";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, products } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <section className="container-x py-16">
      <h1 className="text-center text-5xl">Wishlist</h1>
      <div className="gold-line mx-auto mt-5" />
      {items.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Heart className="h-10 w-10 text-gold" strokeWidth={1.2} />
          <p className="mt-6 font-serif text-2xl">Nothing saved yet</p>
          <p className="mt-2 text-cocoa">Tap the heart on any piece to save it here.</p>
          <Link href="/shop" className="btn-dark mt-8">Explore the collection</Link>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
