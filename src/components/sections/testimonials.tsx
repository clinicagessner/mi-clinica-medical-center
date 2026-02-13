import { TestimonialsCarousel } from "./testimonials-carousel";
import { JsonLdAggregateRating } from "@/components/seo/json-ld-reviews";
import type { GooglePlaceDetails } from "@/lib/google-reviews";

interface TestimonialsProps {
  reviewsData: GooglePlaceDetails;
}

export function Testimonials({ reviewsData }: TestimonialsProps) {

  return (
    <>
      {/* Schema markup for SEO */}
      <JsonLdAggregateRating reviews={reviewsData} />

      <section id="testimonios" className="py-16 bg-green-bg scroll-mt-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Reseñas de Google de Nuestra{" "}
              <span className="text-primary">Clínica Hispana</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lo que dicen nuestros pacientes en Google sobre la atención en Mi
              Clínica Hispana Nueva Salud Gessner.
            </p>
          </div>

          {/* Google Reviews Carousel */}
          <TestimonialsCarousel reviews={reviewsData} />

          {/* SEO Text */}
          <p className="text-center text-sm text-muted-foreground mt-10 max-w-3xl mx-auto">
            Miles de pacientes confían en nuestra clínica hispana en Houston. Mi
            Clínica Hispana Nueva Salud Gessner es la clínica hispana preferida por la
            comunidad latina gracias a nuestra atención 100% en español y precios
            accesibles.
          </p>
        </div>
      </section>
    </>
  );
}
