// TODO(contenido): bios finales y fotos de cada uno (-> public/equipo/).

export type Member = {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  photo?: string; // /public/equipo/...
};

export const team: Member[] = [
  {
    name: "Ana Victoria Ramirez Sanchez",
    role: "Diseno y direccion creativa",
    bio: "Traduce cada negocio en una imagen con personalidad: identidad, piezas graficas y contenido publicitario que conecta.",
    focus: ["Identidad de marca", "Diseno grafico", "Direccion de arte", "Contenido"],
  },
  {
    name: "Azet Ramirez",
    role: "Desarrollo web y tecnica",
    bio: "Se encarga de que todo funcione, cargue rapido y sea facil de mantener. Next.js, integraciones y datos.",
    focus: ["Desarrollo web", "Integraciones", "Performance", "Analitica"],
  },
];
