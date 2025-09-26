import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getItemImage(itemName: string): ImagePlaceholder {
  const lowerCaseItemName = itemName.toLowerCase();
  const found = PlaceHolderImages.find(img => img.id !== 'default-item' && lowerCaseItemName.includes(img.id));
  return found || PlaceHolderImages.find(img => img.id === 'default-item')!;
}
