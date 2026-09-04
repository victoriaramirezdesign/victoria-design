"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Boton flotante de WhatsApp. Aparece despues del primer scroll para no
 * competir con el CTA del hero.
 */
export function WhatsappFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      onClick={() => track("whatsapp_click", { origen: "boton_flotante" })}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-[#0b3d25] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.93.96-3.47-.23-.36a9.37 9.37 0 0 1-1.44-5A9.45 9.45 0 0 1 18.73 5.3a9.38 9.38 0 0 1 2.77 6.68 9.45 9.45 0 0 1-9.46 9.52M20.15 3.87A11.7 11.7 0 0 0 12.04.5 11.87 11.87 0 0 0 .18 12.35c0 2.09.55 4.13 1.6 5.93L.08 24.5l6.37-1.66a11.85 11.85 0 0 0 5.59 1.42h.01c6.54 0 11.86-5.31 11.87-11.85a11.78 11.78 0 0 0-3.47-8.39" />
      </svg>
      WhatsApp
    </a>
  );
}
