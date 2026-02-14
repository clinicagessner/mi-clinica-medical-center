import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // For unprefixed paths without a locale cookie, inject the cookie
  // into the request headers so next-intl serves the default locale (es)
  // instead of redirecting based on Accept-Language
  const hasLocalePrefix = routing.locales.some(
    (locale) =>
      request.nextUrl.pathname === `/${locale}` ||
      request.nextUrl.pathname.startsWith(`/${locale}/`)
  );
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;

  if (!hasLocalePrefix && !localeCookie) {
    const headers = new Headers(request.headers);
    const existingCookies = headers.get("cookie") || "";
    headers.set(
      "cookie",
      existingCookies
        ? `${existingCookies}; NEXT_LOCALE=${routing.defaultLocale}`
        : `NEXT_LOCALE=${routing.defaultLocale}`
    );
    return handleI18nRouting(
      new NextRequest(request.url, { headers })
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
