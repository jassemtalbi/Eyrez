import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./auth";
import { getAdmin } from "./db";

/** The signed-in admin's username, or null. Also checks the account still exists. */
export async function currentAdmin() {
  const username = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  return username && (await getAdmin(username)) ? username : null;
}

/** Guard for admin pages and server actions (actions can be called directly, so the proxy alone isn't enough). */
export async function requireAdmin() {
  const username = await currentAdmin();
  if (!username) redirect("/admin/login");
  return username;
}
