import { NextResponse } from "next/server";
import { deliverLead, validateLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const result = validateLead(body);

  if (!result.ok) {
    // El honeypot devuelve "spam": respondemos 200 para no dar pistas al bot.
    if (result.error === "spam") {
      return NextResponse.json({ ok: true, stored: false, emailed: false });
    }
    return NextResponse.json({ ok: false, error: result.error }, { status: 422 });
  }

  const { stored, emailed } = await deliverLead(result.data);

  return NextResponse.json({ ok: true, stored, emailed });
}
