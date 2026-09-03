import type { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES, CONTENT_LAST_MODIFIED } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.baseUrl;
  const blogPosts = getAllPosts();

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for each locale
  locales.forEach((locale) => {
    const prefix = locale === "es" ? "" : `/${locale}`;

    // Homepage
    routes.push({
      url: `${baseUrl}${prefix}`,
      lastModified: CONTENT_LAST_MODIFIED.home,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
          "x-default": baseUrl,
        },
      },
    });

    // Services page
    routes.push({
      url: `${baseUrl}${prefix}/services`,
      lastModified: CONTENT_LAST_MODIFIED.services,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          es: `${baseUrl}/services`,
          en: `${baseUrl}/en/services`,
          "x-default": `${baseUrl}/services`,
        },
      },
    });

    // Individual service pages
    SERVICES.forEach((service) => {
      routes.push({
        url: `${baseUrl}${prefix}/services/${service.slug}`,
        lastModified: CONTENT_LAST_MODIFIED.services,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/services/${service.slug}`,
            en: `${baseUrl}/en/services/${service.slug}`,
            "x-default": `${baseUrl}/services/${service.slug}`,
          },
        },
      });
    });

    // Promotions page
    routes.push({
      url: `${baseUrl}${prefix}/promociones`,
      lastModified: CONTENT_LAST_MODIFIED.promotions,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/promociones`,
          en: `${baseUrl}/en/promociones`,
          "x-default": `${baseUrl}/promociones`,
        },
      },
    });

    // Privacy policy
    routes.push({
      url: `${baseUrl}${prefix}/privacy`,
      lastModified: CONTENT_LAST_MODIFIED.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/privacy`,
          en: `${baseUrl}/en/privacy`,
          "x-default": `${baseUrl}/privacy`,
        },
      },
    });

    // Blog page
    routes.push({
      url: `${baseUrl}${prefix}/blog`,
      lastModified: blogPosts[0] ? new Date(blogPosts[0].date) : CONTENT_LAST_MODIFIED.blogIndex,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
          "x-default": `${baseUrl}/blog`,
        },
      },
    });

    // Individual blog posts
    blogPosts.forEach((post) => {
      routes.push({
        url: `${baseUrl}${prefix}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            es: `${baseUrl}/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
            "x-default": `${baseUrl}/blog/${post.slug}`,
          },
        },
      });
    });
  });

  return routes;
}
