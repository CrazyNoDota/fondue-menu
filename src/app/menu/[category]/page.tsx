import { notFound } from "next/navigation";
import { MENU } from "@/lib/menu";
import CategoryView from "@/components/CategoryView";

export function generateStaticParams() {
  return MENU.map((c) => ({ category: c.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = MENU.find((c) => c.id === category);
  if (!cat) notFound();
  return <CategoryView id={cat.id} />;
}
