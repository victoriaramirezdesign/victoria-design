"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "@/components/lab/motion";
import { site } from "@/lib/site";

/**
 * Barra fija del borrador. Se pone en modo claro cuando pasa por encima
 * de una seccion de fondo claro (los planes), si no el texto blanco se
 * volveria invisible.
 */
export function NavLab() {
  const ref = useRef<HTMLElement | null>(null);
  const [claro, setClaro] = useState(false);

  useEffect(() => {
    const claras = document.querySelectorAll(".v-blanco");
    if (claras.length === 0) return;

    // Solo miramos la franja de arriba, la que ocupa la barra.
    const alto = ref.current?.offsetHeight ?? 76;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setClaro(e.isIntersecting);
      },
      { rootMargin: `0px 0px -${Math.max(window.innerHeight - alto, 0)}px 0px` },
    );

    for (const el of claras) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <header ref={ref} className="v-nav" data-claro={claro}>
      <div
        aria-hidden
        className={`v-navveil ${claro ? "v-navveil--claro" : ""} pointer-events-none absolute inset-x-0 top-0 h-32`}
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
