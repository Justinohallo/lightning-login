import { z } from "zod";

export const EventTypeEnum = z.enum(["external", "internal"]);

export const EventStatusEnum = z.enum(["upcoming", "past", "cancelled"]);

const SocialMediaSchema = z.object({
  twitter: z.string().url().nullable(),
  hashtag: z.string().nullable(),
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: EventTypeEnum,
  location: z.string(),
  venue: z.string(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  url: z.string().url().nullable(),
  status: EventStatusEnum,
  socialMedia: SocialMediaSchema,
});

export const EventsSchema = z.array(EventSchema);

// Inferred TypeScript types
export type Event = z.infer<typeof EventSchema>;
export type Events = z.infer<typeof EventsSchema>;
export type EventType = z.infer<typeof EventTypeEnum>;
export type EventStatus = z.infer<typeof EventStatusEnum>;
export type SocialMedia = z.infer<typeof SocialMediaSchema>;
