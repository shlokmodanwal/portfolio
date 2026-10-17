"use client";
// StatsStrip — cinematic quick-facts bar

const stats = [
  { value: "4+",    label: "Projects",         color: "#93c5fd", glow: "rgba(96,165,250,0.12)"  },
  { value: "3rd",   label: "Year B.Tech CSE",  color: "#c4b5fd", glow: "rgba(167,139,250,0.12)" },
  { value: "MMMUT", label: "Gorakhpur, UP",    color: "#86efac", glow: "rgba(74,222,128,0.10)"  },
  { value: "Open",  label: "To Opportunities", color: "#fde68a", glow: "rgba(251,191,36,0.10)"  },
];

export function StatsStrip() {
  return (
    <section
      aria-label="Quick facts"
      style={{
        borderTop: "1px solid var(--border-strong)",
        borderBottom: "1px solid var(--border-strong)",
        background: "linear-gradient(180deg, var(--surface) 0%, rgba(10,10,10,0.6) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.02) 25%, rgba(167,139,250,0.02) 50%, rgba(74,222,128,0.02) 75%, transparent 100%)",
      }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <dl
          id="stats-dl"
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "clamp(1.25rem,4vw,2rem) clamp(0.75rem, 3vw, 1.75rem)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                position: "relative",
                transition: "background var(--dur-mid) ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = stat.glow; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <dd style={{
                fontSize: "clamp(1.375rem, 3.5vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: stat.color,
                lineHeight: 1,
                textShadow: `0 0 20px ${stat.glow}`,
              }}>
                {stat.value}
              </dd>
              <dt className="label">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
