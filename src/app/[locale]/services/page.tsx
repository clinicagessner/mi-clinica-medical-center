import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { ServicesPageContent } from "@/components/services/services-page-content";
import { JsonLdBreadcrumb, JsonLdClinicLight } from "@/components/seo/json-ld";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { locales } from "@/i18n/config";
import { seoTitle, buildSocial, buildAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const title = seoTitle(isEs ? "Servicios Médicos en Español en Houston" : "Medical Services in Spanish in Houston");
  const description = isEs
    ? "29 servicios médicos en español en Spring Branch, Houston: examen I-693, ginecología, ultrasonido y laboratorio. Sin cita y abiertos los 7 días."
    : "29 medical services in Spanish in Spring Branch, Houston: I-693 exam, women's health, ultrasound and lab tests. Walk-ins welcome, open 7 days.";
  const alternates = buildAlternates("/services", locale);
  return {
    title: { absolute: title },
    description,
    alternates,
    ...buildSocial({ title, description, url: alternates.canonical, locale }),
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const servicesUrl = locale === "es" ? `${SITE_CONFIG.baseUrl}/services` : `${SITE_CONFIG.baseUrl}/${locale}/services`;

  return (
    <>
      <JsonLdClinicLight />
      <JsonLdBreadcrumb
        locale={locale}
        items={[
          { name: locale === "es" ? "Servicios" : "Services", url: servicesUrl },
        ]}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative isolate bg-teal-dark text-white pt-28 sm:pt-32 lg:pt-40 pb-20 overflow-hidden">
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
            <Link
              href="/"
              className="group mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
              <span>{locale === "es" ? "Volver al inicio" : "Back to home"}</span>
            </Link>

            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="size-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white/90">
                  {t("badge", { count: SERVICES.length })}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("title")}{" "}
                <span className="text-green-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
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
      </div>
    </>
  );
}
