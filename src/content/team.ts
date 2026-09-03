// TODO(contenido): nombres reales, roles y foto de cada integrante del duo.

export type Member = {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  photo?: string; // /public/equipo/...
};

export const team: Member[] = [
  {
    name: "El programador",
    role: "Desarrollo y tecnica",
    bio: "Se encarga de que todo funcione, cargue rapido y sea facil de mantener. Next.js, integraciones y datos.",
    focus: ["Desarrollo web", "Integraciones", "Performance", "Analitica"],
  },
  {
    name: "La disenadora",
    role: "Diseno y direccion visual",
    bio: "Traduce cada negocio en una imagen con personalidad: marca, interfaz y contenido que se siente propio.",
    focus: ["Identidad de marca", "UI / UX", "Direccion de arte", "Contenido"],
  },
];
