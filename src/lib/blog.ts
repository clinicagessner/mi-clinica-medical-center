import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const blogDirectory = path.join(process.cwd(), "content/blog");
const DEFAULT_LOCALE = "es";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  featured?: boolean;
  content: string;
}

function readPostFile(slug: string, locale: string): BlogPost | null {
  // Fall back to Spanish (canonical) when the translation doesn't exist yet
  const localePath = path.join(blogDirectory, locale, `${slug}.md`);
  const fallbackPath = path.join(blogDirectory, DEFAULT_LOCALE, `${slug}.md`);
  const fullPath = fs.existsSync(localePath) ? localePath : fallbackPath;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "Equipo Nueva Salud Gessner",
      image: data.image || "",
      featured: false,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Get all blog posts sorted by date (newest first).
 * The featured post is always the most recent one (posts[0]).
 */
export const getAllPosts = cache((locale: string = DEFAULT_LOCALE): BlogPost[] => {
  const posts = getAllSlugs()
    .map((slug) => readPostFile(slug, locale))
    .filter((post): post is BlogPost => post !== null);

  const sorted = posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });

  return sorted.map((post, index) => ({ ...post, featured: index === 0 }));
});

/**
 * Get a single post by slug
 */
export const getPostBySlug = cache((slug: string, locale: string = DEFAULT_LOCALE): BlogPost | null => {
  return readPostFile(slug, locale);
});

/**
 * Get all slugs for static generation (read from the canonical Spanish directory)
 */
export const getAllSlugs = cache((): string[] => {
  const esDirectory = path.join(blogDirectory, DEFAULT_LOCALE);
  if (!fs.existsSync(esDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(esDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
});

/**
 * Calculate read time in minutes
 */
export function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // 200 words per minute
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: string = "es"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
