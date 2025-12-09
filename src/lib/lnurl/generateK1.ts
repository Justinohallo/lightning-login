import { randomBytes } from "crypto";

export function generateK1(): string {
  return randomBytes(32).toString("hex");
}

