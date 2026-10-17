import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================
// cn — Tailwind class merging utility (shadcn/ui compatible)
// ============================================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================
// formatDate — ISO date string to readable format
// ============================================================
export function formatDate(
  isoDate: string,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" }
): string {
  // Handle "present"
  if (isoDate === "present") return "Present";

  // Ensure valid date (e.g. "2024-01" → "2024-01-01")
  const normalized = isoDate.length === 7 ? `${isoDate}-01` : isoDate;
  return new Intl.DateTimeFormat("en-US", options).format(
    new Date(normalized)
  );
}

// ============================================================
// formatDateRange — display a "start → end" range
// ============================================================
export function formatDateRange(startDate: string, endDate: string | "present"): string {
  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
}

// ============================================================
// slugify — convert a string to a URL-safe slug
// ============================================================
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ============================================================
// truncate — truncate a string to a maximum length
// ============================================================
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

// ============================================================
// absoluteUrl — resolve a path to an absolute URL
// ============================================================
export function absoluteUrl(path: string, baseUrl?: string): string {
  const base =
    baseUrl ??
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000");

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
