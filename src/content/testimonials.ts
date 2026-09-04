// TODO(contenido): reemplazar por testimonios reales de clientes.
// Pedirlos por WhatsApp: "una linea sobre como te fue trabajando con nosotros".
// Si el array queda vacio, la seccion no se renderiza.

export type Testimonial = {
  quote: string;
  author: string;
  /** Cargo + empresa, ej. "Gerente, Reyes Odontologia" */
  role: string;
  /** Foto opcional -> public/testimonios/ */
  photo?: string;
};

export const testimonials: Testimonial[] = [];
