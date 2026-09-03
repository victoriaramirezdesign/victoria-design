import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/sections/contact-cta";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/trabajos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/trabajos/${project.slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/trabajos/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <article className="py-16 sm:py-24">
        <Container>
          <Link
            href="/trabajos"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            &larr; Todos los trabajos
          </Link>

          <header className="mt-8 border-b border-line pb-10">
            <p className="eyebrow">{project.category}</p>
            <h1 className="mt-4 text-4xl leading-[1.03] sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {project.summary}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <dt className="eyebrow">Cliente</dt>
                <dd className="mt-1 text-sm">{project.client}</dd>
              </div>
              <div>
                <dt className="eyebrow">Ano</dt>
                <dd className="mt-1 text-sm">{project.year}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow">Servicios</dt>
                <dd className="mt-1 text-sm">{project.services.join(", ")}</dd>
              </div>
            </dl>
          </header>

          <div className="mt-10 flex aspect-[16/9] items-center justify-center rounded-2xl border border-line bg-bg-elev">
            <span className="font-display text-5xl text-fg/10">
              {project.title}
            </span>
          </div>

          {project.results && project.results.length > 0 ? (
            <div className="mt-14 grid gap-8 sm:grid-cols-2">
              {project.results.map((r) => (
                <div key={r.label} className="border-t border-line pt-5">
                  <p className="font-display text-4xl text-accent">{r.value}</p>
                  <p className="mt-1 text-sm text-muted">{r.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          <p className="mt-14 max-w-2xl text-sm leading-relaxed text-muted">
            {/* TODO(contenido): caso de estudio completo (reto, proceso,
            resultado) con imagenes reales del proyecto. */}
            El caso de estudio detallado de este proyecto esta en preparacion.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <ButtonLink href="/contacto">Quiero algo asi</ButtonLink>
            <Link
              href={`/trabajos/${next.slug}`}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Siguiente: {next.title} &rarr;
            </Link>
          </div>
        </Container>
      </article>
      <ContactCta />
    </>
  );
}
