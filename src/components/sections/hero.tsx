import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const facts = [
  { k: "Base", v: "Peru" },
  { k: "Equipo", v: "Diseno + Codigo" },
  { k: "Formato", v: "Precio cerrado" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Glow de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
      />

      <Container className="relative pb-16 pt-16 sm:pb-24 sm:pt-24">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" />
            Estudio de diseno y desarrollo
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-7 max-w-4xl text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl">
            Diseno y codigo que{" "}
            <em className="font-display not-italic text-accent">hacen crecer</em>{" "}
            <span className="italic">tu marca</span>.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Somos un duo: una disenadora y un programador. Creamos la marca, el
            sitio y las piezas que tu negocio necesita para vender, en un solo
            equipo y con un precio claro.
          </p>
        </Reveal>

        <Reveal delay={230}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contacto">Cotizar mi proyecto</ButtonLink>
            <ButtonLink href="/trabajos" variant="outline">
              Ver trabajos
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="eyebrow">{f.k}</dt>
                <dd className="mt-1 font-display text-lg">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
