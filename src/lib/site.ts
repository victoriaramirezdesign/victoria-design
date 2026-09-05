// Configuracion central del sitio.

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victoriadesign.pe";

export const site = {
  name: "Victoria Design",
  shortName: "VD",
  domain: "victoriadesign.pe",
  url,
  description:
    "Estudio creativo de diseño y desarrollo web en Perú. Creamos marcas, piezas y sitios que ayudan a emprendedores y negocios a destacar.",
  locale: "es_PE",
  // Slogan de la marca (tomado de su Instagram)
  tagline: "Creatividad que conecta.",
  email: "gerencia@victoriadesign.pe",
  // Numero en formato internacional sin signos, para el enlace wa.me
  whatsapp: "51984167763",
  // TODO(contenido): pegar el link real de Calendly/Cal.com para agendar
  // llamadas. Si queda vacio, el boton "Agendar llamada" no se muestra.
  bookingUrl: "",
  // TODO(contenido): reel corto (10-15s, mp4 sin audio) en public/.
  // Ej: "/hero.mp4". Vacio = se muestra solo el degradado.
  heroVideo: "",
} as const;

export const nav = [
  { label: "Trabajos", href: "/trabajos" },
  { label: "Paquetes", href: "/#paquetes" },
  { label: "Estudio", href: "/#estudio" },
  { label: "Notas", href: "/notas" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hola Victoria Design, quiero cotizar un proyecto.",
)}`;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/victoriadesign.pe/" },
  { label: "TikTok", href: "https://www.tiktok.com/@victoriadesign" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61578096981408",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ana-victoria-ramirez-sanchez-74051b429/",
  },
  { label: "WhatsApp", href: whatsappLink },
] as const;
