import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/content/projects";

export function FeaturedWork() {
  return (
    <section id="trabajos" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              Proyectos culminados
            </p>
          </div>
          <Link
            href="/trabajos"
            className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            Ver todos
          </Link>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80} className={i % 2 === 1 ? "sm:mt-16" : ""}>
              <ProjectCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
