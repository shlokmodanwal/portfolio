import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/data/projects";
import { ProjectRow } from "@/components/sections/ProjectRow";
import { links } from "@/data/links";
import { PageBackground } from "@/components/ui/PageBackground";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Selected projects — AI/ML platforms, full-stack applications, and developer tools.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "calc(100dvh - var(--header-height))", position: "relative", overflow: "hidden" }}>

      {/* LightRays + ambient glow background */}
      <PageBackground raysColor="#60a5fa" opacity={0.25} />

      {/* ── Page Header ────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid var(--border)",
          background: "linear-gradient(180deg, rgba(19,19,22,0.9) 0%, transparent 100%)",
        }}
      >
        <div
          className="container"
          style={{ paddingTop: "4rem", paddingBottom: "3.5rem" }}
        >
          <div className="section-label-line" style={{ marginBottom: "1.5rem" }}>
            <span className="label">Selected Projects</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                className="heading-page"
                style={{ color: "var(--text-1)", marginBottom: "0.75rem" }}
              >
                Projects
              </h1>
              <p className="body" style={{ maxWidth: "38ch", color: "var(--text-3)" }}>
                Full-stack applications, AI/ML platforms, and thoughtful digital experiences.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.875rem 1.25rem",
                background: "var(--surface)",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--text-1)",
                  lineHeight: 1,
                }}
              >
                {String(projects.length).padStart(2, "0")}
              </span>
              <div>
                <div className="label" style={{ marginBottom: "0.125rem" }}>Projects</div>
                <div className="mono" style={{ color: "var(--text-3)" }}>Shipped</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Project List ───────────────────────────────────────── */}
      <main
        id="main-projects"
        className="container"
        style={{ position: "relative", zIndex: 1, paddingTop: "4rem", paddingBottom: "5rem" }}
        aria-label="Projects"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "5rem",
            padding: "2rem 2.25rem",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-xl)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div>
            <p className="body" style={{ fontWeight: 500, color: "var(--text-1)", marginBottom: "0.375rem" }}>
              More work on GitHub
            </p>
            <p className="body-sm" style={{ color: "var(--text-3)" }}>
              Open source contributions and personal experiments.
            </p>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View GitHub Profile
          </a>
        </div>
      </main>
    </div>
  );
}
