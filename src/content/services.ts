// TODO(contenido): ajustar servicios, descripciones y entregables reales.

export type Service = {
  no: string;
  title: string;
  description: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    no: "01",
    title: "Identidad de marca",
    description:
      "Definimos cómo se ve y cómo suena tu negocio: logo, colores, tipografías y un sistema visual que puedes usar en todos lados.",
    deliverables: ["Logo y variantes", "Paleta y tipografía", "Manual de marca", "Plantillas para redes"],
  },
  {
    no: "02",
    title: "Sitios y landing pages",
    description:
      "Diseñamos y programamos el sitio completo. Rápido, medible y fácil de actualizar, listo para recibir visitas desde el primer día.",
    deliverables: ["Diseño UI/UX", "Desarrollo en Next.js", "Optimización y SEO base", "Analítica y formularios"],
  },
  {
    no: "03",
    title: "Tiendas y cobros online",
    description:
      "Catálogo, carrito y pagos integrados con pasarelas de Perú. Tus clientes compran sin salir de tu web.",
    deliverables: ["Catálogo de productos", "Checkout y pagos", "Panel de pedidos", "Correos automáticos"],
  },
  {
    no: "04",
    title: "Campañas y contenido",
    description:
      "Piezas para pauta y redes que mantienen la misma línea de tu marca, pensadas para convertir y no solo para gustar.",
    deliverables: ["Creativos para ads", "Kit de posts", "Copywriting", "Guía de uso"],
  },
];
