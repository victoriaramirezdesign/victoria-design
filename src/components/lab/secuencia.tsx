"use client";

import { useEffect, useRef, useState } from "react";
import {
  EscenaCodigo,
  EscenaKit,
  EscenaLogo,
  EscenaPapel,
  EscenaRedes,
  EscenaSitio,
} from "@/components/lab/escenas";
import { useMediaQuery, useReducedMotion } from "@/components/lab/motion";
import paletas from "@/content/palettes.json";

/**
 * El proceso, en vivo.
 *
 * Modelo: en vez de un panel con un escenario al lado, las seis escenas
 * viven en un mismo espacio 3D, escalonadas en profundidad. Al mover la
 * rueda la camara avanza por ellas: la activa queda al frente y nitida,
 * las que vienen se ven detras (mas chicas y desenfocadas) y las ya
 * vistas pasan de largo. Se ve el recorrido completo, no solo el paso
 * actual.
 *
 * En movil o con prefers-reduced-motion no se ancla nada: las escenas se
 * apilan con su rotulo y se leen con scroll normal.
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
    id: "kit",
    nombre: "El kit, entregado",
    texto:
      "Te llevas el sistema completo: logotipo y variantes, paleta, tipografía y el sitio. Tuyo, documentado y listo para crecer.",
  },
] as const;

const N = ESCENAS.length;
/** Separacion entre escenas dentro del espacio 3D. */
const PASO_Z = 520;

export function Secuencia() {
  const seccionRef = useRef<HTMLDivElement | null>(null);
  const escenasRef = useRef<(HTMLDivElement | null)[]>([]);
  const pistaRef = useRef<HTMLSpanElement | null>(null);
  const [activa, setActiva] = useState(0);

  const anchoOk = useMediaQuery("(min-width: 1024px)");
  const reducido = useReducedMotion();
  const anclada = anchoOk && !reducido;

  useEffect(() => {
    const seccion = seccionRef.current;
    if (!seccion) return;

    if (!anclada) {
      for (const el of escenasRef.current) {
        if (!el) continue;
        el.style.cssText = "";
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
      // Posicion continua de la camara sobre la fila de escenas
      const t = p * (N - 1);

      for (let i = 0; i < N; i++) {
        const el = escenasRef.current[i];
        if (!el) continue;

        // Distancia con signo: negativa las ya vistas, positiva las que vienen
        const rel = i - t;

        // Profundidad y desplazamiento: no basta con escalonarlas en Z,
        // la del frente taparia a las demas. Se corren en diagonal para
        // que asomen y se vea el recorrido completo.
        el.style.setProperty("--z", (-rel * PASO_Z).toFixed(1));
        el.style.setProperty("--rel", rel.toFixed(3));

        // Las que quedaron atras se van; las muy lejanas todavia no entran
        let o = 1;
        if (rel < 0) o = 1 + rel / 0.55;
        else if (rel > 2.2) o = 1 - (rel - 2.2) / 0.8;
        o = Math.min(Math.max(o, 0), 1);
        el.style.setProperty("--o", o.toFixed(3));
        // Invisible no basta: con opacidad 0 el filtro se sigue pagando
        el.style.visibility = o > 0.01 ? "" : "hidden";

        // Desenfoque de profundidad: solo la del frente queda nitida
        const desenfoque = Math.min(Math.abs(rel) * 3.4, 7);
        el.style.setProperty("--blur", desenfoque.toFixed(2));

        // Avance dentro de la escena, para lo que se dibuja solo
        el.style.setProperty(
          "--lp",
          Math.min(Math.max(1 - Math.abs(rel) * 1.4, 0), 1).toFixed(3),
        );
      }

      if (pistaRef.current) {
        pistaRef.current.style.transform = `scaleX(${p})`;
      }

      const idx = Math.min(Math.round(t), N - 1);
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
    document.addEventListener("visibilitychange", alScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      document.removeEventListener("visibilitychange", alScroll);
    };
  }, [anclada]);

  const paleta = (paletas as Record<string, string[]>)["reyes-odontologia"] ?? [
    "#d24da8",
  ];
  const escena = ESCENAS[activa];

  return (
    <div
      ref={seccionRef}
      className="v-cine"
      style={anclada ? { height: `${100 + (N - 1) * 92}vh` } : undefined}
    >
      <div className="v-cine__fijo">
        {/* Espacio 3D: las seis escenas escalonadas hacia el fondo */}
        <div className="v-cine__espacio" data-escena={activa}>
          <span className="v-cine__aura" aria-hidden />
          {ESCENAS.map((e, i) => (
            <div
              key={e.id}
              ref={(el) => {
                escenasRef.current[i] = el;
              }}
              className={`v-cine__escena v-cine__escena--${e.id}`}
            >
              <p className="v-cine__rotulo v-label v-label--xs">
                {String(i + 1).padStart(2, "0")} · {e.nombre}
              </p>
              {i === 0 ? <EscenaPapel /> : null}
              {i === 1 ? <EscenaLogo /> : null}
              {i === 2 ? <EscenaRedes /> : null}
              {i === 3 ? <EscenaCodigo /> : null}
              {i === 4 ? <EscenaSitio /> : null}
              {i === 5 ? <EscenaKit colores={paleta} /> : null}
            </div>
          ))}
        </div>

        {/* Rotulo de la escena al frente */}
        <div className="v-cine__hud">
          <p className="v-label flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-[var(--v-magenta)]" />
            El proceso, en vivo
          </p>
          <div className="v-cine__paso" key={escena.id}>
            <span className="v-cine__num">
              {String(activa + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="v-cine__titulo">{escena.nombre}</h2>
              <p className="v-cine__desc">{escena.texto}</p>
            </div>
          </div>
        </div>

        {/* Pista de avance con los seis tramos */}
        <div className="v-cine__pista" aria-hidden>
          {ESCENAS.map((e, i) => (
            <i key={e.id} data-visto={i <= activa} />
          ))}
          <span ref={pistaRef} className="v-cine__pistaFill" />
        </div>
      </div>
    </div>
  );
}
