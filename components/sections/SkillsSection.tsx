"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

const categoryOrder: Record<string, number> = {
  languages:  0,
  frameworks: 1,
  tools:      2,
  platforms:  3,
  practices:  4,
  design:     5,
};

const categoryColors: Record<string, { glow: string; border: string; text: string }> = {
  languages:  { glow: "rgba(96,165,250,0.06)",   border: "rgba(96,165,250,0.15)",   text: "#93c5fd" },
  frameworks: { glow: "rgba(167,139,250,0.06)",  border: "rgba(167,139,250,0.15)",  text: "#c4b5fd" },
  tools:      { glow: "rgba(74,222,128,0.05)",   border: "rgba(74,222,128,0.12)",   text: "#86efac" },
  platforms:  { glow: "rgba(251,191,36,0.05)",   border: "rgba(251,191,36,0.12)",   text: "#fde68a" },
  practices:  { glow: "rgba(244,114,182,0.05)",  border: "rgba(244,114,182,0.12)",  text: "#f9a8d4" },
  design:     { glow: "rgba(251,146,60,0.05)",   border: "rgba(251,146,60,0.12)",   text: "#fed7aa" },
};

export function SkillsSection() {
  const sorted = [...skillGroups].sort(
    (a, b) => (categoryOrder[a.category] ?? 99) - (categoryOrder[b.category] ?? 99)
  );

  return (
    <section
      id="skills"
      className="section"
      style={{
        borderTop: "1px solid var(--border)",
        background: "linear-gradient(180deg, var(--surface) 0%, rgba(10,10,10,0.6) 100%)",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "clamp(5rem, 10vw, 8.5rem)",
      }}
      aria-labelledby="skills-heading"
    >
      {/* Section glow */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "50%",
        background: "radial-gradient(ellipse at center top, rgba(167,139,250,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeading title="Skills & Technologies" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {sorted.map((group) => {
            const colors = categoryColors[group.category] ?? categoryColors["tools"];
            return (
              <div
                key={group.category}
                style={{
                  padding: "1.5rem",
                  background: "linear-gradient(145deg, var(--surface-2) 0%, rgba(28,28,33,0.5) 100%)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "border-color var(--dur-mid) ease, box-shadow var(--dur-mid) ease, transform var(--dur-mid) ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = colors.border;
                  el.style.boxShadow = `var(--shadow-md), 0 0 0 1px ${colors.border} inset`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-strong)";
                  el.style.boxShadow = "var(--shadow-sm)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Corner glow */}
                <div aria-hidden style={{
                  position: "absolute", top: 0, right: 0,
                  width: "80px", height: "80px",
                  background: `radial-gradient(ellipse at top right, ${colors.glow} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                <h3
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: colors.text,
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{
                    display: "inline-block",
                    width: "5px", height: "5px",
                    borderRadius: "50%",
                    background: colors.text,
                    boxShadow: `0 0 6px ${colors.text}`,
                    flexShrink: 0,
                  }} />
                  {group.label}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", position: "relative", zIndex: 1 }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="tag skill-pill"
                      title={skill.level ? `Proficiency: ${skill.level}/5` : undefined}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
