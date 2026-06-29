import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl will automatically find src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Optimizador de Vercel desactivado: la cuenta tiene topada la cuota de Image
    // Optimization (/_next/image devuelve HTTP 402). Servimos los archivos
    // originales de public/, ya comprimidos a mano (WebP q80 / PNG pngquant+oxipng).
    unoptimized: true,
    qualities: [75, 80, 85],
  },
};

export default withNextIntl(nextConfig);
