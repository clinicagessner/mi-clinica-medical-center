import { getTranslations } from "next-intl/server";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { JsonLdAggregateRating } from "@/components/seo/json-ld-reviews";
import type { GooglePlaceDetails } from "@/lib/google-reviews";

interface TestimonialsProps {
  reviewsData: GooglePlaceDetails;
}

export async function Testimonials({ reviewsData }: TestimonialsProps) {
  const t = await getTranslations("testimonials");

  return (
    <>
      {/* Schema markup for SEO */}
      <JsonLdAggregateRating reviews={reviewsData} />

      <section id="testimonials" className="py-16 bg-green-bg scroll-mt-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("title")}{" "}
              <span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          {/* Google Reviews Carousel */}
          <TestimonialsCarousel reviews={reviewsData} />

          {/* SEO Text */}
          <p className="text-center text-sm text-muted-foreground mt-10 max-w-3xl mx-auto">
            {t("seoText")}
          </p>
        </div>
      </section>
    </>
  );
}
