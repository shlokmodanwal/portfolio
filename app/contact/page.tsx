import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { links } from "@/data/links";
import { PageBackground } from "@/components/ui/PageBackground";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Shlok Modanwal.",
  path: "/contact",
});

const MAILTO = `mailto:${links.email}`;

const socialItems = [
  {
    href: links.github,
    label: "GitHub",
    color: "#e4e4e7",
    bg: "rgba(228,228,231,0.06)",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    href: links.linkedin,
    label: "LinkedIn",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.06)",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    href: links.twitter,
    label: "X / Twitter",
    color: "#a1a1aa",
    bg: "rgba(161,161,170,0.06)",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: links.instagram,
    label: "Instagram",
    color: "#f9a8d4",
    bg: "rgba(244,114,182,0.06)",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    href: MAILTO,
    label: "Email",
    color: "#86efac",
    bg: "rgba(74,222,128,0.06)",
    external: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div style={{ minHeight: "calc(100dvh - var(--header-height))", position: "relative" }}>

      {/* LightRays + ambient glow background */}
      <PageBackground raysColor="#a78bfa" opacity={0.22} glowTopLeft="rgba(96,165,250,0.06)" glowTopRight="rgba(167,139,250,0.06)" />

      {/* Smooth top buffer */}
      <div aria-hidden style={{
        position: "relative", zIndex: 1,
        height: "clamp(1rem, 3vw, 2rem)",
        background: "linear-gradient(180deg, var(--surface) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Main */}
      <div
        className="container"
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          minHeight: "calc(90dvh - var(--header-height))",
          paddingTop: "clamp(3rem,8vw,6rem)",
          paddingBottom: "clamp(5rem,10vw,8rem)",
        }}
      >
        <div style={{ maxWidth: "60rem" }}>
          {/* Label */}
          <div className="section-label-line" style={{ marginBottom: "1.75rem" }}>
            <span className="label">Get in touch</span>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "2rem" }}>
            <span style={{ color: "var(--text-1)", display: "block" }}>Let&rsquo;s build</span>
            <span style={{ display: "block", background: "linear-gradient(135deg, var(--text-2) 0%, var(--text-3) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              something together.
            </span>
          </h1>

          <p className="body-lg" style={{ maxWidth: "40ch", marginBottom: "3rem" }}>
            Open to internships, collaborations, and interesting projects.
            The best way to reach me is via email.
          </p>

          {/* Email CTA — direct mailto, no target=_blank */}
          <a
            href={MAILTO}
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              marginBottom: "4rem",
              padding: "0.875rem 2rem",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              borderRadius: "var(--radius-lg)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset, var(--shadow-md)",
              gap: "0.625rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Say Hello → {links.email}
          </a>

          {/* Social cards — icon + platform name only, no description */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.875rem", maxWidth: "48rem" }}>
            {socialItems.map(({ href, label, color, bg, external, icon }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.25rem",
                  textDecoration: "none",
                }}
              >
                <div style={{
                  width: "36px", height: "36px",
                  borderRadius: "var(--radius)",
                  background: bg,
                  border: "1px solid var(--border-strong)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color, flexShrink: 0,
                }}>
                  {icon}
                </div>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-1)" }}>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
