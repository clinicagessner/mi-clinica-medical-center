import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

// Bots de IA a los que se permite rastrear: son los que citan la clínica en
// ChatGPT, Claude, Perplexity, Gemini, Copilot y las respuestas de IA de Google.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "Amazonbot",
  "Bytespider",
  "YouBot",
  "cohere-ai",
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/"],
      })),
      // Solo recolecta corpus de entrenamiento; no manda tráfico ni cita.
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
    host: SITE_CONFIG.baseUrl,
  };
}
