import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Trabajos",
  description:
    "Casos de identidad de marca, sitios web y tiendas online hechos por Victoria Design.",
  alternates: { canonical: "/trabajos" },
};

export default function TrabajosPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              Portafolio
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.03] sm:text-6xl">
              Cada proyecto, una marca que decidio verse en serio.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Una seleccion de trabajos de diseno y desarrollo. Los casos con
              contenido de ejemplo se reemplazan a medida que publicamos los
              reales.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal
                key={project.slug}
                delay={(i % 2) * 60}
                className={i % 2 === 1 ? "sm:mt-16" : ""}
              >
                <ProjectCard project={project} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  );
}
