import { cache } from "react";
import { lightningLoginEducation } from "@/content/lightning-login.education";
import { LightningLoginEducationSchema } from "@/lib/schemas/educationSchema";

export const getEducationContent = cache(() => {
  try {
    // Validate the content using Zod schema
    const parsedContent = LightningLoginEducationSchema.parse(
      lightningLoginEducation
    );
    return parsedContent;
  } catch (error) {
    console.error("Failed to validate education content:", error);
    throw new Error(
      `Education content validation failed: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
});

