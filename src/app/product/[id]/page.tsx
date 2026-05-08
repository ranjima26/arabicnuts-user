import { PageOverview } from "@/components/PageOverview";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PageOverview productId={id} />;
}