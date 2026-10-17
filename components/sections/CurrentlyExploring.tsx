// CurrentlyExploring — Server Component

const items = [
  {
    title: "Large Language Models",
    description:
      "Exploring fine-tuning techniques and LLM application architectures.",
  },
  {
    title: "Systems Design",
    description:
      "Studying distributed systems patterns and scalability fundamentals.",
  },
  {
    title: "Open Source Contribution",
    description: "Contributing to developer tools and AI/ML libraries.",
  },
];

export function CurrentlyExploring() {
  return (
    <section
      id="exploring"
      className="section"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
      aria-labelledby="exploring-heading"
    >
      <div className="container">
        <div style={{ maxWidth: "52rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <p className="label" style={{ marginBottom: "0.875rem" }}>
                Right Now
              </p>
              <h2
                id="exploring-heading"
                className="heading-sec"
                style={{ color: "var(--text-1)" }}
              >
                Currently Exploring
              </h2>
            </div>
          </div>

          <ul style={{ listStyle: "none" }}>
            {items.map((item, i) => (
              <li
                key={item.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5rem 1fr",
                  gap: "1.25rem",
                  padding: "1.375rem 0",
                  borderBottom:
                    i < items.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "start",
                }}
              >
                <span
                  className="mono"
                  style={{
                    color: "var(--text-3)",
                    paddingTop: "0.15rem",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "var(--text-base)",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--text-1)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="body-sm">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
