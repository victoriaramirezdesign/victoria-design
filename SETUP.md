# Puesta en marcha — Victoria Design

Estado actual: **sitio en vivo en `victoriadesign.pe`**, GitHub, Vercel,
Cloudflare (DNS), Supabase (proyecto + tabla `leads`) y Resend (dominio
verificado + clave) ya están conectados y configurados. PostHog y Sentry
ya tienen clave/DSN por defecto en el código (`src/lib/env-defaults.ts`) —
no son secretos, no hace falta tocarlos.

Solo faltan **2 valores realmente secretos**, y pegarlos en Vercel es el
único paso que no se puede automatizar (no existe una herramienta para
escribir Environment Variables en Vercel).

---

## Lo único que falta: 2 claves en Vercel

Vercel → proyecto **`victoriadesign-web`** → **Settings → Environment
Variables** → agrega estas dos para *Production*, *Preview* y
*Development*:

| Variable | Valor |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → tu proyecto → **Project Settings → API Keys → `service_role`** (secreta, no la `anon`) |
| `RESEND_API_KEY` | La que se generó al conectar Resend (restringida a enviar solo desde `victoriadesign.pe`) — guárdala si aún no lo hiciste, Resend no la vuelve a mostrar |

Luego **Deployments → Redeploy** (o pide que Claude haga un push vacío
para forzarlo).

Para desarrollo local: copia `.env.example` a `.env.local` y pega ahí las
mismas dos claves.

---

## Probar que quedó bien

1. Abre `https://victoriadesign.pe/contacto` → envía el formulario.
2. Supabase → **Table Editor → leads**: debería aparecer la fila.
3. Revisa el correo en `LEADS_TO_EMAIL` (hoy `gerencia@victoriadesign.pe`) y
   que el remitente de prueba reciba la auto-respuesta.
4. PostHog → **Activity**: debería verse el evento `lead_enviado`.

---

## Referencia — de dónde salió cada cosa

- **Supabase**: proyecto `victoriaramirezdesign's Project` (ya existía en
  tu cuenta), tabla `leads` creada vía migración. URL:
  `https://aefhxsezkolcxcoqylup.supabase.co`.
- **Resend**: dominio `victoriadesign.pe` agregado y verificado (DKIM +
  SPF en Cloudflare). API key `victoria-design-web`, permiso
  `sending_access`, restringida a este dominio.
- **PostHog / Sentry**: claves que pasaste por chat, ya en el código como
  default. Si más adelante quieres usar otro proyecto de PostHog o
  Sentry, completa `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_SENTRY_DSN`
  en Vercel — una env var siempre gana sobre el default.

---

## Falta decidir (para las siguientes fases)

- **Login de clientes (Clerk)**: ¿qué van a ver los clientes al entrar?
  (¿avance del proyecto, archivos, facturas?). Con eso lo cableo.
- **Pagos**: ¿qué se cobra exactamente y con qué pasarela peruana?
  (Culqi / Izipay / Mercado Pago — Flow.cl no sirve en Perú).
