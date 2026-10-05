/**
 * Fechas de la última edición **de contenido** de cada página, para el
 * `lastmod` del sitemap, el `dateModified` del schema y la caja de revisión
 * médica. Salen del historial de git y se actualizan en el mismo commit que
 * cambia la página: un `lastmod` con la fecha del build miente en cada
 * despliegue y Google deja de fiarse de él.
 */

/** Páginas estáticas (ruta sin prefijo de idioma). */
export const PAGE_DATES: Record<string, string> = {
  "": "2026-10-05", // B1: entidad, FAQ de la home
  "/services": "2026-10-05", // catálogo /en en inglés, metas
  "/promociones": "2026-09-02",
  "/blog": "2026-09-02",
  "/privacy": "2026-08-27",
};

/** Fecha por defecto de las páginas de servicio (B1 y B3 del playbook: 5-oct). */
export const SERVICES_LAST_REVIEWED = "2026-10-05";

/** Fecha de publicación de las páginas de servicio en este dominio. */
export const SERVICES_PUBLISHED = "2026-02-13";

/** Servicios revisados después de SERVICES_LAST_REVIEWED. */
export const SERVICE_DATES: Record<string, string> = {};

export function serviceDate(slug: string): string {
  return SERVICE_DATES[slug] ?? SERVICES_LAST_REVIEWED;
}
