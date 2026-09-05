"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor propio: un punto que persigue al puntero con inercia y se
 * agranda sobre lo interactivo. Solo se activa con mouse real; en
 * tactil no se monta y el cursor del sistema queda intacto.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    el.style.opacity = "1";
    // Solo escondemos el cursor del sistema si el nuestro corre de verdad.
    const root = el.closest(".vd3d") as HTMLElement | null;
    if (root) root.style.cursor = "none";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as Element | null;
      el.dataset.grow = target?.closest?.("a, button, [data-cursor]")
        ? "true"
        : "false";
    };

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      el.style.opacity = "0";
      if (root) root.style.cursor = "";
    };
  }, []);

  return <div ref={ref} aria-hidden className="v-cursor" style={{ opacity: 0 }} />;
}
