// ============================================================
// Data Types — TypeScript interfaces for all data structures
// ============================================================

// ── Projects ─────────────────────────────────────────────────

export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface ProjectLink {
  label: string;
  url: string;
  icon?: "github" | "external" | "figma" | "demo";
}

export interface Project {
  /** URL-safe slug used for /projects/[slug] routing */
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Long-form MDX/markdown content (optional, for detail page) */
  content?: string;
  coverImage?: string;
  images?: string[];
  tech: string[];
  tags: string[];
  links: ProjectLink[];
  status: ProjectStatus;
  featured: boolean;
  /** ISO date string e.g. "2024-03" */
  date: string;
  role?: string;
}

// ── Skills ───────────────────────────────────────────────────

export type SkillCategory =
  | "languages"
  | "frameworks"
  | "tools"
  | "platforms"
  | "design"
  | "practices";

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Proficiency 1–5 */
  level?: 1 | 2 | 3 | 4 | 5;
  icon?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

// ── Experience ───────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  role: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  /** ISO date string e.g. "2022-06" */
  startDate: string;
  /** ISO date string or "present" */
  endDate: string | "present";
  location: string;
  locationType: "remote" | "hybrid" | "on-site";
  description: string;
  highlights: string[];
  tech?: string[];
}

// ── Achievements ─────────────────────────────────────────────

export type AchievementType =
  | "award"
  | "certification"
  | "publication"
  | "open-source"
  | "speaking"
  | "competition"
  | "other";

export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  type: AchievementType;
  date: string;
  description?: string;
  url?: string;
  icon?: string;
}

// ── Education ────────────────────────────────────────────────

export interface EducationItem {
  id: string;
  institution: string;
  institutionUrl?: string;
  institutionLogo?: string;
  degree: string;
  field: string;
  /** ISO date string e.g. "2020-09" */
  startDate: string;
  /** ISO date string or "present" */
  endDate: string | "present";
  location: string;
  gpa?: string;
  honors?: string;
  highlights?: string[];
  coursework?: string[];
}

// ── Social Links ─────────────────────────────────────────────

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "x"
  | "instagram"
  | "youtube"
  | "medium"
  | "devto"
  | "hashnode"
  | "dribbble"
  | "behance"
  | "email"
  | "website"
  | "other";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  username?: string;
  /** Show in nav/footer */
  prominent: boolean;
}

// ── Site Metadata ─────────────────────────────────────────────

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  /** ISO locale e.g. "en-US" */
  locale: string;
  /** Full name or handle */
  author: string;
  authorTitle: string;
  email: string;
  ogImage: string;
}
