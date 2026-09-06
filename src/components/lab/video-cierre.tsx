"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/lab/motion";

/**
 * Video del cierre. Solo arranca cuando la seccion asoma: no tiene
 * sentido decodificarlo mientras el visitante esta arriba del todo.
 *
 * Va con `object-top` y 130% de alto, como pedia el modelo: el punto de
 * interes queda arriba y el paisaje desborda por abajo.
 */
export function VideoCierre() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const reducido = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (reducido) {
      v.pause();
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            v.play().catch(() => {
              /* sin autoplay queda el primer fotograma */
            });
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0, rootMargin: "20% 0px" },
    );
    io.observe(v);

    return () => io.disconnect();
  }, [reducido]);

  return (
    <video
      ref={ref}
      className="v-cierre__mp4"
      src="/video/cierre.mp4"
      loop
      muted
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    />
  );
}
