"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Phone, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CONTACT_INFO } from "@/lib/constants";
import { TooltipLink } from "./tooltip-link";

export function FloatingButtons() {
  // Ocultos sobre el hero (ahí ya están los CTAs de Llamar/WhatsApp/Ubicación);
  // aparecen al pasar a la siguiente sección, igual que ScrollToTop.
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const phoneUrl = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;
  // WhatsApp usa su número exclusivo (CONTACT_INFO.whatsapp); el swap de
  // CallRail solo aplica a los enlaces tel:.
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(t("common.whatsappMessage"))}`;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3 transition-all duration-200 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
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
