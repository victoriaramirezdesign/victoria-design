import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;

  // Honeypot: si viene lleno es un bot. Respondemos 200 para no darle pistas.
  if (typeof b.company === "string" && b.company.trim() !== "") {
    return NextResponse.json({ ok: true, stored: false });
  }

  const email = String(b.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Ingresa un correo válido." },
      { status: 422 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.info("[subscribe] Suscripcion sin Supabase configurado:", email);
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase
    .from("subscribers")
    .upsert({ email, source: "web-newsletter" }, { onConflict: "email" });

  if (error) {
    console.error("[subscribe] Error guardando", error.message);
    return NextResponse.json(
      { ok: false, error: "No pudimos registrarte. Intenta de nuevo." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, stored: true });
}
