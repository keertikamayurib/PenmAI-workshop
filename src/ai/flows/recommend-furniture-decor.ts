'use server';

/**
 * @fileOverview A flow to recommend furniture and decor items based on room style, purpose, and dimensions.
 *
 * - recommendFurnitureAndDecor - A function that handles the recommendation process.
 * - RecommendFurnitureAndDecorInput - The input type for the recommendFurnitureAndDecor function.
 * - RecommendFurnitureAndDecorOutput - The return type for the recommendFurnitureAndDecor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendFurnitureAndDecorInputSchema = z.object({
  roomDimensions: z
    .object({
      length: z.number().describe('The length of the room in meters.'),
      breadth: z.number().describe('The breadth of the room in meters.'),
      height: z.number().describe('The height of the room in meters.'),
    })
    .describe('The dimensions of the room.'),
  roomPurpose: z
    .enum(['living room', 'bedroom', 'study', 'office'])
    .describe('The purpose of the room.'),
  roomStyle: z
    .enum(['modern', 'traditional', 'minimalist', 'luxury'])
    .describe('The preferred style of the room.'),
  budget: z
    .enum(['low', 'medium', 'high'])
    .describe('The budget for the furniture and decor.'),
  mood: z
    .enum(['cozy', 'formal', 'playful', 'calm', 'energetic'])
    .describe('The desired mood of the room.'),
});
export type RecommendFurnitureAndDecorInput = z.infer<
  typeof RecommendFurnitureAndDecorInputSchema
>;

const RecommendFurnitureAndDecorOutputSchema = z.object({
  furnitureList: z
    .array(z.string())
    .describe('A list of furniture items recommended for the room.'),
  decorItems: z
    .array(z.string())
    .describe('A list of decor items recommended for the room.'),
});
export type RecommendFurnitureAndDecorOutput = z.infer<
  typeof RecommendFurnitureAndDecorOutputSchema
>;

export async function recommendFurnitureAndDecor(
  input: RecommendFurnitureAndDecorInput
): Promise<RecommendFurnitureAndDecorOutput> {
  return recommendFurnitureAndDecorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendFurnitureAndDecorPrompt',
  input: {schema: RecommendFurnitureAndDecorInputSchema},
  output: {schema: RecommendFurnitureAndDecorOutputSchema},
  prompt: `You are an interior design assistant. Based on the room's dimensions, purpose, style, mood, and budget, you will provide a list of furniture and decor items.

Room Dimensions: Length: {{{roomDimensions.length}}} meters, Breadth: {{{roomDimensions.breadth}}} meters, Height: {{{roomDimensions.height}}} meters
Room Purpose: {{{roomPurpose}}}
Room Style: {{{roomStyle}}}
Desired Mood: {{{mood}}}
Budget: {{{budget}}}

Consider the budget when recommending items. For a low budget, suggest affordable options. For a high budget, suggest luxury items.

Furniture List:
Decor Items: `,
});

const recommendFurnitureAndDecorFlow = ai.defineFlow(
  {
    name: 'recommendFurnitureAndDecorFlow',
    inputSchema: RecommendFurnitureAndDecorInputSchema,
    outputSchema: RecommendFurnitureAndDecorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
