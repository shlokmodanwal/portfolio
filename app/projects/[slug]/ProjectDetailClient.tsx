"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { Project } from "@/data/types";
import { formatDate } from "@/lib/utils";

function renderContent(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} style={{
          fontSize: "var(--text-xl)", fontWeight: 600, letterSpacing: "-0.02em",
          color: "var(--text-1)", marginTop: "2.5rem", marginBottom: "1rem",
          paddingBottom: "0.625rem", borderBottom: "1px solid var(--border)",
        }}>
          {line.slice(3)}
        </h2>
      );
      i++; continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {items.map((item, j) => (
            <li key={j} style={{
              display: "flex", gap: "0.75rem", alignItems: "flex-start",
              padding: "0.5rem 0.75rem",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "var(--radius)", border: "1px solid var(--border)",
              fontSize: "var(--text-sm)", color: "var(--text-2)", lineHeight: 1.65,
            }}>
              <span style={{ color: "var(--text-4)", flexShrink: 0, fontSize: "10px", paddingTop: "0.3rem" }}>▹</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-1);font-weight:600">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === "") { i++; continue; }

    if (line.trim()) {
      elements.push(
        <p key={i} style={{ fontSize: "var(--text-base)", color: "var(--text-2)", lineHeight: 1.8, marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-1);font-weight:600">$1</strong>') }}
        />
      );
    }
    i++;
  }

  return elements;
}

export function ProjectDetailClient({ project }: { project: Project }) {
  const github = project.links.find((l) => l.icon === "github");
  const demo   = project.links.find((l) => l.icon === "external" || l.icon === "demo");

  const statusColor = project.status === "in-progress"
    ? { color: "var(--green)", bg: "rgba(74,222,128,0.07)", border: "rgba(74,222,128,0.2)" }
    : { color: "var(--text-3)", bg: "rgba(255,255,255,0.04)", border: "var(--border-strong)" };

  return (
    <div style={{ minHeight: "calc(100dvh - var(--header-height))", position: "relative" }}>
      {/* Ambient top glow */}
      <div aria-hidden style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "50vh",
        pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(96,165,250,0.04) 0%, transparent 70%)",
      }} />

      {/* ── Page hero header ──────────────────────────────────── */}
      <header style={{
        position: "relative", zIndex: 1,
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(180deg, var(--surface) 0%, transparent 100%)",
        paddingTop: "3.5rem", paddingBottom: "3rem",
      }}>
        <div className="container" style={{ maxWidth: "72rem" }}>
          {/* Back link */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <Link href="/projects" style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              fontSize: "var(--text-sm)", color: "var(--text-3)", textDecoration: "none",
              transition: "color var(--dur-fast) ease",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
            >
              <ArrowLeft size={13} aria-hidden />
              All Projects
            </Link>
          </nav>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem" }}>
            <div style={{ flex: "1 1 0", minWidth: "280px" }}>
              {/* Meta row */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
                <span className="mono" style={{ color: "var(--text-3)" }}>{formatDate(project.date)}</span>
                {project.role && (
                  <>
                    <span style={{ color: "var(--text-4)" }}>·</span>
                    <span className="mono" style={{ color: "var(--text-3)" }}>{project.role}</span>
                  </>
                )}
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.3rem",
                  padding: "2px 9px", borderRadius: "99px",
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: statusColor.bg, color: statusColor.color,
                  border: `1px solid ${statusColor.border}`,
                  fontFamily: "var(--font-mono)",
                }}>
                  {project.status === "in-progress" ? "In Progress" : "Completed"}
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 600,
                letterSpacing: "-0.035em", lineHeight: 1.05,
                color: "var(--text-1)", marginBottom: "1rem",
              }}>
                {project.title}
              </h1>

              <p style={{ fontSize: "var(--text-lg)", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "50ch" }}>
                {project.tagline}
              </p>
            </div>

            {/* Link panel */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "0.625rem",
              padding: "1.375rem 1.5rem",
              background: "var(--surface)", border: "1px solid var(--border-strong)",
              borderRadius: "var(--radius-lg)", minWidth: "200px", flexShrink: 0,
            }}>
              <p className="label" style={{ marginBottom: "0.5rem" }}>Project Links</p>
              {github && (
                <a href={github.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontSize: "var(--text-sm)", color: "var(--text-2)", textDecoration: "none",
                  padding: "0.5rem 0.75rem",
                  border: "1px solid var(--border-strong)", borderRadius: "var(--radius)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all var(--dur-fast) ease",
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-1)"; el.style.borderColor = "var(--border-hover)"; el.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-2)"; el.style.borderColor = "var(--border-strong)"; el.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                  <ArrowUpRight size={11} aria-hidden style={{ marginLeft: "auto", opacity: 0.5 }} />
                </a>
              )}
              {demo && (
                <a href={demo.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "var(--text-sm)", padding: "0.5rem 0.75rem" }}>
                  Live Demo
                  <ArrowUpRight size={12} aria-hidden />
                </a>
              )}
            </div>
          </div>

          {/* Tech stack */}
          {project.tech.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "2rem" }}>
              {project.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── Case Study Body ───────────────────────────────────── */}
      <main className="container" style={{ maxWidth: "72rem", position: "relative", zIndex: 1, paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        {project.content ? (
          <div style={{ maxWidth: "52rem" }}>{renderContent(project.content)}</div>
        ) : (
          <div style={{ maxWidth: "52rem" }}>
            <p style={{ fontSize: "var(--text-base)", color: "var(--text-2)", lineHeight: 1.8 }}>
              {project.description}
            </p>
          </div>
        )}

        {/* Back CTA */}
        <div style={{
          marginTop: "4rem", paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "1rem",
        }}>
          <Link href="/projects" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontSize: "var(--text-sm)", color: "var(--text-3)", textDecoration: "none",
            transition: "color var(--dur-fast) ease",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
          >
            <ArrowLeft size={13} /> Back to all projects
          </Link>
          {github && (
            <a href={github.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "var(--text-sm)" }}>
              View on GitHub <ArrowUpRight size={12} aria-hidden />
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
