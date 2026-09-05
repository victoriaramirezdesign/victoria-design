"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/lab/motion";
import { site } from "@/lib/site";

/**
 * Cortina de entrada: contador 0-100 y el logotipo, luego la cortina
 * sube y deja ver el hero. Con prefers-reduced-motion no se monta.
 */
export function Intro() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const dur = 1300;

    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // La cortina se levanta con un timeout, no con el rAF: en una pestana
    // en segundo plano el rAF se congela y la pagina quedaria tapada.
    const alza = setTimeout(() => setDone(true), dur);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(alza);
      document.body.style.overflow = prev;
    };
  }, [reduced]);

  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    // Se desmonta recien cuando termina la transicion de la cortina.
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, [done]);

  if (gone || reduced) return null;

  return (
    <div className="v-intro" data-done={done} aria-hidden>
      <div className="flex flex-col items-center gap-8">
        <p className="font-wordmark text-2xl uppercase tracking-[0.34em] sm:text-3xl">
          {site.name}
        </p>
        <div className="h-px w-40 overflow-hidden bg-[var(--v-line)]">
          <div
            className="h-full bg-[var(--v-magenta)] transition-[width] duration-100 ease-linear"
            style={{ width: `${n}%` }}
          />
        </div>
        <p className="v-mono text-xs tracking-[0.3em] text-[var(--v-fog-dim)]">
          {String(n).padStart(3, "0")}
        </p>
      </div>
    </div>
  );
}
