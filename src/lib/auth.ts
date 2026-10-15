// Admin session: an HMAC-signed, expiring token in an httpOnly cookie.
// Uses Web Crypto so it runs in both the proxy and server actions.

export const SESSION_COOKIE = "eyrez_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.ADMIN_SECRET ?? (process.env.NODE_ENV !== "production" ? "dev-only-eyrez-secret" : "");
  if (!s) throw new Error("ADMIN_SECRET must be set in production.");
  return s;
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

const USERNAME = /^[a-z0-9._-]{3,40}$/;

export async function createSessionToken(username: string) {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${username}.${expires}`;
  return { token: `${payload}.${await sign(payload)}`, maxAge: MAX_AGE };
}

/** Returns the signed-in username, or null. */
export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const j = payload.lastIndexOf(".");
  const username = payload.slice(0, j);
  const expires = Number(payload.slice(j + 1));
  if (i < 0 || j < 0 || !USERNAME.test(username) || !(expires > Date.now() / 1000)) return null;
  return safeEqual(sig, await sign(payload)) ? username : null;
}
