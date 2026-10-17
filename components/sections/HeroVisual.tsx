/**
 * HeroVisual — Server Component
 *
 * A deliberately crafted technical SVG composition representing the
 * architecture of a digital product: Interface → API → Core Engine.
 *
 * Philosophy:
 *  - Purely decorative; aria-hidden entirely
 *  - Zero JS, zero runtime cost
 *  - Palette matches globals.css design tokens (hardcoded for SVG compat)
 *  - Conveys: "this person builds systems, thinks architecturally"
 */

export function HeroVisual() {
  /** Static palette from the globals.css design system */
  const c = {
    dot:          "#d6d3d1", // --stone-300
    cornerMark:   "#e7e5e4", // --stone-200
    border:       "#e7e5e4", // --stone-200
    borderFaint:  "#eeeeec", // --stone-150
    accentStroke: "#0f766e", // --color-accent  (teal-700)
    accentFill:   "rgba(15,118,110,0.025)",
    accentText:   "#0d9488", // --teal-600
    textHead:     "#44403c", // --stone-700
    textMuted:    "#a8a29e", // --stone-400
    textFaint:    "#d6d3d1", // --stone-300
    connLine:     "#d6d3d1", // --stone-300
  } as const;

  return (
    <figure aria-hidden role="presentation" className="w-full max-w-[440px] select-none">
      <svg
        viewBox="0 0 440 372"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ fontFamily: "var(--font-sans, ui-sans-serif, system-ui)" }}
      >
        {/* ── Dot grid pattern ─────────────────────────────────── */}
        <defs>
          <pattern
            id="hv-dots"
            x="0" y="0"
            width="20" height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="0.9" cy="0.9" r="0.85" fill={c.dot} opacity="0.55" />
          </pattern>
        </defs>
        <rect width="440" height="372" fill="url(#hv-dots)" />

        {/* ── Corner registration marks ─────────────────────────── */}
        {/* Top-left */}
        <path d="M 0 14 L 0 0 L 14 0" stroke={c.cornerMark} strokeWidth="1" strokeLinecap="square" />
        {/* Top-right */}
        <path d="M 426 0 L 440 0 L 440 14" stroke={c.cornerMark} strokeWidth="1" strokeLinecap="square" />
        {/* Bottom-left */}
        <path d="M 0 358 L 0 372 L 14 372" stroke={c.cornerMark} strokeWidth="1" strokeLinecap="square" />
        {/* Bottom-right */}
        <path d="M 426 372 L 440 372 L 440 358" stroke={c.cornerMark} strokeWidth="1" strokeLinecap="square" />

        {/* ═══════════════════════════════════════════════════════
            BLOCK A — Interface Layer   (accent / highlighted)
            x=36 y=54 w=160 h=92
            ═══════════════════════════════════════════════════════ */}
        <rect
          x="36" y="54" width="160" height="92" rx="2"
          stroke={c.accentStroke} strokeWidth="1.25"
          fill={c.accentFill}
        />
        {/* Active dot */}
        <circle cx="51" cy="72" r="3" fill={c.accentStroke} opacity="0.85" />
        {/* Title */}
        <text x="63" y="75" fontSize="10.5" fontWeight="600" fill={c.textHead} letterSpacing="0.005em">
          Interface
        </text>
        {/* Subtitle */}
        <text x="63" y="90" fontSize="8.5" fill={c.textMuted} letterSpacing="0.01em">
          Layer  /  Frontend
        </text>
        {/* Status */}
        <text x="51" y="120" fontSize="8" fill={c.accentText} letterSpacing="0.04em">
          active
        </text>
        {/* Block index */}
        <text x="187" y="64" fontSize="8" fill={c.textFaint} textAnchor="end">
          01
        </text>

        {/* ═══════════════════════════════════════════════════════
            BLOCK B — API Service
            x=234 y=68 w=110 h=58
            ═══════════════════════════════════════════════════════ */}
        <rect
          x="234" y="68" width="110" height="58" rx="2"
          stroke={c.border} strokeWidth="1"
          fill="transparent"
        />
        <text x="250" y="90" fontSize="10.5" fontWeight="600" fill={c.textHead} letterSpacing="0.005em">
          API
        </text>
        <text x="250" y="105" fontSize="8.5" fill={c.textMuted} letterSpacing="0.01em">
          REST  ·  v1.2
        </text>
        {/* Block index */}
        <text x="336" y="77" fontSize="8" fill={c.textFaint} textAnchor="end">
          02
        </text>

        {/* ═══════════════════════════════════════════════════════
            CONNECTION: A → B  (horizontal dashed)
            ═══════════════════════════════════════════════════════ */}
        <line
          x1="196" y1="100" x2="234" y2="100"
          stroke={c.connLine} strokeWidth="0.8" strokeDasharray="3 2.5"
        />
        {/* Arrowhead */}
        <path
          d="M 228 96.5 L 234 100 L 228 103.5"
          stroke={c.connLine} strokeWidth="0.8" strokeLinejoin="round"
        />

        {/* ═══════════════════════════════════════════════════════
            CONNECTION: A → C  (vertical dashed)
            ═══════════════════════════════════════════════════════ */}
        <line
          x1="116" y1="146" x2="116" y2="202"
          stroke={c.connLine} strokeWidth="0.8" strokeDasharray="3 2.5"
        />
        {/* Down-arrow tip */}
        <path
          d="M 112.5 196 L 116 202 L 119.5 196"
          stroke={c.connLine} strokeWidth="0.8" strokeLinejoin="round"
        />

        {/* ═══════════════════════════════════════════════════════
            BLOCK C — Core Engine
            x=36 y=202 w=228 h=80
            ═══════════════════════════════════════════════════════ */}
        <rect
          x="36" y="202" width="228" height="80" rx="2"
          stroke={c.border} strokeWidth="1"
          fill="transparent"
        />
        {/* Inner separator */}
        <line
          x1="36" y1="224" x2="264" y2="224"
          stroke={c.borderFaint} strokeWidth="0.75"
        />
        {/* Title (above separator) */}
        <text x="50" y="217" fontSize="10.5" fontWeight="600" fill={c.textHead} letterSpacing="0.005em">
          Core Engine
        </text>
        {/* Block index */}
        <text x="256" y="212" fontSize="8" fill={c.textFaint} textAnchor="end">
          03
        </text>
        {/* Body content */}
        <text x="50" y="240" fontSize="8.5" fill={c.textMuted} letterSpacing="0.01em">
          v2.4.1
        </text>
        {/* Status */}
        <circle cx="78" cy="237" r="2.5" fill={c.accentStroke} opacity="0.7" />
        <text x="86" y="240" fontSize="8.5" fill={c.textMuted}>
          active
        </text>
        {/* Second row */}
        <text x="50" y="258" fontSize="8" fill={c.textFaint} letterSpacing="0.01em">
          Processing layer  ·  stable
        </text>

        {/* ═══════════════════════════════════════════════════════
            BLOCK D — Store  (dashed, isolated, bottom-right)
            x=308 y=218 w=80 h=44
            ═══════════════════════════════════════════════════════ */}
        <rect
          x="308" y="218" width="80" height="44" rx="2"
          stroke={c.borderFaint} strokeWidth="0.75" strokeDasharray="3 2"
          fill="transparent"
        />
        <text x="322" y="237" fontSize="9.5" fill={c.textMuted} letterSpacing="0.01em">
          Store
        </text>
        <text x="322" y="251" fontSize="8" fill={c.textFaint} letterSpacing="0.01em">
          Cache  ·  v1
        </text>

        {/* ═══════════════════════════════════════════════════════
            MEASUREMENT ANNOTATION — above Block A
            ═══════════════════════════════════════════════════════ */}
        <line x1="36" y1="47" x2="196" y2="47" stroke={c.borderFaint} strokeWidth="0.7" />
        <line x1="36" y1="43" x2="36" y2="51" stroke={c.borderFaint} strokeWidth="0.7" />
        <line x1="196" y1="43" x2="196" y2="51" stroke={c.borderFaint} strokeWidth="0.7" />
        <text x="116" y="44" fontSize="7.5" fill={c.textFaint} textAnchor="middle" letterSpacing="0.02em">
          160
        </text>

        {/* ═══════════════════════════════════════════════════════
            FOOTER ANNOTATIONS
            ═══════════════════════════════════════════════════════ */}
        <text x="12" y="362" fontSize="7.5" fill={c.textFaint} letterSpacing="0.05em">
          440 × 372
        </text>
        <text x="428" y="362" fontSize="7.5" fill={c.textFaint} letterSpacing="0.04em" textAnchor="end">
          shlok.dev
        </text>
      </svg>
    </figure>
  );
}
