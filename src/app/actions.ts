"use server";

import { z } from "zod";
import {
  recommendFurnitureAndDecor,
  RecommendFurnitureAndDecorInput,
} from "@/ai/flows/recommend-furniture-decor";
import {
  suggestRoomColors,
  SuggestRoomColorsInput,
} from "@/ai/flows/suggest-room-colors";
import type { RoomAizeResult, EnrichedItem, EnrichedItemRecommendation } from "@/lib/types";


// Server-side helpers to prevent hydration mismatch
const stores = ["ikea", "amazon", "wayfair"];
function getShoppingLink(itemName: string): string {
  const randomStore = stores[Math.floor(Math.random() * stores.length)];
  const query = encodeURIComponent(itemName);

  switch (randomStore) {
    case "ikea":
      return `https://www.ikea.com/search/site/?q=${query}`;
    case "amazon":
      return `https://www.amazon.com/s?k=${query}`;
    case "wayfair":
      return `https://www.wayfair.com/keyword.php?keyword=${query}`;
    default:
      return `https://www.google.com/search?q=${query}&tbm=shop`;
  }
}

function getFakeOffer(): string | null {
  if (Math.random() > 0.6) {
    // 40% chance of an offer
    const discount = (Math.floor(Math.random() * 10) + 1) * 5; // 5% to 50%
    return `${discount}% OFF`;
  }
  return null;
}

const FormSchema = z.object({
  length: z.coerce.number().min(1, "Length must be positive"),
  breadth: z.coerce.number().min(1, "Breadth must be positive"),
  height: z.coerce.number().min(2, "Height must be positive"),
  roomPurpose: z.enum(["living room", "bedroom", "study", "office"]),
  stylePreference: z.enum(["modern", "traditional", "minimalist", "luxury"]),
  lightingConditions: z.enum(["natural light", "artificial", "dark room"]),
  budget: z.enum(["low", "medium", "high"]),
});

export async function getRoomRecommendations(
  formData: unknown
): Promise<RoomAizeResult | { error: string }> {
  const validatedFields = FormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid form data. Please check your inputs." };
  }

  const { data } = validatedFields;

  const colorInput: SuggestRoomColorsInput = {
    roomPurpose: data.roomPurpose,
    stylePreference: data.stylePreference,
    lightingConditions: data.lightingConditions,
    budget: data.budget,
  };

  const itemInput: RecommendFurnitureAndDecorInput = {
    roomDimensions: {
      length: data.length,
      breadth: data.breadth,
      height: data.height,
    },
    roomPurpose: data.roomPurpose,
    roomStyle: data.stylePreference,
    budget: data.budget,
  };

  try {
    const [colors, rawItems] = await Promise.all([
      suggestRoomColors(colorInput),
      recommendFurnitureAndDecor(itemInput),
    ]);

    const enrichItems = (itemList: string[]): EnrichedItem[] => {
      return itemList.map((name) => ({
        name,
        link: getShoppingLink(name),
        offer: getFakeOffer(),
      }));
    };

    const items: EnrichedItemRecommendation = {
      furnitureList: enrichItems(rawItems.furnitureList),
      decorItems: enrichItems(rawItems.decorItems),
    };

    return { colors, items };
  } catch (e) {
    console.error(e);
    return { error: "Failed to get AI recommendations. Please try again later." };
  }
}
