"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

const projectTypes = [
  "Identidad de marca",
  "Sitio web / landing",
  "Tienda online",
  "Rediseño de sitio actual",
  "Campaña / contenido",
  "Otro / no estoy seguro",
];

const budgets = [
  "Menos de S/ 2,000",
  "S/ 2,000 - S/ 5,000",
  "S/ 5,000 - S/ 12,000",
  "Más de S/ 12,000",
  "Prefiero conversarlo",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "No pudimos enviar el mensaje.");
      }

      setStatus("success");
      track("lead_enviado", {
        tipo: String(data.projectType ?? ""),
        presupuesto: String(data.budget ?? "no indicado"),
      });
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-bg-elev p-8">
        <p className="font-display text-2xl">Mensaje recibido.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Gracias por escribir. Te respondemos en menos de 24 horas hábiles con
          una primera idea de alcance y siguientes pasos.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-accent underline underline-offset-4"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      {/* Honeypot anti-spam: oculto para personas */}
      <div className="hidden" aria-hidden>
        <label>
          No llenar
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" required autoComplete="name" />
        <Field
          label="Correo"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Tipo de proyecto" name="projectType" options={projectTypes} required />
        <SelectField label="Presupuesto estimado" name="budget" options={budgets} />
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-fg">Cuéntanos sobre el proyecto</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Qué negocio es, qué necesitas y para cuándo."
          className="rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
        />
      </label>

      {status === "error" && error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
        </Button>
        <p className="text-xs text-muted">Respuesta en 24 h hábiles.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-fg">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="h-11 rounded-xl border border-line bg-bg px-4 text-sm outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-fg">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="h-11 rounded-xl border border-line bg-bg px-4 text-sm outline-none transition-colors focus:border-accent"
      >
        <option value="" disabled>
          Elegir...
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
