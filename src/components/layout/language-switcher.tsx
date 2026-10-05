"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Globe } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "default" | "minimal";
};

// Enlaces reales con href escrito a mano: con botones y router.replace la
// versión /en no era rastreable, y el Link de next-intl con `locale` emite
// /es/... (307). El prefijo es `as-needed`: español sin prefijo, inglés con /en.
function hrefFor(target: "es" | "en", pathname: string) {
  const path = pathname === "/" ? "" : pathname;
  return target === "en" ? `/en${path}` : path || "/";
}

export function LanguageSwitcher({ className, variant = "default" }: Props) {
  const locale = useLocale();
  const pathname = usePathname();

  if (variant === "minimal") {
    const target = locale === "es" ? "en" : "es";
    return (
      <Link
        href={hrefFor(target, pathname)}
        hrefLang={target}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm font-medium transition-colors",
          className
        )}
        aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
      >
        <Globe className="size-4" weight="bold" />
        <span className="uppercase">{locale === "es" ? "EN" : "ES"}</span>
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe className="size-4 text-muted-foreground" weight="bold" />
      <div className="flex items-center bg-muted rounded-lg p-0.5">
        {(["es", "en"] as const).map((l) => (
          <Link
            key={l}
            href={hrefFor(l, pathname)}
            hrefLang={l}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200",
              locale === l
                ? "bg-primary text-white shadow-sm"
                : "text-foreground/70 hover:text-foreground"
            )}
            aria-label={l === "es" ? "Español" : "English"}
            aria-current={locale === l ? "true" : undefined}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
