import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactCta } from "@/components/sections/contact-cta";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Notas",
  description:
    "Ideas sobre marca, diseño y web para negocios que están creciendo. Escrito por Victoria Design.",
  alternates: { canonical: "/notas" },
};

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NotasPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              Notas
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.03] sm:text-6xl">
              Lo que aprendimos armando marcas.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Ideas prácticas sobre identidad, web y cómo hacer que un negocio
              se vea como lo que es.
            </p>
          </Reveal>

          {posts.length === 0 ? (
            <Reveal delay={200}>
              <div className="mt-16 rounded-2xl border border-dashed border-line bg-bg-elev px-6 py-16 text-center">
                <p className="font-display text-2xl">Pronto.</p>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Estamos preparando las primeras notas. Mientras tanto, mira
                  los trabajos o escríbenos.
                </p>
              </div>
            </Reveal>
          ) : (
            <ul className="mt-16 divide-y divide-line border-t border-line">
              {posts.map((post, i) => (
                <Reveal as="li" key={post.slug} delay={i * 60}>
                  <Link href={`/notas/${post.slug}`} className="group block py-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span className="rounded-full border border-line px-3 py-1">
                        {post.tag}
                      </span>
                      <span className="font-mono">{formatDate(post.date)}</span>
                      <span className="font-mono">
                        {post.readingMinutes} min
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl transition-colors group-hover:text-accent sm:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <ContactCta />
    </>
  );
}
