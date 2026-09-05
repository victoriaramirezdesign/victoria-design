"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Media query reactiva. En el servidor siempre responde `false`. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    useCallback(
      (onChange: () => void) => {
        const mq = window.matchMedia(query);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
      },
      [query],
    ),
    useCallback(() => window.matchMedia(query).matches, [query]),
    () => false,
  );
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Marca `true` la primera vez que el elemento entra al viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/**
 * Revela un texto palabra por palabra, cada una subiendo desde abajo
 * con un pequeno giro. El escalonado sale de la variable CSS --i.
 */
export function Words({
  text,
  className = "",
  offset = 0,
}: {
  text: string;
  className?: string;
  offset?: number;
}) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.2);
  const words = text.split(" ");

  return (
    <span ref={ref} data-shown={shown} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="v-word"
            style={{ "--i": i + offset } as CSSProperties}
          >
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/**
 * El elemento persigue al puntero cuando esta cerca. Solo con mouse:
 * en tactil no aporta nada y molesta.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * 1.1;

      if (dist < radius) {
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      } else {
        el.style.transform = "";
      }
    };

    const onLeave = () => {
      el.style.transform = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}

/** Cuenta de 0 al valor cuando entra en pantalla. */
export function Counter({
  to,
  duration = 1600,
  className = "",
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(0);

  const reduced = useReducedMotion();

  useEffect(() => {
    if (!shown) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      // Sin movimiento, la cuenta salta directo al final.
      const p = reduced ? 1 : Math.min((now - start) / duration, 1);
      // easeOutExpo: arranca rapido y frena suave
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/**
 * Fade + slide sencillo, con retardo escalonado.
 * `as="span"` sirve para no meter un <div> dentro de un titulo.
 */
export function Rise({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const { ref, shown } = useInView<HTMLElement>(0.15);
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`block transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
