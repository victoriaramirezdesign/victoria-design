// Corre en el navegador antes de la hidratacion.
// Inicializa PostHog (analitica) y Sentry (errores) solo si hay claves.

import * as Sentry from "@sentry/nextjs";
import { POSTHOG_KEY_DEFAULT, SENTRY_DSN_DEFAULT } from "@/lib/env-defaults";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? POSTHOG_KEY_DEFAULT;
if (posthogKey) {
  // Carga diferida: posthog-js no entra al bundle inicial.
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(posthogKey, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        capture_pageview: "history_change",
        capture_pageleave: true,
        person_profiles: "identified_only",
        defaults: "2025-05-24",
      });
    })
    .catch(() => {
      /* la analitica nunca debe romper la pagina */
    });
}

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? SENTRY_DSN_DEFAULT;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 0.1,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
