import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { sortedExperience } from "@/data/experience";
import { ExperiencePageClient } from "./ExperiencePageClient";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description: "Work history, roles, and leadership experience.",
  path: "/experience",
});

export default function ExperiencePage() {
  return <ExperiencePageClient experience={sortedExperience} />;
}
