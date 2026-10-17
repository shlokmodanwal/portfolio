import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Re-export cn utility for use in shadcn/ui components
// This follows the shadcn/ui convention of placing cn in @/lib/utils
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
