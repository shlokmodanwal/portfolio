import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/site";

// ============================================================
// Metadata utilities for Next.js App Router
// ============================================================

/**
 * Base metadata shared across all pages.
 * Override per-page using generateMetadata() in each route.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.author}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  keywords: [
    "software engineer",
    "portfolio",
    "developer",
    "web development",
    "frontend",
    "fullstack",
    siteConfig.author,
    // TODO: Add relevant keywords specific to your skills & niche
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.author} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // TODO: Add your Twitter/X handle
    // creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    // TODO: Add /favicon.svg, /apple-touch-icon.png etc.
  },
};

/**
 * Viewport export — theme color for mobile browsers.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * Helper to construct per-page metadata.
 * @example
 * export const metadata = buildMetadata({
 *   title: "Projects",
 *   description: "All my projects",
 *   path: "/projects",
 * });
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const desc = description ?? siteConfig.description;
  const img = image ?? siteConfig.ogImage;

  return {
    title,
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} — ${siteConfig.author}`,
      description: desc,
      url,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title: `${title} — ${siteConfig.author}`,
      description: desc,
      images: [img],
    },
  };
}
