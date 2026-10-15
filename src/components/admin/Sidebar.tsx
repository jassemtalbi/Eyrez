"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExternalLink, KeyRound, LayoutDashboard, LogOut, Menu, Package, ShoppingCart, Users, X } from "lucide-react";
import { logout } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export default function Sidebar({ pending, username }: { pending: number; username: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  const nav = (
    <nav className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-3 px-6 py-6" onClick={() => setOpen(false)}>
        <Image src="/brand/logo.png" alt="" width={40} height={40} className="rounded-full ring-1 ring-gold/50" />
        <span className="leading-none">
          <span className="block font-serif text-xl tracking-[0.25em] text-ivory">EYREZ</span>
          <span className="text-[9px] tracking-[0.4em] text-gold-light">ADMIN</span>
        </span>
      </Link>
      <ul className="mt-4 space-y-1 px-3">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                isActive(href) ? "bg-ivory/10 text-ivory" : "text-ivory/65 hover:bg-ivory/5 hover:text-ivory"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.6} />
              {label}
              {label === "Orders" && pending > 0 && (
                <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-[10px] font-medium text-ivory">{pending}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-1 border-t border-ivory/10 px-3 py-4">
        <p className="truncate px-3 pb-2 text-xs text-gold-light">Signed in as {username}</p>
        <Link href="/admin/account" onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${isActive("/admin/account") ? "bg-ivory/10 text-ivory" : "text-ivory/65 hover:text-ivory"}`}>
          <KeyRound className="h-4 w-4" strokeWidth={1.6} /> Account
        </Link>
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ivory/65 hover:text-ivory">
          <ExternalLink className="h-4 w-4" strokeWidth={1.6} /> View store
        </Link>
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ivory/65 hover:text-ivory">
            <LogOut className="h-4 w-4" strokeWidth={1.6} /> Sign out
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 bg-espresso lg:block">{nav}</aside>
      <div className="sticky top-0 z-30 flex items-center justify-between bg-espresso px-4 py-3 lg:hidden">
        <button aria-label="Open menu" onClick={() => setOpen(true)} className="text-ivory"><Menu className="h-5 w-5" /></button>
        <span className="font-serif tracking-[0.25em] text-ivory">EYREZ ADMIN</span>
        <span className="w-5" />
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-espresso">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute right-3 top-3 text-ivory"><X className="h-5 w-5" /></button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
