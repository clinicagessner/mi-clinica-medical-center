import { SITE_CONFIG } from "@/lib/constants";

/** Marca corta que se añade a los títulos si cabe en 60 (lleva "Gessner", la calle). */
export const BRAND = "Nueva Salud Gessner";

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

/**
 * Landings de Google Ads (RED.md). Su título, H1 y meta no se cambian sin
 * aprobación del usuario (HERMES.md regla 5): conservan el formato anterior,
 * "<título> | Clínica Hispana Houston", hasta que se aprueben los nuevos.
 */
export const ADS_LANDING_SLUGS: readonly string[] = []; // ginecología y urinarias: aprobados 2026-10-05

export function adsLegacyTitle(title: string, locale: string): string {
  return `${title} | ${locale === "en" ? "Hispanic Clinic Houston" : "Clínica Hispana Houston"}`;
}

/** Corta en el último límite de palabra que quepa, sin dejar puntuación colgando. */
function trimToWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const at = cut.lastIndexOf(" ");
  return cut.slice(0, at > 0 ? at : max).replace(/[\s,.;:–—|-]+$/, "");
}

/**
 * Título con marca **si cabe en 60**. Si no cabe, manda la palabra clave: un
 * título cortado a la mitad lo reescribe Google y se pierde el control.
 */
export function seoTitle(pageTitle: string, brand: string = BRAND): string {
  const title = pageTitle.trim();
  if (!brand || title.toLowerCase().includes(brand.toLowerCase())) {
    return trimToWord(title, TITLE_MAX);
  }
  const withBrand = `${title} | ${brand}`;
  if (withBrand.length <= TITLE_MAX) return withBrand;
  return trimToWord(title, TITLE_MAX);
}

/** Descripción dentro de 155. Es una red de seguridad, no una excusa para no escribirlas. */
export function seoDescription(text: string, max: number = DESCRIPTION_MAX): string {
  return trimToWord(text.trim(), max);
}

type SocialInput = {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * `openGraph` y `twitter` completos. El `openGraph` de una página **reemplaza
 * entero** al del layout: si la página no pone imagen se queda sin ninguna, por
 * eso la imagen por defecto se resuelve aquí.
 */
export function buildSocial({
  title,
  description,
  url,
  image,
  imageAlt,
  type = "website",
  locale = "es",
  publishedTime,
  modifiedTime,
}: SocialInput) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_CONFIG.baseUrl}${image}`
    : `${SITE_CONFIG.baseUrl}/images/og-image.jpg`;

  return {
    openGraph: {
      type,
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      siteName: SITE_CONFIG.name,
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt ?? title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** canonical + hreflang de una ruta sin prefijo de idioma ("" = home). */
export function buildAlternates(path: string, locale: string) {
  const base = SITE_CONFIG.baseUrl;
  return {
    canonical: locale === "es" ? `${base}${path}` || base : `${base}/en${path}`,
    languages: {
      es: `${base}${path}` || base,
      en: `${base}/en${path}`,
      "x-default": `${base}${path}` || base,
    },
  };
}
