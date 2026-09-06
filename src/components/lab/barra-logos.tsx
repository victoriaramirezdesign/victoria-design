"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/content/projects";

/**
 * Barra de movimiento con los logos de clientes. Dos filas que corren en
 * sentidos opuestos segun la posicion del scroll (no en bucle infinito:
 * el avance lo manda la rueda, asi la seccion se siente viva pero no
 * distrae cuando esta quieta).
 */

const mitad = Math.ceil(projects.length / 2);
const fila1 = projects.slice(0, mitad);
const fila2 = projects.slice(mitad);

function Tira({
  items,
  refFila,
}: {
  items: typeof projects;
  refFila: React.RefObject<HTMLDivElement | null>;
}) {
  // Triplicamos para que nunca se vea el final de la tira
  const triple = [...items, ...items, ...items];
  return (
    <div ref={refFila} className="v-barra__tira">
      {triple.map((p, i) => (
        <span key={`${p.slug}-${i}`} className="v-barra__tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/trabajos/${p.slug}/thumb.png`}
            alt={`Logotipo de ${p.title}`}
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}

export function BarraLogos() {
  const seccion = useRef<HTMLDivElement | null>(null);
  const r1 = useRef<HTMLDivElement | null>(null);
  const r2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sec = seccion.current;
    if (!sec) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pedido = false;

    const pintar = () => {
      pedido = false;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const avance = (window.scrollY - top + window.innerHeight) * 0.3;
      if (r1.current) {
        r1.current.style.transform = `translate3d(${avance - 200}px, 0, 0)`;
      }
      if (r2.current) {
        r2.current.style.transform = `translate3d(${-(avance - 200)}px, 0, 0)`;
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

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <section ref={seccion} className="v-barra" aria-label="Clientes del estudio">
      <Tira items={fila1} refFila={r1} />
      <Tira items={fila2} refFila={r2} />
      <div className="v-barra__velo v-barra__velo--izq" aria-hidden />
      <div className="v-barra__velo v-barra__velo--der" aria-hidden />
    </section>
  );
}
