"use client";

import { useEffect, useState } from "react";
import { marcarListo, useReducedMotion } from "@/components/lab/motion";
import { site } from "@/lib/site";

/**
 * Cortina de entrada. Tres tiempos, para que no se sienta un simple
 * fundido: el contador llega a 100, el nucleo (logotipo + barra) se va
 * hacia arriba, y recien entonces la cortina sube en dos planos con un
 * filo magenta. Al arrancar la subida se avisa al resto de la pagina
 * (marcarListo) para que el hero entre justo detras, no antes.
 *
 * Con prefers-reduced-motion no se monta y la pagina se revela de una.
 */

const CUENTA = 1100;
const SALIDA = 260; // el nucleo se retira antes de que suba la cortina

export function Intro() {
  const [n, setN] = useState(0);
  const [saliendo, setSaliendo] = useState(false);
  const [alzando, setAlzando] = useState(false);
  const [fuera, setFuera] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      marcarListo();
      return;
    }

    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf = 0;
    const inicio = performance.now();

    const tick = (ahora: number) => {
      const p = Math.min((ahora - inicio) / CUENTA, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Los tiempos van por setTimeout y no por rAF: en una pestana en
    // segundo plano el rAF se congela y la cortina no se levantaria.
    const t1 = setTimeout(() => setSaliendo(true), CUENTA);
    const t2 = setTimeout(() => setAlzando(true), CUENTA + SALIDA);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = previo;
    };
  }, [reduced]);

  useEffect(() => {
    if (!alzando) return;
    document.body.style.overflow = "";
    // El hero arranca su entrada con la cortina ya en movimiento.
    marcarListo();
    const t = setTimeout(() => setFuera(true), 1500);
    return () => clearTimeout(t);
  }, [alzando]);

  if (fuera || reduced) return null;

  return (
    <div className="v-intro" data-alzando={alzando} aria-hidden>
      {/* Dos planos: el de atras sale un pelo despues y da profundidad */}
      <span className="v-intro__plano v-intro__plano--b" />
      <span className="v-intro__plano v-intro__plano--a" />

      <div className="v-intro__nucleo" data-saliendo={saliendo}>
        <p className="v-intro__marca">{site.name}</p>
        <span className="v-intro__barra">
          <i style={{ transform: `scaleX(${n / 100})` }} />
        </span>
        <p className="v-intro__num">{String(n).padStart(3, "0")}</p>
      </div>
    </div>
  );
}
