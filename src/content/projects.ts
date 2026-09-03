// TODO(contenido): estos proyectos son de ejemplo (placeholders).
// Reemplazar por trabajos reales: nombre de cliente, rubro, ano, imagenes y resultados.
// Cuando pasemos a Supabase, esta estructura se mantiene igual.

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  services: string[];
  featured: boolean;
  // Ruta a imagen en /public/trabajos/... (aun no cargadas)
  cover?: string;
  results?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "aurora-cafe",
    title: "Aurora Cafe",
    client: "Cafeteria de especialidad",
    year: "2025",
    category: "Marca + Sitio",
    summary:
      "Identidad calida y un sitio con carta digital y reservas. Placeholder de ejemplo hasta cargar el caso real.",
    services: ["Identidad de marca", "Sitio web", "Carta digital"],
    featured: true,
    results: [
      { label: "Reservas online", value: "+140%" },
      { label: "Tiempo de carga", value: "0.9s" },
    ],
  },
  {
    slug: "nexo-legal",
    title: "Nexo Legal",
    client: "Estudio de abogados",
    year: "2025",
    category: "Sitio corporativo",
    summary:
      "Sitio serio y claro para un estudio boutique, con blog y formulario de consultas. Contenido de ejemplo.",
    services: ["Diseno UI/UX", "Desarrollo", "SEO base"],
    featured: true,
    results: [
      { label: "Consultas / mes", value: "x3" },
      { label: "Posicion en Google", value: "Top 5" },
    ],
  },
  {
    slug: "campo-vivo",
    title: "Campo Vivo",
    client: "Marca de alimentos organicos",
    year: "2024",
    category: "E-commerce",
    summary:
      "Tienda online con pagos locales y suscripcion de canastas semanales. Caso de ejemplo.",
    services: ["Branding", "Tienda online", "Pagos"],
    featured: true,
    results: [
      { label: "Ventas primer mes", value: "S/ 38k" },
      { label: "Recompra", value: "46%" },
    ],
  },
  {
    slug: "estudio-lumen",
    title: "Estudio Lumen",
    client: "Fotografia de producto",
    year: "2024",
    category: "Portafolio",
    summary:
      "Portafolio visual con galerias rapidas y contacto directo por WhatsApp. Contenido de ejemplo.",
    services: ["Diseno", "Desarrollo"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
