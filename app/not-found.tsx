import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="section container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "60dvh",
      }}
    >
      <p className="label" style={{ marginBottom: "1.25rem" }}>404</p>
      <h1
        className="heading-page"
        style={{ color: "var(--text-1)", marginBottom: "1.25rem" }}
      >
        Page not found.
      </h1>
      <p
        className="body"
        style={{ maxWidth: "38ch", marginBottom: "2.5rem" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-ghost">
        ← Back to home
      </Link>
    </section>
  );
}
