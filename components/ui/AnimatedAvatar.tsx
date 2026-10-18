"use client";

/**
 * AnimatedAvatar — Dramatic editorial portrait
 * ─────────────────────────────────────────────
 * Large, background-removed portrait positioned to bleed off the right edge,
 * inspired by the D.Nova editorial hero style.
 *
 * Animations:
 *   ✅ Real blinking via frame swap (open → closed eyes)
 *   ✅ Cursor-responsive parallax (translate + subtle tilt)
 *   ✅ Gentle idle breathing animation
 *   ✅ Smooth entrance (fade + rise)
 *   ✅ prefers-reduced-motion respected
 *   ✅ Tab visibility pause
 *   ✅ Touch device: cursor tracking disabled
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Config ─────────────────────────────────────────────────────────
const TILT_MAX         = 2.5;
const SHIFT_MAX        = 8;
const TRACK_RADIUS     = 600;
const BLINK_MIN        = 2500;
const BLINK_MAX        = 6000;
const BLINK_DURATION   = 150;

export function AnimatedAvatar() {
  const prefersReduced = useReducedMotion();
  const containerRef   = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch]     = useState(false);
  const [visible, setVisible]     = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [parallax, setParallax]   = useState({ x: 0, y: 0, rx: 0, ry: 0 });

  // Touch detection
  useEffect(() => { setIsTouch(window.matchMedia("(pointer: coarse)").matches); }, []);

  // Tab visibility
  useEffect(() => {
    const h = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);

  // Blinking loop
  useEffect(() => {
    if (prefersReduced || !visible) return;
    let timeout: ReturnType<typeof setTimeout>;
    function schedule() {
      const delay = BLINK_MIN + Math.random() * (BLINK_MAX - BLINK_MIN);
      timeout = setTimeout(() => {
        setIsBlinking(true);
        const isDouble = Math.random() < 0.2;
        setTimeout(() => {
          setIsBlinking(false);
          if (isDouble) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => { setIsBlinking(false); schedule(); }, BLINK_DURATION);
            }, 120);
          } else { schedule(); }
        }, BLINK_DURATION);
      }, delay);
    }
    timeout = setTimeout(schedule, 1500);
    return () => clearTimeout(timeout);
  }, [prefersReduced, visible]);

  // Cursor tracking
  useEffect(() => {
    if (isTouch || prefersReduced) return;
    function onMove(e: MouseEvent) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > TRACK_RADIUS) { setParallax({ x: 0, y: 0, rx: 0, ry: 0 }); return; }
      const f = 1 - (dist / TRACK_RADIUS) * 0.3;
      const nx = (dx / TRACK_RADIUS) * f;
      const ny = (dy / TRACK_RADIUS) * f;
      setParallax({ x: nx * SHIFT_MAX, y: ny * SHIFT_MAX * 0.4, rx: -ny * TILT_MAX, ry: nx * TILT_MAX });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch, prefersReduced]);

  const animate = visible && !prefersReduced;

  return (
    <motion.div
      ref={containerRef}
      role="img"
      aria-label="Illustrated portrait of Shlok Modanwal"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="hero-avatar-wrapper"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      {/* ── Ambient glow behind the face ───────────────────────── */}
      <div aria-hidden style={{
        position: "absolute",
        top: "10%", left: "15%",
        width: "70%", height: "60%",
        borderRadius: "9999px",
        background: "radial-gradient(ellipse at center, rgba(96,165,250,0.10) 0%, rgba(167,139,250,0.06) 40%, transparent 70%)",
        filter: "blur(40px)",
        animation: animate ? "av-glow 6s ease-in-out infinite" : "none",
        pointerEvents: "none",
      }} />

      {/* ── Portrait with parallax + breathing ──────────────────── */}
      <motion.div
        animate={prefersReduced ? {} : {
          x: parallax.x,
          y: parallax.y,
          rotateX: parallax.rx,
          rotateY: parallax.ry,
        }}
        transition={{ type: "spring", stiffness: 55, damping: 16, mass: 0.8 }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          perspective: 900,
          willChange: "transform",
          animation: animate ? "av-breathe 7s ease-in-out infinite" : "none",
          // CSS mask creates a natural vignette — edges fade to transparent
          // No hard boundaries, no overlay divs needed
          WebkitMaskImage: "radial-gradient(ellipse 65% 70% at 55% 35%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 55%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 65% 70% at 55% 35%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 55%, transparent 80%)",
        }}
      >
        {/* Open-eyes frame */}
        <Image
          src="/images/shlok-avatar.png"
          alt="Shlok Modanwal"
          width={700}
          height={933}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            opacity: isBlinking ? 0 : 1,
            transition: "opacity 0.04s ease",
          }}
        />
        {/* Blink frame overlay */}
        <Image
          src="/images/shlok-avatar-blink.png"
          alt=""
          aria-hidden="true"
          width={700}
          height={933}
          priority
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            opacity: isBlinking ? 1 : 0,
            transition: "opacity 0.04s ease",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ── Keyframes ──────────────────────────────────────────── */}
      <style>{`
        @keyframes av-breathe {
          0%, 100% { transform: translateY(0px) scale(1); }
          35%      { transform: translateY(-5px) scale(1.006); }
          65%      { transform: translateY(-2px) scale(1.002); }
        }
        @keyframes av-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.06); }
        }
      `}</style>
    </motion.div>
  );
}

