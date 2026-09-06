"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Envuelve el hero y la secuencia. Publica --p, el avance de salida de la
 * portada (0 quieto, 1 ya se fue), que la portada usa para retirarse sola
 * mientras la secuencia entra por abajo.
 *
 * Lo escribe un solo rAF sobre el nodo, sin estado de React: la rueda del
 * mouse no dispara renders.
 */

const SALIDA = 0.75; // el hero se retira en tres cuartos de pantalla

export function ZonaSuperior({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0");
      return;
    }

    let raf = 0;
    let pedido = false;

    const pintar = () => {
      pedido = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Hay momentos del ciclo de vida en que el navegador reporta 0 de
      // alto. Sin este corte saldria NaN y las variables romperian el
      // calc() de opacidad, dejando el hero invisible.
      if (vh <= 0) return;

      // Salida del hero
      const p = Math.min(Math.max(-rect.top / (vh * SALIDA), 0), 1);

      el.style.setProperty("--p", p.toFixed(4));
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
    <div ref={ref} className="v-top">
      {children}
    </div>
  );
}
