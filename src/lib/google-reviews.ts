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

/**
 * Lanza en vez de devolver null cuando algo falla: `unstable_cache` guarda lo
 * que la función devuelve durante 7 días, y un null por un fallo pasajero
 * dejaba el sitio una semana sin datos en vivo. Lanzando no se guarda nada y
 * el siguiente intento vuelve a preguntar.
 */
async function fetchGoogleReviews(): Promise<GooglePlaceDetails> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY!;
  const placeId = process.env.GOOGLE_PLACE_ID!;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=es&key=${apiKey}`;

  const response = await fetch(url, {
    next: { revalidate: 604800 }, // Cache for 7 days
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PlacesAPIResponse = await response.json();

  if (data.status !== "OK") {
    throw new Error(`Google Places API error: ${data.status}`);
  }

  return {
    name: data.result.name,
    rating: data.result.rating,
    user_ratings_total: data.result.user_ratings_total,
    reviews: data.result.reviews || [],
  };
}

const cachedGoogleReviews = unstable_cache(
  fetchGoogleReviews,
  // v2: la clave vieja podía tener guardado el null de un fallo.
  ["google-reviews", "v2"],
  {
    revalidate: 604800, // 7 days
    tags: ["google-reviews"],
  }
);

/** Datos en vivo de la ficha, o null si no hay (el sitio cae a FALLBACK_REVIEWS). */
export async function getGoogleReviews(): Promise<GooglePlaceDetails | null> {
  // Sin configurar se comprueba fuera de la caché, para no guardar ese null.
  if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.GOOGLE_PLACE_ID) {
    console.error("Missing Google Places API credentials");
    return null;
  }
  try {
    return await cachedGoogleReviews();
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return null;
  }
}

// Respaldo si la API no responde: solo la nota y el total de la ficha,
// comprobados contra el sitio en vivo (Places) el 2026-10-05: 4.8 · 381.
// Sin reseñas: las que había aquí estaban escritas a mano y se habrían
// mostrado como reseñas de Google (playbook §9). Sin reseñas reales, la
// sección no pinta el carrusel.
export const FALLBACK_REVIEWS: GooglePlaceDetails = {
  name: "Clínica Hispana Nueva Salud Gessner",
  rating: 4.8,
  user_ratings_total: 381,
  reviews: [],
};
