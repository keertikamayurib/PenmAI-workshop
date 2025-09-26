import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { ColorPalette } from "./color-palette";
import { ItemsGrid } from "./items-grid";
import { Separator } from "@/components/ui/separator";
import type { RoomAizeResult } from "@/lib/types";

interface RecommendationDisplayProps {
  recommendations: RoomAizeResult | null;
  isLoading: boolean;
}

export function RecommendationDisplay({
  recommendations,
  isLoading,
}: RecommendationDisplayProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[60vh] bg-card/50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <div className="text-center">
            <p className="mt-4 text-lg text-foreground font-semibold">
              Brewing up some brilliant ideas...
            </p>
            <p className="text-sm text-muted-foreground">
              The AI is thinking hard about your room. This might take a moment.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!recommendations) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed bg-transparent">
        <Lightbulb className="h-16 w-16 text-muted-foreground" />
        <p className="mt-4 text-lg text-foreground font-medium">
          Your design suggestions will appear here.
        </p>
        <p className="text-muted-foreground">
          Fill out the form to get started!
        </p>
      </Card>
    );
  }

  const { colors, items } = recommendations;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-3xl font-extrabold font-headline mb-2">
          Your AI Design Plan
        </h2>
        <p className="text-muted-foreground mb-8">
          Here are the suggestions to transform your space.
        </p>

        {colors && <ColorPalette suggestion={colors} />}
        
        <Separator className="my-8" />
        
        {items.furnitureList.length > 0 && (
          <>
            <ItemsGrid title="Furniture" items={items.furnitureList} />
            <Separator className="my-8" />
          </>
        )}

        {items.decorItems.length > 0 && (
          <ItemsGrid title="Decor & Accents" items={items.decorItems} />
        )}
      </CardContent>
    </Card>
  );
}
