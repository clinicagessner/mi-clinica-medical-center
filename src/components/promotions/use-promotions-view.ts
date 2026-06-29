"use client";

import { useLocale, useTranslations } from "next-intl";
import { PROMOTIONS } from "@/lib/constants";
import type { PromoView, PromoLabels } from "./promotion-dialog";

/** Localiza el array PROMOTIONS al locale activo y arma los labels del modal. */
export function usePromotionsView(): { promos: PromoView[]; labels: PromoLabels } {
  const locale = useLocale();
  const t = useTranslations("promotions");
  const isEn = locale === "en";

  const promos: PromoView[] = PROMOTIONS.map((p) => ({
    slug: p.slug,
    title: isEn ? p.titleEn : p.title,
    price: p.price,
    blurb: isEn ? p.blurbEn : p.blurb,
    includes: isEn ? p.includesEn : p.includes,
    alt: isEn ? p.altEn : p.alt,
  }));

  const labels: PromoLabels = {
    limitedTime: t("limitedTime"),
    includesLabel: t("includesLabel"),
    ctaCall: t("ctaCall"),
    ctaDirections: t("ctaDirections"),
    ctaForm: t("ctaForm"),
    close: t("close"),
  };

  return { promos, labels };
}
