import { SITE_CONFIG, CONTACT_INFO, SERVICES, SOCIAL_LINKS } from "@/lib/constants";
import type { GooglePlaceDetails } from "@/lib/google-reviews";

const BASE = SITE_CONFIG.baseUrl;
export const CLINIC_ID = `${BASE}/#medicalclinic`;
const ORG_ID = `${BASE}/#organization`;
const WEBSITE_ID = `${BASE}/#website`;

/** @id estable del MedicalProcedure de un servicio (sin prefijo de idioma). */
export const procedureId = (slug: string) => `${BASE}/services/${slug}#procedure`;

// Perfiles externos de la entidad (los mismos de la ficha de Google).
const SAME_AS = [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, CONTACT_INFO.googleMapsUrl];

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "1914 Gessner Rd Ste B",
  addressLocality: "Houston",
  addressRegion: "TX",
  postalCode: "77080",
  addressCountry: "US",
};

const CONTACT_POINTS = [
  {
    "@type": "ContactPoint",
    telephone: CONTACT_INFO.phone,
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
    areaServed: "US",
  },
  {
    "@type": "ContactPoint",
    telephone: CONTACT_INFO.whatsapp,
    contactType: "customer service",
    contactOption: "WhatsApp",
    url: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}`,
    availableLanguage: ["Spanish", "English"],
    areaServed: "US",
  },
];

// Zonas: las de la ficha de Google (Houston, Memorial, Spring Branch West) más
// los barrios que el sitio publica en cada servicio.
const AREAS = [
  "Spring Branch",
  "Spring Branch West",
  "Memorial",
  "Hedwig Village",
  "Spring Shadows",
  "Long Point",
  "Carverdale",
  "Fairbanks",
];

// Atributos de la ficha de Google ("Acerca de tu negocio", 2026-10-02) y
// confirmaciones de red del 2026-10-04 (estacionamiento gratuito y sanitarios
// accesibles en las 17).
const AMENITIES_ES = [
  "Estacionamiento gratuito",
  "Estacionamiento en el lugar",
  "Estacionamiento gratuito en la calle",
  "Estacionamiento accesible para silla de ruedas",
  "Entrada accesible para silla de ruedas",
  "Sanitarios accesibles para silla de ruedas",
  "Asientos accesibles para silla de ruedas",
  "Sala de lactancia",
  "Sanitarios unisex",
  "No se requiere cita",
];
const AMENITIES_EN = [
  "Free parking",
  "On-site parking",
  "Free street parking",
  "Wheelchair-accessible parking",
  "Wheelchair-accessible entrance",
  "Wheelchair-accessible restroom",
  "Wheelchair-accessible seating",
  "Nursing room",
  "Gender-neutral restroom",
  "No appointment required",
];

const DISAMBIGUATING = {
  es: "Clínica médica hispana sin cita en 1914 Gessner Rd Ste B, Spring Branch, oeste de Houston (TX 77080). Abierta todos los días de 9 AM a 9 PM, atención en español y sin seguro médico. No confundir con otras clínicas \"Nueva Salud\" de Houston.",
  en: "Hispanic walk-in medical clinic at 1914 Gessner Rd Ste B, Spring Branch, west Houston (TX 77080). Open every day 9 AM to 9 PM, care in Spanish, no insurance needed. Not to be confused with other \"Nueva Salud\" clinics in Houston.",
};

type ClinicProps = {
  locale: string;
  reviews?: GooglePlaceDetails;
};

/**
 * Nodo completo de la clínica: SOLO en la home (con rating y 5 reseñas en vivo,
 * los 29 servicios y los datos de la ficha). El resto de páginas emiten
 * `JsonLdClinicLight`, el mismo `@id` con lo mínimo. Lo pone cada página,
 * nunca el layout: con los dos salían dos nodos del mismo `@id`.
 */
export function JsonLdMedicalClinic({ locale, reviews }: ClinicProps) {
  const isEn = locale === "en";
  const amenities = isEn ? AMENITIES_EN : AMENITIES_ES;
  const realReviews = reviews?.reviews?.slice(0, 5) ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_CONFIG.name,
        alternateName: ["Nueva Salud Gessner", "Clínica Gessner"],
        url: BASE,
        logo: {
          "@type": "ImageObject",
          "@id": `${BASE}/#logo`,
          url: `${BASE}/images/logo.webp`,
          width: 512,
          height: 512,
          caption: SITE_CONFIG.name,
        },
        image: { "@id": `${BASE}/#logo` },
        sameAs: SAME_AS,
        contactPoint: CONTACT_POINTS,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: BASE,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: { "@id": ORG_ID },
        inLanguage: ["es-MX", "en-US"],
      },
      {
        "@type": "MedicalClinic",
        "@id": CLINIC_ID,
        name: SITE_CONFIG.name,
        alternateName: ["Nueva Salud Gessner", "Clínica Gessner"],
        description: SITE_CONFIG.description,
        disambiguatingDescription: isEn ? DISAMBIGUATING.en : DISAMBIGUATING.es,
        url: isEn ? `${BASE}/en` : BASE,
        telephone: CONTACT_INFO.phone,
        contactPoint: CONTACT_POINTS,
        hasMap: CONTACT_INFO.googleMapsUrl,
        parentOrganization: { "@id": ORG_ID },
        address: ADDRESS,
        geo: { "@type": "GeoCoordinates", latitude: 29.806681, longitude: -95.5442136 },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "09:00",
            closes: "21:00",
          },
        ],
        image: `${BASE}/images/og-image.jpg`,
        logo: { "@id": `${BASE}/#logo` },
        priceRange: "$$",
        currenciesAccepted: "USD",
        paymentAccepted:
          "Cash, Debit Card, Credit Card (Visa, MasterCard, American Express, Discover), NFC Mobile Payments",
        amenityFeature: amenities.map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        areaServed: [
          { "@type": "City", name: "Houston", "@id": "https://www.wikidata.org/wiki/Q16555" },
          ...AREAS.map((name) => ({ "@type": "Place", name: `${name}, Houston, TX` })),
        ],
        knowsLanguage: ["es", "en"],
        availableLanguage: [
          { "@type": "Language", name: "Spanish", alternateName: "es" },
          { "@type": "Language", name: "English", alternateName: "en" },
        ],
        // Todos los servicios, con @id estable (el mismo que emite cada página).
        availableService: [...SERVICES]
          .sort((a, b) => a.order - b.order)
          .map((s) => ({
            "@type": "MedicalProcedure",
            "@id": procedureId(s.slug),
            name: s.title,
            url: `${BASE}/services/${s.slug}`,
          })),
        // Solo valores válidos de MedicalSpecialty que no afirman un titulado
        // (§9: sin ginecólogo ni urólogo titulados en la red).
        medicalSpecialty: ["PrimaryCare", "PublicHealth"],
        isAcceptingNewPatients: true,
        sameAs: SAME_AS,
        ...(reviews && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviews.rating.toFixed(1),
            reviewCount: reviews.user_ratings_total,
            bestRating: "5",
            worstRating: "1",
          },
        }),
        // Solo reseñas reales de Places; sin ellas, no hay `review`.
        ...(realReviews.length > 0 && {
          review: realReviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.author_name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody: review.text,
            datePublished: new Date(review.time * 1000).toISOString().split("T")[0],
          })),
        }),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** Nodo ligero con el mismo @id: el resto de páginas enlazan la entidad. */
export function JsonLdClinicLight() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: SITE_CONFIG.name,
    url: BASE,
    telephone: CONTACT_INFO.phone,
    address: ADDRESS,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** FAQPage de la home (solo en la home). */
export async function JsonLdFAQ({ locale }: { locale: string }) {
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace: "faq" });

  const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((num) => ({
      "@type": "Question",
      name: t(`q${num}`),
      acceptedAnswer: { "@type": "Answer", text: t(`a${num}`) },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface JsonLdServiceFAQProps {
  faqs: { question: string; answer: string }[];
}

export function JsonLdServiceFAQ({ faqs }: JsonLdServiceFAQProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/** Migas localizadas: la primera es la home del idioma de la página. */
export function JsonLdBreadcrumb({ items, locale }: { items: BreadcrumbItem[]; locale: string }) {
  const home: BreadcrumbItem =
    locale === "en" ? { name: "Home", url: `${BASE}/en` } : { name: "Inicio", url: BASE };
  const all = [home, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface JsonLdBlogPostProps {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  locale: string;
}

export function JsonLdBlogPost({ title, description, url, image, publishedAt, updatedAt, locale }: JsonLdBlogPostProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    inLanguage: locale === "en" ? "en-US" : "es-MX",
    // Lo firma el equipo médico de la clínica (§9): autor y revisor son la
    // misma entidad del @graph principal, no una persona.
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: locale === "en" ? `${SITE_CONFIG.name} medical team` : `Equipo médico de ${SITE_CONFIG.name}`,
      url: BASE,
    },
    reviewedBy: { "@id": CLINIC_ID },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_CONFIG.name,
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/images/logo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    about: { "@id": CLINIC_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** MedicalProcedure de un servicio: @id estable, sin `provider` (lo enlaza la clínica). */
export function JsonLdService({
  slug,
  name,
  description,
  url,
  image,
}: {
  slug: string;
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const procedureType = [
    "cirugias-menores",
    "suturas-heridas",
    "drenaje-abscesos",
    "unas-encarnadas",
    "extraccion-implantes",
  ].includes(slug)
    ? "PercutaneousProcedure"
    : "NoninvasiveProcedure";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": procedureId(slug),
    name,
    description,
    url,
    ...(image && { image: `${BASE}${image}` }),
    procedureType: `https://schema.org/${procedureType}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
