import { cache } from "react";
import events from "@/content/events.json";
import { EventsSchema } from "@/lib/schemas/eventsSchema";

export const getEvents = cache(() => {
  try {
    // Validate the content using Zod schema
    const parsedContent = EventsSchema.parse(events);
    return parsedContent;
  } catch (error) {
    console.error("Failed to validate events content:", error);
    throw new Error(
      `Events content validation failed: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
});

export const getUpcomingEvents = cache(() => {
  const allEvents = getEvents();
  const now = new Date();
  return allEvents
    .filter((event) => {
      if (event.status !== "upcoming") return false;
      const endDate = new Date(event.endDate);
      return endDate >= now;
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateA.getTime() - dateB.getTime();
    });
});

export const getPastEvents = cache(() => {
  const allEvents = getEvents();
  const now = new Date();
  return allEvents
    .filter((event) => {
      if (event.status === "cancelled") return false;
      const endDate = new Date(event.endDate);
      return endDate < now || event.status === "past";
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime();
    });
});
