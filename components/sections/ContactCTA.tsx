"use client";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function ContactCTA() {
  return (
    <section
      id="contact-cta"
      className="section"
      aria-labelledby="contact-heading"
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(96,165,250,0.06) 0%, transparent 70%)",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Big CTA box */}
        <div
          style={{
            padding: "clamp(2.5rem,6vw,4.5rem)",
            background: "linear-gradient(145deg, var(--surface) 0%, rgba(19,19,22,0.8) 100%)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner corner glow */}
          <div aria-hidden style={{
            position: "absolute", bottom: 0, right: 0,
            width: "40%", height: "70%",
            background: "radial-gradient(ellipse at bottom right, rgba(167,139,250,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <p className="label">Let&apos;s collaborate</p>

          <h2
            id="contact-heading"
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "var(--text-1)",
            }}
          >
            Open to the right
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--text-2) 0%, var(--text-3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              opportunities.
            </span>
          </h2>

          <p className="body" style={{ maxWidth: "42ch" }}>
            Whether it&apos;s an internship, a collaboration, or just an
            interesting conversation — I&apos;d love to hear from you.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", position: "relative", zIndex: 1 }}>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "var(--text-1)",
                color: "var(--bg)",
                borderRadius: "var(--radius-lg)",
                fontWeight: 600,
                fontSize: "var(--text-sm)",
                textDecoration: "none",
                transition: "all var(--dur-fast) ease",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset, var(--shadow-md)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#fff";
                el.style.boxShadow = "0 0 24px rgba(244,244,245,0.18), var(--shadow-lg)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--text-1)";
                el.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.1) inset, var(--shadow-md)";
                el.style.transform = "translateY(0)";
              }}
            >
              Say Hello
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <Link
              href="/contact"
              className="btn btn-ghost"
            >
              All contact options
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
