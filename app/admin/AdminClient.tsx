"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { certificates as defaultCerts, type Certificate } from "@/data/certifications";
import { projects as defaultProjects } from "@/data/projects";
import { PageBackground } from "@/components/ui/PageBackground";
import {
  GripVertical, RotateCcw, Save, Eye, ArrowUp, ArrowDown,
  Star, StarOff, Check, Lock, LogOut, Plus, Pencil, Trash2, X, Link2,
} from "lucide-react";

// ── Credentials (change these to your preferred id/pass) ──────────
const ADMIN_USER = "shlok";
const ADMIN_PASS = "shlok@admin2025";
const AUTH_KEY   = "admin-auth";

// ── Category meta ──────────────────────────────────────────────────
const CATEGORY_META: Record<Certificate["category"], { label: string; color: string; border: string; bg: string }> = {
  cloud:    { label: "Cloud",    color: "#93c5fd", border: "rgba(96,165,250,0.3)",  bg: "rgba(96,165,250,0.08)"  },
  "ai-ml":  { label: "AI / ML", color: "#c4b5fd", border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)" },
  web:      { label: "Web Dev",  color: "#86efac", border: "rgba(74,222,128,0.3)",  bg: "rgba(74,222,128,0.08)"  },
  devops:   { label: "DevOps",   color: "#fde68a", border: "rgba(251,191,36,0.3)",  bg: "rgba(251,191,36,0.08)"  },
  database: { label: "Database", color: "#fed7aa", border: "rgba(251,146,60,0.3)",  bg: "rgba(251,146,60,0.08)"  },
  general:  { label: "General",  color: "#f9a8d4", border: "rgba(244,114,182,0.3)", bg: "rgba(244,114,182,0.08)" },
  other:    { label: "Other",    color: "#a1a1aa", border: "rgba(161,161,170,0.3)", bg: "rgba(161,161,170,0.08)" },
};

const CERT_KEY    = "cert-order";
const PROJECT_KEY = "admin-projects";

// ─────────────────────────────────────────────────────────────────
// Login Screen
// ─────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (user === ADMIN_USER && pass === ADMIN_PASS) {
        sessionStorage.setItem(AUTH_KEY, "1");
        onLogin();
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div style={{
      minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", background: "var(--bg)",
    }}>
      <PageBackground raysColor="#a78bfa" opacity={0.18} />
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "380px",
        margin: "1rem",
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-xl)",
        padding: "2.5rem 2rem",
        boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "var(--radius)",
            background: "rgba(167,139,250,0.12)",
            border: "1px solid rgba(167,139,250,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#c4b5fd",
          }}>
            <Lock size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: "var(--text-base)" }}>Admin Access</div>
            <div style={{ fontSize: "12px", color: "var(--text-4)" }}>Portfolio Manager</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-3)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
              USERNAME
            </label>
            <input
              type="text"
              value={user}
              onChange={e => { setUser(e.target.value); setError(""); }}
              autoComplete="username"
              placeholder="Enter username"
              required
              style={{
                width: "100%", padding: "0.625rem 0.875rem",
                background: "var(--surface-2)", border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius)", color: "var(--text-1)",
                fontSize: "var(--text-sm)", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "var(--text-3)", marginBottom: "0.4rem", letterSpacing: "0.04em" }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setError(""); }}
              autoComplete="current-password"
              placeholder="Enter password"
              required
              style={{
                width: "100%", padding: "0.625rem 0.875rem",
                background: "var(--surface-2)", border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius)", color: "var(--text-1)",
                fontSize: "var(--text-sm)", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{ fontSize: "12px", color: "#f87171", padding: "0.5rem 0.75rem", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "var(--radius)" }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "0.5rem", justifyContent: "center" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Project editor modal
// ─────────────────────────────────────────────────────────────────
interface AdminProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  tags: string;
}

function ProjectModal({
  project,
  onSave,
  onClose,
}: {
  project: AdminProject | null;
  onSave: (p: AdminProject) => void;
  onClose: () => void;
}) {
  const isNew = !project?.id;
  const [form, setForm] = useState<AdminProject>(
    project ?? { id: "", title: "", description: "", imageUrl: "", githubUrl: "", liveUrl: "", tags: "" }
  );

  function set(key: keyof AdminProject, val: string) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const id = form.id || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    onSave({ ...form, id });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.6rem 0.875rem",
    background: "var(--surface-2)", border: "1px solid var(--border-strong)",
    borderRadius: "var(--radius)", color: "var(--text-1)",
    fontSize: "var(--text-sm)", outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "11px", fontWeight: 600,
    color: "var(--text-4)", marginBottom: "0.3rem", letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
    }} onClick={onClose}>
      <div style={{
        width: "100%", maxWidth: "520px", margin: "1rem",
        background: "var(--surface)", border: "1px solid var(--border-strong)",
        borderRadius: "var(--radius-xl)", padding: "2rem",
        maxHeight: "90dvh", overflowY: "auto",
        boxShadow: "0 32px 100px rgba(0,0,0,0.5)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontWeight: 600, color: "var(--text-1)", fontSize: "var(--text-base)" }}>
            {isNew ? "Add New Project" : "Edit Project"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", padding: "0.25rem" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Project Name *</label>
            <input style={inputStyle} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. MachineGuru" required />
          </div>
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" } as React.CSSProperties}
              value={form.description} onChange={e => set("description", e.target.value)}
              placeholder="What does this project do?" required />
          </div>
          <div>
            <label style={labelStyle}>Cover Image URL</label>
            <input style={inputStyle} value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} placeholder="https://res.cloudinary.com/..." />
          </div>
          {form.imageUrl && (
            <img src={form.imageUrl} alt="preview" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "var(--radius)", border: "1px solid var(--border)" }} onError={e => (e.currentTarget.style.display = "none")} />
          )}
          <div>
            <label style={labelStyle}>GitHub URL</label>
            <input style={inputStyle} type="url" value={form.githubUrl} onChange={e => set("githubUrl", e.target.value)} placeholder="https://github.com/..." />
          </div>
          <div>
            <label style={labelStyle}>Live / Deployed URL</label>
            <input style={inputStyle} type="url" value={form.liveUrl} onChange={e => set("liveUrl", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label style={labelStyle}>Tags (comma separated)</label>
            <input style={inputStyle} value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="React, Python, FastAPI" />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              <Save size={14} /> {isNew ? "Add Project" : "Save Changes"}
            </button>
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main Admin Dashboard
// ─────────────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"certs" | "projects">("certs");

  // ── Certs state ────────────────────────────────────────────────
  const [certs, setCerts] = useState<Certificate[]>([...defaultCerts]);
  const [certSaved, setCertSaved] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CERT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { id: string; featured?: boolean }[];
        const reordered: Certificate[] = [];
        const map = new Map(defaultCerts.map(c => [c.id, c]));
        saved.forEach(s => { const c = map.get(s.id); if (c) reordered.push({ ...c, featured: s.featured ?? c.featured }); });
        defaultCerts.forEach(c => { if (!saved.find(s => s.id === c.id)) reordered.push(c); });
        setCerts(reordered);
      }
    } catch {}
  }, []);

  const moveCert = useCallback((from: number, to: number) => {
    setCerts(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
  }, []);

  const saveCerts = useCallback(() => {
    localStorage.setItem(CERT_KEY, JSON.stringify(certs.map(c => ({ id: c.id, featured: c.featured }))));
    setCertSaved(true);
    setTimeout(() => setCertSaved(false), 2000);
  }, [certs]);

  const toggleFeatured = useCallback((id: string) => {
    setCerts(prev => prev.map(c => c.id === id ? { ...c, featured: !c.featured } : c));
  }, []);

  // ── Projects state ─────────────────────────────────────────────
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>(() => {
    try {
      const raw = localStorage.getItem(PROJECT_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return defaultProjects.map(p => ({
      id: p.slug,
      title: p.title,
      description: p.description ?? p.tagline ?? "",
      imageUrl: p.coverImage ?? "",
      githubUrl: p.links.find(l => l.icon === "github")?.url ?? "",
      liveUrl: p.links.find(l => l.icon === "external" || l.icon === "demo")?.url ?? "",
      tags: p.tech.join(", "),
    }));
  });
  const [projSaved, setProjSaved] = useState(false);
  const [editingProj, setEditingProj] = useState<AdminProject | null | "new">(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function saveProjects(list: AdminProject[]) {
    localStorage.setItem(PROJECT_KEY, JSON.stringify(list));
    setAdminProjects(list);
    setProjSaved(true);
    setTimeout(() => setProjSaved(false), 2000);
  }

  function handleSaveProj(p: AdminProject) {
    const existing = adminProjects.findIndex(ap => ap.id === p.id);
    let updated: AdminProject[];
    if (existing >= 0) {
      updated = adminProjects.map(ap => ap.id === p.id ? p : ap);
    } else {
      updated = [...adminProjects, p];
    }
    saveProjects(updated);
    setEditingProj(null);
  }

  function handleDeleteProj(id: string) {
    saveProjects(adminProjects.filter(p => p.id !== id));
    setDeleteConfirm(null);
  }

  // ── Drag handlers (certs) ──────────────────────────────────────
  function onDragStart(i: number) { setDragIdx(i); }
  function onDragOver(e: React.DragEvent, i: number) { e.preventDefault(); setOverIdx(i); }
  function onDrop(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx !== null && dragIdx !== i) moveCert(dragIdx, i);
    setDragIdx(null); setOverIdx(null);
  }
  function onDragEnd() { setDragIdx(null); setOverIdx(null); }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.45rem 1.1rem",
    borderRadius: "var(--radius)",
    fontSize: "var(--text-sm)", fontWeight: 500,
    cursor: "pointer", border: "none",
    background: active ? "var(--surface-2)" : "none",
    color: active ? "var(--text-1)" : "var(--text-3)",
    transition: "all 0.15s ease",
  });

  return (
    <div style={{ minHeight: "100dvh", position: "relative", overflow: "hidden" }}>
      <PageBackground raysColor="#a78bfa" opacity={0.15} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "6rem", maxWidth: "900px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <div className="section-label-line" style={{ marginBottom: "0.75rem" }}>
              <span className="label">Admin Panel</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--text-1)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
              Portfolio Manager
            </h1>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-4)" }}>
              Manage certifications and projects. Changes saved to browser storage.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
            <a href="/projects" target="_blank" className="btn btn-ghost" style={{ fontSize: "12px" }}>
              <Eye size={13} /> Preview
            </a>
            <button onClick={onLogout} className="btn btn-ghost" style={{ fontSize: "12px", color: "var(--text-3)" }}>
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "2rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "0.25rem", width: "fit-content" }}>
          <button style={tabStyle(activeTab === "certs")}    onClick={() => setActiveTab("certs")}>Certifications</button>
          <button style={tabStyle(activeTab === "projects")} onClick={() => setActiveTab("projects")}>Projects</button>
        </div>

        {/* ── Certifications Tab ─────────────────────────────── */}
        {activeTab === "certs" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-3)" }}>
                Drag rows or use arrows to reorder. Toggle ★ to mark as Featured.
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => setCerts([...defaultCerts])} className="btn btn-ghost" style={{ fontSize: "12px" }}>
                  <RotateCcw size={13} /> Reset
                </button>
                <button onClick={saveCerts} className="btn btn-primary" style={{ fontSize: "12px" }}>
                  {certSaved ? <><Check size={13} /> Saved!</> : <><Save size={13} /> Save Order</>}
                </button>
              </div>
            </div>

            <div style={{ border: "1px solid var(--border-strong)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "2rem 2.5rem 1fr auto auto auto", gap: "0.75rem", padding: "0.625rem 1rem", background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                {["", "#", "Certificate", "Category", "Featured", "Move"].map(h => (
                  <span key={h} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-4)", textTransform: "uppercase" }}>{h}</span>
                ))}
              </div>

              {certs.map((cert, i) => {
                const meta = CATEGORY_META[cert.category];
                return (
                  <div key={cert.id}
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={e => onDragOver(e, i)}
                    onDrop={e => onDrop(e, i)}
                    onDragEnd={onDragEnd}
                    style={{
                      display: "grid", gridTemplateColumns: "2rem 2.5rem 1fr auto auto auto",
                      gap: "0.75rem", padding: "0.75rem 1rem",
                      alignItems: "center",
                      background: overIdx === i ? "rgba(255,255,255,0.04)" : i % 2 === 0 ? "var(--surface)" : "rgba(255,255,255,0.01)",
                      borderBottom: i < certs.length - 1 ? "1px solid var(--border)" : "none",
                      cursor: "grab",
                      transition: "background 0.12s ease",
                    }}
                  >
                    <GripVertical size={15} style={{ color: "var(--text-4)" }} />
                    <span className="mono" style={{ fontSize: "11px", color: "var(--text-4)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", minWidth: 0 }}>
                      {cert.imageUrl && <img src={cert.imageUrl} alt="" style={{ width: 32, height: 32, objectFit: "cover", borderRadius: "var(--radius)", flexShrink: 0 }} />}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cert.title}</div>
                        <div style={{ fontSize: "11px", color: "var(--text-4)" }}>{cert.issuer} · {cert.date}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "99px", color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`, whiteSpace: "nowrap" }}>
                      {meta.label}
                    </span>
                    <button onClick={() => toggleFeatured(cert.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.2rem", color: cert.featured ? "#fbbf24" : "var(--text-4)", transition: "color 0.15s" }}>
                      {cert.featured ? <Star size={15} fill="#fbbf24" /> : <StarOff size={15} />}
                    </button>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <button onClick={() => i > 0 && moveCert(i, i - 1)} disabled={i === 0} style={{ background: "none", border: "none", cursor: i > 0 ? "pointer" : "default", color: i > 0 ? "var(--text-3)" : "var(--text-4)", padding: "2px" }}>
                        <ArrowUp size={12} />
                      </button>
                      <button onClick={() => i < certs.length - 1 && moveCert(i, i + 1)} disabled={i === certs.length - 1} style={{ background: "none", border: "none", cursor: i < certs.length - 1 ? "pointer" : "default", color: i < certs.length - 1 ? "var(--text-3)" : "var(--text-4)", padding: "2px" }}>
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Projects Tab ───────────────────────────────────── */}
        {activeTab === "projects" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-3)" }}>
                Add, edit or remove projects. Changes reflect instantly on the projects page.
              </p>
              <button onClick={() => setEditingProj("new")} className="btn btn-primary" style={{ fontSize: "12px" }}>
                <Plus size={13} /> Add Project
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {adminProjects.map(proj => (
                <div key={proj.id} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto",
                  gap: "1rem", alignItems: "center",
                  padding: "1rem 1.25rem",
                  background: "var(--surface)", border: "1px solid var(--border-strong)",
                  borderRadius: "var(--radius-lg)",
                }}>
                  {/* Image */}
                  <div style={{ width: 56, height: 56, borderRadius: "var(--radius)", overflow: "hidden", background: "var(--surface-2)", flexShrink: 0 }}>
                    {proj.imageUrl ? (
                      <img src={proj.imageUrl} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-4)", fontSize: "1.25rem" }}>
                        🖼️
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: "var(--text-1)", marginBottom: "0.2rem", fontSize: "var(--text-sm)" }}>{proj.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.4rem" }}>{proj.description}</div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "#60a5fa", display: "flex", alignItems: "center", gap: "3px" }}><Link2 size={10} />GitHub</a>}
                      {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "#86efac", display: "flex", alignItems: "center", gap: "3px" }}><Link2 size={10} />Live</a>}
                      {proj.tags && <span style={{ fontSize: "11px", color: "var(--text-4)" }}>{proj.tags}</span>}
                    </div>
                  </div>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    <button onClick={() => setEditingProj(proj)} title="Edit" style={{ background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.375rem 0.625rem", cursor: "pointer", color: "var(--text-3)", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "12px" }}>
                      <Pencil size={13} /> Edit
                    </button>
                    {deleteConfirm === proj.id ? (
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button onClick={() => handleDeleteProj(proj.id)} style={{ background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "var(--radius)", padding: "0.375rem 0.625rem", cursor: "pointer", color: "#f87171", fontSize: "12px" }}>
                          Confirm
                        </button>
                        <button onClick={() => setDeleteConfirm(null)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.375rem 0.5rem", cursor: "pointer", color: "var(--text-3)" }}>
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(proj.id)} title="Delete" style={{ background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.375rem 0.5rem", cursor: "pointer", color: "var(--text-4)" }}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {adminProjects.length === 0 && (
                <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-4)", border: "1px dashed var(--border)", borderRadius: "var(--radius-xl)" }}>
                  No projects yet. Click "Add Project" to get started.
                </div>
              )}
            </div>

            {projSaved && (
              <div style={{ marginTop: "1rem", padding: "0.625rem 1rem", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "var(--radius)", fontSize: "13px", color: "#86efac", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Check size={14} /> Projects saved successfully!
              </div>
            )}
          </>
        )}
      </div>

      {/* Project modal */}
      {editingProj !== null && (
        <ProjectModal
          project={editingProj === "new" ? null : editingProj}
          onSave={handleSaveProj}
          onClose={() => setEditingProj(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Root export — handles auth gating
// ─────────────────────────────────────────────────────────────────
export function AdminClient() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }

  if (authed === null) return null; // hydrating

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return <AdminDashboard onLogout={handleLogout} />;
}
