"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/lab/motion";

/**
 * Fondo de la portada: un bucle de vídeo a pantalla completa.
 *
 * El archivo esta autoalojado en /public/video para no depender de un CDN
 * ajeno que puede desaparecer. Se pausa fuera de pantalla (no tiene
 * sentido decodificar 1924x1076 cuando nadie lo ve) y con
 * prefers-reduced-motion se queda en el primer fotograma.
 *
 * Si el vídeo no carga, debajo queda el degradado del contenedor: la
 * portada nunca se ve rota.
 */
export function FondoVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const reducido = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (reducido) {
      v.pause();
      return;
    }

    // Algunos navegadores ignoran el autoplay hasta que se pide a mano.
    const arrancar = () => {
      v.play().catch(() => {
        /* sin reproduccion automatica: queda el primer fotograma */
      });
    };
    arrancar();

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) arrancar();
          else v.pause();
        }
      },
      { threshold: 0 },
    );
    io.observe(v);

    return () => io.disconnect();
  }, [reducido]);

  return (
    <div className="v-video">
      <video
        ref={ref}
        className="v-video__mp4"
        src="/video/hero.mp4"
        // El atributo arranca la reproduccion sin esperar al efecto; si
        // hay prefers-reduced-motion, el efecto la pausa enseguida.
        autoPlay={!reducido}
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
      />
      <span className="v-video__vineta" aria-hidden />
      <span className="v-video__base" aria-hidden />
    </div>
  );
}
