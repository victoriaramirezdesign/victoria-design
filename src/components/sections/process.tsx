import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <section
      id="proceso"
      className="scroll-mt-24 border-y border-line bg-bg-elev py-24 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" />
            Cómo trabajamos
          </p>
          <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            Claro desde el hola hasta el lanzamiento.
          </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.no}
              delay={i * 70}
              className="flex flex-col bg-bg-elev p-7"
            >
              <span className="font-mono text-xs text-accent">{step.no}</span>
              <h3 className="mt-6 font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
