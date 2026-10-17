import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    category: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", category: "languages", level: 5 },
      { name: "JavaScript", category: "languages", level: 5 },
      { name: "Python", category: "languages", level: 4 },
      { name: "C++", category: "languages", level: 4 },
      { name: "HTML / CSS", category: "languages", level: 5 },
      { name: "SQL", category: "languages", level: 4 },
    ],
  },
  {
    category: "frameworks",
    label: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", category: "frameworks", level: 5 },
      { name: "React", category: "frameworks", level: 5 },
      { name: "Node.js", category: "frameworks", level: 4 },
      { name: "FastAPI", category: "frameworks", level: 4 },
      { name: "Tailwind CSS", category: "frameworks", level: 5 },
      { name: "TensorFlow", category: "frameworks", level: 3 },
      { name: "Prisma", category: "frameworks", level: 4 },
    ],
  },
  {
    category: "tools",
    label: "Tools",
    skills: [
      { name: "Git & GitHub", category: "tools", level: 5 },
      { name: "Docker", category: "tools", level: 3 },
      { name: "Figma", category: "tools", level: 4 },
      { name: "VS Code", category: "tools", level: 5 },
      { name: "Postman", category: "tools", level: 4 },
    ],
  },
  {
    category: "platforms",
    label: "Platforms",
    skills: [
      { name: "Vercel", category: "platforms", level: 5 },
      { name: "MongoDB", category: "platforms", level: 4 },
      { name: "PostgreSQL", category: "platforms", level: 4 },
      { name: "Redis", category: "platforms", level: 3 },
      { name: "GitHub Actions", category: "platforms", level: 3 },
    ],
  },
  {
    category: "practices",
    label: "Practices",
    skills: [
      { name: "UI/UX Design", category: "practices", level: 4 },
      { name: "REST APIs", category: "practices", level: 5 },
      { name: "Responsive Design", category: "practices", level: 5 },
      { name: "Accessibility (a11y)", category: "practices", level: 4 },
      { name: "AI/ML Engineering", category: "practices", level: 3 },
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);
