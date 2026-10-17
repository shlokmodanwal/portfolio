// ── Skills Section — stub ─────────────────────────────────────
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="section container"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        className="heading-sec"
        style={{ color: "var(--text-1)", marginBottom: "0.5rem" }}
      >
        Skills
      </h2>
      <p className="body-sm" style={{ color: "var(--text-3)" }}>
        {skillGroups.length} category groups
      </p>
    </section>
  );
}
