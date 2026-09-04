// Valores publicos por defecto para las integraciones (NO son secretos:
// PostHog "project key", el DSN de Sentry y la URL de un proyecto Supabase
// estan pensados para ir en el bundle del navegador / el repo).
// Una variable de entorno en Vercel con el mismo nombre siempre gana.
//
// Los secretos reales (SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY) NUNCA
// van aqui: se cargan solo desde variables de entorno.

export const POSTHOG_KEY_DEFAULT =
  "phc_xrsWErwLzJSU3o5B9aXRbHjLWgFrgsWyHbUvn6HRr8BH";

export const SENTRY_DSN_DEFAULT =
  "https://40d6330a7964a19cb51eab99d49d4e67@o4512023393468416.ingest.us.sentry.io/4512029483597824";

export const SUPABASE_URL_DEFAULT = "https://aefhxsezkolcxcoqylup.supabase.co";
