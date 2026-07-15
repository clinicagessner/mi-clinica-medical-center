"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

interface HeroProps {
  googleRating: number;
  googleReviewsCount: number;
}

// Estrellas parciales: relleno fraccionario según el rating real (dinámico).
function PartialStarsHero({
  rating,
  locale,
}: {
  rating: number;
  locale: string;
}) {
  const label =
    locale === "es" ? `${rating} de 5 estrellas` : `${rating} out of 5 stars`;
  return (
    <div className="flex gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(Math.max(rating - (star - 1), 0), 1);
        return (
          <div key={star} className="relative size-4">
            <Star
              className="absolute inset-0 size-4 text-white/30"
              weight="fill"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-4 text-yellow-400" weight="fill" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Hero({ googleRating, googleReviewsCount }: HeroProps) {
  const t = useTranslations();
  const locale = useLocale();

  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;
  // WhatsApp usa su número exclusivo (CONTACT_INFO.whatsapp); el swap de
  // CallRail solo aplica a los enlaces tel:.
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(t("common.whatsappMessage"))}`;
  const reviewsLabel = locale === "es" ? "reseñas" : "reviews";
  const features = [t("hero.badge1"), t("hero.badge2"), t("hero.badge3")];

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/hero.webp"
        alt={
          locale === "es"
            ? "doctora atendiendo paciente clinica hispana houston"
            : "doctor attending patient hispanic clinic houston"
        }
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="100vw"
        className="absolute inset-0 object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-28 pb-40 md:pt-32 md:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Google Rating Badge — dinámico, estrellas fraccionarias */}
          <div className="animate-hero-title mb-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 backdrop-blur-sm">
            <PartialStarsHero rating={googleRating} locale={locale} />
            <span className="text-sm font-semibold text-white">
              {googleRating.toFixed(1)}
            </span>
            <span className="text-sm text-white/80">
              · {googleReviewsCount} {reviewsLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="animate-hero-subtitle mb-4 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
            {t("hero.title")}{" "}
            <span className="text-green-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {t("hero.titleHighlight")}
            </span>{" "}
            {t("hero.titleEnd")}
          </h1>

          {/* Subtitle */}
          <p className="animate-hero-features mx-auto mb-8 max-w-2xl text-lg text-white/90 drop-shadow-md md:text-xl">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="animate-hero-cta mb-4 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary px-8 py-6 text-base shadow-lg shadow-primary/30 hover:bg-primary/90 md:text-lg"
            >
              <a href={phoneHref}>
                <Phone className="size-5" weight="fill" />
                {t("common.callNow")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-whatsapp px-8 py-6 text-base text-white shadow-lg shadow-whatsapp/30 hover:bg-whatsapp-dark md:text-lg"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("common.whatsappCta")} ${CONTACT_INFO.whatsapp}`}
              >
                <WhatsappLogo className="size-5" weight="fill" />
                {t("common.whatsapp")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white bg-white px-8 py-6 text-base text-foreground hover:bg-white/90 md:text-lg"
            >
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="size-5" weight="fill" />
                {t("common.location")}
              </a>
            </Button>
          </div>

          {/* Secondary contact link */}
          <div className="animate-hero-cta mb-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-base text-white/90 underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white"
            >
              {locale === "es"
                ? "¿Tienes preguntas? Escríbenos"
                : "Have questions? Message us"}
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                weight="bold"
              />
            </a>
          </div>

          {/* Feature pills */}
          <div className="animate-hero-badges hidden flex-wrap justify-center gap-x-4 gap-y-2 md:flex">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <CheckCircle
                  className="size-4 shrink-0 text-green-400"
                  weight="fill"
                />
                <span className="text-sm text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-secondary/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-center gap-3 text-white md:flex-row md:gap-8">
            {/* Hours */}
            <div className="flex items-center gap-2">
              <Clock className="size-5 shrink-0" weight="fill" />
              <span className="text-sm font-medium">{CONTACT_INFO.hours}</span>
            </div>

            <div className="hidden h-5 w-px bg-white/30 md:block" />

            {/* Address */}
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white/80"
            >
              <MapPin className="size-5 shrink-0" weight="fill" />
              <span className="text-sm">{CONTACT_INFO.address}</span>
            </a>

            <div className="hidden h-5 w-px bg-white/30 md:block" />

            {/* Phone */}
            <a
              href={phoneHref}
              className="flex items-center gap-2 font-semibold transition-colors hover:text-white/80"
            >
              <Phone className="size-5 shrink-0" weight="fill" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
