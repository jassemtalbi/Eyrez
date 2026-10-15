"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return <p className={`font-serif text-xl ${dark ? "text-gold-light" : "text-gold-dark"}`}>Thank you — welcome to the Eyrez circle ✦</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
      className={`flex w-full max-w-md items-center border-b ${dark ? "border-ivory/40" : "border-espresso/40"} focus-within:border-gold`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={`w-full bg-transparent py-3 text-sm outline-none ${dark ? "text-ivory placeholder:text-ivory/50" : "placeholder:text-cocoa/50"}`}
      />
      <button type="submit" aria-label="Subscribe" className="p-2 text-gold-light transition hover:translate-x-1">
        <ArrowRight className="h-5 w-5" strokeWidth={1.4} />
      </button>
    </form>
  );
}
