export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-4xl leading-tight text-espresso sm:text-5xl">{title}</h2>
      <div className={`gold-line mt-5 ${center ? "mx-auto" : ""}`} />
      {subtitle && <p className="mt-5 text-[15px] leading-relaxed text-cocoa">{subtitle}</p>}
    </div>
  );
}
