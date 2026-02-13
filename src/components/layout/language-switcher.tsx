"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Globe } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "default" | "minimal";
};

export function LanguageSwitcher({ className, variant = "default" }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "es" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={() => switchLocale(locale === "es" ? "en" : "es")}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm font-medium transition-colors",
          className
        )}
        aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
      >
        <Globe className="size-4" weight="bold" />
        <span className="uppercase">{locale === "es" ? "EN" : "ES"}</span>
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe className="size-4 text-muted-foreground" weight="bold" />
      <div className="flex items-center bg-muted rounded-lg p-0.5">
        <button
          onClick={() => switchLocale("es")}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200",
            locale === "es"
              ? "bg-primary text-white shadow-sm"
              : "text-foreground/70 hover:text-foreground"
          )}
          aria-label="Español"
          aria-pressed={locale === "es"}
        >
          ES
        </button>
        <button
          onClick={() => switchLocale("en")}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200",
            locale === "en"
              ? "bg-primary text-white shadow-sm"
              : "text-foreground/70 hover:text-foreground"
          )}
          aria-label="English"
          aria-pressed={locale === "en"}
        >
          EN
        </button>
      </div>
    </div>
  );
}
