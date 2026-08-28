import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Solo se excluyen assets reales por extensión. Antes se excluía cualquier path
  // con punto (/.env, /wp-login.php), que llegaba a /[locale] sin pasar por next-intl
  // y disparaba NoFallbackError → 500 en Vercel en vez de un 404 normal.
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\.(?:png|jpe?g|webp|gif|svg|ico|css|js|map|txt|xml|json|webmanifest|woff2?|ttf|mp4|pdf)$).*)",
  ],
};
