"use client";

import dynamic from "next/dynamic";

// Dynamically import LightRays so it only runs on the client (it uses WebGL)
const LightRays = dynamic(() => import("@/components/ui/LightRays"), { ssr: false });

interface PageBackgroundProps {
  raysColor?: string;
  glowTopLeft?: string;
  glowTopRight?: string;
  glowBottomLeft?: string;
  showGrid?: boolean;
  opacity?: number;
}

/**
 * Shared background decoration used across every page.
 * Adds the same LightRays WebGL effect + ambient glow blobs as the Hero section.
 */
export function PageBackground({
  raysColor = "#60a5fa",
  glowTopLeft = "rgba(96,165,250,0.05)",
  glowTopRight = "rgba(167,139,250,0.05)",
  glowBottomLeft = "rgba(74,222,128,0.03)",
  showGrid = true,
  opacity = 0.28,
}: PageBackgroundProps) {
  return (
    <>
      {/* ── LightRays WebGL background ────────────────────────── */}
      <LightRays
        raysOrigin="top-center"
        raysColor={raysColor}
        raysSpeed={0.5}
        lightSpread={1.1}
        rayLength={1.6}
        fadeDistance={1.3}
        saturation={0.8}
        mouseInfluence={0.08}
        followMouse
        pulsating={false}
        style={{ opacity, zIndex: 0, position: "fixed", inset: 0, pointerEvents: "none" }}
      />

      {/* ── Ambient glow blobs ───────────────────────────────── */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Top-left blue */}
        <div style={{
          position: "absolute", top: "-5%", left: "-5%",
          width: "50%", height: "50%",
          borderRadius: "9999px",
          background: `radial-gradient(ellipse at center, ${glowTopLeft} 0%, transparent 70%)`,
          filter: "blur(70px)",
        }} />
        {/* Top-right purple */}
        <div style={{
          position: "absolute", top: "10%", right: "-10%",
          width: "45%", height: "50%",
          borderRadius: "9999px",
          background: `radial-gradient(ellipse at center, ${glowTopRight} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }} />
        {/* Bottom-left green */}
        <div style={{
          position: "absolute", bottom: "5%", left: "20%",
          width: "40%", height: "40%",
          borderRadius: "9999px",
          background: `radial-gradient(ellipse at center, ${glowBottomLeft} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }} />

        {/* Subtle grid lines */}
        {showGrid && [20, 40, 60, 80].map((x) => (
          <div key={x} style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${x}%`, width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.03) 70%, transparent)",
          }} />
        ))}
        {showGrid && [33, 66].map((y) => (
          <div key={y} style={{
            position: "absolute", left: 0, right: 0,
            top: `${y}%`, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.025) 30%, rgba(255,255,255,0.025) 70%, transparent)",
          }} />
        ))}
      </div>
    </>
  );
}
