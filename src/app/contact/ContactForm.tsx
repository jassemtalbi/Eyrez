"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="font-serif text-2xl text-gold-dark">Thank you — we’ll get back to you within 24 hours ✦</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 sm:grid-cols-2">
      <input required placeholder="Name *" className="input" />
      <input required type="email" placeholder="Email *" className="input" />
      <input placeholder="Phone" className="input sm:col-span-2" />
      <textarea required rows={6} placeholder="Your message *" className="input sm:col-span-2" />
      <button className="btn-dark sm:col-span-2 sm:justify-self-start">Send message</button>
    </form>
  );
}
