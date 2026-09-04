import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = ["", "/trabajos", "/notas", "/contacto"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${site.url}/trabajos/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${site.url}/notas/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...projectRoutes, ...postRoutes];
}
