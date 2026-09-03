// Configuracion central del sitio.
// TODO(contenido): reemplazar telefono, correo y URLs de redes por los datos reales.

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victoriadesign.pe";

export const site = {
  name: "Victoria Design",
  shortName: "VD",
  domain: "victoriadesign.pe",
  url,
  description:
    "Estudio de diseno y desarrollo web en Peru. Creamos marcas, sitios y landing pages que hacen crecer negocios.",
  locale: "es_PE",
  tagline: "Diseno y codigo, en el mismo equipo.",
  email: "hola@victoriadesign.pe",
  // Numero en formato internacional sin signos, para el enlace wa.me
  whatsapp: "51999999999",
} as const;

export const nav = [
  { label: "Trabajos", href: "/trabajos" },
  { label: "Estudio", href: "/#estudio" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const socials = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "TikTok", href: "https://tiktok.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  {
    label: "WhatsApp",
    href: `https://wa.me/51999999999?text=${encodeURIComponent(
      "Hola Victoria Design, quiero cotizar un proyecto.",
    )}`,
  },
] as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hola Victoria Design, quiero cotizar un proyecto.",
)}`;
