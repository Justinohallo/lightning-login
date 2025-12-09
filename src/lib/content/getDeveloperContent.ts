import { DeveloperContentSchema } from "@/lib/schemas/developerSchema";
import { lightningLoginDeveloperContent } from "@/content/developer/lightning-login.developer";

export const getDeveloperContent = async () => {
  // Validate the content using Zod schema
  const parsedContent = DeveloperContentSchema.parse(
    lightningLoginDeveloperContent
  );
  return parsedContent;
};

