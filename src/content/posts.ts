// Notas / blog. Sirve para SEO y para mostrar criterio.
// TODO(contenido): escribir las notas reales. `body` acepta parrafos sueltos;
// cada string del array es un <p>. Si el array queda vacio, /notas muestra
// un estado "pronto" y no aparece en el menu.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, ej. "2026-09-04" */
  date: string;
  /** Minutos de lectura aproximados */
  readingMinutes: number;
  tag: string;
  body: string[];
};

export const posts: Post[] = [];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
