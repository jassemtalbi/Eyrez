"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/actions";

const field = "w-full rounded-md border border-sand bg-white px-3 py-2.5 text-sm outline-none focus:border-gold";

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="mt-5 space-y-4" key={state?.ok ? "done" : "form"}>
      <input name="current" type="password" required placeholder="Current password" autoComplete="current-password" className={field} />
      <input name="next" type="password" required minLength={8} placeholder="New password (8+ characters)" autoComplete="new-password" className={field} />
      <input name="confirm" type="password" required placeholder="Confirm new password" autoComplete="new-password" className={field} />
      {state?.error && <p role="alert" className="text-sm text-[#9b2c2c]">{state.error}</p>}
      {state?.ok && <p role="status" className="text-sm text-[#22663a]">Password updated.</p>}
      <button disabled={pending} className="btn-dark rounded-md px-5 py-3">{pending ? "Saving…" : "Update password"}</button>
    </form>
  );
}
