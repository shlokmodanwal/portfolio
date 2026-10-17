"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/data/types";

const EASE = [0.16, 1, 0.3, 1] as const;

const categoryColors: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  "ai-ml":           { color: "#c4b5fd", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)",  glow: "rgba(167,139,250,0.12)" },
  "full-stack":      { color: "#93c5fd", bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.2)",   glow: "rgba(96,165,250,0.12)"  },
  "education":       { color: "#86efac", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.2)",   glow: "rgba(74,222,128,0.10)"  },
  "government-tech": { color: "#fde68a", bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.2)",   glow: "rgba(251,191,36,0.10)"  },
  "e-commerce":      { color: "#f9a8d4", bg: "rgba(244,114,182,0.07)", border: "rgba(244,114,182,0.2)",  glow: "rgba(244,114,182,0.10)" },
  "developer-tools": { color: "#fed7aa", bg: "rgba(251,146,60,0.07)",  border: "rgba(251,146,60,0.2)",   glow: "rgba(251,146,60,0.10)"  },
  "web":             { color: "#93c5fd", bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.2)",   glow: "rgba(96,165,250,0.12)"  },
};

const tagLabels: Record<string, string> = {
  "ai-ml": "AI / ML", "full-stack": "Full Stack", "education": "Education",
  "government-tech": "GovTech", "e-commerce": "E-Commerce",
  "developer-tools": "Dev Tools", "web": "Web App",
};

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const tag = project.tags[0] ?? "web";
  const label = tagLabels[tag] ?? tag;
  const cc = categoryColors[tag] ?? categoryColors["full-stack"];
  const github = project.links.find((l) => l.icon === "github");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(145deg, var(--surface) 0%, var(--surface-2) 100%)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transition: "border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = cc.border;
        el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.25), 0 0 0 1px ${cc.border} inset`;
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-strong)";
        el.style.boxShadow = "";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Color band top */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, ${cc.color} 0%, transparent 100%)`, opacity: 0.7 }} />

      {/* Visual placeholder */}
      <div style={{
        aspectRatio: "16/9",
        background: `radial-gradient(ellipse at 30% 40%, ${cc.glow} 0%, var(--surface-2) 60%)`,
        borderBottom: `1px solid ${cc.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Large dim project initial */}
        <span aria-hidden style={{
          fontSize: "clamp(3rem, 8vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          color: cc.color,
          opacity: 0.12,
          userSelect: "none",
          lineHeight: 1,
        }}>
          {project.title.replace(/\s/g, "").toUpperCase().slice(0, 2)}
        </span>

        {/* Category pill */}
        <div style={{
          position: "absolute", top: "0.625rem", left: "0.625rem",
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          padding: "0.2rem 0.6rem",
          borderRadius: "99px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1px solid ${cc.border}`,
          fontSize: "9px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: cc.color,
          fontFamily: "var(--font-mono)",
        }}>
          {label}
        </div>

        {/* Number */}
        <span className="mono" style={{ position: "absolute", top: "0.625rem", right: "0.75rem", color: "var(--text-4)", fontSize: "10px" }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* In-progress badge */}
        {project.status === "in-progress" && (
          <span style={{
            position: "absolute", bottom: "0.625rem", left: "0.625rem",
            display: "inline-flex", alignItems: "center", gap: "0.3rem",
            padding: "2px 7px", borderRadius: "4px",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            fontSize: "9px", color: "var(--green)",
            fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
          }}>
            <span className="dot-green" style={{ width: "4px", height: "4px" }} />
            In Progress
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem 1.375rem 1.375rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.75rem" }}>
        <div>
          <h3 style={{
            fontSize: "var(--text-base)",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: "var(--text-1)",
            marginBottom: "0.375rem",
          }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-3)", lineHeight: 1.6 }}>
            {project.tagline}
          </p>
        </div>

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Links row */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          paddingTop: "0.875rem",
          borderTop: "1px solid var(--border)",
          marginTop: "auto",
        }}>
          <Link
            href={`/projects/${project.slug}`}
            style={{
              fontSize: "12px", fontWeight: 600,
              color: cc.color, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "0.25rem",
              transition: "opacity var(--dur-fast) ease",
              textShadow: `0 0 10px ${cc.color}55`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            Case Study <ArrowUpRight size={11} aria-hidden />
          </Link>

          {github && github.url !== "#" && (
            <a href={github.url} target="_blank" rel="noopener noreferrer" style={{
              fontSize: "12px", color: "var(--text-3)",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.2rem",
              transition: "color var(--dur-fast) ease", marginLeft: "auto",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
            >
              GitHub <ArrowUpRight size={10} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjects() {
  return (
    <section
      id="featured-projects"
      className="section"
      aria-labelledby="featured-heading"
      style={{ borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0,
        width: "50%", height: "60%",
        background: "radial-gradient(ellipse at top right, rgba(167,139,250,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: "flex", flexWrap: "wrap", alignItems: "flex-end",
            justifyContent: "space-between", gap: "1.5rem",
            marginBottom: "clamp(2rem,5vw,3rem)",
          }}
        >
          <div>
            <div className="section-label-line" style={{ marginBottom: "0.75rem" }}>
              <span className="label">Selected Work</span>
            </div>
            <h2 id="featured-heading" className="heading-sec" style={{ color: "var(--text-1)", marginBottom: "0.5rem" }}>
              Featured Projects
            </h2>
            <p className="body-sm" style={{ maxWidth: "40ch", color: "var(--text-3)" }}>
              Full-stack applications, AI/ML platforms, and civic-tech tools built from scratch.
            </p>
          </div>
          <Link href="/projects" style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-3)",
            textDecoration: "none", transition: "color var(--dur-fast) ease",
            flexShrink: 0,
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
          >
            View all {featuredProjects.length} projects <ArrowUpRight size={13} aria-hidden />
          </Link>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}>
          {featuredProjects.map((project, i) => (
            <ProjectTile key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
