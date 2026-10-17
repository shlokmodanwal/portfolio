"use client";

import Link from "next/link";
import { ArrowUpRight, GitFork } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "featured" | "compact";
}

export function ProjectCard({
  project,
  index,
  variant = "featured",
}: ProjectCardProps) {
  const githubLink = project.links.find((l) => l.icon === "github");
  const demoLink = project.links.find((l) => l.icon === "external" || l.icon === "demo");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className={cn(
        "group relative card overflow-hidden",
        variant === "featured" && "flex flex-col"
      )}
    >
      {/* Image placeholder area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "var(--bg-3)",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "var(--radius)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                margin: "0 auto 0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-hidden
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-3)",
                }}
              >
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Status badge overlay */}
        {project.status === "in-progress" && (
          <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
            <span
              className="mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "3px 8px",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "3px",
                color: "var(--green)",
                background: "rgba(34,197,94,0.05)",
                fontSize: "10px",
                letterSpacing: "0.06em",
              }}
            >
              In Progress
            </span>
          </div>
        )}

        {/* Number */}
        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
          <span className="mono" style={{ color: "var(--text-3)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "1.375rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: "var(--text-base)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--text-1)",
              marginBottom: "0.375rem",
              transition: "color var(--dur-fast) ease",
            }}
          >
            {project.title}
          </h3>
          <p className="body-sm" style={{ marginBottom: "1.125rem" }}>
            {project.tagline}
          </p>

          {/* Tech stack */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
            {project.tech.slice(0, 5).map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-3)",
                textDecoration: "none",
                transition: "color var(--dur-fast) ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
              aria-label={`${project.title} GitHub repository`}
            >
              <GitFork size={12} aria-hidden />
              Code
            </a>
          )}
          {demoLink && (
            <a
              href={demoLink.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--text-3)",
                textDecoration: "none",
                transition: "color var(--dur-fast) ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
              aria-label={`${project.title} live demo`}
            >
              <ArrowUpRight size={12} aria-hidden />
              Demo
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-3)",
              textDecoration: "none",
              transition: "color var(--dur-fast) ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
          >
            Case Study
            <ArrowUpRight size={11} aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
