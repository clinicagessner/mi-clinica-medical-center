import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl will automatically find src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

// URLs del sitio anterior que siguen indexadas y devolvían 404. Se envían con
// 301 a la página actual equivalente. Amplía la lista con el informe
// "No encontrada (404)" de Search Console.
const LEGACY_REDIRECTS: { from: string; to: string }[] = [
  { from: "/services/medicina-familiar", to: "/services" },
  { from: "/services/infecciones-vaginales", to: "/services/ginecologia" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.flatMap(({ from, to }) => [
      { source: from, destination: to, permanent: true },
      { source: `/en${from}`, destination: `/en${to}`, permanent: true },
    ]);
  },
  images: {
    // Optimizador de Vercel desactivado: la cuenta tiene topada la cuota de Image
    // Optimization (/_next/image devuelve HTTP 402). Servimos los archivos
    // originales de public/, ya comprimidos a mano (WebP q80 / PNG pngquant+oxipng).
    unoptimized: true,
    qualities: [75, 80, 85],
  },
};

export default withNextIntl(nextConfig);
