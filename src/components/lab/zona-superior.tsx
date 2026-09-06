"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Envuelve el hero y la secuencia para que compartan un mismo fondo y la
 * entrega entre los dos no se sienta como un corte.
 *
 * Publica dos variables al vuelo:
 *   --p   avance de salida del hero (0 quieto, 1 ya se fue)
 *   --pf  opacidad del fondo: entero arriba, se atenua durante la
 *         secuencia y se apaga antes de que termine, para empalmar con
 *         la seccion siguiente sin costura.
 *
 * Las escribe un solo rAF sobre el nodo, no hay estado de React de por
 * medio: la rueda del mouse no dispara renders.
 */

const SALIDA = 0.75; // el hero se retira en tres cuartos de pantalla

export function ZonaSuperior({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "0");
      el.style.setProperty("--pf", "1");
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

      // Avance global de toda la zona (hero + secuencia)
      const total = el.offsetHeight - vh;
      const g = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;

      // El fondo baja al pasar el hero y se apaga en el ultimo tramo
      const cola = g > 0.88 ? Math.max(0, 1 - (g - 0.88) / 0.12) : 1;
      const pf = (1 - p * 0.58) * cola;

      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--pf", pf.toFixed(4));
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
