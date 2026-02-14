"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { CaretUp } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("accessibility");

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-200 ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-80 translate-y-5 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="size-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white"
        aria-label={t("scrollToTop")}
      >
        <CaretUp className="size-6" weight="bold" />
      </Button>
    </div>
  );
}
