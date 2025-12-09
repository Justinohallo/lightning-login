import { cache } from "react";
import { DeveloperContentSchema } from "@/lib/schemas/developerSchema";
import { lightningLoginDeveloperContent } from "@/content/developer/lightning-login.developer";

export const getDeveloperContent = cache(() => {
  try {
    // Validate the content using Zod schema
    const parsedContent = DeveloperContentSchema.parse(
      lightningLoginDeveloperContent
    );
    return parsedContent;
  } catch (error) {
    console.error("Failed to validate developer content:", error);
    throw new Error(
      `Developer content validation failed: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
});

