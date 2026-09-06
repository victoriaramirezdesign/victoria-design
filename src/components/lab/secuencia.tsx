"use client";

import { useEffect, useRef, useState } from "react";
import {
  EscenaCodigo,
  EscenaLogo,
  EscenaPapel,
  EscenaRedes,
  EscenaSitio,
} from "@/components/lab/escenas";
import { WebStack } from "@/components/lab/web-stack";
import { useMediaQuery, useReducedMotion } from "@/components/lab/motion";

/**
 * La secuencia del hero: el visitante mueve la rueda y ve como se arma
 * una marca, de la hoja en blanco al sitio publicado. La seccion queda
 * anclada mientras dura y cada escena se dibuja segun su avance local.
 *
 * En movil o con prefers-reduced-motion no se ancla nada: las escenas
 * se apilan una debajo de otra y se leen con scroll normal.
 */

export const ESCENAS = [
  {
    id: "papel",
    nombre: "Hoja en blanco",
    texto:
      "Empezamos donde empieza todo: sin plantillas y sin ideas prestadas. Una conversación y un lienzo vacío.",
  },
  {
    id: "logo",
    nombre: "El logo toma forma",
    texto:
      "Construimos el símbolo con geometría, no a ojo. Cada trazo tiene una razón y sobrevive a cualquier tamaño.",
  },
  {
    id: "redes",
    nombre: "La marca sale a redes",
    texto:
      "El sistema visual baja a piezas reales: posts, historias y campañas que se reconocen sin leer el nombre.",
  },
  {
    id: "codigo",
    nombre: "Se vuelve código",
    texto:
      "Nada se terceriza. El mismo equipo que diseñó la marca la programa en Next.js, rápida y fácil de mantener.",
  },
  {
    id: "sitio",
    nombre: "El sitio, en vivo",
    texto:
      "Publicamos, medimos y te dejamos todo documentado. Tu negocio ya se ve como lo que vale.",
  },
  {
    id: "todo",
    nombre: "Todo, en un solo equipo",
    texto:
      "Identidad, contenido y desarrollo en la misma mesa. Un solo interlocutor y un precio cerrado.",
  },
] as const;

const N = ESCENAS.length;
const FUNDIDO = 0.22;

export function Secuencia() {
  const seccionRef = useRef<HTMLDivElement | null>(null);
  const escenasRef = useRef<(HTMLDivElement | null)[]>([]);
  const barraRef = useRef<HTMLSpanElement | null>(null);
  const camaraRef = useRef<HTMLDivElement | null>(null);
  const [activa, setActiva] = useState(0);

  const anchoOk = useMediaQuery("(min-width: 1024px)");
  const reducido = useReducedMotion();
  const anclada = anchoOk && !reducido;

  useEffect(() => {
    const seccion = seccionRef.current;
    if (!seccion) return;

    if (!anclada) {
      // Sin anclaje todas las escenas se muestran completas y quietas.
      for (const el of escenasRef.current) {
        if (!el) continue;
        el.style.setProperty("--o", "1");
        el.style.setProperty("--lp", "1");
      }
      return;
    }

    let raf = 0;
    let pedido = false;
    let ultima = -1;

    const pintar = () => {
      pedido = false;
      const rect = seccion.getBoundingClientRect();
      const recorrido = seccion.offsetHeight - window.innerHeight;
      if (recorrido <= 0) return;

      const p = Math.min(Math.max(-rect.top / recorrido, 0), 1);
      const t = p * N;

      for (let i = 0; i < N; i++) {
        const el = escenasRef.current[i];
        if (!el) continue;
        const d = t - i;

        let o = 1;
        if (d < 0) o = 1 + d / FUNDIDO;
        else if (d > 1) o = 1 - (d - 1) / FUNDIDO;
        o = Math.min(Math.max(o, 0), 1);

        // Signo del recorrido: negativo la que viene, positivo la que se va.
        const dd = Math.min(Math.max(d - 0.5, -1), 1);
        // Profundidad: las que no estan al frente se van hacia el fondo.
        const dz = -190 * (1 - o);

        el.style.setProperty("--o", o.toFixed(3));
        el.style.setProperty("--lp", Math.min(Math.max(d, 0), 1).toFixed(3));
        el.style.setProperty("--dd", dd.toFixed(3));
        el.style.setProperty("--dz", dz.toFixed(1));
      }

      if (barraRef.current) barraRef.current.style.transform = `scaleX(${p})`;

      const idx = Math.min(Math.floor(t), N - 1);
      if (idx !== ultima) {
        ultima = idx;
        setActiva(idx);
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
  }, [anclada]);

  // La camara sigue al puntero: da volumen sin robar protagonismo.
  useEffect(() => {
    const cam = camaraRef.current;
    if (!cam) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const alMover = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const bucle = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      cam.style.setProperty("--camx", `${x * 7}deg`);
      cam.style.setProperty("--camy", `${-y * 5}deg`);
      raf = requestAnimationFrame(bucle);
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    raf = requestAnimationFrame(bucle);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", alMover);
    };
  }, []);


  return (
    <div
      ref={seccionRef}
      className="v-seq"
      style={anclada ? { height: `${100 + (N - 1) * 88}vh` } : undefined}
    >
      <div className="v-seq__fijo">
        <div className="v-seq__grid">
          {/* Panel de texto: cambia de escena, no en cada fotograma */}
          <div className="v-seq__texto">
            <p className="v-label flex items-center gap-4">
              <span className="inline-block h-px w-10 bg-[var(--v-magenta)]" />
              El proceso, en vivo
            </p>

            <h2 className="v-display mt-7 text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem]">
              De la hoja en blanco al{" "}
              <span className="v-grad">sitio publicado.</span>
            </h2>

            {/* Los seis pasos siempre a la vista: el activo abre su texto */}
            <ol className="v-seq__pasos">
              {ESCENAS.map((e, i) => (
                <li
                  key={e.id}
                  data-activo={i === activa}
                  data-visto={i < activa}
                >
                  <span className="v-seq__marca" aria-hidden />
                  <div className="v-seq__paso">
                    <p className="v-seq__nombre">
                      <i className="v-mono">{String(i + 1).padStart(2, "0")}</i>
                      {e.nombre}
                    </p>
                    <p className="v-seq__desc">{e.texto}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="v-seq__barra">
              <span ref={barraRef} />
            </div>
          </div>

          {/* Escenario: las seis escenas ocupan el mismo hueco */}
          <div className="v-seq__escenario" data-escena={activa}>
            <span className="v-seq__aura" aria-hidden />
            <div ref={camaraRef} className="v-seq__camara">
            {ESCENAS.map((e, i) => (
              <div
                key={e.id}
                ref={(el) => {
                  escenasRef.current[i] = el;
                }}
                className={`v-seq__escena v-seq__escena--${e.id}`}
              >
                {/* Rotulo visible solo cuando las escenas van apiladas */}
                <p className="v-seq__rotulo v-label v-label--xs">
                  {String(i + 1).padStart(2, "0")} · {e.nombre}
                </p>
                {i === 0 ? <EscenaPapel /> : null}
                {i === 1 ? <EscenaLogo /> : null}
                {i === 2 ? <EscenaRedes /> : null}
                {i === 3 ? <EscenaCodigo /> : null}
                {i === 4 ? <EscenaSitio /> : null}
                {i === 5 ? <WebStack /> : null}
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
