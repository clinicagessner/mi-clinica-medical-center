"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PromotionDialog, type PromoView } from "./promotion-dialog";
import { usePromotionsView } from "./use-promotions-view";
import { CONTACT_INFO } from "@/lib/constants";

export function PromotionsGrid() {
  const t = useTranslations("promotions");
  const { promos, labels } = usePromotionsView();
  const [active, setActive] = useState<PromoView | null>(null);

  const phoneHref = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;

  // Deep-link: /promociones#<slug> abre el dialog. Limpia el hash ANTES de
  // abrir para que cerrar no reabra ni "redirija".
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const match = promos.find((p) => p.slug === hash);
    if (match) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      setActive(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {promos.map((promo) => (
          <div
            key={promo.slug}
            id={promo.slug}
            className="flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <button
              type="button"
              onClick={() => setActive(promo)}
              aria-label={`${t("openAria")}: ${promo.title}`}
              className="group relative block w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={`/images/promotions/${promo.slug}.webp`}
                  alt={promo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </button>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <Badge className="w-fit border-primary/20 bg-primary/10 text-primary">
                {t("limitedTime")}
              </Badge>
              <h3 className="font-bold leading-snug text-foreground">
                {promo.title}
              </h3>
              {promo.price && (
                <p className="text-2xl font-extrabold text-primary">
                  {promo.price}
                </p>
              )}
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {promo.blurb}
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-auto w-full"
                onClick={() => setActive(promo)}
              >
                {t("detailsBtn")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <PromotionDialog
        promo={active}
        labels={labels}
        phone={CONTACT_INFO.phone}
        phoneHref={phoneHref}
        mapsUrl={CONTACT_INFO.googleMapsUrl}
        formHref="#lead-form"
        onClose={() => setActive(null)}
      />
    </>
  );
}
