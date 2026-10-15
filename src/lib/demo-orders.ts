import type { Product } from "./products";
import type { Order, OrderStatus } from "./types";
import { site } from "./config";

const people = [
  ["Amira", "Ben Salah", "Tunis"], ["Salma", "Khelifi", "Sousse"], ["Nour", "Haddad", "Sfax"], ["Yasmine", "Trabelsi", "Ariana"],
  ["Ines", "Mansour", "Nabeul"], ["Rania", "Jaziri", "Monastir"], ["Mariem", "Gharbi", "Bizerte"], ["Lina", "Ayari", "Ben Arous"],
  ["Sarra", "Bouazizi", "Tunis"], ["Hela", "Chaabane", "Sousse"], ["Asma", "Ferchichi", "Gabès"], ["Emna", "Riahi", "Tunis"],
];

/** Sample orders so the dashboard has something to show in development. */
export function demoOrders(products: Product[]): Order[] {
  const statuses: OrderStatus[] = ["delivered", "delivered", "shipped", "confirmed", "pending", "delivered", "cancelled", "pending"];
  const now = Date.now();
  const orders: Order[] = [];
  for (let i = 0; i < 26; i++) {
    const [firstName, lastName, city] = people[i % people.length];
    const count = 1 + (i % 3);
    const items = Array.from({ length: count }, (_, k) => {
      const p = products[(i * 5 + k * 3) % products.length];
      return { productId: p.id, name: p.name, slug: p.slug, image: p.images[0], price: p.price, size: p.sizes[k % p.sizes.length], color: p.colors[0].name, qty: 1 + ((i + k) % 2) };
    });
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
    const created = new Date(now - (i * 0.55 + (i % 4) * 0.2) * 86400000);
    orders.push({
      id: `demo-${i + 1}`,
      number: `EYZ-${1001 + 25 - i}`,
      createdAt: created.toISOString(),
      status: i < 3 ? "pending" : statuses[i % statuses.length],
      customer: { firstName, lastName, phone: `+216 2${(i * 7) % 10} ${100 + i * 13} ${200 + i * 7}`, address: `${10 + i} Rue de la Liberté`, city, governorate: city },
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
    });
  }
  return orders;
}
