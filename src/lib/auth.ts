// Admin session: an HMAC-signed, expiring token in an httpOnly cookie.
// Uses Web Crypto so it runs in both the proxy and server actions.

export const SESSION_COOKIE = "eyrez_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.ADMIN_SECRET ?? (process.env.NODE_ENV !== "production" ? "dev-only-eyrez-secret" : "");
  if (!s) throw new Error("ADMIN_SECRET must be set in production.");
  return s;
}

export function adminPassword() {
  const p = process.env.ADMIN_PASSWORD ?? (process.env.NODE_ENV !== "production" ? "eyrez-admin" : "");
  if (!p) throw new Error("ADMIN_PASSWORD must be set in production.");
  return p;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  return { token: `${expires}.${await sign(String(expires))}`, maxAge: MAX_AGE };
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(sig, await sign(expires));
}

export async function checkPassword(input: string) {
  // Compare signatures so timing doesn't leak the password length or prefix.
  return safeEqual(await sign(`pw:${input}`), await sign(`pw:${adminPassword()}`));
}
