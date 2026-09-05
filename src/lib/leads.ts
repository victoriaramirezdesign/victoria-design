// Validacion y entrega de leads del formulario de contacto.
// Guarda en Supabase (SDK) y envia correos con Resend (REST).
// Mientras no existan las variables de entorno, el lead solo se registra en consola.

import { getSupabaseAdmin } from "@/lib/supabase";
import { LEADS_FROM_EMAIL_DEFAULT, LEADS_TO_EMAIL_DEFAULT } from "@/lib/env-defaults";

export type LeadInput = {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
  company?: string; // honeypot
};

export type LeadClean = Omit<LeadInput, "company">;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(body: unknown):
  | { ok: true; data: LeadClean }
  | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Cuerpo inválido." };
  }
  const b = body as Record<string, unknown>;

  // Honeypot: si viene lleno, es un bot. Fingimos exito sin procesar.
  if (typeof b.company === "string" && b.company.trim() !== "") {
    return { ok: false, error: "spam" };
  }

  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim().toLowerCase();
  const projectType = String(b.projectType ?? "").trim();
  const budget = String(b.budget ?? "").trim();
  const message = String(b.message ?? "").trim();

  if (name.length < 2) return { ok: false, error: "Ingresa tu nombre." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Ingresa un correo válido." };
  if (!projectType) return { ok: false, error: "Elige el tipo de proyecto." };
  if (message.length < 10) return { ok: false, error: "Cuéntanos un poco más sobre el proyecto." };
  if (message.length > 4000) return { ok: false, error: "El mensaje es demasiado largo." };

  return {
    ok: true,
    data: { name, email, projectType, budget: budget || undefined, message },
  };
}

/** Guarda el lead en la tabla `leads` de Supabase. */
async function storeInSupabase(lead: LeadClean): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    project_type: lead.projectType,
    budget: lead.budget ?? null,
    message: lead.message,
    source: "web-contacto",
  });

  if (error) {
    console.error("[leads] Supabase error:", error.message);
    return false;
  }
  return true;
}

/** Envia el aviso interno + la auto-respuesta al cliente via Resend. */
async function sendEmails(lead: LeadClean): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  // Direcciones (no son secretas): con env var en Vercel la sobreescribe.
  const from = process.env.LEADS_FROM_EMAIL ?? LEADS_FROM_EMAIL_DEFAULT;
  const to = process.env.LEADS_TO_EMAIL ?? LEADS_TO_EMAIL_DEFAULT;
  if (!key || !from || !to) return false;

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
    });

  const internal = await send({
    from,
    to: [to],
    reply_to: lead.email,
    subject: `Nuevo lead: ${lead.name} (${lead.projectType})`,
    text: [
      `Nombre: ${lead.name}`,
      `Correo: ${lead.email}`,
      `Tipo: ${lead.projectType}`,
      `Presupuesto: ${lead.budget ?? "no indicado"}`,
      "",
      lead.message,
    ].join("\n"),
  });

  const auto = await send({
    from,
    to: [lead.email],
    subject: "Recibimos tu mensaje — Victoria Design",
    text: [
      `Hola ${lead.name},`,
      "",
      "Gracias por escribir a Victoria Design. Ya tenemos tu mensaje y te",
      "responderemos en menos de 24 horas hábiles con una primera idea de",
      "alcance y siguientes pasos.",
      "",
      "Un abrazo,",
      "Victoria Design",
    ].join("\n"),
  });

  if (!internal.ok || !auto.ok) {
    console.error(
      "[leads] Resend respondio",
      internal.status,
      auto.status,
      await internal.text().catch(() => ""),
    );
    return false;
  }
  return true;
}

export async function deliverLead(lead: LeadClean): Promise<{
  stored: boolean;
  emailed: boolean;
}> {
  const [stored, emailed] = await Promise.all([
    storeInSupabase(lead).catch((e) => {
      console.error("[leads] error guardando", e);
      return false;
    }),
    sendEmails(lead).catch((e) => {
      console.error("[leads] error enviando correos", e);
      return false;
    }),
  ]);

  if (!stored && !emailed) {
    console.info(
      "[leads] Lead recibido (sin integraciones configuradas):",
      JSON.stringify(lead),
    );
  }

  return { stored, emailed };
}
