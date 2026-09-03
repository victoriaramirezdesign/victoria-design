import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container className="text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mx-auto mt-5 max-w-xl text-4xl leading-[1.05] sm:text-5xl">
          Esta pagina no existe (todavia).
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          El enlace puede estar roto o la pagina se movio. Volvamos a lo seguro.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Ir al inicio</ButtonLink>
          <ButtonLink href="/trabajos" variant="outline">
            Ver trabajos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
