import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/content/services";

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              Qué hacemos
            </p>
            <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl">
              Un equipo, todo el recorrido de tu marca.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              No tercerizamos. Diseño y desarrollo trabajan juntos desde el
              primer día, así nada se pierde en el camino.
            </p>
          </div>

          <ul className="divide-y divide-line border-t border-line">
            {services.map((service, i) => (
              <Reveal as="li" key={service.no} delay={i * 60} className="py-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent">
                    {service.no}
                  </span>
                  <h3 className="font-display text-2xl">{service.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
