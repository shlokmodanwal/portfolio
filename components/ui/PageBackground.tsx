"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LightRays = dynamic(() => import("@/components/ui/LightRays"), { ssr: false });

interface PageBackgroundProps {
  raysColor?: string;
  glowTopLeft?: string;
  glowTopRight?: string;
  glowBottomLeft?: string;
  showGrid?: boolean;
  opacity?: number;
}

export function PageBackground({
  raysColor = "#60a5fa",
  glowTopLeft = "rgba(96,165,250,0.05)",
  glowTopRight = "rgba(167,139,250,0.05)",
  glowBottomLeft = "rgba(74,222,128,0.03)",
  showGrid = true,
  opacity = 0.28,
}: PageBackgroundProps) {
  // Only render WebGL LightRays on non-touch / non-mobile devices
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {/* LightRays — desktop only (WebGL not performant on mobile) */}
      {isDesktop && (
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
      )}

      {/* Ambient glow blobs — always visible, very light on mobile */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-5%", left: "-5%",
          width: "60%", height: "55%",
          borderRadius: "9999px",
          background: `radial-gradient(ellipse at center, ${glowTopLeft} 0%, transparent 70%)`,
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "-10%",
          width: "50%", height: "55%",
          borderRadius: "9999px",
          background: `radial-gradient(ellipse at center, ${glowTopRight} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "20%",
          width: "45%", height: "45%",
          borderRadius: "9999px",
          background: `radial-gradient(ellipse at center, ${glowBottomLeft} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }} />

        {/* Grid lines — desktop only */}
        {showGrid && [20, 40, 60, 80].map((x) => (
          <div key={x} style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${x}%`, width: "1px",
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.025) 30%, rgba(255,255,255,0.025) 70%, transparent)",
          }} className="hidden-on-mobile" />
        ))}
        {showGrid && [33, 66].map((y) => (
          <div key={y} style={{
            position: "absolute", left: 0, right: 0,
            top: `${y}%`, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.02) 70%, transparent)",
          }} className="hidden-on-mobile" />
        ))}
      </div>
    </>
  );
}
