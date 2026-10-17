import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { ProjectDetailClient } from "./ProjectDetailClient";

// ── Static Params (SSG) ────────────────────────────────────────
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// ── Metadata ───────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.tagline,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
  });
}

// ── Page (Server Component — data only) ───────────────────────
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
