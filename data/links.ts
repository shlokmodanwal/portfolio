// ================================================================
// links.ts — Bridges data/links.json to the TypeScript codebase.
// Edit your URLs in data/links.json; changes apply everywhere.
// ================================================================

import linksData from "./links.json";

export const links = linksData;

/** Quick-access social list used in Footer and mobile menu */
export const socialList = [
  { platform: "github",   label: "GitHub",    url: links.github   },
  { platform: "linkedin", label: "LinkedIn",  url: links.linkedin  },
  { platform: "twitter",  label: "Twitter",   url: links.twitter   },
  { platform: "instagram",label: "Instagram", url: links.instagram },
  { platform: "email",    label: "Email",     url: `mailto:${links.email}` },
] as const;

export type LinksConfig = typeof linksData;
export type SocialPlatformKey = (typeof socialList)[number]["platform"];
