/**
 * Header — Server Component shell
 */
import Link from "next/link";
import { Navigation } from "./Navigation";
// import { ThemeToggle } from "@/components/ui/ThemeToggle"; // light mode disabled

export function Header() {
  return (
    <header id="site-header" role="banner">
      <style>{`
        .wordmark {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          opacity: 1;
          transition: opacity var(--dur-fast) ease;
        }
        .wordmark:hover {
          opacity: 0.65;
        }
        .wordmark:hover .wordmark-text {
          color: var(--accent);
        }
        .wordmark-text {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-1);
          transition: color var(--dur-fast) ease;
        }
      `}</style>
      <div className="container h-full flex items-center justify-between">
        {/* Wordmark — clean, no decoration */}
        <Link
          href="/"
          aria-label="Shlok Modanwal — home"
          className="wordmark"
        >
          <span className="wordmark-text">
            Shlok
          </span>
        </Link>

        {/* Right side: nav (theme toggle disabled) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Navigation />
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
