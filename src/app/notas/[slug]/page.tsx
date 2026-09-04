import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ContactCta } from "@/components/sections/contact-cta";
import { getPost, posts } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/notas/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/notas/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NotaPage(props: PageProps<"/notas/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="py-16 sm:py-24">
        <Container>
          <Link
            href="/notas"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            &larr; Todas las notas
          </Link>

          <header className="mt-8 border-b border-line pb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="rounded-full border border-line px-3 py-1">
                {post.tag}
              </span>
              <span className="font-mono">{formatDate(post.date)}</span>
              <span className="font-mono">{post.readingMinutes} min</span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] sm:text-5xl">
              {post.title}
            </h1>
          </header>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-muted sm:text-lg">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </article>
      <ContactCta />
    </>
  );
}
