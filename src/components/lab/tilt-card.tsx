"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Tarjeta que se inclina en 3D siguiendo al puntero y enciende un halo
 * debajo del cursor. En tactil queda quieta (no hay puntero que seguir).
 */
export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    el.dataset.active = "true";
    el.style.transform = `rotateY(${(px - 0.5) * max * 2}deg) rotateX(${
      (0.5 - py) * max * 2
    }deg) translateZ(0)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.dataset.active = "false";
    el.style.transform = "";
  };

  return (
    <div className="v-stage h-full">
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        className={`v-tilt v-edge relative overflow-hidden rounded-[1.75rem] ${className}`}
        style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
      >
        <span className="v-halo" aria-hidden />
        {children}
      </div>
    </div>
  );
}
