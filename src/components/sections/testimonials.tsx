import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  // Hasta que existan testimonios reales, la seccion no se muestra.
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" />
            Lo que dicen
          </p>
          <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            Clientes que ya pasaron por aca.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.author}
              delay={i * 70}
              className="flex flex-col rounded-2xl border border-line bg-bg-elev p-7"
            >
              <p className="flex-1 font-display text-lg leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-bg">
                  {t.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photo}
                      alt={t.author}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-sm text-fg/30">
                      {t.author.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
