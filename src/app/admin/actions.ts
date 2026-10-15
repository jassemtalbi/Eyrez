"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, createSessionToken } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/passwords";
import { requireAdmin } from "@/lib/admin";
import * as db from "@/lib/db";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";
import { categories } from "@/lib/products";

export async function login(_: string | undefined, form: FormData) {
  const username = String(form.get("username") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const admin = username ? await db.getAdmin(username) : undefined;
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) return "Incorrect username or password.";
  const { token, maxAge } = await createSessionToken(admin.username);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function changePassword(_: { error?: string; ok?: boolean } | undefined, form: FormData) {
  const username = await requireAdmin();
  const admin = await db.getAdmin(username);
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  if (!admin || !(await verifyPassword(current, admin.passwordHash))) return { error: "Current password is incorrect." };
  if (next.length < 8) return { error: "New password must be at least 8 characters." };
  if (next !== String(form.get("confirm") ?? "")) return { error: "New passwords don’t match." };
  await db.setAdminPassword(username, await hashPassword(next));
  return { ok: true };
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  await requireAdmin();
  if (!ORDER_STATUSES.includes(status)) throw new Error("Invalid status");
  await db.updateOrder(id, { status });
  revalidatePath("/admin", "layout");
  revalidatePath("/", "layout");
}

export type ProductFormState = { error?: string } | undefined;

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean);

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function saveProduct(_: ProductFormState, form: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const name = String(form.get("name") ?? "").trim();
  const slug = slugify(String(form.get("slug") || name));
  const price = Number(form.get("price"));
  const compareAtRaw = String(form.get("compareAt") ?? "").trim();
  const compareAt = compareAtRaw ? Number(compareAtRaw) : undefined;
  const stock = Number(form.get("stock"));
  const category = String(form.get("category") ?? "");
  const sizes = form.getAll("sizes").map(String).filter(Boolean);
  const images = lines(form.get("images"));
  const colors = lines(form.get("colors")).map((l) => {
    const [cname, hex] = l.split(/[:|,]/).map((s) => s.trim());
    return { name: cname, hex: /^#[0-9a-f]{3,8}$/i.test(hex ?? "") ? hex : "#d9c6a8" };
  });

  if (!name || !slug) return { error: "Name is required." };
  if (!categories.some((c) => c.slug === category)) return { error: "Choose a category." };
  if (!(price > 0)) return { error: "Price must be greater than 0." };
  if (compareAt !== undefined && !(compareAt > price)) return { error: "“Compare at” price must be higher than the price." };
  if (!Number.isInteger(stock) || stock < 0) return { error: "Stock must be a whole number (0 or more)." };
  if (sizes.length === 0) return { error: "Select at least one size." };
  if (colors.length === 0) return { error: "Add at least one colour." };
  if (images.length === 0) return { error: "Add at least one image URL." };

  const id = String(form.get("id") ?? "") || undefined;
  const existing = id ? await db.getProductById(id) : undefined;
  try {
    await db.saveProduct({
      id,
      name,
      slug,
      category,
      price,
      compareAt,
      stock,
      sizes,
      colors,
      images,
      description: String(form.get("description") ?? "").trim(),
      details: lines(form.get("details")),
      isNew: form.get("isNew") === "on",
      bestseller: form.get("bestseller") === "on",
      active: form.get("active") === "on",
      rating: existing?.rating ?? 5,
      reviews: existing?.reviews ?? 0,
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save." };
  }
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await db.deleteProduct(id);
  revalidatePath("/", "layout");
  redirect("/admin/products");
}
