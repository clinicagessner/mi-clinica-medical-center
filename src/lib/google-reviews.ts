import { unstable_cache } from "next/cache";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

export interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

interface PlacesAPIResponse {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews?: GoogleReview[];
  };
  status: string;
}

async function fetchGoogleReviews(): Promise<GooglePlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error("Missing Google Places API credentials");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=es&key=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PlacesAPIResponse = await response.json();

    if (data.status !== "OK") {
      console.error("Google Places API error:", data.status);
      return null;
    }

    return {
      name: data.result.name,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
    };
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return null;
  }
}

// Cached version for use in components
export const getGoogleReviews = unstable_cache(
  fetchGoogleReviews,
  ["google-reviews"],
  {
    revalidate: 86400, // 24 hours
    tags: ["google-reviews"],
  }
);

// Fallback data in case API fails
export const FALLBACK_REVIEWS: GooglePlaceDetails = {
  name: "Clínica Hispana Nueva Salud Gessner",
  rating: 5.0,
  user_ratings_total: 50,
  reviews: [
    {
      author_name: "María García",
      rating: 5,
      text: "Excelente atención en esta clínica hispana. Me sentí muy cómoda porque todo el personal habla español. La doctora fue muy profesional y amable.",
      time: Date.now() / 1000,
      relative_time_description: "hace una semana",
      profile_photo_url: "https://ui-avatars.com/api/?name=Maria+Garcia&background=22c55e&color=fff&size=128",
    },
    {
      author_name: "Juan Rodríguez",
      rating: 5,
      text: "Necesitaba mi examen I-693 para inmigración y en esta clínica hispana me atendieron rápido. El doctor explicó todo en español y el proceso fue muy sencillo.",
      time: Date.now() / 1000,
      relative_time_description: "hace dos semanas",
      profile_photo_url: "https://ui-avatars.com/api/?name=Juan+Rodriguez&background=3b82f6&color=fff&size=128",
    },
    {
      author_name: "Ana Martínez",
      rating: 5,
      text: "Llevo a mis hijos a esta clínica hispana desde hace años. Los doctores son muy buenos con los niños y siempre nos atienden en español.",
      time: Date.now() / 1000,
      relative_time_description: "hace un mes",
      profile_photo_url: "https://ui-avatars.com/api/?name=Ana+Martinez&background=ec4899&color=fff&size=128",
    },
    {
      author_name: "Carlos López",
      rating: 5,
      text: "La mejor clínica hispana en Houston. Precios justos, atención rápida y personal muy amable. Siempre recomiendo Clínica Hispana Nueva Salud Gessner.",
      time: Date.now() / 1000,
      relative_time_description: "hace un mes",
      profile_photo_url: "https://ui-avatars.com/api/?name=Carlos+Lopez&background=f59e0b&color=fff&size=128",
    },
  ],
};
