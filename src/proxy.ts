import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Set default locale cookie for new visitors so the middleware
  // serves Spanish instead of redirecting based on Accept-Language
  const hasLocalePrefix = routing.locales.some(
    (locale) =>
      request.nextUrl.pathname === `/${locale}` ||
      request.nextUrl.pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocalePrefix && !request.cookies.get("NEXT_LOCALE")) {
    request.cookies.set("NEXT_LOCALE", routing.defaultLocale);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
