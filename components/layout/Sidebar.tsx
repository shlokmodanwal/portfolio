"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code2, Briefcase, Award, Mail, FileText, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { links } from "@/data/links";

const MAIN_LINKS = [
  { href: "/",               label: "Home",           Icon: Home,      num: 1 },
  { href: "/projects",       label: "Projects",       Icon: Code2,     num: 2 },
  { href: "/experience",     label: "Experience",     Icon: Briefcase, num: 3 },
  { href: "/certifications", label: "Certifications", Icon: Award,     num: 4 },
] as const;

const MORE_LINKS = [
  { href: "/contact",     label: "Contact", Icon: Mail,     num: 5 },
  { href: links.resume,   label: "Resume",  Icon: FileText, num: 6, external: true },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavItem({ href, label, Icon, num, external, onNav }: {
  href: string; label: string; Icon: React.ElementType;
  num: number; external?: boolean; onNav?: () => void;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, href);
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={onNav}
        style={{
          display: "flex", alignItems: "center", gap: "0.625rem",
          padding: "0.45rem 0.625rem", borderRadius: "8px",
          textDecoration: "none",
          background: active ? "rgba(255,255,255,0.07)" : "transparent",
          transition: "background var(--dur-fast) ease",
          userSelect: "none",
        }}
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        <Icon size={15} strokeWidth={active ? 2 : 1.5} style={{ color: active ? "var(--text-1)" : "var(--text-3)", flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: "13.5px", fontWeight: active ? 500 : 400, color: active ? "var(--text-1)" : "var(--text-2)", letterSpacing: "-0.01em", lineHeight: 1 }}>
          {label}
        </span>
        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-4)", letterSpacing: "0.02em" }}>
          {num}
        </span>
      </Link>
    </li>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "11px", fontWeight: 500, color: "var(--text-4)", paddingLeft: "0.625rem", marginBottom: "0.375rem", marginTop: "1.75rem" }}>
      {children}
    </p>
  );
}

function SidebarContent({ onNav }: { onNav?: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.375rem 0.875rem" }}>
      {/* Logo */}
      <div style={{ marginBottom: "2rem", paddingLeft: "0.625rem" }}>
        <Link href="/" onClick={onNav} style={{ textDecoration: "none", display: "inline-block" }}>
          <span style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.02em", display: "block" }}>
            Shlok
          </span>
          <svg width="52" height="9" viewBox="0 0 52 9" fill="none" aria-hidden style={{ display: "block", marginTop: "2px" }}>
            <path d="M2 7C9 3.5 18 2 26 3.5C34 5 42 5.5 50 3" stroke="var(--text-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Main nav */}
      <nav aria-label="Main navigation" style={{ flex: 1 }}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
          {MAIN_LINKS.map((item) => <NavItem key={item.href} {...item} onNav={onNav} />)}
        </ul>
        <SectionLabel>More</SectionLabel>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
          {MORE_LINKS.map((item) => <NavItem key={item.href} {...(item as any)} onNav={onNav} />)}
        </ul>
      </nav>

      {/* Bottom */}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{ fontSize: "10.5px", fontFamily: "var(--font-mono)", color: "var(--text-4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          shlok@dev
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => { close(); }, [pathname, close]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, close]);

  return (
    <>
      {/* Desktop sidebar — hidden on desktop, only mobile uses it */}
      <aside className="sidebar-desktop" aria-label="Site navigation"
        style={{ display: "none" }}>
        <SidebarContent />
      </aside>

      {/* Mobile hamburger — hidden; mobile nav is handled by Navigation.tsx header */}
      <button type="button" onClick={() => setOpen(true)} aria-label="Open navigation" className="sidebar-mobile-trigger"
        style={{ display: "none" }}>
        <Menu size={16} strokeWidth={1.5} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <>
          <div onClick={close} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 160, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }} />
          <aside id="mobile-sidebar" role="dialog" aria-modal="true" aria-label="Navigation menu"
            style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: "260px", zIndex: 170, background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", animation: "sidebarSlideIn 0.25s cubic-bezier(0.16,1,0.3,1) both" }}>
            <button type="button" onClick={close} aria-label="Close menu"
              style={{ position: "absolute", top: "0.875rem", right: "0.875rem", background: "none", border: "1px solid var(--border-strong)", borderRadius: "6px", padding: "0.3rem", color: "var(--text-2)", cursor: "pointer", display: "flex" }}>
              <X size={15} strokeWidth={1.5} />
            </button>
            <SidebarContent onNav={close} />
          </aside>
        </>
      )}
    </>
  );
}
