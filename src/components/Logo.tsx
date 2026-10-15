import Image from "next/image";
import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Eyrez Clothing — home">
      <Image
        src="/brand/logo.png"
        alt=""
        width={44}
        height={44}
        priority
        className="h-10 w-10 rounded-full shadow-sm ring-1 ring-gold/40 transition-transform duration-500 group-hover:rotate-6 sm:h-11 sm:w-11"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-2xl tracking-[0.28em] sm:text-[1.7rem] ${light ? "text-ivory" : "text-espresso"}`}>
          EYREZ
        </span>
        <span className={`mt-1 text-[9px] tracking-[0.5em] ${light ? "text-gold-light" : "text-gold"}`}>CLOTHING</span>
      </span>
    </Link>
  );
}
