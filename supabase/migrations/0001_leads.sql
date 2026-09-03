-- Tabla de leads del formulario de contacto.
-- Ejecutar en Supabase: SQL Editor > pegar > Run.

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  project_type text not null,
  budget       text,
  message      text not null,
  source       text not null default 'web-contacto',
  status       text not null default 'nuevo',
  notes        text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- RLS activado: nadie entra con la clave anon.
-- El sitio escribe con la service_role key (bypassa RLS), asi que no
-- necesitamos politicas para el formulario. El panel interno (fase 2)
-- usara Clerk + service role desde el servidor.
alter table public.leads enable row level security;
