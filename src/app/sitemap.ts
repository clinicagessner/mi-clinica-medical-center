import type { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES, BLOG_POSTS } from "@/lib/constants";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl;

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for each locale
  locales.forEach((locale) => {
    const prefix = locale === "es" ? "" : `/${locale}`;

    // Homepage
    routes.push({
      url: `${baseUrl}${prefix}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    });

    // Services page
    routes.push({
      url: `${baseUrl}${prefix}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/services`,
          en: `${baseUrl}/en/services`,
        },
      },
    });

    // Individual service pages
    SERVICES.forEach((service) => {
      routes.push({
        url: `${baseUrl}${prefix}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/services/${service.slug}`,
            en: `${baseUrl}/en/services/${service.slug}`,
          },
        },
      });
    });

    // Privacy policy
    routes.push({
      url: `${baseUrl}${prefix}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/privacy`,
          en: `${baseUrl}/en/privacy`,
        },
      },
    });

    // Blog page
    routes.push({
      url: `${baseUrl}${prefix}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    });

    // Individual blog posts
    BLOG_POSTS.forEach((post) => {
      routes.push({
        url: `${baseUrl}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      });
    });
  });

  return routes;
}
