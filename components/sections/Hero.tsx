"use client";

import { motion } from "motion/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import BlurText from "@/components/ui/BlurText";
import { GreetingText } from "@/components/ui/GreetingText";
import { links } from "@/data/links";
import { cn } from "@/lib/utils";

// Dynamically import LightRays so it only runs on the client (it uses WebGL)
const LightRays = dynamic(() => import("@/components/ui/LightRays"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number, y = 16) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-name"
      style={{
        position: "relative",
        minHeight: "calc(100dvh - var(--header-height))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ── LightRays WebGL background ──────────────────────── */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#60a5fa"
        raysSpeed={0.6}
        lightSpread={1.2}
        rayLength={1.8}
        fadeDistance={1.2}
        saturation={0.85}
        mouseInfluence={0.12}
        followMouse
        pulsating={false}
        style={{ opacity: 0.38, zIndex: 0 }}
      />

      {/* ── Ambient glow blobs ─────────────────────────────── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {/* Blue top-left */}
        <div style={{
          position: "absolute", top: "-10%", left: "-5%",
          width: "55%", height: "55%",
          borderRadius: "9999px",
          background: "radial-gradient(ellipse at center, rgba(96,165,250,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        {/* Purple right */}
        <div style={{
          position: "absolute", top: "20%", right: "-10%",
          width: "45%", height: "50%",
          borderRadius: "9999px",
          background: "radial-gradient(ellipse at center, rgba(167,139,250,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        {/* Subtle center bloom */}
        <div style={{
          position: "absolute", bottom: "10%", left: "30%",
          width: "40%", height: "40%",
          borderRadius: "9999px",
          background: "radial-gradient(ellipse at center, rgba(74,222,128,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />

        {/* Grid lines */}
        {[20, 40, 60, 80].map((x) => (
          <div key={x} style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${x}%`, width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 70%, transparent)",
          }} />
        ))}
        {[33, 66].map((y) => (
          <div key={y} style={{
            position: "absolute", left: 0, right: 0,
            top: `${y}%`, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent)",
          }} />
        ))}
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "clamp(4rem,10vw,8rem)",
          paddingBottom: "clamp(4rem,10vw,8rem)",
        }}
      >

        {/* Hero greeting — auto updates with time of day */}
        <motion.h1
          id="hero-name"
          {...fadeUp(0.06)}
          style={{ marginBottom: "clamp(1rem,3vw,1.5rem)" }}
        >
          <GreetingText />
        </motion.h1>

        {/* Headline */}
        <div style={{ marginBottom: "clamp(1rem,3vw,1.75rem)" }}>
          <div style={{ color: "var(--text-2)" }}>
            <BlurText
              text="Full-stack engineer. AI/ML enthusiast. Builder."
              delay={60}
              animateBy="words"
              direction="bottom"
              stepDuration={0.4}
              className={cn(
                "font-[450] leading-snug tracking-tight",
                "text-[clamp(1.05rem,2.4vw,1.75rem)]"
              )}
            />
          </div>
        </div>

        {/* Description */}
        <motion.p
          {...fadeUp(0.32)}
          style={{
            maxWidth: "40ch",
            marginBottom: "clamp(2rem,5vw,3rem)",
            fontSize: "var(--text-base)",
            lineHeight: 1.75,
            color: "var(--text-3)",
          }}
        >
          3rd-year CSE student at MMMUT building real products — from ML
          platforms and GovTech apps to e-commerce systems. Currently open
          to internships and developer roles.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.44)}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}
        >
          <Link href="/projects" className="btn btn-primary">
            View Work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            style={{ paddingInline: "0.375rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            Resume
            <span aria-hidden style={{ fontSize: "10px", opacity: 0.5 }}>↗</span>
          </a>
        </motion.div>

        {/* ── Stats row ──────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.58)}
          className="hero-stats"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0",
            marginTop: "clamp(2.5rem,6vw,4rem)",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            maxWidth: "36rem",
          }}
        >
          {[
            { value: "4+", label: "Projects shipped" },
            { value: "7+", label: "Certifications" },
            { value: "3rd", label: "Year B.Tech CSE" },
            { value: "Open", label: "To internships" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: "1 1 7rem",
                padding: "1rem clamp(0.75rem, 2vw, 1.25rem) 1rem 0",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
                paddingLeft: i > 0 ? "clamp(0.75rem, 2vw, 1.25rem)" : "0",
              }}
            >
              <div style={{
                fontSize: "clamp(1.125rem,3vw,1.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--text-1)",
                lineHeight: 1.1,
                marginBottom: "0.25rem",
              }}>
                {s.value}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

