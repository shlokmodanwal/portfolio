"use client";

/**
 * GreetingText — dynamically displays Good Morning / Good Afternoon / Good Evening
 * based on the user's local time, automatically updating in real-time.
 */
import { useState, useEffect } from "react";

function getTimeGreeting(): { prefix: string; period: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) {
    return { prefix: "Good", period: "Morning" };
  }
  if (h >= 12 && h < 17) {
    return { prefix: "Good", period: "Afternoon" };
  }
  return { prefix: "Good", period: "Evening" };
}

export function GreetingText() {
  const [greeting, setGreeting] = useState<{ prefix: string; period: string }>({
    prefix: "Good",
    period: "Day",
  });

  useEffect(() => {
    // Immediately calculate using user's client-side clock
    setGreeting(getTimeGreeting());

    // Automatically check and update every 30 seconds
    const interval = setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span suppressHydrationWarning style={{ display: "block", overflow: "visible" }}>
      <span
        className="heading-hero"
        style={{
          display: "block",
          color: "var(--text-1)",
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
          overflow: "visible",
        }}
      >
        {greeting.prefix}
      </span>
      <span
        className="heading-hero"
        style={{
          display: "block",
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
          paddingBottom: "0.15em",
          background: "linear-gradient(135deg, var(--text-2) 0%, var(--text-3) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          overflow: "visible",
        }}
      >
        {greeting.period}
      </span>
    </span>
  );
}
