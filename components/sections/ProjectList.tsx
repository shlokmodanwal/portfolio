import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { featuredProjects } from "@/data/projects";

export function ProjectList() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-heading">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <SectionHeading
          label="Selected Work"
          title="Projects"
          className="mb-0"
        />
        <Link
          href="/projects"
          className="link hidden sm:inline-flex items-center gap-1.5 shrink-0 ml-8"
        >
          All projects
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Mobile all projects link */}
      <div className="mt-8 sm:hidden">
        <Link
          href="/projects"
          className="link inline-flex items-center gap-1.5"
        >
          View all projects
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
