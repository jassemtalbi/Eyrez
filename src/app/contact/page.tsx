import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/config";
import ContactForm from "./ContactForm";
import SocialIcons from "@/components/SocialIcons";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Phone & WhatsApp", value: site.phone },
    { icon: Mail, label: "Email", value: site.email },
    { icon: MapPin, label: "Showroom", value: site.address },
    { icon: Clock, label: "Hours", value: "Mon – Sat · 9:00 – 19:00" },
  ];
  return (
    <section className="container-x py-20">
      <div className="text-center">
        <p className="eyebrow">We’re here for you</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Contact us</h1>
        <div className="gold-line mx-auto mt-5" />
      </div>
      <div className="mt-16 grid gap-14 lg:grid-cols-[360px_1fr]">
        <div className="space-y-8 bg-espresso p-10 text-ivory">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <Icon className="mt-0.5 h-5 w-5 text-gold-light" strokeWidth={1.3} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light">{label}</p>
                <p className="mt-1 text-ivory/85">{value}</p>
              </div>
            </div>
          ))}
          <SocialIcons />
        </div>
        <div>
          <h2 className="text-3xl">Send us a message</h2>
          <p className="mb-8 mt-2 text-cocoa">Questions about sizing, orders or styling — we’d love to help.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
