"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "./Logo";
import { useStore } from "@/context/store";
import { categories } from "@/lib/products";

const nav = [{ href: "/shop?filter=new", label: "New Arrivals" }];

export default function Header() {
  const { count, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-ivory/90 shadow-[0_1px_0_rgba(176,132,67,0.25)] backdrop-blur-md" : "bg-ivory"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <button className="lg:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Menu className="h-6 w-6" strokeWidth={1.4} />
        </button>

        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="group relative text-[12px] uppercase tracking-[0.22em] text-espresso transition hover:text-gold"
            >
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen((s) => !s)} className="transition hover:text-gold">
            <Search className="h-5 w-5" strokeWidth={1.4} />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="relative hidden transition hover:text-gold sm:block">
            <Heart className="h-5 w-5" strokeWidth={1.4} />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <button aria-label="Open cart" onClick={() => setCartOpen(true)} className="relative transition hover:text-gold">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            {count > 0 && <Badge n={count} />}
          </button>
        </div>
      </div>

      {/* Search panel */}
      <div
        className={`overflow-hidden border-t border-sand bg-ivory transition-all duration-500 ${
          searchOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form onSubmit={submitSearch} className="container-x flex items-center gap-4 py-6">
          <Search className="h-5 w-5 text-gold" strokeWidth={1.4} />
          <input
            autoFocus={searchOpen}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, coats, bags…"
            className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-cocoa/40"
          />
          <button type="submit" className="eyebrow shrink-0">
            Search
          </button>
        </form>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ivory p-6 transition-[transform,visibility] duration-500 ${
            menuOpen ? "translate-x-0" : "invisible -translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {nav.map((n) => (
              <Link key={n.label} href={n.href} className="border-b border-sand py-4 font-serif text-2xl">
                {n.label}
              </Link>
            ))}
          </nav>
          <p className="eyebrow mt-10">Categories</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop?category=${c.slug}`} className="border border-linen px-3 py-1.5 text-xs">
                {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex gap-6 pt-8 text-sm">
            <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">Help</Link>
          </div>
        </aside>
      </div>
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-ivory">
      {n}
    </span>
  );
}
