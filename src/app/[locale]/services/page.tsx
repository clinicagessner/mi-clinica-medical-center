import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ServicesPageContent } from "@/components/services/services-page-content";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = SITE_CONFIG.baseUrl;
  const canonicalUrl = locale === "es" ? `${baseUrl}/services` : `${baseUrl}/${locale}/services`;

  return {
    title: locale === "es"
      ? "Servicios Médicos en Español | Clínica Hispana Nueva Salud Gessner Houston"
      : "Medical Services in Spanish | Hispanic Clinic Nueva Salud Gessner Houston",
    description: locale === "es"
      ? "18+ servicios médicos en español en Houston TX. Exámenes I-693 inmigración, ginecología, ultrasonido, laboratorio. Abiertos 7 días. Sin cita previa. +1 (346) 226-5820"
      : "18+ medical services in Spanish in Houston TX. I-693 immigration exams, gynecology, ultrasound, laboratory. Open 7 days. Walk-ins welcome. +1 (346) 226-5820",
    keywords: [
      "servicios medicos houston",
      "clinica hispana servicios",
      "examen inmigracion houston",
      "ginecologia en español houston",
      "ultrasonido houston",
      "laboratorio clinico houston",
    ],
    openGraph: {
      title: locale === "es"
        ? "Servicios Médicos | Clínica Hispana Nueva Salud Gessner"
        : "Medical Services | Hispanic Clinic Nueva Salud Gessner",
      description: locale === "es"
        ? "18+ servicios médicos en español. Exámenes I-693, ginecología, ultrasonido, laboratorio. Abiertos 7 días."
        : "18+ medical services in Spanish. I-693 exams, gynecology, ultrasound, laboratory. Open 7 days.",
      url: canonicalUrl,
      siteName: "Clínica Hispana Nueva Salud Gessner",
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: locale === "es"
            ? "Servicios Médicos - Clínica Hispana Nueva Salud Gessner Houston"
            : "Medical Services - Hispanic Clinic Nueva Salud Gessner Houston",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "es"
        ? "Servicios Médicos | Clínica Hispana Nueva Salud Gessner"
        : "Medical Services | Hispanic Clinic Nueva Salud Gessner",
      description: locale === "es"
        ? "18+ servicios médicos en español en Houston. Exámenes I-693, ginecología, ultrasonido, laboratorio."
        : "18+ medical services in Spanish in Houston. I-693 exams, gynecology, ultrasound, laboratory.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/services`,
        en: `${baseUrl}/en/services`,
      },
    },
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const servicesUrl = locale === "es" ? `${SITE_CONFIG.baseUrl}/services` : `${SITE_CONFIG.baseUrl}/${locale}/services`;

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "es" ? "Servicios" : "Services", url: servicesUrl },
        ]}
      />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white pt-28 sm:pt-32 lg:pt-40 pb-20 overflow-hidden">
          <Image
            src="/images/services/services-hero.webp"
            alt={locale === "es" ? "servicios medicos clinica hispana houston" : "medical services hispanic clinic houston"}
            fill
            className="object-cover object-center -z-20"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 -z-10" />

          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="size-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white/90">
                  {t("badge")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("title")}{" "}
                <span className="text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:0_0_30px_rgba(34,197,94,0.5)]">
                  {t("titleHighlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </section>

        <ServicesPageContent />
      </main>
    </>
  );
}
