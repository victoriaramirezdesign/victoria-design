import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL_DEFAULT } from "@/lib/env-defaults";

/**
 * Cliente de Supabase con service role (solo servidor).
 * Devuelve null si faltan las variables de entorno, para que el sitio
 * siga funcionando sin base de datos configurada.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  // La URL del proyecto no es secreta; la service_role key si, y solo
  // viene de la variable de entorno (nunca hardcodeada).
  const url = process.env.SUPABASE_URL ?? SUPABASE_URL_DEFAULT;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  cached =
    url && key
      ? createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : null;

  return cached;
}

export const isSupabaseConfigured = () =>
  Boolean(
    (process.env.SUPABASE_URL ?? SUPABASE_URL_DEFAULT) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
