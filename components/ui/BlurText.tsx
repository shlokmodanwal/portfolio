"use client";

/**
 * BlurText — from reactbits.dev
 * Adapted from: https://reactbits.dev/text-animations/blur-text
 * Uses motion/react (already installed). No extra dependencies.
 */

import { motion, type Transition, type Easing } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  const defaultFrom = useMemo<Record<string, string | number>>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -20 }
        : { filter: "blur(10px)", opacity: 0, y: 20 },
    [direction]
  );

  const defaultTo = useMemo<Array<Record<string, string | number>>>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * stepCount;
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold, rootMargin }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  const keyframes = buildKeyframes(fromSnapshot, toSnapshots);

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((segment, i) => {
        const transition: Transition = {
          duration: totalDuration,
          times,
          delay: (i * delay) / 1000,
          ease: easing,
        };
        return (
          <motion.span
            key={i}
            initial={fromSnapshot}
            animate={inView ? keyframes : fromSnapshot}
            transition={transition}
            onAnimationComplete={() => {
              if (onAnimationComplete) {
                animatedCount.current += 1;
                if (animatedCount.current === elements.length) onAnimationComplete();
              }
            }}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
