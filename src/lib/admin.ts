import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

export async function isAdmin() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Guard for admin pages and server actions (actions can be called directly, so the proxy alone isn't enough). */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
