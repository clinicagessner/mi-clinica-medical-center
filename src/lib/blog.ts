import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const postsDirectory = path.join(process.cwd(), "content/blog");

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

/**
 * Get all blog posts sorted by date (newest first)
 */
export const getAllPosts = cache((): BlogPost[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        author: data.author || "Equipo Nueva Salud Gessner",
        image: data.image || "",
        featured: data.featured || false,
        content,
      };
    });

  // Sort by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
});

/**
 * Get a single post by slug
 */
export const getPostBySlug = cache((slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "Equipo Nueva Salud Gessner",
      image: data.image || "",
      featured: data.featured || false,
      content,
    };
  } catch {
    return null;
  }
});

/**
 * Get all slugs for static generation
 */
export const getAllSlugs = cache((): string[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
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
