/**
 * ProjectVisual — Shows real screenshot if provided, falls back to SVG placeholder.
 * To add a screenshot: set coverImage on the project in data/projects.ts
 * e.g. coverImage: "/projects/my-project.jpg"
 * and place the image at public/projects/my-project.jpg
 */

interface Props {
  title: string;
  index: number;
  status?: "completed" | "in-progress" | "archived";
  coverImage?: string;
}

const ACCENTS = [
  { line: "rgba(74,222,128,0.15)",  dot: "#4ade80", text: "rgba(74,222,128,0.5)"  },
  { line: "rgba(148,163,184,0.12)", dot: "#94a3b8", text: "rgba(148,163,184,0.5)" },
  { line: "rgba(251,191,36,0.12)",  dot: "#fbbf24", text: "rgba(251,191,36,0.5)"  },
  { line: "rgba(129,140,248,0.12)", dot: "#818cf8", text: "rgba(129,140,248,0.5)" },
] as const;

export function ProjectVisual({ title, index, status, coverImage }: Props) {
  const a = ACCENTS[index % ACCENTS.length];
  const initials = title.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3);

  // If a real screenshot is provided, show it
  if (coverImage) {
    return (
      <figure aria-label={`${title} screenshot`} style={{ position:"relative", width:"100%", height:"100%", overflow:"hidden", background:"#111" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt={`${title} project screenshot`}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
        />
        {status === "in-progress" && (
          <div style={{ position:"absolute", top:"0.75rem", right:"0.75rem", padding:"0.2rem 0.6rem", background:"rgba(0,0,0,0.7)", backdropFilter:"blur(8px)", borderRadius:"99px", border:"1px solid rgba(255,255,255,0.15)", fontSize:"9px", fontFamily:"var(--font-mono)", color:"#fbbf24", letterSpacing:"0.08em" }}>
            IN PROGRESS
          </div>
        )}
      </figure>
    );
  }

  // Placeholder SVG
  return (
    <figure aria-hidden role="presentation" style={{ position:"relative", width:"100%", height:"100%", overflow:"hidden", background:"#111" }}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", fontFamily:"var(--font-sans, ui-sans-serif)" }}>
        <defs><pattern id={`g${index}`} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke={a.line} strokeWidth="0.5" /></pattern></defs>
        <rect width="800" height="500" fill={`url(#g${index})`} />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="180" fontWeight="700" letterSpacing="-0.05em" fill={a.line} opacity="0.6">{initials}</text>
        <rect x="60" y="50" width="320" height="30" rx="3" fill="none" stroke={a.line} strokeWidth="0.75" />
        <circle cx="80" cy="65" r="5" fill={a.dot} opacity="0.7" />
        <circle cx="97" cy="65" r="5" fill="rgba(255,255,255,0.08)" />
        <circle cx="113" cy="65" r="5" fill="rgba(255,255,255,0.08)" />
        <rect x="130" y="58" width="120" height="14" rx="2" fill={a.line} opacity="0.5" />
        <rect x="310" y="58" width="60" height="14" rx="2" fill={a.line} opacity="0.3" />
        <rect x="60" y="100" width="185" height="130" rx="4" fill="rgba(255,255,255,0.03)" stroke={a.line} strokeWidth="0.75" />
        <rect x="75" y="115" width="100" height="8" rx="2" fill={a.dot} opacity="0.3" />
        <rect x="75" y="131" width="150" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
        <rect x="75" y="145" width="120" height="6" rx="2" fill="rgba(255,255,255,0.04)" />
        <rect x="75" y="197" width="70"  height="22" rx="3" fill={a.dot} opacity="0.12" />
        <text x="110" y="212" fontSize="9" fill={a.dot} textAnchor="middle" opacity="0.8">Action</text>
        <rect x="265" y="100" width="115" height="130" rx="4" fill="rgba(255,255,255,0.03)" stroke={a.line} strokeWidth="0.75" />
        <rect x="278" y="120" width="89" height="60" rx="3" fill={a.line} opacity="0.12" />
        <rect x="278" y="190" width="70" height="7" rx="2" fill="rgba(255,255,255,0.05)" />
        {status === "in-progress" && (<>
          <rect x="640" y="48" width="100" height="22" rx="11" fill={a.dot} opacity="0.1" stroke={a.dot} strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="657" cy="59" r="3" fill={a.dot} opacity="0.9" />
          <text x="700" y="63" fontSize="8" fill={a.dot} textAnchor="middle" letterSpacing="0.06em" opacity="0.8">IN PROGRESS</text>
        </>)}
        <path d="M0 18 L0 0 L18 0" stroke={a.dot} strokeWidth="1" opacity="0.3" />
        <path d="M782 0 L800 0 L800 18" stroke={a.dot} strokeWidth="1" opacity="0.3" />
        <text x="60" y="472" fontSize="10" fontWeight="500" fill={a.text} letterSpacing="0.08em">{title.toUpperCase()}</text>
        <text x="60" y="488" fontSize="8" fill="rgba(255,255,255,0.15)" letterSpacing="0.04em">Add coverImage in data/projects.ts to show your screenshot</text>
      </svg>
    </figure>
  );
}
