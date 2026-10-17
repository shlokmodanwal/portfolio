"use client";

import { useState, useEffect, useCallback } from "react";
import { certificates as defaultCerts, type Certificate } from "@/data/certifications";
import { PageBackground } from "@/components/ui/PageBackground";
import { GripVertical, RotateCcw, Save, Eye, ArrowUp, ArrowDown, Star, StarOff, Check } from "lucide-react";

const CATEGORY_META: Record<Certificate["category"], { label: string; color: string; border: string; bg: string }> = {
  cloud:    { label: "Cloud",    color: "#93c5fd", border: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.08)"  },
  "ai-ml":  { label: "AI / ML", color: "#c4b5fd", border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)" },
  web:      { label: "Web Dev",  color: "#86efac", border: "rgba(74,222,128,0.3)",  bg: "rgba(74,222,128,0.08)"  },
  devops:   { label: "DevOps",   color: "#fde68a", border: "rgba(251,191,36,0.3)",  bg: "rgba(251,191,36,0.08)"  },
  database: { label: "Database", color: "#fed7aa", border: "rgba(251,146,60,0.3)",  bg: "rgba(251,146,60,0.08)"  },
  general:  { label: "General",  color: "#f9a8d4", border: "rgba(244,114,182,0.3)", bg: "rgba(244,114,182,0.08)" },
  other:    { label: "Other",    color: "#a1a1aa", border: "rgba(161,161,170,0.3)", bg: "rgba(161,161,170,0.08)" },
};

const STORAGE_KEY = "cert-order";

export function AdminClient() {
  const [certs, setCerts] = useState<Certificate[]>([...defaultCerts]);
  const [saved, setSaved] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  // Load saved order
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const order: string[] = JSON.parse(saved);
        const mapped = order
          .map((id) => defaultCerts.find((c) => c.id === id))
          .filter(Boolean) as Certificate[];
        const rest = defaultCerts.filter((c) => !order.includes(c.id));
        setCerts([...mapped, ...rest]);
      }
    } catch { /* ignore */ }
  }, []);

  const move = useCallback((from: number, to: number) => {
    setCerts((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  const moveUp   = (i: number) => { if (i > 0) move(i, i - 1); };
  const moveDown = (i: number) => { if (i < certs.length - 1) move(i, i + 1); };

  const toggleFeatured = (id: string) => {
    setCerts((prev) => prev.map((c) => c.id === id ? { ...c, featured: !c.featured } : c));
  };

  const handleSave = () => {
    const order = certs.map((c) => c.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    // Also save featured state
    const featuredMap: Record<string, boolean> = {};
    certs.forEach((c) => { featuredMap[c.id] = !!c.featured; });
    localStorage.setItem("cert-featured", JSON.stringify(featuredMap));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("cert-featured");
    setCerts([...defaultCerts]);
  };

  // Drag-and-drop handlers
  const onDragStart = (i: number) => setDragIdx(i);
  const onDragOver  = (e: React.DragEvent, i: number) => { e.preventDefault(); setOverIdx(i); };
  const onDrop      = (i: number) => {
    if (dragIdx !== null && dragIdx !== i) move(dragIdx, i);
    setDragIdx(null); setOverIdx(null);
  };
  const onDragEnd   = () => { setDragIdx(null); setOverIdx(null); };

  return (
    <div style={{ minHeight: "100dvh", position: "relative" }}>
      <PageBackground raysColor="#60a5fa" opacity={0.18} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "calc(var(--header-height) + 3rem)", paddingBottom: "5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div className="section-label-line" style={{ marginBottom: "1rem" }}>
            <span className="label">Admin Panel</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--text-1)", marginBottom: "0.5rem" }}>
                Portfolio Manager
              </h1>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-3)", maxWidth: "48ch" }}>
                Drag, reorder, and manage your certifications. Changes are saved to your browser and reflected on the live site instantly.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              <a
                href="/certifications"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{ gap: "0.45rem", fontSize: "var(--text-sm)" }}
              >
                <Eye size={14} />
                Preview Page
              </a>
              <button
                onClick={handleReset}
                className="btn btn-ghost"
                style={{ gap: "0.45rem", fontSize: "var(--text-sm)", color: "var(--text-3)" }}
              >
                <RotateCcw size={14} />
                Reset
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary"
                style={{ gap: "0.45rem", fontSize: "var(--text-sm)" }}
              >
                {saved ? <Check size={14} /> : <Save size={14} />}
                {saved ? "Saved!" : "Save Order"}
              </button>
            </div>
          </div>
        </div>

        {/* Section tabs */}
        <div style={{
          display: "flex", gap: "0", marginBottom: "1.5rem",
          background: "var(--surface)", border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-lg)", padding: "0.375rem",
          width: "fit-content",
        }}>
          {["Certifications"].map((tab) => (
            <div key={tab} style={{
              padding: "0.4rem 1rem",
              borderRadius: "var(--radius)",
              background: "var(--surface-3)",
              fontSize: "var(--text-sm)", fontWeight: 500,
              color: "var(--text-1)",
            }}>{tab}</div>
          ))}
        </div>

        {/* Info banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "0.875rem 1.25rem", marginBottom: "1.75rem",
          background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)",
          borderRadius: "var(--radius-lg)", borderLeft: "3px solid #60a5fa",
        }}>
          <GripVertical size={16} style={{ color: "#60a5fa", flexShrink: 0 }} />
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-2)" }}>
            Drag rows by the grip handle or use the arrow buttons to reorder. Toggle ★ to mark as Featured. Click <strong>Save Order</strong> to persist changes.
          </p>
        </div>

        {/* Table */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-md)",
        }}>
          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2.5rem 3.5rem 1fr auto auto auto",
            gap: "0 1rem",
            padding: "0.75rem 1.25rem",
            borderBottom: "1px solid var(--border-strong)",
            background: "var(--surface-2)",
          }}>
            {["", "#", "Certificate", "Category", "Featured", "Move"].map((h) => (
              <div key={h} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {certs.map((cert, i) => {
            const meta = CATEGORY_META[cert.category];
            const isDragging = dragIdx === i;
            const isOver     = overIdx === i;
            return (
              <div
                key={cert.id}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDrop={() => onDrop(i)}
                onDragEnd={onDragEnd}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5rem 3.5rem 1fr auto auto auto",
                  gap: "0 1rem",
                  alignItems: "center",
                  padding: "0.875rem 1.25rem",
                  borderBottom: i < certs.length - 1 ? "1px solid var(--border)" : "none",
                  background: isDragging
                    ? "rgba(96,165,250,0.06)"
                    : isOver
                    ? "rgba(96,165,250,0.04)"
                    : "transparent",
                  cursor: "grab",
                  transition: "background 120ms ease",
                  opacity: isDragging ? 0.5 : 1,
                  borderLeft: isOver ? "2px solid #60a5fa" : "2px solid transparent",
                  outline: isDragging ? "1px solid rgba(96,165,250,0.3)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isDragging && !isOver) (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  if (!isDragging && !isOver) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Grip */}
                <div style={{ color: "var(--text-4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "grab" }}>
                  <GripVertical size={16} />
                </div>

                {/* Index */}
                <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-4)", textAlign: "center" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Certificate info */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", minWidth: 0 }}>
                  {cert.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cert.imageUrl}
                      alt=""
                      style={{ width: "48px", height: "36px", objectFit: "cover", borderRadius: "4px", border: `1px solid ${meta.border}`, flexShrink: 0 }}
                    />
                  ) : (
                    <div style={{ width: "48px", height: "36px", borderRadius: "4px", background: meta.bg, border: `1px solid ${meta.border}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "16px" }}>🏅</span>
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-1)", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {cert.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-3)", marginTop: "1px" }}>{cert.issuer} · {cert.date}</div>
                  </div>
                </div>

                {/* Category */}
                <div style={{
                  display: "inline-flex", alignItems: "center", padding: "0.2rem 0.6rem",
                  borderRadius: "99px", background: meta.bg, border: `1px solid ${meta.border}`,
                  fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: meta.color, fontFamily: "var(--font-mono)", whiteSpace: "nowrap",
                }}>
                  {meta.label}
                </div>

                {/* Featured toggle */}
                <button
                  onClick={() => toggleFeatured(cert.id)}
                  aria-label={cert.featured ? "Unfeature" : "Feature"}
                  title={cert.featured ? "Remove featured" : "Mark as featured"}
                  style={{
                    background: cert.featured ? "rgba(251,191,36,0.12)" : "transparent",
                    border: `1px solid ${cert.featured ? "rgba(251,191,36,0.3)" : "var(--border-strong)"}`,
                    borderRadius: "var(--radius)",
                    width: "32px", height: "32px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    color: cert.featured ? "#fbbf24" : "var(--text-4)",
                    transition: "all 140ms ease",
                  }}
                >
                  {cert.featured ? <Star size={13} fill="currentColor" /> : <StarOff size={13} />}
                </button>

                {/* Arrow buttons */}
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <button
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    aria-label="Move up"
                    style={{
                      background: "transparent", border: "1px solid var(--border-strong)",
                      borderRadius: "var(--radius)", width: "28px", height: "28px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: i === 0 ? "not-allowed" : "pointer",
                      color: i === 0 ? "var(--text-4)" : "var(--text-2)",
                      transition: "all 140ms ease",
                    }}
                    onMouseEnter={(e) => { if (i > 0) (e.currentTarget as HTMLElement).style.background = "var(--surface-3)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveDown(i)}
                    disabled={i === certs.length - 1}
                    aria-label="Move down"
                    style={{
                      background: "transparent", border: "1px solid var(--border-strong)",
                      borderRadius: "var(--radius)", width: "28px", height: "28px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: i === certs.length - 1 ? "not-allowed" : "pointer",
                      color: i === certs.length - 1 ? "var(--text-4)" : "var(--text-2)",
                      transition: "all 140ms ease",
                    }}
                    onMouseEnter={(e) => { if (i < certs.length - 1) (e.currentTarget as HTMLElement).style.background = "var(--surface-3)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{ marginTop: "1.5rem", fontSize: "11px", color: "var(--text-4)", fontFamily: "var(--font-mono)", textAlign: "center" }}>
          Changes are stored in <code style={{ color: "var(--text-3)" }}>localStorage</code> and persist across sessions on this browser.
        </p>
      </div>
    </div>
  );
}
