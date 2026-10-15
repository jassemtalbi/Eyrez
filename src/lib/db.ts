import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { seedProducts, type Product } from "./products";
import type { AdminUser, Order } from "./types";
import { demoOrders } from "./demo-orders";

type Data = { products: Product[]; orders: Order[]; orderSeq: number; admins: AdminUser[] };

/** Initial admin accounts (passwords are stored as scrypt hashes only). */
const seedAdmins: AdminUser[] = [
  {
    username: "eyabenghenia",
    passwordHash:
      "scrypt$32768$8$1$44Qpcw96tuvQYkWH+hr1Jw==$jYeWSbFgNryAQy9ewhkmEFFeJy1mCp6ggdy+zbgzXgDSNdOcjHerm+govb5QI+4r/mcpSA6IL1D7yxKDAG608A==",
    createdAt: "2026-10-15T00:00:00.000Z",
  },
];

// Vercel's filesystem is read-only except /tmp, which is temporary: data there resets
// whenever Vercel starts a fresh instance. Use a real database for permanent storage.
const DATA_DIR = process.env.DATA_DIR ?? (process.env.VERCEL ? "/tmp/eyrez" : path.join(process.cwd(), "data"));
const FILE = path.join(DATA_DIR, "db.json");

let cache: Data | null = null;
let queue: Promise<unknown> = Promise.resolve();

async function load(): Promise<Data> {
  if (cache) return cache;
  try {
    cache = JSON.parse(await fs.readFile(FILE, "utf8")) as Data;
    if (!cache.admins?.length) {
      cache.admins = structuredClone(seedAdmins);
      await persist(cache);
    }
  } catch {
    const withDemo = process.env.NODE_ENV !== "production" || process.env.SEED_DEMO_ORDERS === "1";
    const orders = withDemo ? demoOrders(seedProducts) : [];
    cache = { products: structuredClone(seedProducts), orders, orderSeq: 1000 + orders.length, admins: structuredClone(seedAdmins) };
    await persist(cache);
  }
  return cache;
}

async function persist(data: Data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  await fs.rename(tmp, FILE);
}

/** Runs a read-modify-write against the data file, one at a time. */
function mutate<T>(fn: (data: Data) => T | Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    const data = await load();
    const result = await fn(data);
    await persist(data);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

// ---- Admins ----
export async function getAdmin(username: string) {
  return (await load()).admins.find((a) => a.username === username);
}

export function setAdminPassword(username: string, passwordHash: string) {
  return mutate((data) => {
    const admin = data.admins.find((a) => a.username === username);
    if (!admin) throw new Error("Account not found.");
    admin.passwordHash = passwordHash;
  });
}

// ---- Products ----
export async function getProducts({ includeInactive = false } = {}) {
  const { products } = await load();
  return includeInactive ? products : products.filter((p) => p.active !== false);
}

export async function getProductBySlug(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getProductById(id: string) {
  return (await load()).products.find((p) => p.id === id);
}

export function saveProduct(input: Omit<Product, "id"> & { id?: string }) {
  return mutate((data) => {
    const clash = data.products.find((p) => p.slug === input.slug && p.id !== input.id);
    if (clash) throw new Error(`Another product already uses the URL "${input.slug}".`);
    if (input.id) {
      const i = data.products.findIndex((p) => p.id === input.id);
      if (i === -1) throw new Error("Product not found.");
      data.products[i] = { ...data.products[i], ...input, id: input.id };
      return data.products[i];
    }
    const product = { ...input, id: randomUUID() } as Product;
    data.products.unshift(product);
    return product;
  });
}

export function deleteProduct(id: string) {
  return mutate((data) => {
    data.products = data.products.filter((p) => p.id !== id);
  });
}

// ---- Orders ----
export async function getOrders() {
  const { orders } = await load();
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getOrder(id: string) {
  return (await load()).orders.find((o) => o.id === id);
}

export function createOrder(build: (products: Product[]) => Omit<Order, "id" | "number" | "createdAt" | "status">) {
  return mutate((data) => {
    const draft = build(data.products);
    for (const item of draft.items) {
      const p = data.products.find((x) => x.id === item.productId);
      if (p) p.stock = Math.max(0, p.stock - item.qty);
    }
    data.orderSeq += 1;
    const order: Order = {
      ...draft,
      id: randomUUID(),
      number: `EYZ-${data.orderSeq}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    data.orders.push(order);
    return order;
  });
}

export function updateOrder(id: string, patch: Partial<Pick<Order, "status">>) {
  return mutate((data) => {
    const order = data.orders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found.");
    // Return stock when an order is cancelled, take it back if it is re-opened.
    if (patch.status && patch.status !== order.status && (patch.status === "cancelled" || order.status === "cancelled")) {
      const sign = patch.status === "cancelled" ? 1 : -1;
      for (const item of order.items) {
        const p = data.products.find((x) => x.id === item.productId);
        if (p) p.stock = Math.max(0, p.stock + sign * item.qty);
      }
    }
    Object.assign(order, patch);
    return order;
  });
}
