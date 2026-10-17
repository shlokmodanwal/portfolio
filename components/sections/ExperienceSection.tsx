"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { sortedExperience } from "@/data/experience";
import { formatDateRange } from "@/lib/utils";

const typeColors: Record<string, { color: string; bg: string; border: string }> = {
  "internship": { color: "#93c5fd", bg: "rgba(96,165,250,0.08)",   border: "rgba(96,165,250,0.2)"  },
  "part-time":  { color: "#86efac", bg: "rgba(74,222,128,0.08)",   border: "rgba(74,222,128,0.2)"  },
  "full-time":  { color: "#c4b5fd", bg: "rgba(167,139,250,0.08)",  border: "rgba(167,139,250,0.2)" },
  "freelance":  { color: "#fde68a", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.2)"  },
  "contract":   { color: "#fde68a", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.2)"  },
};

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section"
      style={{
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="experience-heading"
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "70%", height: "40%",
        background: "radial-gradient(ellipse at top, rgba(96,165,250,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading label="Career" title="Experience" />

        <div style={{ maxWidth: "56rem" }}>
          {sortedExperience.map((exp, i) => {
            const tc = typeColors[exp.type] ?? typeColors["internship"];
            const isLast = i === sortedExperience.length - 1;

            return (
              <AnimatedSection key={exp.id} delay={i * 0.07}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "0 1.75rem",
                }}>
                  {/* Timeline spine */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px" }}>
                    <div style={{
                      width: "10px", height: "10px",
                      borderRadius: "50%",
                      background: tc.color,
                      boxShadow: `0 0 8px ${tc.color}`,
                      flexShrink: 0,
                      border: "2px solid var(--bg)",
                      outline: `2px solid ${tc.border}`,
                      zIndex: 1,
                    }} />
                    {!isLast && (
                      <div style={{
                        width: "1px",
                        flex: 1,
                        minHeight: "2rem",
                        background: `linear-gradient(180deg, ${tc.border} 0%, var(--border) 100%)`,
                        margin: "4px 0",
                      }} />
                    )}
                  </div>

                  {/* Card */}
                  <div style={{ paddingBottom: isLast ? 0 : "2rem" }}>
                    <div
                      style={{
                        padding: "1.375rem 1.625rem",
                        background: "linear-gradient(145deg, var(--surface) 0%, rgba(19,19,22,0.6) 100%)",
                        border: "1px solid var(--border-strong)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-sm)",
                        transition: "border-color var(--dur-mid) ease, box-shadow var(--dur-mid) ease",
                        marginBottom: "0.75rem",
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
                      {/* Top: company + type badge + dates */}
                      <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "1rem",
                        flexWrap: "wrap",
                        marginBottom: "0.875rem",
                      }}>
                        <div>
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="label"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.2rem",
                                marginBottom: "0.3rem",
                                color: "var(--text-3)",
                                textDecoration: "none",
                                transition: "color var(--dur-fast) ease",
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                            >
                              {exp.company} <span style={{ fontSize: "9px" }}>↗</span>
                            </a>
                          ) : (
                            <p className="label" style={{ marginBottom: "0.3rem" }}>{exp.company}</p>
                          )}
                          <h3 className="heading-card" style={{ color: "var(--text-1)" }}>{exp.role}</h3>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem", flexShrink: 0 }}>
                          <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px 9px",
                            borderRadius: "99px",
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                            background: tc.bg,
                            color: tc.color,
                            border: `1px solid ${tc.border}`,
                            fontFamily: "var(--font-mono)",
                          }}>
                            {exp.type}
                          </span>
                          <span className="mono" style={{ color: "var(--text-3)", textAlign: "right" }}>
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="body-sm" style={{ marginBottom: "1rem", maxWidth: "50ch" }}>{exp.description}</p>
                      )}

                      {exp.highlights.filter(h => !h.startsWith("TODO")).length > 0 && (
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                          {exp.highlights.filter(h => !h.startsWith("TODO")).map((h, j) => (
                            <li key={j} className="body-sm" style={{
                              display: "flex", gap: "0.625rem",
                              padding: "0.375rem 0.625rem",
                              background: "rgba(255,255,255,0.02)",
                              borderRadius: "var(--radius)",
                              border: "1px solid rgba(255,255,255,0.04)",
                            }}>
                              <span style={{ color: tc.color, flexShrink: 0, fontSize: "10px", lineHeight: "1.6" }}>▹</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {(exp.tech ?? []).length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                          {(exp.tech ?? []).map(t => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
