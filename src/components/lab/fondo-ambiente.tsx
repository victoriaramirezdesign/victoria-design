"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/lab/motion";

/**
 * Fondo de toda la pagina: el bucle de video queda fijo detras de cada
 * seccion, asi el movimiento no se corta al salir de la portada.
 *
 * La continuidad la da la opacidad, no el corte: entero en la portada,
 * baja a un nivel ambiente para que el contenido se lea, y se apaga del
 * todo al llegar al cierre, que trae su propio video.
 *
 * Autoalojado y comprimido (453 KB). Se pausa con prefers-reduced-motion
 * y si no carga queda el degradado del contenedor.
 */

const SALIDA = 0.75; // pantallas que tarda en bajar al nivel ambiente
const AMBIENTE = 0.16;

export function FondoAmbiente() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const caja = useRef<HTMLDivElement | null>(null);
  const reducido = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (reducido) {
      v.pause();
      return;
    }
    v.play().catch(() => {
      /* sin autoplay queda el primer fotograma */
    });
  }, [reducido]);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;

    let raf = 0;
    let pedido = false;

    const pintar = () => {
      pedido = false;
      const vh = window.innerHeight;
      if (vh <= 0) return;

      // Tramo 1: la portada entrega al nivel ambiente
      const p = Math.min(Math.max(window.scrollY / (vh * SALIDA), 0), 1);
      let amb = 1 - p * (1 - AMBIENTE);

      // Tramo 2: al asomar el cierre, este fondo se retira
      const cierre = document.getElementById("siguiente-paso");
      if (cierre) {
        const r = cierre.getBoundingClientRect();
        const entrada = Math.min(Math.max((vh - r.top) / (vh * 0.6), 0), 1);
        amb *= 1 - entrada;
      }

      el.style.setProperty("--amb", amb.toFixed(4));
    };

    const alScroll = () => {
      if (pedido) return;
      pedido = true;
      raf = requestAnimationFrame(pintar);
    };

    pintar();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    document.addEventListener("visibilitychange", alScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      document.removeEventListener("visibilitychange", alScroll);
    };
  }, []);

  return (
    <div ref={caja} className="v-amb" aria-hidden>
      <video
        ref={ref}
        className="v-amb__mp4"
        src="/video/hero.mp4"
        autoPlay={!reducido}
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <span className="v-amb__vineta" />
    </div>
  );
}
