/**
 * Homepage — Server Component
 */

import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedProjects />
      <ExperienceSection />
      <SkillsSection />
      <ContactCTA />
    </>
  );
}
