import { StoreProvider } from "@/context/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import { getProducts } from "@/lib/db";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();
  return (
    <StoreProvider products={products}>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <Toast />
    </StoreProvider>
  );
}
