import { PageOverview } from "@/components/PageOverview";

export default function ProductPage({ params }: { params: { id: string } }) {
  // In the future, you can use the params.id to fetch data from your database here.
  // For now, it will just show the beautiful mock design we created.
  
  return <PageOverview />;
}
