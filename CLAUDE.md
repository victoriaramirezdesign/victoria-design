@AGENTS.md

# Victoria Design — guia del proyecto

Sitio del estudio **Victoria Design** (victoriadesign.pe): diseno + desarrollo web, Peru.
Objetivo: portafolio + captacion de leads. Fases siguientes: login de clientes y pagos.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 (config CSS-first en `src/app/globals.css`).
- Deploy en Vercel desde GitHub (push a `main`).
- Supabase (leads), Resend (correos), Clerk (login, fase 2), PostHog + Sentry (fase 2).
- Pagos (fase 3): pasarela peruana (Culqi / Izipay / Mercado Pago). **Flow.cl no opera en Peru.**

## Convenciones

- Idioma del sitio: espanol (`lang="es"`). Contenido en `src/content/*`.
- Modo oscuro por defecto, alternable (`.dark` en `<html>`, persistido en `localStorage` como `vd-theme`).
- Colores y tipografia solo via tokens de `globals.css` (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`, `font-display`). No hardcodear hex en componentes.
- Animaciones de scroll con `<Reveal>` (IntersectionObserver). Respetar `prefers-reduced-motion`.
- Placeholders marcados con `// TODO(contenido)`. Ver `CONTENT.md` para lo que falta del cliente.
- Sin librerias nuevas sin pedirlo antes (regla del prompt maestro). Integraciones via `fetch` a APIs REST mientras se pueda.
- Variables sensibles solo en `.env.local` / dashboard de Vercel. Nunca en el repo.

## Estructura

- `src/app/` — rutas: `/`, `/trabajos`, `/trabajos/[slug]`, `/contacto`, `api/leads`.
- `src/components/sections/` — bloques de la home.
- `src/components/ui/` — primitivos (Container, Reveal, Button, ThemeToggle, SectionHeading).
- `src/lib/` — `site.ts` (config) y `leads.ts` (validacion + entrega de leads).
- `src/content/` — datos editables (servicios, proyectos, proceso, equipo).

## Comandos

- `npm run dev` — desarrollo.
- `npm run build` — build de produccion (no correr con `next dev` activo).
- `npm run lint` — eslint.
