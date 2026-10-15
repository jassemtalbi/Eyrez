import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/config";
import { categories } from "@/lib/products";
import Newsletter from "./Newsletter";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory/80">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <Image src="/brand/logo.png" alt="Eyrez Clothing" width={72} height={72} className="rounded-full ring-1 ring-gold/50" />
            <div>
              <p className="font-serif text-3xl tracking-[0.3em] text-ivory">EYREZ</p>
              <p className="text-[10px] tracking-[0.5em] text-gold-light">CLOTHING</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            Timeless silhouettes, refined fabrics and quiet luxury — designed for women who dress with intention.
          </p>
          <SocialIcons className="mt-6" />
        </div>

        <div className="lg:col-span-2">
          <h4 className="eyebrow text-gold-light">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/shop?filter=new" className="hover:text-gold-light">New In</Link></li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="hover:text-gold-light">{c.name}</Link>
              </li>
            ))}
            <li><Link href="/shop?filter=sale" className="hover:text-gold-light">Sale</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="eyebrow text-gold-light">Help</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link href="/faq" className="hover:text-gold-light">FAQ</Link></li>
            <li><Link href="/faq#shipping" className="hover:text-gold-light">Shipping</Link></li>
            <li><Link href="/faq#returns" className="hover:text-gold-light">Returns & Exchanges</Link></li>
            <li><Link href="/faq#sizing" className="hover:text-gold-light">Size Guide</Link></li>
            <li><Link href="/contact" className="hover:text-gold-light">Contact</Link></li>
            <li><Link href="/about" className="hover:text-gold-light">Our Story</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="eyebrow text-gold-light">Join the Eyrez Circle</h4>
          <p className="mt-5 text-sm text-ivory/60">Early access to new collections, private sales and styling notes.</p>
          <div className="mt-4"><Newsletter dark /></div>
          <ul className="mt-8 space-y-2.5 text-sm text-ivory/70">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold-light" strokeWidth={1.4} />{site.phone}</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold-light" strokeWidth={1.4} />{site.email}</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold-light" strokeWidth={1.4} />{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Eyrez Clothing. All rights reserved.</p>
          <p className="tracking-[0.2em]">CASH ON DELIVERY · SECURE CHECKOUT</p>
        </div>
      </div>
    </footer>
  );
}
