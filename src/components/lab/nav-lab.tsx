"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Magnetic } from "@/components/lab/motion";
import { site } from "@/lib/site";

/**
 * Barra fija del borrador. El velo y el filo aparecen al despegar del
 * tope, para que sobre la portada quede limpia.
 */
export function NavLab() {
  const ref = useRef<HTMLElement | null>(null);
  // El filo y el velo aparecen al despegar del tope. Se escribe directo
  // sobre el nodo: no hace falta re-renderizar en cada scroll.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const marcar = () => {
      el.dataset.pegado = String(window.scrollY > 24);
    };

    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
    return () => window.removeEventListener("scroll", marcar);
  }, []);

  return (
    <header ref={ref} className="v-nav">
      <div
        aria-hidden
        className="v-navveil pointer-events-none absolute inset-x-0 top-0 h-32"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/3d"
          className="font-wordmark text-sm uppercase tracking-[0.28em] transition-opacity hover:opacity-70"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/" className="v-nav__volver hidden text-xs sm:block">
            Volver al sitio actual
          </Link>
          <Magnetic strength={0.25}>
            <Link href="/contacto" className="v-btn v-btn--ghost v-btn--sm">
              Conversemos
            </Link>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
