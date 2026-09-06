import Link from "next/link";
import type { CSSProperties } from "react";
import { PilaProyectos } from "@/components/lab/pila-proyectos";
import { FichaPlan } from "@/components/lab/ficha-plan";
import { VideoCierre } from "@/components/lab/video-cierre";
import { TiltCard } from "@/components/lab/tilt-card";
import { Rail } from "@/components/lab/rail";
import { Counter, Magnetic, Rise, Words } from "@/components/lab/motion";
import { services } from "@/content/services";
import { processSteps } from "@/content/process";
import { packages } from "@/content/packages";
import { site, whatsappLink } from "@/lib/site";

/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="v-portada">
      <div className="v-portada__fijo">
        <div className="v-portada__cont">
          <Rise>
            <p className="v-label flex items-center justify-center gap-4">
              <span className="inline-block h-px w-10 bg-[var(--v-magenta)]" />
              Estudio creativo · Nuevo Chimbote, Perú
            </p>
          </Rise>

          <h1 className="v-display mx-auto mt-9 max-w-[15ch] text-[2.9rem] sm:text-[4.6rem] lg:text-[6rem]">
            <Words text="Tu marca, armada" />
            <Rise as="span" delay={520} className="mt-2">
              <span className="v-grad">capa por capa.</span>
            </Rise>
          </h1>

          <Rise delay={700}>
            <p className="mx-auto mt-9 max-w-lg text-lg leading-relaxed text-[var(--v-fog)]">
              Identidad, diseño y desarrollo web en un solo equipo. Sin
              intermediarios, con precio cerrado y una marca que por fin se ve
              como lo que vale.
            </p>
          </Rise>

          <Rise delay={820}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
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

        <div className="v-portada__cue">
          <span className="v-cue" />
          <span className="v-label v-label--xs">Desliza para ver el proceso</span>
        </div>
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

export function Paquetes() {
  return (
    <section id="paquetes" className="v-planes scroll-mt-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <div className="mb-14 flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Rise>
              <span className="v-pastilla">
                <span className="v-pastilla__punto" />
                Planes
              </span>
            </Rise>
            <Rise delay={100}>
              <h2 className="v-planes__titulo">
                Elige por dónde empezar,
                <br className="hidden sm:block" /> sin costos escondidos.
              </h2>
            </Rise>
          </div>
          <Rise delay={200}>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--v-fog)] sm:text-base">
              Precio cerrado antes de arrancar: sabes cuánto cuesta y qué
              recibes. Nada aparece a mitad de camino.
            </p>
          </Rise>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((plan) => (
            <FichaPlan key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Proyectos() {
  return (
    <section className="relative border-t border-[var(--v-line)] pb-8 pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="v-label">Proyectos culminados</p>
            <h2 className="v-display mt-6 max-w-3xl text-4xl sm:text-6xl">
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

        <div className="mt-14">
          <PilaProyectos />
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
    <section id="siguiente-paso" className="v-cierre">
      <VideoCierre />
      <span className="v-cierre__velo" aria-hidden />
      <span className="v-cierre__base" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="v-label v-cierre__rotulo">Siguiente paso</p>
        <h2 className="v-display mt-8 text-[2.6rem] sm:text-7xl">
          <Words text="¿Tienes un proyecto" />
          <Rise as="span" delay={340} className="mt-2">
            en mente?
          </Rise>
        </h2>
        <Rise delay={480}>
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed sm:text-lg">
            Escríbenos y en 24 horas te respondemos con una idea de alcance,
            tiempos y precio. La primera llamada es gratis.
          </p>
        </Rise>
        <Rise delay={600}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link href="/contacto" className="v-cierre__btn">
                Escribir al estudio
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="v-cierre__btn v-cierre__btn--linea"
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
