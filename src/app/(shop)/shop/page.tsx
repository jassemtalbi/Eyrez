import type { Metadata } from "next";
import { Suspense } from "react";
import ShopView from "./ShopView";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense>
      <ShopView />
    </Suspense>
  );
}
