"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { track } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "No pudimos registrarte.");
      }
      setStatus("success");
      track("newsletter_suscripcion");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  return (
    <section className="border-t border-line bg-bg-elev py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              Guia gratis
            </p>
            <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl">
              5 errores de marca que frenan a un negocio nuevo.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              {/* TODO(contenido): confirmar el lead magnet y prepararlo en PDF. */}
              Dejanos tu correo y te la enviamos. Sin spam: solo cosas utiles
              sobre marca y web, cada tanto.
            </p>
          </div>

          {status === "success" ? (
            <div className="rounded-2xl border border-line bg-bg p-7">
              <p className="font-display text-xl">Listo, quedaste dentro.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Te escribimos al correo con la guia. Revisa tambien spam por si
                acaso.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-3" noValidate>
              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden>
                <label>
                  No llenar
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex-1">
                  <span className="sr-only">Tu correo</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className="h-12 w-full rounded-full border border-line bg-bg px-5 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  />
                </label>
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Enviando..." : "Quiero la guia"}
                </Button>
              </div>

              {status === "error" && error ? (
                <p className="text-sm text-accent" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
