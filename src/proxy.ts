import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);

  // localeDetection: false in defineRouting doesn't prevent Accept-Language
  // redirects in next-intl 4.x. When the middleware redirects an unprefixed
  // path (e.g. "/" → "/en") based on Accept-Language, convert the redirect
  // into a rewrite so the default locale (es) is served at the original URL.
  // This is the intended behavior of localePrefix: "as-needed".
  if (response.status === 307) {
    const pathname = request.nextUrl.pathname;
    const hasLocalePrefix = routing.locales.some(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (!hasLocalePrefix) {
      return NextResponse.rewrite(
        new URL(`/${routing.defaultLocale}${pathname}`, request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
