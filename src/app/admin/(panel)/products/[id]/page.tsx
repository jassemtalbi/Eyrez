import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProductById } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const product = await getProductById((await params).id);
  if (!product) notFound();
  return (
    <>
      <Link href="/admin/products" className="mb-4 inline-flex items-center gap-1 text-sm text-cocoa hover:text-espresso"><ArrowLeft className="h-4 w-4" /> Products</Link>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl">{product.name}</h1>
        <Link href={`/product/${product.slug}`} target="_blank" className="flex items-center gap-1 text-sm text-gold-dark hover:underline">
          View in store <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
      <ProductForm product={product} />
    </>
  );
}
