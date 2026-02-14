import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a locale prefix
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Unprefixed paths → rewrite to default locale (es)
  // e.g. "/" → "/es", "/services" → "/es/services"
  if (!hasLocalePrefix) {
    return NextResponse.rewrite(
      new URL(
        `/${routing.defaultLocale}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // /es paths → redirect to unprefixed (default locale doesn't need prefix)
  // e.g. "/es/services" → "/services"
  if (pathname.startsWith(`/${routing.defaultLocale}`)) {
    const unprefixed =
      pathname.slice(`/${routing.defaultLocale}`.length) || "/";
    return NextResponse.redirect(
      new URL(unprefixed + request.nextUrl.search, request.url)
    );
  }

  // Other locale prefixes (/en/...) → pass through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
