import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2
          id={id}
          className="mt-5 text-balance text-3xl leading-[1.05] sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={140}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
