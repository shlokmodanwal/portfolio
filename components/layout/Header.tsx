/**
 * Header — Server Component shell
 */
import Link from "next/link";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header id="site-header" role="banner">
      <div className="container h-full flex items-center justify-between">
        {/* Wordmark — clean, no decoration */}
        <Link
          href="/"
          aria-label="Shlok Modanwal — home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--text-1)",
              transition: "color var(--dur-fast) ease",
            }}
          >
            Shlok
          </span>
        </Link>

        {/* Right side: nav + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
