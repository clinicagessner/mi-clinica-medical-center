import { SITE_CONFIG } from "@/lib/constants";
import type { GooglePlaceDetails } from "@/lib/google-reviews";

interface JsonLdReviewsProps {
  reviews: GooglePlaceDetails;
}

export function JsonLdAggregateRating({ reviews }: JsonLdReviewsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.baseUrl}/#localbusiness`,
    name: SITE_CONFIG.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviews.rating.toFixed(1),
      reviewCount: reviews.user_ratings_total,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.reviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author_name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
      datePublished: new Date(review.time * 1000).toISOString().split("T")[0],
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
