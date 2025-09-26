import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { EnrichedItem } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import { getItemImage } from "@/lib/utils";

interface ItemCardProps {
  item: EnrichedItem;
}

export function ItemCard({ item }: ItemCardProps) {
  const placeholder = getItemImage(item.name);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:border-primary/50 flex flex-col">
      <div className="relative aspect-square w-full">
        <Image
          src={placeholder.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          data-ai-hint={placeholder.imageHint}
        />
        {item.offer && (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 shadow-lg"
          >
            {item.offer}
          </Badge>
        )}
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h4 className="font-semibold capitalize flex-grow">{item.name}</h4>
        <Button asChild size="sm" className="w-full mt-3">
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Shop Now
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
