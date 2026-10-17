"use client";

import type { ExperienceItem } from "@/data/types";
import { PageBackground } from "@/components/ui/PageBackground";

const typeColors: Record<string, { color: string; bg: string; border: string }> = {
  "internship": { color: "#93c5fd", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.2)"  },
  "part-time":  { color: "#86efac", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.2)"  },
  "full-time":  { color: "#c4b5fd", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
  "freelance":  { color: "#fde68a", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)"  },
  "contract":   { color: "#fde68a", bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)"  },
};

function formatDate(date: string) {
  if (date === "present") return "Present";
  const [y, m] = date.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} '${y.slice(2)}`;
}

interface Props {
  experience: ExperienceItem[];
}

export function ExperiencePageClient({ experience }: Props) {
  return (
    <div style={{ minHeight: "calc(100dvh - var(--header-height))", position: "relative", overflow: "hidden" }}>

      {/* LightRays + ambient glow background */}
      <PageBackground raysColor="#c4b5fd" opacity={0.22} glowTopLeft="rgba(96,165,250,0.05)" glowTopRight="rgba(167,139,250,0.05)" />

      {/* ── Page Header ──────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 1,
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(180deg, var(--surface) 0%, transparent 100%)",
      }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "3.5rem" }}>
          <div className="section-label-line" style={{ marginBottom: "1.5rem" }}>
            <span className="label">Career</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <h1 className="heading-page" style={{ color: "var(--text-1)", marginBottom: "0.75rem" }}>
                Work History
              </h1>
              <p className="body" style={{ maxWidth: "38ch", color: "var(--text-3)" }}>
                Roles, projects, and contributions across engineering and leadership.
              </p>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 1rem",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.15)",
              borderRadius: "var(--radius-lg)",
            }}>
              <span className="dot-green" />
              <span className="mono" style={{ color: "var(--green)", letterSpacing: "0.06em" }}>Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────── */}
      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "58rem" }}>
          {experience.map((item, i) => {
            const tc = typeColors[item.type] ?? typeColors["internship"];
            const isLast = i === experience.length - 1;
            const realHighlights = item.highlights.filter(h => !h.startsWith("TODO"));

            return (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 2rem", position: "relative" }}>
                {/* Timeline spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.125rem" }}>
                  <div style={{
                    width: "10px", height: "10px", borderRadius: "9999px",
                    background: tc.color,
                    boxShadow: `0 0 8px ${tc.color}`,
                    flexShrink: 0, zIndex: 1,
                    border: "2px solid var(--bg)",
                    outline: `2px solid ${tc.border}`,
                  }} />
                  {!isLast && (
                    <div style={{
                      width: "1px", flex: 1, minHeight: "3rem",
                      background: `linear-gradient(180deg, ${tc.border} 0%, var(--border) 100%)`,
                      margin: "4px 0",
                    }} />
                  )}
                </div>

                {/* Card */}
                <div style={{ paddingBottom: isLast ? 0 : "2.5rem" }}>
                  <div
                    style={{
                      background: "linear-gradient(145deg, var(--surface) 0%, var(--surface-2) 100%)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: "var(--radius-lg)",
                      padding: "1.5rem 1.75rem",
                      boxShadow: "var(--shadow-sm)",
                      transition: "border-color var(--dur-mid) ease, box-shadow var(--dur-mid) ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = tc.border;
                      el.style.boxShadow = `var(--shadow-md), 0 0 0 1px ${tc.border} inset`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border-strong)";
                      el.style.boxShadow = "var(--shadow-sm)";
                    }}
                  >
                    {/* Top */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                      <div>
                        {item.companyUrl ? (
                          <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="label"
                            style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--text-3)", textDecoration: "none", marginBottom: "0.375rem", transition: "color var(--dur-fast) ease" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                          >
                            {item.company}<span style={{ opacity: 0.5, fontSize: "9px" }}>↗</span>
                          </a>
                        ) : (
                          <p className="label" style={{ marginBottom: "0.375rem" }}>{item.company}</p>
                        )}
                        <h2 className="heading-card" style={{ color: "var(--text-1)" }}>{item.role}</h2>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", padding: "3px 10px",
                          borderRadius: "99px", fontSize: "10px", fontWeight: 700,
                          letterSpacing: "0.05em", textTransform: "uppercase",
                          background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`,
                          fontFamily: "var(--font-mono)",
                        }}>
                          {item.type}
                        </span>
                        <span className="mono" style={{ color: "var(--text-3)", textAlign: "right" }}>
                          {formatDate(item.startDate)} → {formatDate(item.endDate)}
                        </span>
                      </div>
                    </div>

                    {item.description && !item.description.startsWith("TODO") && (
                      <p className="body-sm" style={{ marginBottom: "1.25rem", maxWidth: "52ch" }}>{item.description}</p>
                    )}

                    {realHighlights.length > 0 && (
                      <ul style={{ listStyle: "none", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {realHighlights.map((h, j) => (
                          <li key={j} className="body-sm" style={{
                            display: "flex", gap: "0.75rem",
                            padding: "0.5rem 0.75rem",
                            background: "var(--surface-3)",
                            borderRadius: "var(--radius)",
                            border: "1px solid var(--border)",
                          }}>
                            <span style={{ color: tc.color, flexShrink: 0, marginTop: "0.1rem", fontSize: "12px" }}>▹</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {(item.tech ?? []).length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                        {(item.tech ?? []).map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
