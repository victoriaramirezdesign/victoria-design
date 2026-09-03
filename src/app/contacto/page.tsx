import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { site, socials, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuentanos sobre tu proyecto. Respondemos en menos de 24 horas habiles con una idea de alcance y precio.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-accent" />
                Contacto
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl leading-[1.03] sm:text-5xl">
                Contanos que tienes en mente.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Completa el formulario o escribinos directo. Leemos todo y
                respondemos en menos de 24 horas habiles.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 space-y-4 border-t border-line pt-8 text-sm">
                <div>
                  <p className="eyebrow">Correo</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow">WhatsApp</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    Escribir por WhatsApp
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Redes</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-fg"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
