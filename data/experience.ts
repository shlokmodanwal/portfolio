import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-editorial",
    company: "MMMUT — The Editorial Board",
    role: "Treasurer",
    type: "part-time",
    badge: "LEADERSHIP",
    startDate: "2023-09",
    endDate: "present",
    location: "MMMUT, Gorakhpur",
    locationType: "on-site",
    description: "Managing organizational responsibilities while contributing to event planning, editorial initiatives, financial coordination, and collaborative team activities.",
    highlights: [
      "Coordinated event planning and execution, ensuring smooth operations and effective team collaboration",
      "Managed financial responsibilities, budgeting, documentation, and resource allocation for society activities",
      "Developed leadership, public speaking, crowd addressing, and interpersonal communication skills through organizing and participating in university events",
    ],
    tech: ["Leadership", "Event Management", "Teamwork", "Budgeting", "Documentation", "Public Speaking", "Crowd Addressing", "Canva", "Photoshop"],
  },
  {
    id: "exp-nexsus",
    company: "MMMUT — Nexsus Technical Society",
    role: "UI/UX Lead",
    type: "part-time",
    badge: "DESIGN & LEADERSHIP",
    startDate: "2024-01",
    endDate: "present",
    location: "MMMUT, Gorakhpur",
    locationType: "on-site",
    description: "Leading UI/UX initiatives and collaborating with developers and designers to create intuitive digital experiences and engaging web interfaces for the technical community.",
    highlights: [
      "Led UI/UX design initiatives and contributed to the development of the society's website",
      "Collaborated with team members to transform ideas into functional, accessible, and visually consistent interfaces",
      "Strengthened team leadership, creative problem-solving, communication, and presentation skills through collaborative technical initiatives",
    ],
    tech: ["UI/UX Design", "React", "Web Design", "Photoshop", "Canva", "Documentation", "Team Leadership", "Public Speaking"],
  },
];

export const sortedExperience = [...experience].sort((a, b) => {
  const aEnd = a.endDate === "present" ? "9999-99" : a.endDate;
  const bEnd = b.endDate === "present" ? "9999-99" : b.endDate;
  return bEnd.localeCompare(aEnd);
});
