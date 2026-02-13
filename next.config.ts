import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl will automatically find src/i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 85],
  },
};

export default withNextIntl(nextConfig);
