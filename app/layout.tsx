import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { baseMetadata, viewport as viewportConfig } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeScript } from "@/components/ui/ThemeToggle";
import "@/app/globals.css";

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = viewportConfig;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
        <ThemeScript />
        <a href="#main-content" className="sr-only" style={{ position:"absolute", top:"0.75rem", left:"0.75rem", zIndex:9999, padding:"0.5rem 1rem", background:"var(--surface)", color:"var(--text-1)", border:"1px solid var(--border)", borderRadius:"var(--radius)", fontSize:"13px", fontWeight:500, textDecoration:"none" }}>
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} style={{ flex:1, display:"flex", flexDirection:"column", paddingTop:"var(--header-height)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
