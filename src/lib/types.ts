import type { suggestRoomColors } from "@/ai/flows/suggest-room-colors";

export type RoomFormSchema = {
  length: number;
  breadth: number;
  height: number;
  roomPurpose: "living room" | "bedroom" | "study" | "office";
  stylePreference: "modern" | "traditional" | "minimalist" | "luxury";
  lightingConditions: "natural light" | "artificial" | "dark room";
  budget: "low" | "medium" | "high";
};

export type ColorSuggestion = Awaited<ReturnType<typeof suggestRoomColors>>;

export type EnrichedItem = {
  name: string;
  link: string;
  offer: string | null;
};

export type EnrichedItemRecommendation = {
  furnitureList: EnrichedItem[];
  decorItems: EnrichedItem[];
};

export type RoomAizeResult = {
  colors: ColorSuggestion;
  items: EnrichedItemRecommendation;
};
