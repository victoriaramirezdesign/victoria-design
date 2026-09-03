// Configuracion central del sitio.
// TODO(contenido): confirmar correo real, numero de WhatsApp y URLs de TikTok / Facebook.

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victoriadesign.pe";

export const site = {
  name: "Victoria Design",
  shortName: "VD",
  domain: "victoriadesign.pe",
  url,
  description:
    "Estudio creativo de diseno y desarrollo web en Peru. Creamos marcas, piezas y sitios que ayudan a emprendedores y negocios a destacar.",
  locale: "es_PE",
  // Slogan de la marca (tomado de su Instagram)
  tagline: "Creatividad que conecta.",
  email: "hola@victoriadesign.pe",
  // Numero en formato internacional sin signos, para el enlace wa.me
  // TODO(contenido): reemplazar por el numero real
  whatsapp: "51999999999",
} as const;

export const nav = [
  { label: "Trabajos", href: "/trabajos" },
  { label: "Estudio", href: "/#estudio" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hola Victoria Design, quiero cotizar un proyecto.",
)}`;

// Solo se listan las redes con URL real confirmada.
// TODO(contenido): agregar TikTok y Facebook cuando se tengan las URLs.
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/victoriadesign.pe/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ana-victoria-ramirez-sanchez-74051b429/",
  },
  { label: "WhatsApp", href: whatsappLink },
] as const;
