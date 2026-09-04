import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { packages } from "@/content/packages";

export function Packages() {
  if (packages.length === 0) return null;

  return (
    <section
      id="paquetes"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" />
            Como trabajamos contigo
          </p>
          <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            Elige por donde empezar.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Cada proyecto se cotiza cerrado: sabes cuanto cuesta y que recibes
            antes de empezar. Sin costos que aparecen a mitad de camino.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.name}
              delay={i * 80}
              className={`flex flex-col rounded-2xl border p-7 ${
                pkg.highlighted
                  ? "border-accent bg-bg-elev"
                  : "border-line bg-bg-elev"
              }`}
            >
              {pkg.highlighted ? (
                <span className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-fg">
                  Mas pedido
                </span>
              ) : null}

              <h3 className="font-display text-2xl">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pkg.tagline}
              </p>

              <p className="mt-6 font-display text-3xl">
                {pkg.price === null ? (
                  <span className="text-fg">Segun proyecto</span>
                ) : (
                  <>
                    <span className="text-base text-muted">desde </span>
                    <span className="text-accent">
                      S/ {pkg.price.toLocaleString("es-PE")}
                    </span>
                  </>
                )}
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6 text-sm">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-3 text-muted">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/contacto"
                variant={pkg.highlighted ? "solid" : "outline"}
                className="mt-8 w-full"
              >
                Cotizar
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
