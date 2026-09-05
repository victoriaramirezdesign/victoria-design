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
    name: "Ana Victoria Ramírez Sánchez",
    role: "Diseño y dirección creativa",
    bio: "Traduce cada negocio en una imagen con personalidad: identidad, piezas gráficas y contenido publicitario que conecta.",
    focus: ["Identidad de marca", "Diseño gráfico", "Dirección de arte", "Contenido"],
  },
  {
    name: "Azet Ramírez",
    role: "Desarrollo web y técnica",
    bio: "Se encarga de que todo funcione, cargue rápido y sea fácil de mantener. Next.js, integraciones y datos.",
    focus: ["Desarrollo web", "Integraciones", "Performance", "Analítica"],
  },
];
