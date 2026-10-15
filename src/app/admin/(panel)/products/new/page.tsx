import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm text-cocoa hover:text-espresso"><ArrowLeft className="h-4 w-4" /> Products</Link>
      <h1 className="mb-8 text-4xl">New product</h1>
      <ProductForm />
    </>
  );
}
