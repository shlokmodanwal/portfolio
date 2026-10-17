import type { SocialLink } from "./types";
import { links } from "./links";

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: links.github,
    username: "shlokmodanwal",
    prominent: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: links.linkedin,
    username: "shlokmodanwal",
    prominent: true,
  },
  {
    platform: "twitter",
    label: "Twitter",
    url: links.twitter,
    username: "@shlokmodanwal",
    prominent: true,
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: links.instagram,
    username: "shlokmodanwal",
    prominent: true,
  },
  {
    platform: "email",
    label: "Email",
    url: `mailto:${links.email}`,
    prominent: true,
  },
];

export const prominentLinks = socialLinks.filter((l) => l.prominent);

