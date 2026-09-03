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
      "Definimos como se ve y como suena tu negocio: logo, colores, tipografias y un sistema visual que puedes usar en todos lados.",
    deliverables: ["Logo y variantes", "Paleta y tipografia", "Manual de marca", "Plantillas para redes"],
  },
  {
    no: "02",
    title: "Sitios y landing pages",
    description:
      "Disenamos y programamos el sitio completo. Rapido, medible y facil de actualizar, listo para recibir visitas desde el primer dia.",
    deliverables: ["Diseno UI/UX", "Desarrollo en Next.js", "Optimizacion y SEO base", "Analitica y formularios"],
  },
  {
    no: "03",
    title: "Tiendas y cobros online",
    description:
      "Catalogo, carrito y pagos integrados con pasarelas de Peru. Tus clientes compran sin salir de tu web.",
    deliverables: ["Catalogo de productos", "Checkout y pagos", "Panel de pedidos", "Correos automaticos"],
  },
  {
    no: "04",
    title: "Campanas y contenido",
    description:
      "Piezas para pauta y redes que mantienen la misma linea de tu marca, pensadas para convertir y no solo para gustar.",
    deliverables: ["Creativos para ads", "Kit de posts", "Copywriting", "Guia de uso"],
  },
];
