import { lightningLoginEducation } from "@/content/lightning-login.education";
import { LightningLoginEducationSchema } from "@/lib/schemas/educationSchema";

export const getEducationContent = async () => {
  // Validate the content using Zod schema
  const parsedContent = LightningLoginEducationSchema.parse(
    lightningLoginEducation
  );
  return parsedContent;
};

