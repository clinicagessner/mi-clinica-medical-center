"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { List, Phone, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CONTACT_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  const homeHref = locale === "es" ? "/" : `/${locale}`;
  const localePrefix = locale === "es" ? "" : `/${locale}`;
  const isHomepage = pathname === "/" || pathname === `/${locale}`;

  // Navigation links
  const navigationLinks = [
    { label: t("nav.services"), href: `${localePrefix}/#services`, id: "services" },
    { label: t("nav.greenCard"), href: `${localePrefix}/#green-card`, id: "green-card" },
    { label: t("nav.blog"), href: `${localePrefix}/#blog`, id: "blog" },
    { label: t("nav.contact"), href: `${localePrefix}/#contact`, id: "contact" },
  ];

  // Scroll detection
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:50px;width:1px;height:1px;pointer-events:none";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 1 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Active section tracking
  useEffect(() => {
    if (!isHomepage) {
      setActiveSection("");
      return;
    }

    const sectionIds = ["home", "services", "green-card", "blog", "contact"];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === "home") {
              setActiveSection("");
              window.history.replaceState(null, "", window.location.pathname);
            } else {
              setActiveSection(id);
              window.history.replaceState(null, "", `#${id}`);
            }
            break;
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomepage]);

  // Handle hash on page load (including cross-page navigation)
  useEffect(() => {
    if (!isHomepage) return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    // Retry mechanism for cross-page navigation
    let attempts = 0;
    const maxAttempts = 10;

    const scrollToHash = () => {
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(hash);
      } else if (attempts < maxAttempts) {
        // Element not ready yet, retry
        attempts++;
        setTimeout(scrollToHash, 100);
      }
    };

    // Initial delay for page render
    setTimeout(scrollToHash, 150);
  }, [isHomepage, pathname]);

  // Scroll to section
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    // Close menu FIRST to unlock body scroll (iOS Safari fix)
    setIsOpen(false);

    // Wait for Sheet animation to complete and body scroll to unlock
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(sectionId);
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    }, 350);
  };

  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    if (isHomepage) {
      scrollToSection(e, sectionId);
    } else {
      // Cross-page: close menu, let Link navigate with hash
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-linear-to-b from-black/60 to-transparent"
      )}
    >
      {/* Top bar */}
      <div
        className={cn(
          "transition-all duration-500 ease-out overflow-hidden",
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 sm:max-h-14 opacity-100"
        )}
      >
        <div className="bg-secondary/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-1.5 sm:py-2">
            <div className="flex items-center justify-center lg:justify-between text-xs sm:text-sm">
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <MapPin className="size-4 shrink-0" weight="fill" />
                <span className="truncate max-w-[200px] xl:max-w-xs">{CONTACT_INFO.address}</span>
              </a>

              <div className="hidden xl:flex items-center gap-2 text-white/90">
                <Clock className="size-4" weight="fill" />
                <span>{CONTACT_INFO.hours}</span>
              </div>

              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-white hover:text-green-light transition-colors font-semibold"
              >
                <Phone className="size-4" weight="fill" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav aria-label={locale === "es" ? "Navegación principal" : "Main navigation"} className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-3 group shrink-0">
            <div
              className={cn(
                "relative transition-all duration-500 rounded-full",
                isScrolled
                  ? "size-9 sm:size-10 lg:size-12 xl:size-14 bg-white shadow-sm"
                  : "size-10 sm:size-12 lg:size-14 xl:size-16 bg-white/95 shadow-lg shadow-black/20"
              )}
            >
              <Image
                src="/images/logo.webp"
                alt="logo clinica hispana nueva salud gessner houston"
                fill
                className="object-contain p-1 transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 48px, (max-width: 1280px) 56px, 64px"
              />
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "text-lg lg:text-xl xl:text-2xl font-bold leading-tight transition-all duration-500",
                isScrolled ? "text-secondary" : "text-white drop-shadow-lg"
              )}>
                Nueva Salud
              </p>
              <p className={cn(
                "text-[9px] lg:text-[10px] xl:text-xs font-semibold tracking-widest transition-all duration-500",
                isScrolled ? "text-muted-foreground" : "text-white/90 drop-shadow-md"
              )}>
                GESSNER
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "px-4 xl:px-5 py-2.5 text-sm xl:text-base font-medium rounded-xl transition-all duration-300",
                  isScrolled
                    ? [
                        "text-foreground/70 hover:text-primary hover:bg-primary/10",
                        activeSection === link.id && "text-primary bg-primary/10 font-semibold",
                      ]
                    : [
                        "text-white/80 hover:text-white hover:bg-white/15",
                        activeSection === link.id && "text-white bg-white/15 font-semibold",
                      ]
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <LanguageSwitcher
              className={cn(!isScrolled && "[&_button]:text-white/80 [&_button]:hover:text-white [&_.bg-muted]:bg-white/20")}
            />

            {isScrolled && (
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
                aria-label={t("accessibility.callClinic")}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="size-4 text-primary" weight="fill" />
                </div>
                <span className="hidden xl:inline text-sm font-medium">{CONTACT_INFO.phone}</span>
              </a>
            )}

            <Button
              asChild
              className={cn(
                "font-semibold text-sm px-6 transition-all duration-300",
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25"
                  : "bg-white text-secondary hover:bg-white/95 shadow-lg shadow-black/10 hover:scale-105"
              )}
            >
              <Link
                href={`${localePrefix}/#contact`}
                onClick={(e) => handleNavClick(e, "contact")}
              >
                {t("common.schedule")}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher
              variant="minimal"
              className={cn(isScrolled ? "text-foreground hover:bg-primary/5" : "text-white hover:bg-white/10")}
            />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-xl transition-all",
                    isScrolled
                      ? "text-foreground hover:bg-primary/5 hover:text-primary"
                      : "text-white hover:bg-white/10"
                  )}
                  aria-label={t("common.openMenu")}
                >
                  <List className="size-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0" showCloseButton={false}>
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-5 border-b bg-linear-to-r from-secondary to-teal-dark">
                    <Link href={homeHref} className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                      <div className="w-[53px] h-14 rounded-xl overflow-hidden bg-white/10 p-1">
                        <Image
                          src="/images/logo.webp"
                          alt="logo clinica hispana nueva salud gessner houston"
                          width={53}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <SheetTitle className="text-lg font-bold text-white text-left">Nueva Salud</SheetTitle>
                        <p className="text-[10px] text-white/80 font-semibold tracking-widest">GESSNER</p>
                      </div>
                    </Link>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.id}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.id)}
                          className={cn(
                            "flex items-center px-4 py-3 font-medium rounded-xl transition-all",
                            activeSection === link.id
                              ? "bg-primary/10 text-primary border-l-4 border-primary"
                              : "text-foreground hover:bg-muted hover:text-primary hover:translate-x-1"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Footer */}
                  <div className="p-4 border-t bg-muted/50 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                        aria-label={t("accessibility.callClinic")}
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="size-5 text-primary" weight="fill" />
                        </div>
                        <span className="text-sm font-semibold">{t("common.call")}</span>
                      </a>
                      <a
                        href={CONTACT_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                        aria-label={t("accessibility.viewLocation")}
                      >
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                          <MapPin className="size-5 text-secondary" weight="fill" />
                        </div>
                        <span className="text-sm font-semibold">{t("common.location")}</span>
                      </a>
                    </div>
                    <Button asChild className="w-full h-12 text-sm font-semibold" size="lg">
                      <Link
                        href={`${localePrefix}/#contact`}
                        onClick={(e) => handleNavClick(e, "contact")}
                      >
                        {t("common.schedule")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
