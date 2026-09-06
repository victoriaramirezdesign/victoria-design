"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/content/projects";

/**
 * Maqueta 3D de lo que vende el estudio: un sitio web desarmado en las
 * capas con las que se construye. De abajo hacia arriba, reticula ->
 * estructura -> marca -> sitio en vivo, separadas en profundidad real
 * (CSS 3D, sin librerias) y flotando cada una a su ritmo.
 *
 * La capa de arriba lleva portadas reales de clientes: el hero muestra
 * trabajo propio, no un relleno.
 */

type Variante = "board" | "wire" | "brand" | "live";

const CAPAS: { variante: Variante; z: number; nombre: string }[] = [
  { variante: "board", z: 0, nombre: "Retícula" },
  { variante: "wire", z: 54, nombre: "Estructura" },
  { variante: "brand", z: 108, nombre: "Marca" },
  { variante: "live", z: 162, nombre: "Sitio en vivo" },
];

/**
 * Portadas que asoman en la capa "sitio en vivo". Van con miniatura
 * propia (public/trabajos/<slug>/thumb.png, ~30 KB) en vez del cover de
 * 1200x900: es decoracion del hero, no vale la pena pagar 300 KB.
 * Si se cambian estos slugs, hay que generar su thumb.png.
 */
const SLUGS_MUESTRA = ["reyes-odontologia", "greenprod", "no-hay-2"];

const muestras = SLUGS_MUESTRA.map(
  (slug) => projects.find((p) => p.slug === slug) ?? { slug, title: slug },
);

function Capa({ variante }: { variante: Variante }) {
  if (variante === "board") {
    return (
      <div className="v3-plate v3-plate--board">
        <span className="v3-crop v3-crop--tl" />
        <span className="v3-crop v3-crop--tr" />
        <span className="v3-crop v3-crop--bl" />
        <span className="v3-crop v3-crop--br" />
      </div>
    );
  }

  return (
    <div className={`v3-plate v3-plate--${variante}`}>
      <div className="v3-doc">
        <div className="v3-row v3-nav">
          <span className="v3-mark" />
          <span className="v3-link" />
          <span className="v3-link" />
          <span className="v3-link" />
          <span className="v3-cta" />
        </div>

        <div className="v3-hero">
          <span className="v3-bar v3-bar--xl" />
          <span className="v3-bar v3-bar--lg" />
          <span className="v3-bar v3-bar--sm" />
          <span className="v3-pill" />
        </div>

        <div className="v3-cards">
          {muestras.map((p) => (
            <span key={p.slug} className="v3-card">
              {variante === "live" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/trabajos/${p.slug}/thumb.png`}
                  alt=""
                  aria-hidden
                  decoding="async"
                />
              ) : null}
            </span>
          ))}
        </div>

        <div className="v3-row v3-foot">
          <span className="v3-link" />
          <span className="v3-link" />
        </div>
      </div>
    </div>
  );
}

export function WebStack() {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [dentro, setDentro] = useState(false);

  // Las capas entran separandose despues de montar, como si se armara.
  useEffect(() => {
    const t = setTimeout(() => setDentro(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      deck.style.setProperty("--rx", `${54 - y * 9}deg`);
      deck.style.setProperty("--rz", `${-38 + x * 14}deg`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="v3-stage" aria-hidden>
      <span className="v3-shadow" />
      <div ref={deckRef} className="v3-deck" data-in={dentro}>
        {CAPAS.map((capa, i) => (
          <div
            key={capa.variante}
            className="v3-layer"
            style={
              {
                "--z": `calc(var(--zk, 1) * ${capa.z}px)`,
                "--d": `${i * 160}ms`,
              } as CSSProperties
            }
          >
            <Capa variante={capa.variante} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Pie de la maqueta: nombra las capas para quien no las lea de un vistazo. */
export function WebStackLeyenda() {
  return (
    <p className="v-label v-label--xs v-label--soft flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
      {CAPAS.map((c, i) => (
        <span key={c.variante} className="flex items-center gap-3">
          {c.nombre}
          {i < CAPAS.length - 1 ? (
            <span className="text-[var(--v-magenta)]">→</span>
          ) : null}
        </span>
      ))}
    </p>
  );
}
