"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  length: z.coerce.number().min(1, "Must be > 0 ft"),
  breadth: z.coerce.number().min(1, "Must be > 0 ft"),
  height: z.coerce.number().min(2, "Must be > 1 ft"),
  roomPurpose: z.enum(["living room", "bedroom", "study", "office"]),
  stylePreference: z.enum(["modern", "traditional", "minimalist", "luxury"]),
  lightingConditions: z.enum(["natural light", "artificial", "dark room"]),
  mood: z.enum(['cozy', 'formal', 'playful', 'calm', 'energetic']),
  budget: z.enum(["low", "medium", "high"]),
});

type RoomFormValues = z.infer<typeof formSchema>;

interface RoomFormProps {
  onSubmit: (data: RoomFormValues) => void;
  isLoading: boolean;
}

const selectItems = {
  roomPurpose: [
    { value: "living room", label: "Living Room" },
    { value: "bedroom", label: "Bedroom" },
    { value: "study", label: "Study" },
    { value: "office", label: "Office" },
  ],
  stylePreference: [
    { value: "modern", label: "Modern" },
    { value: "traditional", label: "Traditional" },
    { value: "minimalist", label: "Minimalist" },
    { value: "luxury", label: "Luxury" },
  ],
  lightingConditions: [
    { value: "natural light", label: "Natural Light" },
    { value: "artificial", label: "Artificial Light" },
    { value: "dark room", label: "Dark Room" },
  ],
  mood: [
    { value: "cozy", label: "Cozy" },
    { value: "formal", label: "Formal" },
    { value: "playful", label: "Playful" },
    { value: "calm", label: "Calm" },
    { value: "energetic", label: "Energetic" },
  ],
  budget: [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ],
};

export function RoomForm({ onSubmit, isLoading }: RoomFormProps) {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      length: 10,
      breadth: 12,
      height: 8,
      roomPurpose: "living room",
      stylePreference: "modern",
      lightingConditions: "natural light",
      mood: "cozy",
      budget: "medium",
    },
  });

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Design Your Room</CardTitle>
        <CardDescription>
          Tell us about your space, and we'll generate design ideas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <FormLabel>Room Dimensions (in feet)</FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Length" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="breadth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Breadth" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Height" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="roomPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Purpose</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a purpose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectItems.roomPurpose.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stylePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Style Preference</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectItems.stylePreference.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lightingConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lighting</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lighting conditions" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectItems.lightingConditions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Mood</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a mood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectItems.mood.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectItems.budget.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full !mt-8">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading ? "Generating Ideas..." : "Generate Ideas"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
