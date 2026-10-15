# Eyrez Clothing — E-commerce

Luxury e-commerce storefront for **Eyrez Clothing**, built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

## Features
- Home page: hero, perks, categories, new arrivals, editorial banner, bestsellers, brand story, testimonials, lookbook, newsletter
- Shop with category / edit / size / price filters, sorting and search
- Product pages: gallery, colour & size selection, stock alerts, accordions, related products
- Cart drawer + cart page with free-delivery progress bar
- Checkout with cash on delivery (Tunisian governorates) and order confirmation
- Wishlist, About, Contact, FAQ / size guide, 404
- Cart & wishlist persisted in localStorage; fully responsive

## Admin dashboard
Go to **/admin** and sign in with the admin password.

- **Dashboard** — revenue and orders (30 days), average order, pending orders, revenue chart, recent orders, top products, low stock
- **Orders** — filter by status, search by order number / name / phone, open an order, change its status
  (cancelling an order puts its items back in stock)
- **Products** — add, edit, hide or delete products; price, old price, stock, sizes, colours, images, “New” and “Bestseller” flags
- **Customers** — grouped by phone number with order count and total spent

Changes in the admin appear on the store immediately. Orders placed at checkout are saved and lower the stock.

In development the password is `eyrez-admin`. In production set `ADMIN_PASSWORD` and `ADMIN_SECRET`
(see `.env.example`).

Data is stored in `data/db.json` (created on first run from `src/lib/products.ts`; sample orders are added in development only).
This needs a server with a writable disk (e.g. a VPS with `npm run build && npm start`). For serverless hosting such as Vercel,
swap `src/lib/db.ts` for a real database.

## Getting started
```bash
npm install
npm run dev   # http://localhost:3000
```

## Customising
- Brand settings (currency, shipping, contact, socials): `src/lib/config.ts`
- Products, categories and images: `src/lib/products.ts`
- Colours & fonts: `src/app/globals.css` (`@theme`)
- Logo: `public/brand/logo.png`

Product photos currently point to placeholder Unsplash images; replace them with real product shots
(put files in `public/products/` and reference them as `/products/xxx.jpg`).
