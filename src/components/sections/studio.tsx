import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/content/team";

export function Studio() {
  return (
    <section id="estudio" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" />
              El estudio
            </p>
            <h2 className="mt-5 text-3xl leading-[1.05] sm:text-4xl">
              Dos personas, cero intermediarios.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Trabajas directo con quienes hacen el trabajo. Menos reuniones,
              respuestas rapidas y decisiones que no se diluyen.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {team.map((member, i) => (
              <Reveal
                key={member.name}
                delay={i * 90}
                className="flex flex-col rounded-2xl border border-line bg-bg-elev p-6"
              >
                <div className="flex aspect-square items-center justify-center rounded-xl border border-line bg-bg">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <span className="font-display text-4xl text-fg/15">
                      {member.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl">{member.name}</h3>
                <p className="text-sm text-accent">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
