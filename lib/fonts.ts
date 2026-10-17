import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// GeistSans and GeistMono are pre-configured NextFontWithVariable instances.
// They expose .variable (CSS var class) and .className properties.

// ============================================================
// Fonts — next/font configuration
//
// Using Geist (by Vercel) — variable fonts for optimal
// performance. These are loaded via next/font which:
//   • self-hosts fonts (no external requests)
//   • zero layout shift (size-adjust, preload)
//   • tree-shaken automatically
// ============================================================

export const fontSans = GeistSans;
export const fontMono = GeistMono;

/**
 * CSS variable class names to apply to <html>.
 * Usage:
 *   <html className={fontVariables}>
 */
export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
