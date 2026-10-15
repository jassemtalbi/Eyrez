"use client";

import { useStore } from "@/context/store";

export default function Toast() {
  const { toast } = useStore();
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 transition-all duration-500 ${
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 bg-espresso px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivory shadow-xl">
        <span className="text-gold-light">✦</span>
        {toast}
      </div>
    </div>
  );
}
