"use client";

import { Minus, Plus } from "lucide-react";

export default function QtyControl({
  value,
  onChange,
  max = 99,
  small,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  small?: boolean;
}) {
  const h = small ? "h-9" : "h-12";
  return (
    <div className={`inline-flex ${h} items-center border border-linen`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className="flex h-full w-9 items-center justify-center transition hover:text-gold"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-9 items-center justify-center transition hover:text-gold disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
