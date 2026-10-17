import type { EducationItem } from "./types";

// ============================================================
// Education Data
// TODO: Replace with your real education history.
// ============================================================

export const education: EducationItem[] = [
  {
    id: "edu-placeholder-1",
    institution: "University Name",
    institutionUrl: "https://example.edu",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2017-09",
    endDate: "2021-05",
    location: "City, Country",
    gpa: "X.X / 4.0",
    honors: "Honors / Dean's List",
    highlights: [
      "Relevant highlight, leadership role, or notable project",
      "Another highlight, club, or society",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Database Systems",
    ],
  },
];

/** Education sorted by most recent end date first */
export const sortedEducation = [...education].sort((a, b) => {
  const aEnd = a.endDate === "present" ? "9999-99" : a.endDate;
  const bEnd = b.endDate === "present" ? "9999-99" : b.endDate;
  return bEnd.localeCompare(aEnd);
});
