"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Oculta el header/footer globales en las rutas que traen su propia
 * interfaz completa (hoy, el borrador 3D en /3d).
 */
const RUTAS_SIN_CHROME = ["/3d"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const oculto = RUTAS_SIN_CHROME.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`),
  );

  if (oculto) return null;

  return <>{children}</>;
}
