"use client";

import Link from "next/link";
import { useRef } from "react";
import { Rise } from "@/components/lab/motion";
import type { Package } from "@/content/packages";

/**
 * Ficha de plan con aro de 1px que sigue al puntero.
 *
 * El aro es un degradado radial recortado con mask-composite: se pinta
 * solo el borde, y el centro del degradado viaja con el cursor via
 * --spot-x / --spot-y. Fuera de la ficha se manda lejos y el aro se
 * apaga solo.
 */

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden focusable="false">
      <path
        d="M5 12.5l4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cruz() {
  return (
    <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden focusable="false">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FichaPlan({ plan }: { plan: Package }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mover = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  const salir = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "-9999px");
    el.style.setProperty("--spot-y", "-9999px");
  };

  const incluidas = plan.features.map((t) => ({ t, si: true }));
  const excluidas = (plan.notIncluded ?? []).map((t) => ({ t, si: false }));
  const filas = [...incluidas, ...excluidas];

  return (
    <div
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={salir}
      className="v-ficha"
      data-destacado={plan.highlighted ? "true" : "false"}
    >
      <span className="v-ficha__aro" aria-hidden />

      <div className="v-ficha__cuerpo">
        {plan.highlighted ? (
          <span className="v-ficha__insignia">Lo más pedido</span>
        ) : null}

        <Rise>
          <p className="v-ficha__rotulo">{plan.name}</p>
        </Rise>
        <span className="v-ficha__divisor" />

        <Rise delay={100}>
          <p className="v-ficha__precio">
            {plan.price === null ? (
              <span className="v-ficha__precio--texto">Según proyecto</span>
            ) : (
              <>
                <span>S/ {plan.price}</span>
                <span className="v-ficha__precio--desde">desde</span>
              </>
            )}
          </p>
        </Rise>

        <Rise delay={200}>
          <p className="v-ficha__tag">{plan.tagline}</p>
        </Rise>

        <Rise delay={300}>
          <div className="mt-7">
            <Link
              href="/contacto"
              className={`v-ficha__boton ${
                plan.highlighted ? "v-ficha__boton--fuerte" : ""
              }`}
            >
              Cotizar este plan
            </Link>
          </div>
        </Rise>

        <Rise delay={400} className="flex-1">
          <ul className="v-ficha__lista">
            {filas.map((f) => (
              <li key={f.t} data-si={f.si}>
                <span className="v-ficha__marca">
                  {f.si ? <Check /> : <Cruz />}
                </span>
                {f.t}
              </li>
            ))}
          </ul>
        </Rise>
      </div>
    </div>
  );
}
