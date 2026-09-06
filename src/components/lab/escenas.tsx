import type { CSSProperties } from "react";
import { projects } from "@/content/projects";

/**
 * Las seis escenas de la secuencia del hero. Cada una recibe su avance
 * local (0 a 1) por la variable CSS --lp, que el contenedor va moviendo
 * con el scroll. Asi la animacion interna se dibuja sola desde el CSS,
 * sin volver a renderizar React en cada rueda del mouse.
 */

const rejilla = projects.slice(0, 9);

/* --- 01. Hoja en blanco ------------------------------------------- */
export function EscenaPapel() {
  return (
    <div className="esc esc--papel">
      <span className="v3-crop v3-crop--tl" />
      <span className="v3-crop v3-crop--tr" />
      <span className="v3-crop v3-crop--bl" />
      <span className="v3-crop v3-crop--br" />
      <span className="esc-caret" />
      <span className="esc-medida">1200 × 900</span>
    </div>
  );
}

/* --- 02. El logo toma forma --------------------------------------- */
export function EscenaLogo() {
  return (
    <div className="esc esc--logo">
      <svg viewBox="0 0 210 116" className="esc-svg" aria-hidden>
        {/* Guias de construccion */}
        <g className="esc-guias">
          <circle cx="145" cy="58" r="30" />
          <line x1="18" y1="26" x2="192" y2="26" />
          <line x1="18" y1="90" x2="192" y2="90" />
          <line x1="60" y1="10" x2="60" y2="106" />
        </g>
        {/* Trazo de la V y la D, se dibuja con el avance */}
        <path className="esc-trazo" pathLength={1} d="M30 26 L60 90 L90 26" />
        <path
          className="esc-trazo"
          pathLength={1}
          d="M115 90 L115 26 L142 26 A29 32 0 0 1 142 90 Z"
        />
      </svg>
      <span className="esc-pie">Victoria Design · monograma</span>
    </div>
  );
}

/* --- 03. La marca sale a redes ------------------------------------ */
export function EscenaRedes() {
  return (
    <div className="esc esc--redes">
      <div className="esc-ig-cab">
        <span className="esc-ig-avatar" />
        <div className="esc-ig-datos">
          <span className="esc-ig-user">victoriadesign.pe</span>
          <span className="esc-ig-stats">18 marcas · Nuevo Chimbote</span>
        </div>
        <span className="esc-ig-seguir">Seguir</span>
      </div>
      <div className="esc-ig-rejilla">
        {rejilla.map((p, i) => (
          <span
            key={p.slug}
            className="esc-ig-celda"
            style={{ "--i": i } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/trabajos/${p.slug}/thumb.png`} alt="" aria-hidden loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* --- 04. Se vuelve codigo ----------------------------------------- */
const CODIGO: { t: string; c: string }[][] = [
  [{ t: "export", c: "kw" }, { t: " function ", c: "" }, { t: "Hero", c: "fn" }, { t: "() {", c: "" }],
  [{ t: "  return", c: "kw" }, { t: " (", c: "" }],
  [{ t: "    <section", c: "tag" }, { t: " className", c: "at" }, { t: "=", c: "" }, { t: '"hero"', c: "st" }, { t: ">", c: "tag" }],
  [{ t: "      <h1>", c: "tag" }, { t: "Tu marca, armada", c: "" }],
  [{ t: "        ", c: "" }, { t: "<span", c: "tag" }, { t: " className", c: "at" }, { t: "=", c: "" }, { t: '"acento"', c: "st" }, { t: ">", c: "tag" }],
  [{ t: "          capa por capa.", c: "" }],
  [{ t: "        </span>", c: "tag" }, { t: "</h1>", c: "tag" }],
  [{ t: "      <Boton", c: "tag" }, { t: " href", c: "at" }, { t: "=", c: "" }, { t: '"/contacto"', c: "st" }, { t: ">", c: "tag" }],
  [{ t: "        Iniciar proyecto", c: "" }],
  [{ t: "      </Boton>", c: "tag" }],
  [{ t: "    </section>", c: "tag" }],
  [{ t: "  );", c: "" }],
  [{ t: "}", c: "" }],
];

export function EscenaCodigo() {
  return (
    <div className="esc esc--codigo">
      <div className="esc-chrome">
        <span /> <span /> <span />
        <em>hero.tsx</em>
      </div>
      <pre className="esc-code">
        {CODIGO.map((linea, i) => (
          <span key={i} className="esc-linea" style={{ "--i": i } as CSSProperties}>
            <i className="esc-num">{i + 1}</i>
            {linea.map((tk, j) => (
              <b key={j} className={`tk tk--${tk.c || "pl"}`}>
                {tk.t}
              </b>
            ))}
          </span>
        ))}
      </pre>
    </div>
  );
}

/* --- 05. El sitio, en vivo ---------------------------------------- */
export function EscenaSitio() {
  return (
    <div className="esc esc--sitio">
      <div className="v3-plate v3-plate--live esc-sitio-plate">
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
            {projects.slice(0, 3).map((p) => (
              <span key={p.slug} className="v3-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/trabajos/${p.slug}/thumb.png`} alt="" aria-hidden />
              </span>
            ))}
          </div>
          <div className="v3-row v3-foot">
            <span className="v3-link" />
            <span className="v3-link" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 06. El kit, entregado ----------------------------------------- */
const CASO = projects.find((p) => p.slug === "reyes-odontologia") ?? projects[0];

export function EscenaKit({ colores }: { colores: string[] }) {
  return (
    <div className="esc esc--kit">
      <div className="kit">
        <div className="kit__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CASO.cover} alt="" aria-hidden />
        </div>

        <div className="kit__lado">
          <div className="kit__bloque kit__paleta">
            {colores.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>

          <div className="kit__bloque kit__tipo">
            <span>Aa</span>
            <b>Tipografía</b>
          </div>

          <div className="kit__bloque kit__web">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/trabajos/${CASO.slug}/thumb.png`} alt="" aria-hidden />
          </div>
        </div>
      </div>

      <p className="kit__pie">{CASO.title} · kit de marca entregado</p>
    </div>
  );
}
