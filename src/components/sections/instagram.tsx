import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { instagramTiles } from "@/content/instagram";
import { socials } from "@/lib/site";

const instagramUrl =
  socials.find((s) => s.label === "Instagram")?.href ??
  "https://www.instagram.com/victoriadesign.pe/";

export function Instagram() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              En redes
            </p>
            <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
              Lo ultimo del estudio.
            </h2>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            @victoriadesign.pe
          </a>
        </div>

        {instagramTiles.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {instagramTiles.slice(0, 8).map((tile, i) => (
              <Reveal key={tile.href} delay={i * 50}>
                <a
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block aspect-square overflow-hidden rounded-xl border border-line bg-bg-elev"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tile.image}
                    alt={tile.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={80}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-bg-elev px-6 py-16 text-center transition-colors hover:border-accent"
            >
              <span className="font-display text-2xl">
                Segui el dia a dia en Instagram
              </span>
              <span className="text-sm text-muted">
                Piezas, procesos y trabajos nuevos cada semana.
              </span>
            </a>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
