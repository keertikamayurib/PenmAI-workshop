import type { ColorSuggestion } from "@/lib/types";

interface ColorPaletteProps {
  suggestion: ColorSuggestion;
}

function ColorSwatch({
  label,
  colorName,
}: {
  label: string;
  colorName: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-16 w-16 rounded-full border-4 border-card shadow-inner"
        style={{ backgroundColor: colorName }}
      />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold capitalize">{colorName}</p>
      </div>
    </div>
  );
}

export function ColorPalette({ suggestion }: ColorPaletteProps) {
  if (!suggestion) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Color Palette</h3>
      <div className="grid sm:grid-cols-2 gap-6 mb-4">
        <ColorSwatch
          label="Wall Color"
          colorName={suggestion.wallColor}
        />
        <ColorSwatch
          label="Ceiling Color"
          colorName={suggestion.ceilingColor}
        />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-md">
        {suggestion.description}
      </p>
    </div>
  );
}
