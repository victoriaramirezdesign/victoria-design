import Link from "next/link";
import { nav, site, socials, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
            >
              {site.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Navegar</p>
              <ul className="mt-4 space-y-3 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Redes</p>
              <ul className="mt-4 space-y-3 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-fg"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Empezar</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    href="/contacto"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    Cotizar proyecto
                  </Link>
                </li>
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-fg"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Hecho en Peru.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
