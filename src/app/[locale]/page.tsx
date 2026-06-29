import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { BlogPreview } from "@/components/sections/blog-preview";
import { getGoogleReviews, FALLBACK_REVIEWS } from "@/lib/google-reviews";

// Dynamic imports para secciones below-the-fold (mejor performance)
const Promotions = dynamic(() =>
  import("@/components/sections/promotions").then((mod) => mod.Promotions)
);

const Services = dynamic(() =>
  import("@/components/sections/services").then((mod) => mod.Services)
);

const ChronicCare = dynamic(() =>
  import("@/components/sections/chronic-care").then((mod) => mod.ChronicCare)
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

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
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
      <Services />
      <Testimonials reviewsData={reviewsData} />
      <ChronicCare />
      <Location />
      <FAQ />
      <BlogPreview locale={locale} />
      <Contact />
    </>
  );
}
