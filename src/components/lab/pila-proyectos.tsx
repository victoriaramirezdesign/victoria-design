"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { projects } from "@/content/projects";
import paletas from "@/content/palettes.json";

/**
 * Fichas de proyecto que se apilan: cada una se queda pegada arriba y se
 * va encogiendo mientras la siguiente sube por encima. El avance sale del
 * scroll de la seccion, sin librerias de animacion.
 *
 * Cada ficha usa material real del cliente: la portada, un recorte de
 * detalle del logotipo y su paleta extraida del propio archivo.
 */

const fichas = projects.filter((p) => p.featured).slice(0, 4);
const ESCALON = 0.055;

export function PilaProyectos() {
  const seccion = useRef<HTMLDivElement | null>(null);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const sec = seccion.current;
    if (!sec) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pedido = false;
    const n = fichas.length;

    const pintar = () => {
      pedido = false;
      const rect = sec.getBoundingClientRect();
      const recorrido = sec.offsetHeight - window.innerHeight;
      if (recorrido <= 0) return;

      const p = Math.min(Math.max(-rect.top / recorrido, 0), 1);

      for (let i = 0; i < n; i++) {
        const el = items.current[i];
        if (!el) continue;
        // Cada ficha se encoge mientras las de despues van subiendo
        const local = Math.min(Math.max(p * (n - 1) - i, 0), 1);
        el.style.setProperty("--s", (1 - local * ESCALON).toFixed(4));
        el.style.setProperty("--dim", (local * 0.35).toFixed(3));
      }
    };

    const alScroll = () => {
      if (pedido) return;
      pedido = true;
      raf = requestAnimationFrame(pintar);
    };

    pintar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    // Volviendo de una pestana en segundo plano el rAF estuvo congelado:
    // hay que repintar o los valores se quedan viejos.
    document.addEventListener("visibilitychange", alScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      document.removeEventListener("visibilitychange", alScroll);
    };
  }, []);

  return (
    <div ref={seccion} className="v-pila">
      {fichas.map((p, i) => {
        const colores =
          (paletas as Record<string, string[]>)[p.slug] ?? ["#d24da8"];
        return (
          <div key={p.slug} className="v-pila__hueco">
            <article
              ref={(el) => {
                items.current[i] = el;
              }}
              className="v-pila__ficha"
              style={{ "--top": `${i * 26}px` } as CSSProperties}
            >
              <div className="v-pila__cab">
                <span className="v-pila__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="v-pila__titulo">
                  <p className="v-label v-label--xs">{p.category}</p>
                  <h3 className="v-display mt-2 text-2xl sm:text-4xl">
                    {p.title}
                  </h3>
                </div>
                <Link href={`/trabajos/${p.slug}`} className="v-pila__boton">
                  Ver caso
                </Link>
              </div>

              <div className="v-pila__medios">
                <div className="v-pila__col1">
                  <span className="v-pila__img v-pila__img--detalle">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/trabajos/${p.slug}/detail.png`}
                      alt=""
                      aria-hidden
                      loading="lazy"
                    />
                  </span>
                  <span className="v-pila__paleta">
                    {colores.map((c) => (
                      <i key={c} style={{ background: c }} title={c} />
                    ))}
                  </span>
                </div>
                <span className="v-pila__img v-pila__img--portada">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={`Logotipo de ${p.title}`}
                    loading="lazy"
                  />
                </span>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
