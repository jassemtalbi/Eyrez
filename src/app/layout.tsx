import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Eyrez Clothing — Timeless Elegance", template: "%s · Eyrez Clothing" },
  description: site.description,
  icons: { icon: "/brand/logo.png", apple: "/brand/logo.png" },
  openGraph: { title: "Eyrez Clothing", description: site.description, images: ["/brand/logo.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
