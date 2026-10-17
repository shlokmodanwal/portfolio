import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { PageBackground } from "@/components/ui/PageBackground";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Shlok Modanwal — Computer Science Engineer, MMMUT.",
  path: "/about",
});

const stack = ["TypeScript", "React", "Next.js", "Node.js", "Python", "FastAPI", "PostgreSQL", "Docker"];

const values = [
  { icon: "⚡", title: "Performance first", desc: "Every ms matters. I build interfaces that feel instantaneous." },
  { icon: "🎯", title: "Purposeful design",  desc: "Clean code and clean UI are inseparable. One demands the other." },
  { icon: "🧠", title: "Curious by default", desc: "I learn by building. Every side project teaches something real." },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "calc(100dvh - var(--header-height))", position: "relative", overflow: "hidden" }}>

      {/* LightRays + ambient glow background */}
      <PageBackground raysColor="#a78bfa" opacity={0.2} glowTopLeft="rgba(96,165,250,0.05)" glowTopRight="rgba(167,139,250,0.06)" />

      {/* Hero banner */}
      <div style={{ position: "relative", zIndex: 1, borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, rgba(19,19,22,0.9) 0%, rgba(10,10,10,0.2) 100%)" }}>
        <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="section-label-line" style={{ marginBottom: "1.5rem" }}>
            <span className="label">About Me</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.0, marginBottom: "1.75rem" }}>
            <span style={{ color: "var(--text-1)", display: "block" }}>Engineer.</span>
            <span style={{ display: "block", background: "linear-gradient(135deg, var(--text-2) 0%, var(--text-3) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Builder. Learner.
            </span>
          </h1>
          <p className="body-lg" style={{ maxWidth: "46ch", marginBottom: "1.25rem" }}>
            I&rsquo;m Shlok Modanwal — a CS student at MMMUT, Gorakhpur,
            building products at the intersection of solid engineering and thoughtful design.
          </p>
          <p className="body" style={{ maxWidth: "46ch", color: "var(--text-3)" }}>
            I work primarily with TypeScript, React, and Python — crafting full-stack
            applications and experimenting with AI/ML systems.
          </p>
        </div>
      </div>

      {/* Value cards */}
      <div style={{ position: "relative", zIndex: 1, borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <p className="label" style={{ marginBottom: "2rem" }}>What I care about</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {values.map((v) => (
              <div
                key={v.title}
                className="card"
                style={{ padding: "1.5rem" }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.875rem" }}>{v.icon}</div>
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 600, color: "var(--text-1)", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                  {v.title}
                </h3>
                <p className="body-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stack */}
      <div style={{ position: "relative", zIndex: 1, borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <p className="label" style={{ marginBottom: "1.75rem" }}>Primary stack</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {stack.map((s, i) => (
              <span
                key={s}
                className="tag"
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "var(--text-sm)",
                  background: i === 0 ? "rgba(96,165,250,0.08)" : "rgba(255,255,255,0.03)",
                  borderColor: i === 0 ? "rgba(96,165,250,0.25)" : "var(--border-strong)",
                  color: i === 0 ? "#93c5fd" : "var(--text-2)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick facts */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="container" style={{ paddingTop: "4rem", paddingBottom: "5rem", maxWidth: "54rem" }}>
          <p className="label" style={{ marginBottom: "1.75rem" }}>Quick facts</p>
          {[
            { label: "Currently", value: "3rd Year B.Tech CSE · MMMUT, Gorakhpur" },
            { label: "Focus",     value: "Full-Stack · AI/ML · System Design" },
            { label: "Status",    value: "Open to internships & collaborations" },
            { label: "Location",  value: "Gorakhpur, Uttar Pradesh, India" },
          ].map(({ label, value }, i, arr) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "9rem 1fr",
                gap: "1.5rem",
                padding: "1.25rem 0.75rem",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}
              className="exp-grid"
            >
              <span className="label" style={{ paddingTop: "0.1rem", color: "var(--text-3)" }}>{label}</span>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-1)", fontWeight: 450 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
