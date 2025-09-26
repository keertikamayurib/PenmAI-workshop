'use server';

/**
 * @fileOverview A flow that suggests room colors based on user preferences.
 *
 * - suggestRoomColors - A function that suggests wall and ceiling colors for a room.
 * - SuggestRoomColorsInput - The input type for the suggestRoomColors function.
 * - SuggestRoomColorsOutput - The return type for the suggestRoomColors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRoomColorsInputSchema = z.object({
  roomPurpose: z
    .string()
    .describe('The purpose of the room (e.g., living room, bedroom, office).'),
  stylePreference: z
    .string()
    .describe('The user style preference (e.g., modern, traditional, minimalist).'),
  lightingConditions: z
    .string()
    .describe('The lighting conditions of the room (e.g., natural light, artificial, dark room).'),
  budget: z
    .string()
    .describe('The user budget (e.g. Low, Medium, High).'),
});
export type SuggestRoomColorsInput = z.infer<typeof SuggestRoomColorsInputSchema>;

const SuggestRoomColorsOutputSchema = z.object({
  wallColor: z.string().describe('The suggested wall color for the room.'),
  ceilingColor: z.string().describe('The suggested ceiling color for the room.'),
  description: z
    .string()
    .describe('A description of why the color was chosen and how it fits the room.'),
});
export type SuggestRoomColorsOutput = z.infer<typeof SuggestRoomColorsOutputSchema>;

export async function suggestRoomColors(input: SuggestRoomColorsInput): Promise<SuggestRoomColorsOutput> {
  return suggestRoomColorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRoomColorsPrompt',
  input: {schema: SuggestRoomColorsInputSchema},
  output: {schema: SuggestRoomColorsOutputSchema},
  prompt: `Suggest wall and ceiling colors for a room based on the following criteria:

Room Purpose: {{{roomPurpose}}}
Style Preference: {{{stylePreference}}}
Lighting Conditions: {{{lightingConditions}}}
Budget: {{{budget}}}

Consider the mood and ambiance typically associated with the room purpose, the user's style preferences, the impact of lighting conditions on color perception, and the user's budget when making your suggestions. Provide a description of why the color was chosen and how it fits the room.

Respond with the wall color, ceiling color, and a description.`,
});

const suggestRoomColorsFlow = ai.defineFlow(
  {
    name: 'suggestRoomColorsFlow',
    inputSchema: SuggestRoomColorsInputSchema,
    outputSchema: SuggestRoomColorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
