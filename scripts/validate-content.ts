import { LightningLoginEducationSchema } from "@/lib/schemas/educationSchema";
import { DeveloperContentSchema } from "@/lib/schemas/developerSchema";
import { lightningLoginEducation } from "@/content/lightning-login.education";
import { lightningLoginDeveloperContent } from "@/content/developer/lightning-login.developer";

try {
  LightningLoginEducationSchema.parse(lightningLoginEducation);
  DeveloperContentSchema.parse(lightningLoginDeveloperContent);
  console.log("All content files validated successfully!");
} catch (error) {
  console.error("Validation failed:", error);
  process.exit(1);
}

