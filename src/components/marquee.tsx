const items = [
  "Identidad de marca",
  "Sitios web",
  "Landing pages",
  "E-commerce",
  "UI / UX",
  "SEO",
  "Contenido",
  "Campanas",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex w-max gap-4 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center gap-4" aria-hidden={copy === 1}>
            {items.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="font-display text-xl text-fg/90 sm:text-2xl">
                  {item}
                </span>
                <span className="text-accent">&#42;</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
