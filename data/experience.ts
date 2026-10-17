import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-2",
    company: "MMMUT — Technical Club",
    role: "Technical Lead",
    type: "part-time",
    startDate: "2023-09",
    endDate: "present",
    location: "MMMUT, Gorakhpur",
    locationType: "on-site",
    description: "Leading technical initiatives, workshops, and hackathon prep for the college CS community.",
    highlights: [
      "Organized and ran 3+ technical workshops on web development and Git — 60+ students attended",
      "Mentored junior students on final-year project ideation and full-stack implementation",
      "Coordinated the club's participation in inter-college hackathons, guiding 4 teams",
    ],
    tech: ["React", "Node.js", "Git", "Python"],
  },
  {
    id: "exp-3",
    company: "Freelance / Independent",
    role: "Full Stack Developer",
    type: "freelance",
    startDate: "2023-01",
    endDate: "present",
    location: "Remote",
    locationType: "remote",
    description: "Building and delivering digital products for clients — from landing pages to full-stack web apps.",
    highlights: [
      "Designed and built e-commerce and portfolio sites using Next.js and TypeScript for 3 clients",
      "Integrated payment gateways (Stripe, Razorpay) and transactional email (Resend) into client projects",
      "Maintained and iterated on live production sites — zero downtime record across all deployments",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Vercel"],
  },
];

export const sortedExperience = [...experience].sort((a, b) => {
  const aEnd = a.endDate === "present" ? "9999-99" : a.endDate;
  const bEnd = b.endDate === "present" ? "9999-99" : b.endDate;
  return bEnd.localeCompare(aEnd);
});
