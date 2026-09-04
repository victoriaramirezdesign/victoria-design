/**
 * Envia un evento a PostHog si esta configurado.
 * Nunca lanza: la analitica no debe romper la UI.
 * No enviar datos personales (nombre, correo, mensaje) — solo categorias.
 */
import { POSTHOG_KEY_DEFAULT } from "@/lib/env-defaults";

export function track(event: string, properties?: Record<string, unknown>) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? POSTHOG_KEY_DEFAULT;
  if (typeof window === "undefined" || !posthogKey) {
    return;
  }
  import("posthog-js")
    .then(({ default: posthog }) => {
      if (posthog.__loaded) posthog.capture(event, properties);
    })
    .catch(() => {
      /* noop */
    });
}
