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
Order submission in `src/app/checkout/page.tsx` is a stub, ready to connect to a backend.
