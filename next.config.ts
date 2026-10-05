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
    // Optimization (/_next/image devuelve HTTP 402). Loader propio (B4): sirve las
    // variantes pregeneradas de public/images (scripts/generate-image-variants.mjs,
    // en prebuild; manifiesto en src/lib/image-variants.json) para que next/image
    // emita srcset y el móvil no descargue el archivo de escritorio. Lo que no está
    // en el manifiesto (PNG, remotas) se sirve tal cual.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [384, 640, 828, 1080, 1376],
    imageSizes: [128, 256, 512],
    qualities: [75, 80, 85],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      // Imágenes de public/: 30 días + revalidación en segundo plano. No
      // `immutable` porque los nombres no llevan hash y un flyer puede
      // reemplazarse con el mismo nombre.
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
