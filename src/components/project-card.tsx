import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/trabajos/${project.slug}`}
      className="group block"
      aria-label={`Ver caso: ${project.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg-elev">
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover}
            alt={`Vista del proyecto ${project.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-5xl text-fg/10">
              {project.title}
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-xs text-muted backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{project.client}</p>
    </Link>
  );
}
