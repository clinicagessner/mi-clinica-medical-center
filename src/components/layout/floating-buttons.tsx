"use client";

import { useTranslations } from "next-intl";
import { Phone, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CONTACT_INFO } from "@/lib/constants";
import { TooltipLink } from "./tooltip-link";

export function FloatingButtons() {
  const t = useTranslations();
  const phoneUrl = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;
  // WhatsApp usa su número exclusivo (CONTACT_INFO.whatsapp); el swap de
  // CallRail solo aplica a los enlaces tel:.
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(t("common.whatsappMessage"))}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
      {/* Maps Button */}
      <TooltipLink
        href={CONTACT_INFO.googleMapsUrl}
        label={t("accessibility.viewLocation")}
        tooltipText={t("common.location")}
        external
        className="flex items-center justify-center size-12 sm:size-14 bg-secondary rounded-full shadow-lg hover:bg-teal-dark transition-all duration-300 hover:scale-110"
      >
        <MapPin className="size-6 sm:size-7 text-white" weight="fill" />
      </TooltipLink>

      {/* Phone Button */}
      <TooltipLink
        href={phoneUrl}
        label={t("accessibility.callClinic")}
        tooltipText={t("common.callNow")}
        className="flex items-center justify-center size-12 sm:size-14 bg-primary rounded-full shadow-lg hover:bg-green-dark transition-all duration-300 hover:scale-110 animate-pulse-float"
      >
        <Phone className="size-6 sm:size-7 text-white" weight="fill" />
      </TooltipLink>

      {/* WhatsApp Button */}
      <TooltipLink
        href={whatsappUrl}
        label={`${t("common.whatsappCta")} ${CONTACT_INFO.whatsapp}`}
        tooltipText={t("common.whatsappCta")}
        external
        className="flex items-center justify-center size-12 sm:size-14 bg-whatsapp rounded-full shadow-lg hover:bg-whatsapp-dark transition-all duration-300 hover:scale-110"
      >
        <WhatsappLogo className="size-6 sm:size-7 text-white" weight="fill" />
      </TooltipLink>
    </div>
  );
}
