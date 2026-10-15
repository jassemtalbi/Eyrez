"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/lib/products";
import { site } from "@/lib/config";

export type CartLine = { key: string; productId: string; size: string; color: string; qty: number };

type Store = {
  lines: (CartLine & { product: Product })[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (productId: string, size: string, color: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (productId: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toast: string | null;
};

const StoreContext = createContext<Store | null>(null);
const CART_KEY = "eyrez-cart";
const WISH_KEY = "eyrez-wishlist";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setCart(load(CART_KEY, []));
    setWishlist(load(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) save(WISH_KEY, wishlist);
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((productId: string, size: string, color: string, qty = 1) => {
    const key = `${productId}__${size}__${color}`;
    setCart((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { key, productId, size, color, qty }];
    });
    setCartOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => setCart((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (productId: string) => {
      const has = wishlist.includes(productId);
      setToast(has ? "Removed from your wishlist" : "Added to your wishlist");
      setWishlist(has ? wishlist.filter((id) => id !== productId) : [...wishlist, productId]);
    },
    [wishlist],
  );

  const value = useMemo<Store>(() => {
    const lines = cart
      .map((l) => ({ ...l, product: products.find((p) => p.id === l.productId)! }))
      .filter((l) => l.product);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const shipping = subtotal === 0 || subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add,
      setQty,
      remove,
      clear,
      wishlist,
      toggleWish,
      cartOpen,
      setCartOpen,
      toast,
    };
  }, [cart, wishlist, cartOpen, toast, add, setQty, remove, clear, toggleWish]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
