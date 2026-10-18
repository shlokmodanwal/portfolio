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
  { href: links.github,    label: "GitHub",      desc: "See my code & projects",  color: "#e4e4e7", bg: "rgba(228,228,231,0.06)",  external: true  },
  { href: links.linkedin,  label: "LinkedIn",    desc: "Professional profile",     color: "#60a5fa", bg: "rgba(96,165,250,0.06)",   external: true  },
  { href: links.twitter,   label: "X / Twitter", desc: "Thoughts & updates",       color: "#a1a1aa", bg: "rgba(161,161,170,0.06)",  external: true  },
  { href: links.instagram, label: "Instagram",   desc: "Photos & moments",         color: "#f9a8d4", bg: "rgba(244,114,182,0.06)",  external: true  },
  { href: MAILTO,          label: "Email",       desc: links.email,                color: "#86efac", bg: "rgba(74,222,128,0.06)",   external: false },
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

          {/* Social cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.875rem", maxWidth: "48rem" }}>
            {socialItems.map(({ href, label, desc, color, bg, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="card"
                style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", padding: "1.25rem", textDecoration: "none" }}
              >
                <div style={{
                  width: "38px", height: "38px",
                  borderRadius: "var(--radius)",
                  background: bg,
                  border: "1px solid var(--border-strong)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color, flexShrink: 0,
                  fontSize: "1rem", fontWeight: 700,
                }}>
                  {label[0]}
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-1)", marginBottom: "0.2rem" }}>{label}</div>
                  <div className="body-sm" style={{ fontSize: "11px", color: "var(--text-3)" }}>{desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
