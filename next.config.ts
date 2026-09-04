import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { SENTRY_DSN_DEFAULT } from "@/lib/env-defaults";

const nextConfig: NextConfig = {
  images: {
    // Agregar aqui hosts remotos si se sirven imagenes desde Supabase Storage, etc.
    remotePatterns: [],
  },
};

// Solo envolvemos con Sentry si hay DSN configurado (evita ruido en local).
const config: NextConfig =
  (process.env.NEXT_PUBLIC_SENTRY_DSN ?? SENTRY_DSN_DEFAULT)
    ? withSentryConfig(nextConfig, {
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        silent: !process.env.CI,
        widenClientFileUpload: true,
        disableLogger: true,
        // Sube sourcemaps solo si hay token de auth de Sentry.
        sourcemaps: { disable: !process.env.SENTRY_AUTH_TOKEN },
        tunnelRoute: "/monitoring",
      })
    : nextConfig;

export default config;
