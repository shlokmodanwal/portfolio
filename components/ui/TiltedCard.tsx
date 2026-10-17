"use client";

/**
 * TiltedCard — from reactbits.dev
 * https://reactbits.dev/components/tilted-card
 * Uses motion/react spring physics for 3D mouse-tracking tilt.
 * Adapted to accept React children instead of an image src.
 */

import type { SpringOptions } from "motion/react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

export function TiltedCard({
  children,
  className = "",
  style,
  rotateAmplitude = 10,
  scaleOnHover = 1.02,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale   = useSpring(1, springValues);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width  / 2;
    const offsetY = e.clientY - rect.top  - rect.height / 2;
    rotateX.set((-offsetY / (rect.height / 2)) * rotateAmplitude);
    rotateY.set(( offsetX / (rect.width  / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() { scale.set(scaleOnHover); }
  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
    >
      {children}
    </motion.div>
  );
}
