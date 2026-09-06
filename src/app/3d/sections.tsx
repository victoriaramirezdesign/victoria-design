import Link from "next/link";
import type { CSSProperties } from "react";
import { ShaderField } from "@/components/lab/shader-field";
import { WebStack, WebStackLeyenda } from "@/components/lab/web-stack";
import { TiltCard } from "@/components/lab/tilt-card";
import { Rail } from "@/components/lab/rail";
import { Counter, Magnetic, Rise, Words } from "@/components/lab/motion";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { projects } from "@/content/projects";
import { site, whatsappLink } from "@/lib/site";

const vitrina = projects.slice(0, 6);

/* ------------------------------------------------------------------ */

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="v-navveil pointer-events-none absolute inset-x-0 top-0 h-32"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/3d"
          className="font-wordmark text-sm uppercase tracking-[0.28em] transition-opacity hover:opacity-70"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-xs text-[var(--v-fog)] transition-colors hover:text-[var(--v-white)] sm:block"
          >
            Volver al sitio actual
          </Link>
          <Magnetic strength={0.25}>
            <Link href="/contacto" className="v-btn v-btn--ghost v-btn--sm">
              Conversemos
            </Link>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ShaderField />
      </div>
      {/* Velo que oscurece el lado del titular para que el texto respire */}
      <div className="v-scrim pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[var(--v-ink)] to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 pb-20 pt-28 sm:gap-12 sm:px-8 sm:pb-24 sm:pt-32 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:pb-28 lg:pt-36">
        <div>
          <Rise>
            <p className="v-label flex items-center gap-4">
              <span className="inline-block h-px w-10 bg-[var(--v-magenta)]" />
              Estudio creativo · Nuevo Chimbote, Perú
            </p>
          </Rise>

          <h1 className="v-display mt-7 max-w-[14ch] sm:mt-9 text-[2.8rem] sm:text-[4.4rem] lg:text-[5.4rem]">
            <Words text="Tu marca, armada" />
            <Rise as="span" delay={520} className="mt-2">
              <span className="v-grad">capa por capa.</span>
            </Rise>
          </h1>

          <Rise delay={700}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--v-fog)] sm:mt-8">
              Identidad, diseño y desarrollo web en un solo equipo. Sin
              intermediarios, con precio cerrado y una marca que por fin se ve
              como lo que vale.
            </p>
          </Rise>

          <Rise delay={820}>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-11">
              <Magnetic>
                <Link href="/contacto" className="v-btn v-btn--solid">
                  Iniciar proyecto
                  <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/trabajos" className="v-btn v-btn--ghost">
                  Ver los 18 trabajos
                </Link>
              </Magnetic>
            </div>
          </Rise>
        </div>

        {/* La maqueta 3D: lo que hacemos, no un adorno abstracto */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <WebStack />
          <Rise delay={1100}>
            <WebStackLeyenda />
          </Rise>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-4 sm:flex">
        <span className="v-cue" />
        <span className="v-label v-label--xs">Desliza</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Manifiesto() {
  return (
    <section className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="v-display text-[1.9rem] leading-[1.15] sm:text-[3rem] lg:text-[3.6rem]">
          <Words text="No hacemos páginas bonitas." />{" "}
          <span className="text-[var(--v-fog-dim)]">
            <Words
              text="Construimos la primera impresión de tu negocio: la que decide si te compran o te ignoran."
              offset={4}
            />
          </span>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Servicios() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="v-label">Qué hacemos</p>
            <h2 className="v-display mt-6 text-4xl sm:text-6xl">
              <Words text="Todo el recorrido de tu marca." />
            </h2>
          </div>
          <Rise delay={200}>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--v-fog-dim)]">
              Cuatro frentes, un mismo equipo. Nada se terceriza y nada se
              pierde en el camino.
            </p>
          </Rise>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Rise key={service.no} delay={i * 90} className="h-full">
              <TiltCard className="v-glass h-full p-8 sm:p-10">
                <div
                  className="v-depth relative"
                  style={{ "--z": "34px" } as CSSProperties}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="v-mono text-xs text-[var(--v-magenta)]">
                      {service.no}
                    </span>
                    <span className="v-label v-label--xs">
                      {String(i + 1).padStart(2, "0")} / 04
                    </span>
                  </div>

                  <h3 className="v-display mt-10 text-2xl sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--v-fog)]">
                    {service.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-[var(--v-line)] px-3 py-1 text-[0.7rem] text-[var(--v-fog-dim)]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Proceso() {
  return (
    <section className="relative border-y border-[var(--v-line)] py-10">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-14 sm:px-8">
        <p className="v-label">Cómo trabajamos</p>
        <h2 className="v-display mt-6 max-w-2xl text-4xl sm:text-6xl">
          <Words text="Claro desde el hola hasta el lanzamiento." />
        </h2>
      </div>

      <Rail className="relative">
        {processSteps.map((step, i) => (
          <article
            key={step.no}
            className="v-glass v-edge relative flex w-[82vw] max-w-[30rem] shrink-0 snap-center flex-col justify-between rounded-[1.75rem] p-9 sm:w-[36rem] sm:p-12"
            style={{ minHeight: "24rem" }}
          >
            <div className="flex items-center justify-between">
              <span className="v-display text-6xl text-[var(--v-line-strong)] sm:text-8xl">
                {step.no}
              </span>
              <span
                className="v-breathe size-2 rounded-full bg-[var(--v-magenta)]"
                style={{ animationDelay: `${i * 400}ms` }}
                aria-hidden
              />
            </div>
            <div>
              <h3 className="v-display text-3xl sm:text-4xl">{step.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--v-fog)]">
                {step.body}
              </p>
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Trabajos() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="v-label">Proyectos culminados</p>
            <h2 className="v-display mt-6 text-4xl sm:text-6xl">
              <Words text="18 marcas que decidieron verse en serio." />
            </h2>
          </div>
          <Magnetic strength={0.2}>
            <Link
              href="/trabajos"
              className="text-sm text-[var(--v-fog)] underline decoration-[var(--v-line-strong)] underline-offset-8 transition-colors hover:text-[var(--v-white)] hover:decoration-[var(--v-magenta)]"
            >
              Ver todos
            </Link>
          </Magnetic>
        </div>

        <div className="v-stage mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vitrina.map((project, i) => (
            <Rise key={project.slug} delay={(i % 3) * 110}>
              <Link
                href={`/trabajos/${project.slug}`}
                className="group block"
                aria-label={`Ver ${project.title}`}
              >
                <TiltCard className="v-glass p-3" max={10}>
                  <div className="overflow-hidden rounded-[1.25rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover}
                      alt={`Logotipo de ${project.title}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-5">
                    <h3 className="font-display text-base transition-colors group-hover:text-[var(--v-magenta)]">
                      {project.title}
                    </h3>
                    <span className="v-mono text-[0.65rem] text-[var(--v-fog-dim)]">
                      {project.year ?? "—"}
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const cifras = [
  { valor: 18, sufijo: "", label: "Marcas acompañadas" },
  { valor: 9, sufijo: "", label: "Años de trabajo" },
  { valor: 4, sufijo: "", label: "Servicios integrados" },
  { valor: 24, sufijo: " h", label: "Tiempo de respuesta" },
];

export function Cifras() {
  return (
    <section className="relative border-y border-[var(--v-line)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-[var(--v-line)] lg:grid-cols-4">
        {cifras.map((c, i) => (
          <div key={c.label} className="bg-[var(--v-ink)] px-6 py-14 sm:px-10">
            <Rise delay={i * 90}>
              <p className="v-display text-5xl sm:text-7xl">
                <span className="v-grad">
                  <Counter to={c.valor} />
                  {c.sufijo}
                </span>
              </p>
              <p className="v-label v-label--xs mt-5">{c.label}</p>
            </Rise>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Cta() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div
        aria-hidden
        className="v-breathe pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--v-glow-magenta), var(--v-glow-violet) 45%, transparent 70%)",
        }}
      />
      <div className="v-grid pointer-events-none absolute inset-0 -z-10 opacity-25" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="v-label">Siguiente paso</p>
        <h2 className="v-display mt-8 text-[2.6rem] sm:text-7xl">
          <Words text="¿Tienes un proyecto" />
          <Rise as="span" delay={340} className="mt-2">
            <span className="v-grad">en mente?</span>
          </Rise>
        </h2>
        <Rise delay={480}>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-[var(--v-fog)] sm:text-lg">
            Escríbenos y en 24 horas te respondemos con una idea de alcance,
            tiempos y precio. La primera llamada es gratis.
          </p>
        </Rise>
        <Rise delay={600}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link href="/contacto" className="v-btn v-btn--solid">
                Escribir al estudio
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="v-btn v-btn--ghost"
              >
                WhatsApp
              </a>
            </Magnetic>
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Pie() {
  return (
    <footer className="border-t border-[var(--v-line)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-wordmark text-xl uppercase tracking-[0.28em]">
            {site.name}
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--v-fog-dim)]">
            Borrador de concepto 3D. El sitio en producción vive en{" "}
            <Link
              href="/"
              className="underline decoration-[var(--v-line-strong)] underline-offset-4 transition-colors hover:text-[var(--v-white)]"
            >
              {site.domain}
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-[var(--v-fog)]">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-[var(--v-white)]"
          >
            {site.email}
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--v-white)]"
          >
            WhatsApp
          </a>
          <Link href="/" className="transition-colors hover:text-[var(--v-white)]">
            Sitio actual
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export function BadgeBorrador() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-50 hidden sm:block">
      <span className="v-glass v-label v-label--xs v-label--soft rounded-full px-4 py-2">
        Borrador · concepto
      </span>
    </div>
  );
}
