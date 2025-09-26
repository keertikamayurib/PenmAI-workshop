import type { EnrichedItem } from "@/lib/types";
import { ItemCard } from "./item-card";

interface ItemsGridProps {
  title: string;
  items: EnrichedItem[];
}

export function ItemsGrid({ title, items }: ItemsGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
