import type { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { PAGE_DATES, serviceDate } from "@/lib/content-dates";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";

// Una <url> por idioma con alternates recíprocos y `lastmod` real (fecha de la
// última edición de contenido). Sin `priority` ni `changefreq`: Google los ignora.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl;

  const entry = (path: string, date: string): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: `${baseUrl}${locale === "es" ? "" : `/${locale}`}${path}`,
      lastModified: new Date(date),
      alternates: {
        languages: {
          es: `${baseUrl}${path}`,
          en: `${baseUrl}/en${path}`,
          "x-default": `${baseUrl}${path}`,
        },
      },
    }));

  const staticRoutes = Object.entries(PAGE_DATES).flatMap(([path, date]) =>
    entry(path, date)
  );

  const serviceRoutes = SERVICES.flatMap((service) =>
    entry(`/services/${service.slug}`, serviceDate(service.slug))
  );

  const blogRoutes = getAllPosts("es").flatMap((post) =>
    entry(`/blog/${post.slug}`, post.updated ?? post.date)
  );

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
