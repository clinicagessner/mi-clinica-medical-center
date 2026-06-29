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
  rating: 4.7,
  user_ratings_total: 277,
  reviews: [
    {
      author_name: "Manuel Pozada",
      rating: 5,
      text: "¡Excelente experiencia! Desde que llegué me sentí como en familia. La atención en español es excelente y todo el personal es súper amable. Los doctores se toman el tiempo necesario para explicarte todo sin prisas. ¡100% recomendados para nuestra comunidad!",
      time: Date.now() / 1000,
      relative_time_description: "en la última semana",
      profile_photo_url: "https://ui-avatars.com/api/?name=Manuel+Pozada&background=22c55e&color=fff&size=128",
    },
    {
      author_name: "Joe Greg",
      rating: 5,
      text: "El mejor servicio médico en español. Muy agradecida con el profesionalismo y la calidad humana de los doctores y enfermeras. Las instalaciones están impecables y el proceso fue muy rápido. ¡Excelente clínica!",
      time: Date.now() / 1000,
      relative_time_description: "en la última semana",
      profile_photo_url: "https://ui-avatars.com/api/?name=Joe+Greg&background=0d9488&color=fff&size=128",
    },
    {
      author_name: "Maria Benavente",
      rating: 5,
      text: "Me atendieron muy bien y todo está limpio y muy agradable.",
      time: Date.now() / 1000,
      relative_time_description: "en la última semana",
      profile_photo_url: "https://ui-avatars.com/api/?name=Maria+Benavente&background=ec4899&color=fff&size=128",
    },
    {
      author_name: "Rufina Galicia",
      rating: 5,
      text: "Muy buena atención. Excelente servicio y precios. Amables y humanos, la mejor.",
      time: Date.now() / 1000,
      relative_time_description: "en la última semana",
      profile_photo_url: "https://ui-avatars.com/api/?name=Rufina+Galicia&background=f59e0b&color=fff&size=128",
    },
    {
      author_name: "Jesus Rosales",
      rating: 5,
      text: "Muy buena atención. Recomendados.",
      time: Date.now() / 1000,
      relative_time_description: "en la última semana",
      profile_photo_url: "https://ui-avatars.com/api/?name=Jesus+Rosales&background=15803d&color=fff&size=128",
    },
  ],
};
