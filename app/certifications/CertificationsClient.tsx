"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certificates as defaultCertificates, type Certificate } from "@/data/certifications";
import { ExternalLink, Award, X, FileText, Calendar, Building2 } from "lucide-react";
import { PageBackground } from "@/components/ui/PageBackground";

const CATEGORY_META: Record<Certificate["category"], { label: string; color: string; glow: string; border: string; bg: string }> = {
  cloud:    { label: "Cloud",    color: "#93c5fd", glow: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.25)",  bg: "rgba(96,165,250,0.08)"  },
  "ai-ml":  { label: "AI / ML", color: "#c4b5fd", glow: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)", bg: "rgba(167,139,250,0.08)" },
  web:      { label: "Web Dev",  color: "#86efac", glow: "rgba(74,222,128,0.10)",  border: "rgba(74,222,128,0.25)",  bg: "rgba(74,222,128,0.08)"  },
  devops:   { label: "DevOps",   color: "#fde68a", glow: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.25)",  bg: "rgba(251,191,36,0.08)"  },
  database: { label: "Database", color: "#fed7aa", glow: "rgba(251,146,60,0.10)",  border: "rgba(251,146,60,0.25)",  bg: "rgba(251,146,60,0.08)"  },
  general:  { label: "General",  color: "#f9a8d4", glow: "rgba(244,114,182,0.10)", border: "rgba(244,114,182,0.25)", bg: "rgba(244,114,182,0.08)" },
  other:    { label: "Other",    color: "#a1a1aa", glow: "rgba(161,161,170,0.10)", border: "rgba(161,161,170,0.25)", bg: "rgba(161,161,170,0.08)" },
};

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(ym: string) {
  const [y, m] = ym.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/* ─────────────────────────── Certificate Card (Gallery Tile) ─── */
function CertCard({ cert, idx, onClick }: { cert: Certificate; idx: number; onClick: () => void }) {
  const meta = CATEGORY_META[cert.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
      layout
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-label={`View details for ${cert.title}`}
      style={{
        cursor: "pointer",
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease",
        position: "relative",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = meta.border;
        el.style.boxShadow = `0 12px 36px rgba(0,0,0,0.2), 0 0 0 1px ${meta.border} inset`;
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--border-strong)";
        el.style.boxShadow = "";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* ── Thumbnail ── */}
      <div style={{
        aspectRatio: "4/3",
        background: cert.imageUrl
          ? undefined
          : `linear-gradient(135deg, ${meta.glow} 0%, var(--surface-2) 100%)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${meta.border}`,
      }}>
        {cert.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cert.imageUrl}
            alt={`${cert.title} certificate`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.5rem" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: meta.bg,
              border: `1px solid ${meta.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Award size={24} style={{ color: meta.color }} strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: meta.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {meta.label}
            </span>
          </div>
        )}

        {/* Category badge — no dot icon */}
        <div style={{
          position: "absolute", top: "0.625rem", left: "0.625rem",
          display: "inline-flex", alignItems: "center", gap: "0.3rem",
          padding: "0.2rem 0.6rem",
          borderRadius: "99px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1px solid ${meta.border}`,
          fontSize: "9px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: meta.color,
          fontFamily: "var(--font-mono)",
        }}>
          {meta.label}
        </div>

        {/* "Click for details" hint */}
        <div style={{
          position: "absolute", bottom: "0.625rem", right: "0.625rem",
          padding: "0.2rem 0.55rem",
          borderRadius: "6px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          fontSize: "9px", color: "rgba(255,255,255,0.7)",
          fontFamily: "var(--font-mono)",
        }}>
          click for details
        </div>

        {/* Hover glow overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${meta.glow} 0%, transparent 60%)`,
          opacity: 0.6,
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Card info ── */}
      <div style={{ padding: "1rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        <div>
          <h3 style={{
            fontSize: "var(--text-sm)", fontWeight: 600,
            color: "var(--text-1)", letterSpacing: "-0.01em",
            lineHeight: 1.35, marginBottom: "0.25rem",
          }}>
            {cert.title}
          </h3>
          <p style={{ fontSize: "11px", color: "var(--text-3)", fontWeight: 400 }}>
            {cert.issuer}
          </p>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: "0.3rem",
          fontSize: "10px", fontFamily: "var(--font-mono)", color: "var(--text-4)",
          marginTop: "auto", paddingTop: "0.5rem",
          borderTop: "1px solid var(--border)",
        }}>
          <Calendar size={10} />
          {formatDate(cert.date)}
          {cert.featured && (
            <span style={{
              marginLeft: "auto", padding: "1px 6px",
              borderRadius: "4px", background: meta.bg,
              border: `1px solid ${meta.border}`,
              color: meta.color, fontSize: "9px",
              fontWeight: 700, letterSpacing: "0.06em",
            }}>
              ★ Featured
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────── Modal ─────────────────────────────── */
function CertModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const meta = CATEGORY_META[cert.category];

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          style={{
            width: "100%", maxWidth: "680px",
            background: "var(--surface)",
            border: `1px solid ${meta.border}`,
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${meta.border} inset`,
            maxHeight: "90dvh",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            margin: "auto",
          }}
        >
          {/* ── Modal image — takes full width, proper aspect ratio ── */}
          {cert.imageUrl && (
            <div style={{
              position: "relative",
              width: "100%",
              flexShrink: 0,
              overflow: "hidden",
              background: "var(--surface-2)",
              borderBottom: `1px solid ${meta.border}`,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.imageUrl}
                alt={`${cert.title} certificate`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                  maxHeight: "55vh",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(to bottom, transparent 60%, var(--surface) 100%)`,
                pointerEvents: "none",
              }} />
            </div>
          )}

          {!cert.imageUrl && (
            <div style={{
              height: "140px", flexShrink: 0,
              background: `linear-gradient(135deg, ${meta.glow} 0%, var(--surface-2) 100%)`,
              borderBottom: `1px solid ${meta.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: meta.bg, border: `2px solid ${meta.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 24px ${meta.glow}`,
              }}>
                <Award size={32} style={{ color: meta.color }} strokeWidth={1.5} />
              </div>
            </div>
          )}

          {/* ── Modal body — scrollable ── */}
          <div style={{ padding: "1.75rem 2rem 2rem", overflowY: "auto", flex: 1 }}>
            {/* Close btn */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${meta.border}`,
                borderRadius: "50%",
                width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.8)", cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={14} strokeWidth={2} />
            </button>

            {/* Category pill — no dot icon */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.25rem 0.75rem", borderRadius: "99px", background: meta.bg, border: `1px solid ${meta.border}`, marginBottom: "1rem" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: meta.color, fontFamily: "var(--font-mono)" }}>
                {meta.label}
              </span>
            </div>

            {/* Title */}
            <h2 id="cert-modal-title" style={{
              fontSize: "clamp(1.25rem, 3vw, 1.625rem)",
              fontWeight: 600, letterSpacing: "-0.025em",
              color: "var(--text-1)", lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}>
              {cert.title}
            </h2>

            {/* Meta row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-3)" }}>
                <Building2 size={13} strokeWidth={1.5} />
                <span>{cert.issuer}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                <Calendar size={13} strokeWidth={1.5} />
                <span>{formatDate(cert.date)}</span>
              </div>
              {cert.expiryDate && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "var(--text-sm)", color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  <span>Expires: {formatDate(cert.expiryDate)}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {cert.description && (
              <div style={{
                padding: "1.25rem", marginBottom: "1.5rem",
                background: meta.bg,
                border: `1px solid ${meta.border}`,
                borderRadius: "var(--radius-lg)",
                borderLeft: `3px solid ${meta.color}`,
              }}>
                <p style={{ fontSize: "var(--text-sm)", lineHeight: 1.8, color: "var(--text-2)" }}>
                  {cert.description}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ gap: "0.5rem", fontSize: "var(--text-sm)" }}
                >
                  <ExternalLink size={13} aria-hidden />
                  Verify Credential
                </a>
              )}
              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ gap: "0.5rem", fontSize: "var(--text-sm)" }}
                >
                  <FileText size={13} aria-hidden />
                  View PDF
                </a>
              )}
              {cert.imageUrl && (
                <a
                  href={cert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ gap: "0.5rem", fontSize: "var(--text-sm)" }}
                >
                  <ExternalLink size={13} aria-hidden />
                  View Full Image
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────── Main Page Component ─────────────── */
export function CertificationsClient() {
  const [filter, setFilter] = useState<Certificate["category"] | "all">("all");
  const [selected, setSelected] = useState<Certificate | null>(null);

  // Read ordering from localStorage (set by admin panel)
  const [orderedCerts, setOrderedCerts] = useState<Certificate[]>(defaultCertificates);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cert-order");
      if (saved) {
        const order: string[] = JSON.parse(saved);
        const mapped = order
          .map((id) => defaultCertificates.find((c) => c.id === id))
          .filter(Boolean) as Certificate[];
        // Append any certs not in saved order
        const rest = defaultCertificates.filter((c) => !order.includes(c.id));
        setOrderedCerts([...mapped, ...rest]);
      }
    } catch {
      // ignore
    }
  }, []);

  const activeCats = Array.from(new Set(orderedCerts.map(c => c.category))) as Certificate["category"][];
  const filtered = filter === "all" ? orderedCerts : orderedCerts.filter(c => c.category === filter);

  return (
    <div style={{ paddingBlock: "var(--section-py)", position: "relative" }}>
      {/* LightRays + ambient glow background */}
      <PageBackground raysColor="#c4b5fd" opacity={0.22} glowTopLeft="rgba(167,139,250,0.05)" glowTopRight="rgba(96,165,250,0.04)" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Page Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
          <div className="section-label-line" style={{ marginBottom: "1rem" }}>
            <span className="label">Credentials</span>
          </div>
          <h1 className="heading-page" style={{ color: "var(--text-1)", marginBottom: "0.875rem" }}>
            Certifications
          </h1>
          <p className="body" style={{ maxWidth: "44ch", color: "var(--text-3)" }}>
            Professional credentials earned across cloud, AI/ML, web development, and more.
            Click any certificate to view details.
          </p>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
          {(["all", ...activeCats] as const).map((f) => {
            const isActive = filter === f;
            const catMeta = f !== "all" ? CATEGORY_META[f as Certificate["category"]] : null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "0.3rem 0.875rem", fontSize: "11.5px",
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "var(--font-mono)", letterSpacing: "0.03em",
                  borderRadius: "99px",
                  border: `1px solid ${isActive ? (catMeta?.border ?? "var(--border-hover)") : "var(--border-strong)"}`,
                  background: isActive ? (catMeta ? catMeta.bg : "rgba(255,255,255,0.06)") : "transparent",
                  color: isActive ? (catMeta?.color ?? "var(--text-1)") : "var(--text-3)",
                  cursor: "pointer",
                  transition: "all var(--dur-fast) ease",
                  boxShadow: isActive && catMeta ? `0 0 12px ${catMeta.glow}` : "none",
                }}>
                {f === "all" ? "All" : CATEGORY_META[f as Certificate["category"]]?.label}
              </button>
            );
          })}
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-4)" }}>
            {filtered.length} of {orderedCerts.length}
          </span>
        </motion.div>

        {/* ── Gallery grid ── */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                idx={i}
                onClick={() => setSelected(cert)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: "center", paddingBlock: "5rem", color: "var(--text-4)" }}>
            <Award size={36} strokeWidth={1} style={{ margin: "0 auto 1rem" }} />
            <p style={{ fontSize: "var(--text-sm)" }}>No certifications in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
