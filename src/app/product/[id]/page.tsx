import { PageOverview } from "@/components/PageOverview";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // PageOverview fetches from the API for DB products (_id),
  // and falls back to local mock data for static slug products.
  return <PageOverview productId={id} />;
}