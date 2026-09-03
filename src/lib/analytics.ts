/**
 * Envia un evento a PostHog si esta configurado.
 * Nunca lanza: la analitica no debe romper la UI.
 * No enviar datos personales (nombre, correo, mensaje) — solo categorias.
 */
export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) {
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
