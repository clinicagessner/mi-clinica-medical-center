"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const isNavigating = useRef(false);
  const t = useTranslations();
  const locale = useLocale();

  const homeHref = locale === "es" ? "/" : `/${locale}`;
  const localePrefix = locale === "es" ? "" : `/${locale}`;
  const isHomepage = pathname === "/" || pathname === `/${locale}`;

  // Reset active section when leaving homepage
  useEffect(() => {
    if (!isHomepage) {
      setActiveSection("");
    }
  }, [isHomepage]);

  // Handle hash navigation when arriving at homepage from another page
  useEffect(() => {
    if (!isHomepage) return;

    const hash = window.location.hash.slice(1); // Remove the #
    if (!hash) return;

    // Wait for the section to be available and scroll to it
    let attempts = 0;
    const maxAttempts = 30; // ~500ms max wait

    const tryScroll = () => {
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure layout is complete
        setTimeout(() => {
          isNavigating.current = true;
          setActiveSection(`#${hash}`);

          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          setTimeout(() => {
            isNavigating.current = false;
          }, 1000);
        }, 100);
      } else if (attempts < maxAttempts) {
        attempts++;
        requestAnimationFrame(tryScroll);
      }
    };

    // Start checking after initial render
    requestAnimationFrame(tryScroll);
  }, [isHomepage, pathname]);

  // Navigation links with translations
  const navigationLinks = [
    { label: t("nav.services"), href: `${localePrefix}/#services` },
    { label: t("nav.greenCard"), href: `${localePrefix}/#green-card` },
    { label: t("nav.blog"), href: `${localePrefix}/#blog` },
    { label: t("nav.contact"), href: `${localePrefix}/#contact` },
  ];

  // Scroll to section with offset for fixed header
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isNavigating.current = true;
      setActiveSection(`#${sectionId}`);

      // Scroll with offset for fixed header (80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update URL without triggering navigation
      window.history.pushState(null, "", `#${sectionId}`);

      setTimeout(() => {
        isNavigating.current = false;
      }, 1000);
    }
  }, []);

  // Wait for element to exist in DOM then scroll
  const waitForElementAndScroll = useCallback((sectionId: string, maxAttempts = 20) => {
    let attempts = 0;

    const tryScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        scrollToSection(sectionId);
      } else if (attempts < maxAttempts) {
        attempts++;
        requestAnimationFrame(tryScroll);
      }
    };

    // Start after a small delay to let navigation begin
    setTimeout(tryScroll, 50);
  }, [scrollToSection]);

  // Handle navigation click for hash links
  const handleHashNavigation = useCallback((e: React.MouseEvent, href: string) => {
    if (!href.includes("#")) return; // Not a hash link, let Link handle it

    const hash = href.split("#")[1];

    if (isHomepage) {
      // Same page - just scroll
      e.preventDefault();
      scrollToSection(hash);
    } else {
      // Different page - navigate to homepage then scroll
      e.preventDefault();

      // Navigate to homepage with hash for proper URL
      router.push(`${homeHref}#${hash}`);

      // Wait for page to load and element to exist, then scroll
      waitForElementAndScroll(hash);
    }
  }, [isHomepage, homeHref, router, scrollToSection, waitForElementAndScroll]);

  // Use IntersectionObserver instead of scroll event for isScrolled
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

  // Intersection Observer para detectar sección activa (solo en homepage)
  useEffect(() => {
    if (!isHomepage) return;

    const navSections = ["services", "green-card", "contact"];
    const allSections = ["home", ...navSections];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating.current) return;

        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];
          const sectionId = mostVisible.target.id;

          if (sectionId === "home") {
            setActiveSection("");
            window.history.replaceState(null, "", window.location.pathname);
          } else {
            setActiveSection(`#${sectionId}`);
            window.history.replaceState(null, "", `#${sectionId}`);
          }
        }
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0, 0.5],
      }
    );

    allSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHomepage]);

  const isActiveLink = (href: string) => {
    if (href === "/" || href === `/${locale}`) return isHomepage && !activeSection;
    if (href.includes("#")) {
      const hash = `#${href.split("#")[1]}`;
      return activeSection === hash;
    }
    return pathname.startsWith(href);
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
      {/* Top bar - Info (solo visible cuando no hay scroll) */}
      <div
        className={cn(
          "transition-all duration-500 ease-out overflow-hidden",
          isScrolled
            ? "max-h-0 opacity-0"
            : "max-h-12 sm:max-h-14 opacity-100"
        )}
      >
        <div className="bg-secondary/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-1.5 sm:py-2">
            <div className="flex items-center justify-center lg:justify-between text-xs sm:text-sm">
              {/* Left - Location (hidden on mobile/tablet, visible lg+) */}
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-300"
              >
                <MapPin className="size-4 shrink-0" weight="fill" aria-hidden="true" />
                <span className="truncate max-w-[200px] xl:max-w-xs">{CONTACT_INFO.address}</span>
              </a>

              {/* Center - Hours (hidden on mobile/tablet, visible xl+) */}
              <div className="hidden xl:flex items-center gap-2 text-white/90">
                <Clock className="size-4" weight="fill" />
                <span>{CONTACT_INFO.hours}</span>
              </div>

              {/* Right - Contact (always visible, centered on mobile) */}
              <div className="flex items-center gap-4">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-white hover:text-green-light transition-colors duration-300 font-semibold"
                >
                  <Phone className="size-4" weight="fill" aria-hidden="true" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav aria-label={locale === "es" ? "Navegación principal" : "Main navigation"} className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={homeHref}
            className="flex items-center gap-3 group shrink-0"
          >
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
              <p
                className={cn(
                  "text-lg lg:text-xl xl:text-2xl font-bold leading-tight transition-all duration-500",
                  isScrolled ? "text-secondary" : "text-white drop-shadow-lg"
                )}
              >
                Nueva Salud
              </p>
              <p
                className={cn(
                  "text-[9px] lg:text-[10px] xl:text-xs font-semibold tracking-widest transition-all duration-500",
                  isScrolled ? "text-muted-foreground" : "text-white/90 drop-shadow-md"
                )}
              >
                GESSNER
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (visible lg+) */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              const isHashLink = link.href.includes("#");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={isHashLink ? (e) => handleHashNavigation(e, link.href) : undefined}
                  className={cn(
                    "relative px-4 xl:px-5 py-2.5 text-sm xl:text-base font-medium transition-all duration-300 rounded-xl whitespace-nowrap",
                    isScrolled
                      ? [
                          "text-foreground/70 hover:text-primary hover:bg-primary/10",
                          isActive && "text-primary bg-primary/10 font-semibold",
                        ]
                      : [
                          "text-white/80 hover:text-white hover:bg-white/15",
                          isActive && "text-white bg-white/15 font-semibold",
                        ]
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA (visible lg+) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher
              className={cn(
                isScrolled ? "" : "[&_button]:text-white/80 [&_button]:hover:text-white [&_.bg-muted]:bg-white/20"
              )}
            />

            {/* Teléfono solo visible cuando hay scroll (evita duplicado con top bar) */}
            {isScrolled && (
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2.5 font-semibold transition-all duration-300 px-3 py-2 rounded-xl whitespace-nowrap text-foreground/80 hover:text-primary hover:bg-primary/10"
                aria-label={t("accessibility.callClinic")}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
                  <Phone
                    className="size-4 text-primary"
                    weight="fill"
                    aria-hidden="true"
                  />
                </div>
                <span className="sr-only">{t("common.call")} </span>
                <span className="hidden xl:inline text-sm font-medium">{CONTACT_INFO.phone}</span>
              </a>
            )}
            <Button
              asChild
              size="default"
              className={cn(
                "transition-all duration-300 font-semibold text-sm px-6",
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
                  : "bg-white text-secondary hover:bg-white/95 shadow-lg shadow-black/10 hover:scale-105"
              )}
            >
              <Link
                href={`${homeHref}#contact`}
                onClick={(e) => handleHashNavigation(e, `${homeHref}#contact`)}
              >
                {t("common.schedule")}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu (visible below lg) */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Language Switcher Mobile */}
            <LanguageSwitcher
              variant="minimal"
              className={cn(
                isScrolled
                  ? "text-foreground hover:bg-primary/5"
                  : "text-white hover:bg-white/10"
              )}
            />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-xl transition-all duration-300",
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
                  {/* Sheet Header */}
                  <div className="p-5 border-b bg-linear-to-r from-secondary to-teal-dark">
                    <Link
                      href={homeHref}
                      className="flex items-center gap-3"
                      onClick={() => setIsOpen(false)}
                    >
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
                        <SheetTitle className="text-lg font-bold text-white text-left">
                          Nueva Salud
                        </SheetTitle>
                        <p className="text-[10px] text-white/80 font-semibold tracking-widest">
                          GESSNER
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="flex flex-col gap-1">
                      {navigationLinks.map((link) => {
                        const isActive = isActiveLink(link.href);
                        const isHashLink = link.href.includes("#");
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              "flex items-center px-4 py-3 font-medium rounded-xl transition-all duration-300",
                              isActive
                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                : "text-foreground hover:bg-muted hover:text-primary hover:translate-x-1"
                            )}
                            onClick={(e) => {
                              setIsOpen(false);
                              if (isHashLink) {
                                handleHashNavigation(e, link.href);
                              }
                            }}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Sheet Footer */}
                  <div className="p-4 border-t bg-muted/50 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                        aria-label={t("accessibility.callClinic")}
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="size-5 text-primary" weight="fill" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{t("common.call")}</span>
                      </a>
                      <a
                        href={CONTACT_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                        aria-label={t("accessibility.viewLocation")}
                      >
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                          <MapPin className="size-5 text-secondary" weight="fill" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{t("common.location")}</span>
                      </a>
                    </div>
                    <Button asChild className="w-full h-12 text-sm font-semibold" size="lg">
                      <Link
                        href={`${homeHref}#contact`}
                        onClick={(e) => {
                          setIsOpen(false);
                          handleHashNavigation(e, `${homeHref}#contact`);
                        }}
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
