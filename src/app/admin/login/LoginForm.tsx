"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next} />
      <input name="password" type="password" required autoFocus placeholder="Password" className="input" autoComplete="current-password" />
      {error && <p role="alert" className="text-sm text-[#b42318]">{error}</p>}
      <button disabled={pending} className="btn-dark w-full">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
