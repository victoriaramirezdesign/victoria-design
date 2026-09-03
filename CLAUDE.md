@AGENTS.md

# Victoria Design — guia del proyecto

Sitio del estudio **Victoria Design** (victoriadesign.pe): diseno + desarrollo web, Peru.
Objetivo: portafolio + captacion de leads. Fases siguientes: login de clientes y pagos.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 (config CSS-first en `src/app/globals.css`).
- Deploy en Vercel desde GitHub (push a `main`).
- **Cableado (se activa con su env var, degrada elegante sin ella):**
  Supabase (`src/lib/supabase.ts` + `leads.ts`), Resend (`leads.ts`),
  PostHog + Sentry (`src/instrumentation-client.ts`, `src/instrumentation.ts`,
  `sentry.*.config.ts`, wrap condicional en `next.config.ts`).
- **Sin cablear:** Clerk (login — falta alcance), pagos (falta proveedor).
  Pagos: pasarela peruana (Culqi / Izipay / Mercado Pago). **Flow.cl no opera en Peru.**
- Migraciones SQL en `supabase/migrations/`. Guia de claves: `SETUP.md`.

## Convenciones

- Idioma del sitio: espanol (`lang="es"`). Contenido en `src/content/*`.
- Modo oscuro por defecto, alternable (`.dark` en `<html>`, persistido en `localStorage` como `vd-theme`).
- Colores y tipografia solo via tokens de `globals.css` (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, `font-display`). No hardcodear hex en componentes.
- Animaciones de scroll con `<Reveal>` (IntersectionObserver). Respetar `prefers-reduced-motion`.
- Placeholders marcados con `// TODO(contenido)`. Ver `CONTENT.md` para lo que falta del cliente.
- Nuevas librerias fuera del stack del prompt maestro: pedir antes. Analitica/errores nunca deben romper la UI (envolver en try/catch).
- Variables sensibles solo en `.env.local` / dashboard de Vercel. Nunca en el repo.
- No enviar datos personales a PostHog (solo categorias: tipo, presupuesto).

## Estructura

- `src/app/` — rutas: `/`, `/trabajos`, `/trabajos/[slug]`, `/contacto`, `api/leads`.
- `src/components/sections/` — bloques de la home.
- `src/components/ui/` — primitivos (Container, Reveal, Button, ThemeToggle, SectionHeading).
- `src/lib/` — `site.ts` (config), `leads.ts` (validacion + entrega), `supabase.ts`, `analytics.ts` (PostHog `track`).
- `src/content/` — datos editables (servicios, proyectos, proceso, equipo).
- `src/instrumentation*.ts` + `sentry.*.config.ts` — arranque de PostHog/Sentry.

## Comandos

- `npm run dev` — desarrollo.
- `npm run build` — build de produccion (no correr con `next dev` activo).
- `npm run lint` — eslint.
