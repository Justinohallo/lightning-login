import { LightningLoginEducationSchema } from "@/lib/schemas/educationSchema";
import { DeveloperContentSchema } from "@/lib/schemas/developerSchema";
import { EventsSchema } from "@/lib/schemas/eventsSchema";
import lightningLoginEducation from "@/content/lightning-login.education.json";
import lightningLoginDeveloperContent from "@/content/developer/lightning-login.developer.json";
import events from "@/content/events.json";

function formatZodError(error: unknown): string {
  if (error && typeof error === "object" && "issues" in error) {
    const zodError = error as { issues: Array<{ path: (string | number)[]; message: string }> };
    return zodError.issues
      .map((issue) => {
        const path = issue.path.join(".");
        return `  - ${path ? `${path}: ` : ""}${issue.message}`;
      })
      .join("\n");
  }
  return error instanceof Error ? error.message : String(error);
}

console.log("Validating content files...\n");

let hasErrors = false;

// Validate education content
try {
  LightningLoginEducationSchema.parse(lightningLoginEducation);
  console.log("✓ Education content validated successfully");
} catch (error) {
  console.error("✗ Education content validation failed:");
  console.error(formatZodError(error));
  hasErrors = true;
}

// Validate developer content
try {
  DeveloperContentSchema.parse(lightningLoginDeveloperContent);
  console.log("✓ Developer content validated successfully");
} catch (error) {
  console.error("✗ Developer content validation failed:");
  console.error(formatZodError(error));
  hasErrors = true;
}

// Validate events content
try {
  EventsSchema.parse(events);
  console.log("✓ Events content validated successfully");
} catch (error) {
  console.error("✗ Events content validation failed:");
  console.error(formatZodError(error));
  hasErrors = true;
}

if (hasErrors) {
  console.error("\n❌ Content validation failed. Please fix the errors above.");
  process.exit(1);
}

console.log("\n✅ All content files validated successfully!");

