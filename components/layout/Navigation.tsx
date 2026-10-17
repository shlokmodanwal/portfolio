"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Home, Code2, Briefcase, Award, Mail, ArrowUpRight } from "lucide-react";
import { links } from "@/data/links";

const NAV_LINKS = [
  { href: "/projects",       label: "Projects"      },
  { href: "/experience",     label: "Experience"    },
  { href: "/certifications", label: "Certifications"},
  { href: "/contact",        label: "Contact"       },
] as const;

// Mobile sidebar links with icons + numbers
const MOBILE_MAIN = [
  { href: "/",               label: "Home",           Icon: Home,     num: 1 },
  { href: "/projects",       label: "Projects",       Icon: Code2,    num: 2 },
  { href: "/experience",     label: "Experience",     Icon: Briefcase,num: 3 },
  { href: "/certifications", label: "Certifications", Icon: Award,    num: 4 },
  { href: "/contact",        label: "Contact",        Icon: Mail,     num: 5 },
] as const;

type NavHref = (typeof NAV_LINKS)[number]["href"];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface BracketRect { left: number; top: number; width: number; height: number; visible: boolean; }

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const navRef   = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [bracket, setBracket] = useState<BracketRect>({ left:0, top:0, width:0, height:0, visible:false });

  const snapToEl = useCallback((el: HTMLElement | null) => {
    if (!el || !navRef.current) return;
    const r = el.getBoundingClientRect();
    const n = navRef.current.getBoundingClientRect();
    setBracket({ left: r.left-n.left-5, top: r.top-n.top-5, width: r.width+10, height: r.height+10, visible: true });
  }, []);

  // Scroll-aware header
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const check = () => { if (window.scrollY > 10) header.setAttribute("data-scrolled",""); else header.removeAttribute("data-scrolled"); };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, close]);

  // Close on route change
  useEffect(() => { close(); }, [pathname, close]);

  return (
    <>
      {/* ── Desktop horizontal nav ───────────────────────────── */}
      <div className="hidden md:flex items-center gap-5">
        <div ref={navRef} style={{ position:"relative" }} onMouseLeave={() => setBracket(p => ({ ...p, visible:false }))}>
          {/* Bracket — theme aware */}
          <div aria-hidden style={{
            position:"absolute", left:bracket.left, top:bracket.top, width:bracket.width, height:bracket.height,
            opacity:bracket.visible ? 1 : 0, pointerEvents:"none",
            transition:"left 160ms cubic-bezier(0.16,1,0.3,1), top 160ms cubic-bezier(0.16,1,0.3,1), width 160ms cubic-bezier(0.16,1,0.3,1), height 160ms cubic-bezier(0.16,1,0.3,1), opacity 120ms ease",
            zIndex:0,
          }}>
            <span style={{ position:"absolute", top:0, left:0, width:"7px", height:"7px", borderTop:"1.5px solid var(--border-hover)", borderLeft:"1.5px solid var(--border-hover)" }} />
            <span style={{ position:"absolute", top:0, right:0, width:"7px", height:"7px", borderTop:"1.5px solid var(--border-hover)", borderRight:"1.5px solid var(--border-hover)" }} />
            <span style={{ position:"absolute", bottom:0, left:0, width:"7px", height:"7px", borderBottom:"1.5px solid var(--border-hover)", borderLeft:"1.5px solid var(--border-hover)" }} />
            <span style={{ position:"absolute", bottom:0, right:0, width:"7px", height:"7px", borderBottom:"1.5px solid var(--border-hover)", borderRight:"1.5px solid var(--border-hover)" }} />
          </div>
          <nav aria-label="Main navigation">
            <ul style={{ display:"flex", alignItems:"center", gap:"0.125rem", listStyle:"none", padding:0, margin:0 }} role="list">
              {NAV_LINKS.map(({ href, label }, i) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link href={href} ref={el => { itemRefs.current[i] = el; }} aria-current={active ? "page" : undefined}
                      onMouseEnter={() => snapToEl(itemRefs.current[i])}
                      style={{ display:"inline-block", padding:"0.35rem 0.75rem", fontSize:"13px", fontWeight:active?500:400, color:active?"var(--text-1)":"var(--text-3)", textDecoration:"none", transition:"color 120ms ease", letterSpacing:"0.01em", position:"relative", zIndex:2, borderRadius:"4px" }}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
          style={{ padding:"0.3rem 0.875rem", fontSize:"11.5px", letterSpacing:"0.04em" }}>
          Resume <ArrowUpRight size={11} strokeWidth={2} aria-hidden />
        </a>
      </div>

      {/* ── Mobile hamburger ─────────────────────────────────── */}
      <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu" className="md:hidden"
        style={{ background:"none", border:"1px solid var(--border)", cursor:"pointer", color:"var(--text-2)", display:"flex", alignItems:"center", padding:"0.3rem", borderRadius:"var(--radius)", transition:"border-color var(--dur-fast) ease, color var(--dur-fast) ease" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border-hover)"; (e.currentTarget as HTMLElement).style.color="var(--text-1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--text-2)"; }}>
        <Menu size={16} strokeWidth={1.5} />
      </button>

      {/* ── Mobile sidebar drawer (slides from RIGHT, sidebar style) ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
              onClick={close} aria-hidden
              style={{ position:"fixed", inset:0, zIndex:150, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)" }} />

            {/* Sidebar panel */}
            <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"
              initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
              transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
              style={{ position:"fixed", top:0, right:0, bottom:0, width:"min(300px,88vw)", zIndex:200, background:"var(--bg-2)", borderLeft:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>

              {/* Top bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.125rem 1.125rem 0.875rem", borderBottom:"1px solid var(--border)", flexShrink:0 }}>
                <Link href="/" onClick={close} style={{ fontSize:"16px", fontWeight:600, letterSpacing:"-0.01em", color:"var(--text-1)", textDecoration:"none" }}>
                  Shlok
                </Link>
                <button type="button" onClick={close} aria-label="Close menu"
                  style={{ background:"none", border:"1px solid var(--border-strong)", cursor:"pointer", color:"var(--text-2)", display:"flex", alignItems:"center", padding:"0.3rem", borderRadius:"var(--radius)" }}>
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav items — icon + label + number */}
              <nav style={{ flex:1, padding:"0.875rem 0.75rem", overflowY:"auto" }} aria-label="Mobile navigation">
                <ul role="list" style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"2px" }}>
                  {MOBILE_MAIN.map(({ href, label, Icon, num }, i) => {
                    const active = isActive(pathname, href);
                    return (
                      <motion.li key={href} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.22, delay:0.04+i*0.045, ease:[0.16,1,0.3,1] }}>
                        <Link href={href} onClick={close}
                          style={{ display:"flex", alignItems:"center", gap:"0.625rem", padding:"0.55rem 0.625rem", borderRadius:"8px", textDecoration:"none", background:active?"rgba(255,255,255,0.07)":"transparent", transition:"background var(--dur-fast) ease" }}
                          onMouseEnter={e => { if(!active)(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"; }}
                          onMouseLeave={e => { if(!active)(e.currentTarget as HTMLElement).style.background="transparent"; }}>
                          <Icon size={15} strokeWidth={active?2:1.5} style={{ color:active?"var(--text-1)":"var(--text-3)", flexShrink:0 }} />
                          <span style={{ flex:1, fontSize:"14px", fontWeight:active?500:400, color:active?"var(--text-1)":"var(--text-2)", letterSpacing:"-0.01em" }}>
                            {label}
                          </span>
                          <span style={{ fontSize:"11px", fontFamily:"var(--font-mono)", color:"var(--text-4)" }}>
                            {num}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom */}
              <div style={{ padding:"0.875rem 1.125rem 1.25rem", borderTop:"1px solid var(--border)", flexShrink:0 }}>
                <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
                  style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", fontSize:"12px", width:"100%", justifyContent:"center" }}>
                  View Resume <ArrowUpRight size={12} aria-hidden />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
