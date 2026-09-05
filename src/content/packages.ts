// Paquetes / planes que se muestran en la home.
// TODO(contenido): confirmar nombres, que incluye cada uno y los precios.
// `price: null` muestra "A medida" en vez de un monto.

export type Package = {
  name: string;
  tagline: string;
  /** Precio "desde", en soles. null = cotizacion a medida. */
  price: number | null;
  features: string[];
  /** Resalta el plan del medio como el recomendado. */
  highlighted?: boolean;
};

export const packages: Package[] = [
  {
    name: "Identidad",
    tagline: "Para negocios que arrancan y necesitan verse en serio.",
    price: null,
    features: [
      "Logo y variantes",
      "Paleta y tipografía",
      "Manual de marca básico",
      "Plantillas para redes",
    ],
  },
  {
    name: "Marca + Web",
    tagline: "Lo más pedido: identidad completa y sitio listo para vender.",
    price: null,
    highlighted: true,
    features: [
      "Todo lo del plan Identidad",
      "Sitio web hasta 5 secciones",
      "Formulario de contacto y WhatsApp",
      "SEO base y analítica",
      "Dominio y despliegue incluidos",
    ],
  },
  {
    name: "A medida",
    tagline: "Tienda online, sistemas o proyectos con requerimientos propios.",
    price: null,
    features: [
      "Tienda online y pagos",
      "Integraciones y automatizaciones",
      "Contenido y campañas",
      "Soporte continuo",
    ],
  },
];
