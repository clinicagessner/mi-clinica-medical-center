import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLocalePrefix = routing.locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // For unprefixed paths, rewrite to the default locale directly.
  // This prevents Accept-Language based redirects (next-intl 4.x bug
  // where localeDetection: false is ignored) while maintaining the
  // intended behavior of localePrefix: "as-needed".
  if (!hasLocalePrefix) {
    return NextResponse.rewrite(
      new URL(`/${routing.defaultLocale}${pathname}${request.nextUrl.search}`, request.url)
    );
  }

  // For prefixed paths (/en/..., /es/...), delegate to next-intl
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
