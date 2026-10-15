export const site = {
  name: "Eyrez",
  tagline: "Clothing",
  description:
    "Eyrez Clothing — timeless pieces crafted with care. Discover dresses, sets, outerwear and accessories designed for everyday elegance.",
  currency: "TND",
  freeShippingThreshold: 250,
  shippingFee: 8,
  phone: "+216 00 000 000",
  email: "contact@eyrez.com",
  address: "Tunis, Tunisia",
  instagram: "https://instagram.com/eyrez",
  facebook: "https://facebook.com/eyrez",
  tiktok: "https://tiktok.com/@eyrez",
};

export function formatPrice(value: number) {
  const n = value.toLocaleString("en-US", { minimumFractionDigits: value % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 });
  return `${n} ${site.currency}`;
}
