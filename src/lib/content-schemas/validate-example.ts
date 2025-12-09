// Example: How to validate the Lightning Login education content
import lightningLoginEducation from "@/content/lightning-login.education.json";
import { LightningLoginEducationSchema } from "./lightning-login-education";

export const parsedLightningLoginEducation =
  LightningLoginEducationSchema.parse(lightningLoginEducation);

