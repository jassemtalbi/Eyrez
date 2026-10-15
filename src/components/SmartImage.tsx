"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

/** Image with an elegant on-brand fallback when the source can't load. */
export default function SmartImage({ src, alt, className = "", eager }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catch images that failed before React hydrated and attached onError.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-cream via-sand to-linen ${className}`}
      >
        <span className="font-serif text-5xl text-gold/60">ER</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
