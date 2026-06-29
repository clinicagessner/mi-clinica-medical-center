"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Phone,
  MapPin,
  CalendarCheck,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface PromoView {
  slug: string;
  title: string;
  price: string | null;
  blurb: string;
  includes: string[];
  alt: string;
}

export interface PromoLabels {
  limitedTime: string;
  includesLabel: string;
  ctaCall: string;
  ctaDirections: string;
  ctaForm: string;
  close: string;
}

interface PromotionDialogProps {
  promo: PromoView | null;
  labels: PromoLabels;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  formHref: string;
  onClose: () => void;
}

export function PromotionDialog({
  promo,
  labels,
  phone,
  phoneHref,
  mapsUrl,
  formHref,
  onClose,
}: PromotionDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!promo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [promo, onClose]);

  if (!promo) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-dialog-title"
        className="relative z-10 my-auto flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl bg-background shadow-2xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <X className="size-5" weight="bold" />
        </button>

        <div className="relative aspect-[4/5] w-full shrink-0">
          <Image
            src={`/images/promotions/${promo.slug}.webp`}
            alt={promo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 28rem"
          />
        </div>

        <div className="flex flex-col gap-4 p-6">
          <Badge className="w-fit border-primary/20 bg-primary/10 text-primary">
            {labels.limitedTime}
          </Badge>
          <h2
            id="promo-dialog-title"
            className="text-2xl font-bold text-foreground"
          >
            {promo.title}
          </h2>
          {promo.price && (
            <p className="text-3xl font-extrabold text-primary">{promo.price}</p>
          )}
          <p className="leading-relaxed text-muted-foreground">{promo.blurb}</p>

          <div>
            <p className="mb-2 font-semibold text-foreground">
              {labels.includesLabel}
            </p>
            <ul className="space-y-2">
              {promo.includes.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <CheckCircle
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    weight="fill"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button asChild className="w-full">
              <a
                href={phoneHref}
                aria-label={`${labels.ctaCall} ${phone} — ${promo.title}`}
              >
                <Phone className="mr-2 size-4" weight="fill" />
                {labels.ctaCall}
              </a>
            </Button>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 size-4" weight="fill" />
                  {labels.ctaDirections}
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a href={formHref} onClick={onClose}>
                  <CalendarCheck className="mr-2 size-4" weight="fill" />
                  {labels.ctaForm}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
