import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const facts = [
  { k: "Base", v: "Nuevo Chimbote - Perú" },
  { k: "Equipo", v: "Diseño + Código" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {site.heroVideo ? (
        <>
          <video
            aria-hidden
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={site.heroVideo}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/80 to-bg"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "var(--glow)" }}
        />
      )}

      <Container className="relative pb-16 pt-16 sm:pb-24 sm:pt-24">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" />
            Creatividad que conecta
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-7 max-w-4xl text-[2.6rem] leading-[1.03] sm:text-6xl md:text-7xl">
            Diseño y código que{" "}
            <span className="text-accent">hacen crecer</span> tu marca.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Somos un estudio creativo: diseño gráfico, identidad y desarrollo
            web. Ayudamos a emprendedores y marcas a destacar, en un solo equipo
            y con precio cerrado.
          </p>
        </Reveal>

        <Reveal delay={230}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contacto">Cotizar mi proyecto</ButtonLink>
            <ButtonLink href="/trabajos" variant="outline">
              Ver trabajos
            </ButtonLink>
            {site.bookingUrl ? (
              <ButtonLink
                href={site.bookingUrl}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar llamada
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mt-16 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-6">
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
