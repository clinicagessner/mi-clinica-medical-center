"use client";

import { useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  PromotionDialog,
  type PromoView,
} from "@/components/promotions/promotion-dialog";
import { usePromotionsView } from "@/components/promotions/use-promotions-view";
import { CONTACT_INFO } from "@/lib/constants";

export function Promotions() {
  const t = useTranslations("promotions");
  const { promos, labels } = usePromotionsView();
  const [active, setActive] = useState<PromoView | null>(null);

  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;

  return (
    <section
      id="promociones"
      className="scroll-mt-24 py-16 bg-linear-to-b from-green-bg to-green-bg-alt"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary mb-2">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Carousel */}
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          className="max-w-6xl mx-auto"
        >
          <CarouselContent>
            {promos.map((promo) => (
              <CarouselItem
                key={promo.slug}
                className="basis-4/5 sm:basis-1/2 lg:basis-1/3"
              >
                <button
                  type="button"
                  onClick={() => setActive(promo)}
                  aria-label={`${t("openAria")}: ${promo.title}`}
                  className="group relative block w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={`/images/promotions/${promo.slug}.webp`}
                      alt={promo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 p-4 text-center font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t("viewDetail")}
                    </span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
          {t("swipeHint")}
        </p>

        {/* View all */}
        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline">
            <Link href="/promociones">{t("viewAll")} →</Link>
          </Button>
        </div>

        {/* SEO text */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
          {t("seoText")}
        </p>
      </div>

      <PromotionDialog
        promo={active}
        labels={labels}
        phone={CONTACT_INFO.phone}
        phoneHref={phoneHref}
        mapsUrl={CONTACT_INFO.googleMapsUrl}
        formHref="#contact"
        onClose={() => setActive(null)}
      />
    </section>
  );
}
