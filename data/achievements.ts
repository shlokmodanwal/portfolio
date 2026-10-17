import type { Achievement } from "./types";

// ============================================================
// Achievements Data
// TODO: Replace with your real awards, certifications, etc.
// ============================================================

export const achievements: Achievement[] = [
  {
    id: "ach-vbyld",
    title: "Viksit Bharat Young Leaders Dialogue 2027",
    issuer: "Government of India",
    type: "award",
    date: "2027-01",
    description: "Selected as a participant in the national Viksit Bharat Young Leaders Dialogue — a competitive leadership and governance program organized by the Government of India.",
    url: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/Viksit_Bharat_Young_Leaders_Dialogue_VBYLD_2027_Certificate_Shlok_zgontz.png",
  },
  {
    id: "ach-vertex-ai",
    title: "Prompt Design in Vertex AI — Skill Badge",
    issuer: "Google Cloud",
    type: "certification",
    date: "2025-01",
    description: "Earned a Google Cloud skill badge for completing the Prompt Design in Vertex AI learning path, covering advanced prompt engineering and generative AI techniques.",
    url: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969512/prompt-design-in-vertex-ai-skill-badge_x3ueot.png",
  },
  {
    id: "ach-cisco",
    title: "Cisco Networking Academy — Packet Tracer",
    issuer: "Cisco",
    type: "certification",
    date: "2024-06",
    description: "Completed Cisco's Getting Started with Packet Tracer course, gaining hands-on experience with network simulation and topology design.",
    url: "https://res.cloudinary.com/dwdx4kjgx/image/upload/v1791969513/Getting_Started_with_Cisco_Packet_Tracer_certificate_shlok107611-gmail-com_68434e0b-ae5c-4b79-93cf-d35e7648b279_tooeu7.pdf",
  },
  {
    id: "ach-hackathon",
    title: "Inter-College Hackathon Participation",
    issuer: "MMMUT, Gorakhpur",
    type: "competition",
    date: "2024-03",
    description: "Participated in and co-organized inter-college hackathons through the MMMUT Technical Club, guiding 4 student teams from ideation to prototype.",
  },
  {
    id: "ach-open-source",
    title: "Open Source Contributions",
    type: "open-source",
    date: "2023-06",
    description: "Active contributor to open source projects on GitHub — including bug fixes, documentation improvements, and feature additions to community tools.",
    url: "https://github.com/shlokmodanwal",
  },
];

/** Achievements sorted by most recent first */
export const sortedAchievements = [...achievements].sort((a, b) =>
  b.date.localeCompare(a.date)
);
