// Clientes reales del estudio.
// TODO(contenido): por cada uno falta el rubro (`sector`), el resumen
// (`summary`), las imagenes (`cover` -> public/trabajos/<slug>/) y, cuando
// existan, los resultados con numeros.

export type Project = {
  slug: string;
  title: string;
  /** Rubro del cliente. TODO(contenido) */
  sector?: string;
  year: string;
  category: string;
  /** 1-2 lineas sobre el proyecto. TODO(contenido) */
  summary?: string;
  services: string[];
  featured: boolean;
  /** Ruta a la portada en /public/trabajos/<slug>/ */
  cover?: string;
  results?: { label: string; value: string }[];
};

const IDENTIDAD = "Identidad corporativa";
const SERVICIO = "Servicio corporativo";
const AMBOS = "Identidad + servicio corporativo";

export const projects: Project[] = [
  {
    slug: "reyes-odontologia",
    title: "Reyes Odontologia Especializada",
    year: "2021 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: true,
  },
  {
    slug: "greenprod",
    title: "GreenProd",
    year: "2024 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: true,
  },
  {
    slug: "no-hay-2",
    title: "No Hay 2",
    year: "2018 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: true,
  },
  {
    slug: "santo-grano",
    title: "Santo Grano",
    year: "2026",
    category: AMBOS,
    services: [SERVICIO, IDENTIDAD],
    featured: true,
  },
  {
    slug: "balik",
    title: "Balik",
    year: "2025 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "casa-villalta",
    title: "Casa Villalta",
    year: "2025",
    category: AMBOS,
    services: [SERVICIO, IDENTIDAD],
    featured: false,
  },
  {
    slug: "geocon-consult",
    title: "Geocon Consult",
    year: "2025",
    category: SERVICIO,
    services: [SERVICIO],
    featured: false,
  },
  {
    slug: "fullnes",
    title: "Fullnes",
    year: "2024 — 2026",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "thana",
    title: "Thana",
    year: "2023 — 2025",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "nutriavo",
    title: "Nutriavo",
    year: "2022",
    category: AMBOS,
    services: [SERVICIO, IDENTIDAD],
    featured: false,
  },
  {
    slug: "la-red",
    title: "La Red",
    year: "2021 — 2023",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "aprendiendo-juntos",
    title: "Aprendiendo Juntos",
    year: "2017 — 2023",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
