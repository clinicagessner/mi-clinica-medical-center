import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { getGoogleReviews, FALLBACK_REVIEWS } from "@/lib/google-reviews";

// Dynamic imports para secciones below-the-fold (mejor performance)
const Promotions = dynamic(() =>
  import("@/components/sections/promotions").then((mod) => mod.Promotions)
);

const Services = dynamic(() =>
  import("@/components/sections/services").then((mod) => mod.Services)
);

const GreenCard = dynamic(() =>
  import("@/components/sections/green-card").then((mod) => mod.GreenCard)
);

const Location = dynamic(() =>
  import("@/components/sections/location").then((mod) => mod.Location)
);

const FAQ = dynamic(() =>
  import("@/components/sections/faq").then((mod) => mod.FAQ)
);

const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact)
);

const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((mod) => mod.Testimonials)
);

export default async function Home() {
  // Single fetch de Google reviews - se pasa a Hero y Testimonials (elimina waterfall)
  const reviews = await getGoogleReviews();
  const reviewsData = reviews || FALLBACK_REVIEWS;

  return (
    <>
      {/* Hero - Carga inmediata (above the fold) */}
      <Hero
        googleRating={reviewsData.rating}
        googleReviewsCount={reviewsData.user_ratings_total}
      />

      {/* Secciones below-the-fold - Carga diferida */}
      <Promotions />
      <Testimonials reviewsData={reviewsData} />
      <Services />
      <GreenCard />
      <Location />
      <FAQ />
      <Contact />
    </>
  );
}
