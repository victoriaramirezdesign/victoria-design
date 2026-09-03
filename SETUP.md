# Puesta en marcha — Victoria Design

El codigo ya esta listo para todas las integraciones. Cada una se **activa sola**
cuando su clave aparece en las variables de entorno. Nada se rompe si falta una.

Yo (Claude) **no puedo entrar a los paneles** de Supabase, Vercel, Resend, etc.
(no tengo sesion iniciada ni permiso para autenticarme). Estos pasos son de
copiar y pegar claves — te toman ~15 min.

---

## Paso 0 — Subir a GitHub (si aun no esta)

En `C:\Users\juanr\Desktop\victoria-design`:

```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
```

```bash
git push -u origin main
```

---

## Paso 1 — Vercel (deja el sitio en vivo)

1. vercel.com > **Add New > Project** > importa el repo.
2. Framework: Next.js (lo detecta solo). **Deploy**.
3. Queda en `https://TU-PROYECTO.vercel.app` — ya funciona sin variables.
4. Copia esa URL y ponla como variable `NEXT_PUBLIC_SITE_URL` (Paso 6).

---

## Paso 2 — Supabase (guardar leads)

1. supabase.com > tu proyecto (o **New project**, region *South America (São Paulo)*).
2. **SQL Editor** > New query > pega el contenido de
   `supabase/migrations/0001_leads.sql` > **Run**. Crea la tabla `leads`.
3. **Project Settings > Data API**: copia la **Project URL**.
4. **Project Settings > API Keys**: copia la **`service_role`** (secreta).
5. Guarda para el Paso 6:
   - `SUPABASE_URL` = la Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = la service_role

---

## Paso 3 — Resend (correos automaticos de leads)

1. resend.com > **API Keys > Create** > copia la clave (`re_...`).
2. **Domains > Add Domain** > `victoriadesign.pe`.
3. Resend te da 3-4 registros DNS (MX, TXT, DKIM). Agregalos en **Cloudflare**
   (DNS del dominio) y espera la verificacion (verde).
4. Guarda para el Paso 6:
   - `RESEND_API_KEY` = la clave
   - `LEADS_FROM_EMAIL` = `Victoria Design <hola@victoriadesign.pe>`
   - `LEADS_TO_EMAIL` = el correo donde quieren recibir los leads

> Sin dominio verificado, Resend solo deja enviar a tu propio correo. Para
> probar antes: usa `onboarding@resend.dev` como `LEADS_FROM_EMAIL`.

---

## Paso 4 — PostHog (analitica)

1. posthog.com > tu proyecto > **Settings > Project** > copia la
   **Project API Key** (`phc_...`).
2. Fijate si tu instancia es US o EU (arriba a la izquierda).
3. Guarda para el Paso 6:
   - `NEXT_PUBLIC_POSTHOG_KEY` = `phc_...`
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com` (o `https://eu.i.posthog.com`)

El sitio ya envia el evento `lead_enviado` (con tipo y presupuesto, sin datos
personales) y los pageviews automaticamente.

---

## Paso 5 — Sentry (errores)

1. sentry.io > **Projects > Create Project** > plataforma **Next.js**.
2. **Settings > Client Keys (DSN)** > copia el **DSN**.
3. (Opcional, para source maps) **Settings > Auth Tokens** > crea uno con
   scope `project:releases`.
4. Guarda para el Paso 6:
   - `NEXT_PUBLIC_SENTRY_DSN` = el DSN
   - `SENTRY_ORG` = slug de la organizacion
   - `SENTRY_PROJECT` = slug del proyecto
   - `SENTRY_AUTH_TOKEN` = el token (opcional)

---

## Paso 6 — Cargar las variables en Vercel

Vercel > tu proyecto > **Settings > Environment Variables**. Pega cada par
(Name / Value) para los entornos *Production*, *Preview* y *Development*:

| Name | De donde |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Paso 1 |
| `SUPABASE_URL` | Paso 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | Paso 2 |
| `RESEND_API_KEY` | Paso 3 |
| `LEADS_FROM_EMAIL` | Paso 3 |
| `LEADS_TO_EMAIL` | Paso 3 |
| `NEXT_PUBLIC_POSTHOG_KEY` | Paso 4 |
| `NEXT_PUBLIC_POSTHOG_HOST` | Paso 4 |
| `NEXT_PUBLIC_SENTRY_DSN` | Paso 5 |
| `SENTRY_ORG` | Paso 5 |
| `SENTRY_PROJECT` | Paso 5 |
| `SENTRY_AUTH_TOKEN` | Paso 5 (opcional) |

Luego **Deployments > Redeploy** para que tomen efecto.

Para desarrollo local: copia `.env.example` a `.env.local` y pega ahi las mismas.

---

## Paso 7 — Probar que quedo bien

1. Abre el sitio en Vercel > `/contacto` > envia el formulario.
2. Supabase > **Table Editor > leads**: deberia aparecer la fila.
3. Revisa tu correo (`LEADS_TO_EMAIL`) y el del remitente de prueba.
4. PostHog > **Activity**: deberia verse `lead_enviado`.

---

## Falta decidir (para las siguientes fases)

- **Login de clientes (Clerk)**: que van a ver los clientes al entrar?
  (¿avance del proyecto, archivos, facturas?). Con eso lo cableo.
- **Pagos**: que se cobra exactamente y con que pasarela peruana
  (Culqi / Izipay / Mercado Pago). Flow.cl no sirve en Peru.
- **Dominio**: cuando compres `victoriadesign.pe`, DNS a Cloudflare y
  se conecta a Vercel + Resend + (Zoho Mail para el correo).
