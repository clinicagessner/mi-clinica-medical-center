"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quotes, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { GooglePlaceDetails } from "@/lib/google-reviews";
import { CONTACT_INFO } from "@/lib/constants";

interface TestimonialsCarouselProps {
  reviews: GooglePlaceDetails;
}

// Componente de estrellas parciales
function PartialStars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "size-4" : "size-5";

  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(Math.max(rating - (star - 1), 0), 1);
        return (
          <div key={star} className={`relative ${starSize}`}>
            <Star className={`absolute inset-0 ${starSize} text-gray-200`} weight="fill" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${starSize} text-yellow-400`} weight="fill" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TestimonialsCarousel({ reviews }: TestimonialsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <a
          href="https://g.page/r/CdydIBQAJwdtEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-md border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          <GoogleLogo className="size-5 text-[#4285F4]" weight="bold" />
          <PartialStars rating={reviews.rating} />
          <span className="text-xl font-bold text-foreground">
            {reviews.rating.toFixed(1)}
          </span>
          <span className="text-muted-foreground text-sm hidden sm:inline">
            ({reviews.user_ratings_total} reseñas)
          </span>
        </a>
      </motion.div>

      {/* Carousel Container with padding for arrows */}
      <div className="relative px-4 md:px-14">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {reviews.reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full border border-gray-100 shadow-sm bg-white hover:shadow-md transition-shadow duration-300 mx-1">
                  <CardContent className="p-5 flex flex-col h-full min-h-[220px]">
                    {/* Header: Stars + Quote */}
                    <div className="flex items-start justify-between mb-3">
                      <PartialStars rating={review.rating} size="sm" />
                      <Quotes className="size-6 text-primary/20" weight="fill" />
                    </div>

                    {/* Review Text */}
                    <p className="text-muted-foreground text-sm leading-relaxed grow line-clamp-4">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 mt-auto border-t border-gray-100">
                      {review.profile_photo_url ? (
                        <Image
                          src={review.profile_photo_url.replace(/=s\d+-/, "=s72-")}
                          alt={`Foto de ${review.author_name}`}
                          width={36}
                          height={36}
                          className="size-9 rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="size-9 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {review.author_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm truncate">
                          {review.author_name}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <GoogleLogo className="size-3 shrink-0" weight="bold" />
                          <span className="truncate">{review.relative_time_description}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="hidden md:flex -left-4 size-9 bg-white hover:bg-gray-50 border-gray-200 shadow-sm" />
          <CarouselNext className="hidden md:flex -right-4 size-9 bg-white hover:bg-gray-50 border-gray-200 shadow-sm" />
        </Carousel>
      </div>

      {/* Dots Indicator - Based on actual scroll snaps */}
      {count > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`min-w-6 min-h-6 flex items-center justify-center rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-primary/20"
                  : "bg-transparent hover:bg-gray-100"
              }`}
              aria-label={`Ir a grupo ${index + 1}`}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-primary w-5 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* CTA to Leave Review */}
      <div className="flex flex-col items-center gap-2">
        <a
          href={CONTACT_INFO.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <GoogleLogo className="size-5" weight="bold" />
          Deja tu reseña en Google
        </a>
        <p className="text-xs text-muted-foreground">
          Tu opinión nos ayuda a mejorar
        </p>
      </div>
    </div>
  );
}
