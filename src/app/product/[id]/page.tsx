import { PageOverview } from "@/components/PageOverview";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <PageOverview product={product} />;
}