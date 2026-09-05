// Clientes reales del estudio. Los logos ya estan procesados en
// public/trabajos/<slug>/cover.png (PNG 4:3 con fondo de la paleta del sitio).
//
// TODO(contenido): por cada uno falta el rubro (`sector`), el resumen
// (`summary`) y, cuando existan, los resultados con numeros.
// Los 6 del final llegaron solo con logo: falta confirmar ano y servicio.

export type Project = {
  slug: string;
  title: string;
  /** Rubro del cliente. TODO(contenido) */
  sector?: string;
  /** Ano o rango. Se omite cuando aun no esta confirmado. */
  year?: string;
  category: string;
  /** 1-2 lineas sobre el proyecto. TODO(contenido) */
  summary?: string;
  services: string[];
  featured: boolean;
  /** Portada en /public/trabajos/<slug>/ */
  cover?: string;
  results?: { label: string; value: string }[];
};

const IDENTIDAD = "Identidad corporativa";
const SERVICIO = "Servicio corporativo";
const AMBOS = "Identidad + servicio corporativo";

const cover = (slug: string) => `/trabajos/${slug}/cover.png`;

export const projects: Project[] = [
  {
    slug: "reyes-odontologia",
    cover: cover("reyes-odontologia"),
    title: "Reyes Odontología Especializada",
    year: "2021 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: true,
  },
  {
    slug: "greenprod",
    cover: cover("greenprod"),
    title: "GreenProd",
    year: "2024 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: true,
  },
  {
    slug: "no-hay-2",
    cover: cover("no-hay-2"),
    title: "No Hay 2",
    year: "2018 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: true,
  },
  {
    slug: "santo-grano",
    cover: cover("santo-grano"),
    title: "Santo Grano",
    year: "2026",
    category: AMBOS,
    services: [SERVICIO, IDENTIDAD],
    featured: true,
  },
  {
    slug: "balik",
    cover: cover("balik"),
    title: "Balik",
    year: "2025 — actual",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "casa-villalta",
    cover: cover("casa-villalta"),
    title: "Casa Villalta",
    year: "2025",
    category: AMBOS,
    services: [SERVICIO, IDENTIDAD],
    featured: false,
  },
  {
    slug: "geocon-consult",
    cover: cover("geocon-consult"),
    title: "Geocon Consult",
    year: "2025",
    category: SERVICIO,
    services: [SERVICIO],
    featured: false,
  },
  {
    slug: "fullnes",
    cover: cover("fullnes"),
    title: "Fullnes",
    year: "2024 — 2026",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "thana",
    cover: cover("thana"),
    title: "Thana",
    year: "2023 — 2025",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "nutriavo",
    cover: cover("nutriavo"),
    title: "Nutriavo",
    year: "2022",
    category: AMBOS,
    services: [SERVICIO, IDENTIDAD],
    featured: false,
  },
  {
    slug: "la-red",
    cover: cover("la-red"),
    title: "La Red",
    year: "2021 — 2023",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "aprendiendo-juntos",
    cover: cover("aprendiendo-juntos"),
    title: "Aprendiendo Juntos",
    year: "2017 — 2023",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },

  // --- Llegaron solo con logo. TODO(contenido): confirmar ano y servicio ---
  {
    slug: "caraz-helados",
    cover: cover("caraz-helados"),
    title: "Caraz Dulzura Helados",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "carniprod",
    cover: cover("carniprod"),
    title: "Carniprod",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "ceprobio",
    cover: cover("ceprobio"),
    title: "Ceprobio",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "fishgrox",
    cover: cover("fishgrox"),
    title: "FishGrox",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "brand-in",
    cover: cover("brand-in"),
    title: "Brand-in",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
  {
    slug: "arizale",
    cover: cover("arizale"),
    title: "ArizAle",
    category: IDENTIDAD,
    services: [IDENTIDAD],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
