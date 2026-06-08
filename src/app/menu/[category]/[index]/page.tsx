import { notFound } from "next/navigation";
import { MENU } from "@/lib/menu";
import DishView from "@/components/DishView";

export function generateStaticParams() {
  return MENU.flatMap((c) =>
    c.items.map((_, i) => ({ category: c.id, index: String(i) })),
  );
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ category: string; index: string }>;
}) {
  const { category, index } = await params;
  const cat = MENU.find((c) => c.id === category);
  const i = Number(index);
  if (!cat || !Number.isInteger(i) || i < 0 || i >= cat.items.length) {
    notFound();
  }
  return <DishView categoryId={cat!.id} index={i} />;
}
