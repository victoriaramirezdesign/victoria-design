# Victoria Design

Sitio web del estudio **Victoria Design** — diseno y desarrollo web, Peru.
Next.js 16 + TypeScript + Tailwind CSS v4.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional; el sitio corre sin claves
npm run dev
```

Abrir http://localhost:3000

## Scripts

| Comando | Que hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de produccion |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |

## Estado actual

- [x] Diseno base, modo oscuro/claro, identidad de marca aplicada
- [x] Home: hero, servicios, trabajos, paquetes, proceso, testimonios,
      estudio, Instagram, newsletter, CTA
- [x] `/trabajos` y `/trabajos/[slug]` — 12 clientes reales
- [x] `/notas` y `/notas/[slug]` (blog, sin contenido aun)
- [x] `/contacto` con formulario + endpoint `api/leads`
- [x] Newsletter con endpoint `api/subscribe` (tabla `subscribers`)
- [x] Boton flotante de WhatsApp
- [x] Integraciones conectadas: Supabase (leads), Resend (correos, dominio
      verificado), PostHog (analitica), Sentry (errores)
- [ ] Faltan 2 claves secretas en Vercel — ver **`SETUP.md`**
- [ ] Contenido real — ver **`CONTENT.md`**
- [ ] Login de clientes con Clerk (falta definir alcance)
- [ ] Pagos con pasarela peruana (falta elegir proveedor)

## Despliegue

Deploy automatico en Vercel al hacer push a `main`.
Guia completa de claves y cuentas: **`SETUP.md`**.
Convenciones del proyecto: `CLAUDE.md`.
