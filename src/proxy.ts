import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // If no locale prefix and no NEXT_LOCALE cookie, set cookie to default
  // locale so next-intl doesn't redirect based on Accept-Language header
  const pathname = request.nextUrl.pathname;
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

  if (!hasLocalePrefix && !localeCookie) {
    request.cookies.set("NEXT_LOCALE", routing.defaultLocale);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
