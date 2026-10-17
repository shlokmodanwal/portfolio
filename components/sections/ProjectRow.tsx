"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { TiltedCard } from "@/components/ui/TiltedCard";
import { ProjectVisual } from "./ProjectVisual";
import type { Project } from "@/data/types";

interface ProjectRowProps {
  project: Project;
  index: number;
}

const categoryMap: Record<string, string> = {
  "ai-ml":           "AI / ML",
  "full-stack":      "Full Stack",
  "education":       "Education",
  "government-tech": "GovTech",
  "e-commerce":      "E-Commerce",
  "developer-tools": "Dev Tools",
  "web":             "Web App",
};

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  "AI / ML":     { color: "#c4b5fd", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
  "Full Stack":  { color: "#93c5fd", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.2)"  },
  "Education":   { color: "#86efac", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.2)"  },
  "GovTech":     { color: "#fde68a", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)"  },
  "E-Commerce":  { color: "#f9a8d4", bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.2)" },
  "Dev Tools":   { color: "#fed7aa", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)"  },
  "Web App":     { color: "#93c5fd", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.2)"  },
};

function mapTag(t: string) {
  return categoryMap[t] ?? t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const isEven   = index % 2 === 0;
  const category = project.tags[0] ? mapTag(project.tags[0]) : "Project";
  const cc       = categoryColors[category] ?? categoryColors["Full Stack"];
  const github   = project.links.find((l) => l.icon === "github");
  const demo     = project.links.find((l) => l.icon === "external" || l.icon === "demo");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Numbered divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <span
          className="mono"
          style={{
            color: cc.color,
            flexShrink: 0,
            textShadow: `0 0 12px ${cc.color}`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{
          flex: 1, height: "1px",
          background: `linear-gradient(90deg, ${cc.border} 0%, var(--border) 40%, transparent 100%)`,
        }} />
      </div>

      {/* Two-column panel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-sm)",
          transition: "border-color var(--dur-mid) ease, box-shadow var(--dur-mid) ease, transform var(--dur-mid) ease",
        }}
        className="project-panel"
      >
        <style>{`
          @media (min-width: 1024px) {
            .project-panel-inner { grid-template-columns: ${isEven ? "3fr 2fr" : "2fr 3fr"} !important; }
          }
        `}</style>

        <div
          className="project-panel-inner"
          style={{ display: "grid", gridTemplateColumns: "1fr" }}
        >
          {/* Visual */}
          <TiltedCard
            rotateAmplitude={4}
            scaleOnHover={1.01}
            style={{
              order: isEven ? 1 : 2,
              aspectRatio: "16 / 10",
              minHeight: "280px",
              overflow: "hidden",
              background: `linear-gradient(135deg, var(--surface-2) 0%, rgba(10,10,10,0.9) 100%)`,
              position: "relative",
            } as React.CSSProperties}
          >
            {/* Category color wash */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `radial-gradient(ellipse at 30% 40%, ${cc.bg} 0%, transparent 60%)`,
            }} />
            <div style={{ width: "100%", height: "100%", minHeight: "280px" }}>
              <ProjectVisual title={project.title} index={index} status={project.status} coverImage={project.coverImage} />
            </div>
          </TiltedCard>

          {/* Content */}
          <div
            style={{
              order: isEven ? 2 : 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(1.5rem, 3vw, 2.25rem)",
              background: "linear-gradient(145deg, var(--surface) 0%, rgba(19,19,22,0.8) 100%)",
              borderLeft: isEven ? "1px solid var(--border)" : "none",
              borderRight: isEven ? "none" : "1px solid var(--border)",
              minWidth: 0,
            }}
          >
            <div>
              {/* Category + status */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "3px 10px",
                  borderRadius: "99px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: cc.bg,
                  color: cc.color,
                  border: `1px solid ${cc.border}`,
                  fontFamily: "var(--font-mono)",
                }}>
                  {category}
                </span>

                {project.status === "in-progress" && (
                  <span className="mono" style={{
                    fontSize: "10px",
                    padding: "3px 8px",
                    border: "1px solid rgba(74,222,128,0.25)",
                    borderRadius: "3px",
                    color: "var(--green)",
                    background: "rgba(74,222,128,0.06)",
                    flexShrink: 0,
                    letterSpacing: "0.06em",
                  }}>
                    In Progress
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: "clamp(1.375rem, 2.8vw, 2.25rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--text-1)",
                marginBottom: "0.875rem",
              }}>
                {project.title}
              </h2>

              {/* Tagline */}
              <p className="body-sm" style={{ maxWidth: "38ch", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                {project.tagline}
              </p>

              {/* Tech tags */}
              {project.tech.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {project.tech.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.25rem",
              paddingTop: "1.5rem",
              marginTop: "1.5rem",
              borderTop: "1px solid var(--border)",
            }}>
              <Link
                href={`/projects/${project.slug}`}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: cc.color,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "opacity var(--dur-fast) ease",
                  textShadow: `0 0 12px ${cc.color}55`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Case Study →
              </Link>

              {github && github.url !== "#" && (
                <a href={github.url} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: "12px", fontWeight: 500, color: "var(--text-3)",
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem",
                  transition: "color var(--dur-fast) ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                >
                  GitHub <ArrowUpRight size={10} />
                </a>
              )}

              {demo && demo.url !== "#" && (
                <a href={demo.url} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: "12px", fontWeight: 500, color: "var(--text-3)",
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem",
                  transition: "color var(--dur-fast) ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                >
                  Live <ArrowUpRight size={10} />
                </a>
              )}

              {project.role && (
                <span className="mono" style={{ marginLeft: "auto", color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {project.role}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
