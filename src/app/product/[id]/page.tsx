import { PageOverview } from "@/components/PageOverview";

export default async function ProductPage(
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return <PageOverview productId={id} />;
}