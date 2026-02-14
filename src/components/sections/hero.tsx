"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Phone,
  MapPin,
  CheckCircle,
  Shield,
  ChatCircle,
  Users,
  Clock,
  Star,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

interface HeroProps {
  googleRating: number;
  googleReviewsCount: number;
}

const trustBadgeIconMap = {
  Shield,
  MessageCircle: ChatCircle,
  Users,
  Clock,
  Star,
};

// Componente de estrellas parciales para Hero
function PartialStarsHero({ rating, locale }: { rating: number; locale: string }) {
  const label = locale === "es" ? `${rating} de 5 estrellas` : `${rating} out of 5 stars`;
  return (
    <div className="flex gap-0.5" role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(Math.max(rating - (star - 1), 0), 1);
        return (
          <div key={star} className="relative size-3 sm:size-3.5 lg:size-4">
            <Star className="absolute inset-0 size-3 sm:size-3.5 lg:size-4 text-white/30" weight="fill" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-3 sm:size-3.5 lg:size-4 text-yellow-400" weight="fill" />
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

  const trustBadges = [
    {
      id: "sin-seguro",
      title: locale === "es" ? "Sin Seguro Bienvenidos" : "Uninsured Welcome",
      description: locale === "es" ? "Atención para todos sin importar seguro" : "Care for everyone regardless of insurance",
      icon: "Users",
    },
    {
      id: "precios",
      title: locale === "es" ? "Precios Accesibles" : "Affordable Prices",
      description: locale === "es" ? "Opciones económicas para la comunidad" : "Economic options for the community",
      icon: "Shield",
    },
    {
      id: "rating",
      title: "Google Reviews",
      description: locale === "es" ? "Reseñas verificadas de pacientes" : "Verified patient reviews",
      icon: "Star",
    },
    {
      id: "mismo-dia",
      title: locale === "es" ? "Citas Mismo Día" : "Same Day Appointments",
      description: locale === "es" ? "Agenda hoy, te atendemos hoy" : "Book today, we see you today",
      icon: "Clock",
    },
  ];

  const reviewsLabel = locale === "es" ? "reseñas" : "reviews";

  return (
    <section
      id="inicio"
      className="relative min-h-svh flex flex-col pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-4 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero.webp"
          alt={locale === "es"
            ? "doctora atendiendo paciente clinica hispana houston"
            : "doctor attending patient hispanic clinic houston"}
          fill
          className="object-cover object-center"
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 100vw"
        />
      </div>

      {/* Overlay con gradiente elegante */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40 -z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent -z-10" />

      {/* Main Content - Flex grow para ocupar espacio disponible */}
      <div className="flex-1 flex flex-col justify-center container mx-auto px-4 py-4">
        <div className="max-w-3xl">
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {/* Title - CSS animation */}
            <h1
              className="animate-hero-title text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15]"
            >
              <span className="text-primary">{t("hero.title")}</span>
              <br />
              <span className="text-primary">{t("hero.titleHighlight")}</span> {t("hero.titleEnd")}
            </h1>

            {/* Subtitle - CSS animation */}
            <p
              className="animate-hero-subtitle text-[15px] sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-xl leading-snug"
            >
              {t("hero.description")}
            </p>

            {/* Features - 3 diferenciadores */}
            <div
              className="animate-hero-features flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-1.5 text-white/90"
            >
              {[
                t("hero.badge1"),
                t("hero.badge2"),
                t("hero.badge3"),
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-1.5">
                  <CheckCircle className="size-4 text-primary" weight="fill" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="animate-hero-cta pt-1 sm:pt-2">
              <div className="flex justify-center sm:justify-start gap-2 sm:gap-3">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 sm:flex-none text-sm sm:text-base md:text-lg h-10 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30"
                >
                  <a href={CONTACT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="size-4 sm:size-5 mr-1.5" aria-hidden="true" weight="fill" />
                    {t("common.location")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="flex-1 sm:flex-none text-sm sm:text-base md:text-lg h-10 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 bg-white text-foreground hover:bg-white/90 shadow-xl"
                >
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                    <Phone className="size-4 sm:size-5 mr-1.5" aria-hidden="true" />
                    {t("common.call")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#servicios"
        className="animate-hero-scroll group flex flex-col items-center gap-1.5 py-3 sm:py-4 cursor-pointer"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 group-hover:bg-white/20 group-hover:text-white transition-all">
          <span className="text-[11px] sm:text-xs font-medium tracking-wide uppercase">
            {t("common.viewServices")}
          </span>
          <span className="animate-hero-bounce">
            <CaretDown className="size-3.5 sm:size-4" aria-hidden="true" />
          </span>
        </span>
      </a>

      {/* Trust Badges - Al final como social proof */}
      <div className="container mx-auto px-4 pb-3 sm:pb-4">
        <div
          className="animate-hero-badges grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
        >
          {trustBadges.map((badge) => {
            const Icon = trustBadgeIconMap[badge.icon as keyof typeof trustBadgeIconMap];
            const isRatingBadge = badge.id === "rating";

            return (
              <div
                key={badge.id}
                className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/10"
              >
                <div className="size-8 sm:size-10 lg:size-11 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="size-4 sm:size-5 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  {isRatingBadge ? (
                    <>
                      {/* Rating dinámico con estrellas parciales */}
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <span className="font-bold text-white text-xs sm:text-sm lg:text-base leading-none">
                          {googleRating.toFixed(1)}
                        </span>
                        <PartialStarsHero rating={googleRating} locale={locale} />
                      </div>
                      <p className="text-[9px] sm:text-[10px] lg:text-xs text-white/80 leading-tight mt-0.5">
                        {googleReviewsCount} {reviewsLabel}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-white text-xs sm:text-sm leading-tight">
                        {badge.title}
                      </p>
                      <p className="hidden sm:block text-[10px] lg:text-xs text-white/80 truncate">
                        {badge.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
