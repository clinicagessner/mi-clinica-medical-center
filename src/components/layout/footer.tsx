"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, MapPin, Clock, InstagramLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { CONTACT_INFO, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const locale = useLocale();

  const homeHref = locale === "es" ? "/" : `/${locale}`;
  const localePrefix = locale === "es" ? "" : `/${locale}`;

  // Navigation links with translations
  const navigationLinks = [
    { label: t("nav.services"), href: `${localePrefix}/#services` },
    { label: t("nav.chronicCare"), href: `${localePrefix}/#chronic-care` },
    { label: t("nav.blog"), href: `${localePrefix}/blog` },
    { label: t("nav.contact"), href: `${localePrefix}/#contact` },
  ];

  return (
    <footer className="bg-teal-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href={homeHref} className="group flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt="logo clinica hispana nueva salud gessner houston"
                width={53}
                height={56}
                className="w-[53px] h-14 bg-white rounded-lg p-1 transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="text-lg font-bold group-hover:text-primary transition-colors duration-300">Nueva Salud</p>
                <p className="text-sm text-white/90">Gessner</p>
              </div>
            </Link>
            <p className="text-white/90 text-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("footer.contactTitle")}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="group flex items-start gap-3 text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <Phone className="size-5 mt-0.5 shrink-0 group-hover:text-primary transition-colors duration-300" weight="fill" aria-hidden="true" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <MapPin className="size-5 mt-0.5 shrink-0 group-hover:text-primary transition-colors duration-300" weight="fill" aria-hidden="true" />
                  <span>{CONTACT_INFO.address}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Clock className="size-5 mt-0.5 shrink-0" weight="fill" />
                <span>{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("footer.quickLinksTitle")}</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & SEO Text */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{t("footer.followUsTitle")}</h3>
            <div className="flex flex-col gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300"
              >
                <span className="flex items-center justify-center size-10 rounded-full bg-white/15 group-hover:bg-linear-to-br group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-400 transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                  <InstagramLogo className="size-5 text-white" weight="fill" />
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">@miclinicamedicalcenter</span>
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300"
              >
                <span className="flex items-center justify-center size-10 rounded-full bg-white/15 group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                  <FacebookLogo className="size-5 text-white" weight="fill" />
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Nueva Salud Gessner</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                aria-label={t("accessibility.callClinic")}
              >
                <Phone className="size-5" weight="fill" />
                <span className="text-sm">{t("common.call")}</span>
              </a>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                aria-label={t("accessibility.viewLocation")}
              >
                <MapPin className="size-5" weight="fill" />
                <span className="text-sm">{t("common.location")}</span>
              </a>
            </div>
            <p className="text-white/90 text-sm mt-4">
              {t("footer.seoText")}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-10 pt-8 text-center text-white/80 text-sm">
          {/* Gradient separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. {t("footer.copyright")}
          </p>
          <p className="mt-2 text-white/80">
            {t("footer.tagline")}
          </p>
          <p className="mt-2">
            <Link
              href={`${localePrefix}/privacy`}
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              {t("privacy.linkText")}
            </Link>
          </p>
          <p className="mt-3 text-white/70">
            {t("footer.createdBy")}{" "}
            <a
              href="https://rcweb.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-light transition-colors duration-300 font-semibold"
            >
              RC Web Solutions LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
