# Victoria Design

Sitio web del estudio **Victoria Design** — diseno y desarrollo web, Peru.
Next.js 16 + TypeScript + Tailwind CSS v4.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # opcional en esta fase
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

## Estado actual (Fase 1)

- [x] Diseno base, modo oscuro/claro, tipografia editorial
- [x] Home: hero, servicios, trabajo destacado, proceso, estudio, CTA
- [x] `/trabajos` y `/trabajos/[slug]` (contenido de ejemplo)
- [x] `/contacto` con formulario + endpoint `api/leads`
- [ ] Contenido real (ver `CONTENT.md`)
- [ ] Supabase + Resend conectados (Fase 2)
- [ ] Login de clientes con Clerk (Fase 2)
- [ ] Pagos con pasarela peruana (Fase 3)

## Despliegue

Deploy automatico en Vercel al hacer push a `main`.
Configurar en Vercel las variables de `.env.example` que apliquen.
Ver `CLAUDE.md` para convenciones del proyecto.
