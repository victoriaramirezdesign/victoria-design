// Instrumentacion del servidor (Node y Edge). Solo carga Sentry si hay DSN.

import * as Sentry from "@sentry/nextjs";
import { SENTRY_DSN_DEFAULT } from "@/lib/env-defaults";

export async function register() {
  if (!(process.env.NEXT_PUBLIC_SENTRY_DSN ?? SENTRY_DSN_DEFAULT)) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
