import { SITE_CONFIG, CONTACT_INFO, FAQS, SERVICES, SOCIAL_LINKS } from "@/lib/constants";

// Schema principal unificado con @graph para la homepage
export function JsonLdMedicalClinic() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization - entidad principal del negocio
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.baseUrl}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: [
          "Clínica Hispana Nueva Salud Gessner",
          "Nueva Salud Gessner",
          "Clínica Hispana Houston",
        ],
        url: SITE_CONFIG.baseUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_CONFIG.baseUrl}/#logo`,
          url: `${SITE_CONFIG.baseUrl}/images/logo.webp`,
          width: 512,
          height: 512,
          caption: SITE_CONFIG.name,
        },
        image: { "@id": `${SITE_CONFIG.baseUrl}/#logo` },
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: CONTACT_INFO.phone,
          contactType: "customer service",
          availableLanguage: ["Spanish", "English"],
          areaServed: "US",
        },
      },
      // WebSite - para search box en Google
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.baseUrl}/#website`,
        url: SITE_CONFIG.baseUrl,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        publisher: { "@id": `${SITE_CONFIG.baseUrl}/#organization` },
        inLanguage: "es-MX",
      },
      // MedicalClinic - información detallada de la clínica
      {
        "@type": "MedicalClinic",
        "@id": `${SITE_CONFIG.baseUrl}/#medicalclinic`,
        name: SITE_CONFIG.name,
        alternateName: [
          "Clínica Hispana Nueva Salud Gessner",
          "Nueva Salud Gessner",
          "Clínica Hispana Houston",
        ],
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.baseUrl,
        telephone: CONTACT_INFO.phone,
        parentOrganization: { "@id": `${SITE_CONFIG.baseUrl}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: "1914 Gessner Rd B",
          addressLocality: "Houston",
          addressRegion: "TX",
          postalCode: "77080",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 29.806681,
          longitude: -95.5442136,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "21:00",
          },
        ],
        image: { "@id": `${SITE_CONFIG.baseUrl}/#logo` },
        logo: { "@id": `${SITE_CONFIG.baseUrl}/#logo` },
        priceRange: "$$",
        currenciesAccepted: "USD",
        paymentAccepted: "Cash, Credit Card",
        areaServed: {
          "@type": "City",
          name: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de la Clínica Hispana",
          itemListElement: SERVICES.map((service) => ({
            "@type": "MedicalProcedure",
            name: service.title,
            description: service.description,
          })),
        },
        availableLanguage: [
          {
            "@type": "Language",
            name: "Spanish",
            alternateName: "es",
          },
          {
            "@type": "Language",
            name: "English",
            alternateName: "en",
          },
        ],
        medicalSpecialty: [
          "Gynecologic",
          "Obstetric",
          "PrimaryCare",
          "LaboratoryScience",
          "Urologic",
          "Cardiovascular",
          "Pulmonary",
          "Musculoskeletal",
        ],
        isAcceptingNewPatients: true,
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
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

export function JsonLdFAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
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

interface JsonLdBreadcrumbProps {
  items?: BreadcrumbItem[];
}

export function JsonLdBreadcrumb({ items }: JsonLdBreadcrumbProps = {}) {
  const defaultItems: BreadcrumbItem[] = [
    { name: "Inicio", url: SITE_CONFIG.baseUrl },
  ];

  const breadcrumbItems = items ? [defaultItems[0], ...items] : defaultItems;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
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
  author: {
    name: string;
    role: string;
  };
}

export function JsonLdBlogPost({ title, description, url, image, publishedAt, author }: JsonLdBlogPostProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.baseUrl}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface JsonLdServiceProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
}

export function JsonLdService({ name, description, provider }: JsonLdServiceProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    provider: {
      "@type": "MedicalClinic",
      name: provider.name,
      url: provider.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1914 Gessner Rd B",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77080",
        addressCountry: "US",
      },
      telephone: CONTACT_INFO.phone,
    },
    availableLanguage: ["Spanish", "English"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
