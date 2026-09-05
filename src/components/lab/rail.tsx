"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMediaQuery, useReducedMotion } from "@/components/lab/motion";

/**
 * Seccion anclada: mientras haces scroll vertical, el contenido avanza
 * en horizontal. En pantallas chicas o con prefers-reduced-motion se
 * degrada a un carrusel normal con arrastre y snap.
 */
export function Rail({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  const anchoSuficiente = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const pinned = anchoSuficiente && !reduced;

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;

    if (!pinned) {
      t.style.transform = "";
      return;
    }

    let raf = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const rect = o.getBoundingClientRect();
      const total = o.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      const distance = Math.max(t.scrollWidth - window.innerWidth, 0);
      t.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  return (
    <div
      ref={outer}
      className={className}
      style={pinned ? { height: "260vh" } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen items-center overflow-hidden"
            : "flex items-center overflow-x-auto overflow-y-hidden py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        <div
          ref={track}
          className={`flex gap-6 px-5 will-change-transform sm:px-8 ${
            pinned ? "" : "snap-x snap-mandatory"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
