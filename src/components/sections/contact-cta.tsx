import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site, whatsappLink } from "@/lib/site";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-14rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--glow)" }}
      />
      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow">Siguiente paso</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Tienes un proyecto en mente?{" "}
            <span className="text-accent">Contanos.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Escribinos y en 24 horas te respondemos con una idea de alcance,
            tiempos y precio. La primera llamada es gratis.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contacto">Escribir al estudio</ButtonLink>
            <ButtonLink
              href={whatsappLink}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </ButtonLink>
            {site.bookingUrl ? (
              <ButtonLink
                href={site.bookingUrl}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar llamada
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
