"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { sortedAchievements } from "@/data/achievements";

const typeConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  award:         { label: "Award",       color: "#fde68a", bg: "rgba(251,191,36,0.08)",   border: "rgba(251,191,36,0.2)"  },
  certification: { label: "Cert",        color: "#86efac", bg: "rgba(74,222,128,0.08)",   border: "rgba(74,222,128,0.2)"  },
  publication:   { label: "Paper",       color: "#93c5fd", bg: "rgba(96,165,250,0.08)",   border: "rgba(96,165,250,0.2)"  },
  "open-source": { label: "Open Source", color: "#c4b5fd", bg: "rgba(167,139,250,0.08)",  border: "rgba(167,139,250,0.2)" },
  speaking:      { label: "Talk",        color: "#f9a8d4", bg: "rgba(244,114,182,0.08)",  border: "rgba(244,114,182,0.2)" },
  competition:   { label: "Competition", color: "#fed7aa", bg: "rgba(251,146,60,0.08)",   border: "rgba(251,146,60,0.2)"  },
  other:         { label: "Other",       color: "#a1a1aa", bg: "rgba(161,161,170,0.08)",  border: "rgba(161,161,170,0.2)" },
};

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="section"
      style={{
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="achievements-heading"
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0,
        width: "50%", height: "50%",
        background: "radial-gradient(ellipse at top right, rgba(251,191,36,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading label="Recognition" title="Achievements" />

        <div style={{ display: "grid", gap: "0.75rem", maxWidth: "56rem" }}>
          {sortedAchievements.map((achievement, i) => {
            const cfg = typeConfig[achievement.type] ?? typeConfig["other"];
            return (
              <AnimatedSection key={achievement.id} delay={i * 0.05}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    background: "linear-gradient(145deg, var(--surface) 0%, rgba(19,19,22,0.6) 100%)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-sm)",
                    transition: "border-color var(--dur-mid) ease, box-shadow var(--dur-mid) ease, transform var(--dur-mid) ease",
                    alignItems: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = cfg.border;
                    el.style.boxShadow = `var(--shadow-md), 0 0 0 1px ${cfg.border} inset`;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border-strong)";
                    el.style.boxShadow = "var(--shadow-sm)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Type badge column */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    minWidth: "70px",
                    paddingTop: "2px",
                  }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "3px 8px",
                        borderRadius: "99px",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                        fontFamily: "var(--font-mono)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cfg.label}
                    </span>
                    <span
                      className="mono"
                      style={{ color: "var(--text-3)", fontSize: "9px", textAlign: "center" }}
                    >
                      {achievement.date.slice(0, 7)}
                    </span>
                  </div>

                  {/* Content column */}
                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                        color: "var(--text-1)",
                        marginBottom: "0.25rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {achievement.title}
                    </h3>

                    {achievement.issuer && (
                      <p className="body-sm" style={{ color: "var(--text-3)", marginBottom: "0.375rem" }}>
                        {achievement.issuer}
                      </p>
                    )}

                    {achievement.description && (
                      <p className="body-sm" style={{ lineHeight: 1.65, marginBottom: "0.5rem" }}>
                        {achievement.description}
                      </p>
                    )}

                    {achievement.url && achievement.url !== "#" && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: cfg.color,
                          textDecoration: "none",
                          letterSpacing: "0.03em",
                          transition: "opacity var(--dur-fast) ease",
                          opacity: 0.85,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                      >
                        View credential ↗
                      </a>
                    )}
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
