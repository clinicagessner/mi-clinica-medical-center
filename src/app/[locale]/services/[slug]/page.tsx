import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Phone, MapPin, CheckCircle, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceIcon } from "@/components/services/service-icon";
import { JsonLdBreadcrumb, JsonLdService, JsonLdServiceFAQ } from "@/components/seo/json-ld";
import { SERVICES, CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";
import { getServiceFaqs } from "@/lib/service-faqs";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const paths = [];
  for (const locale of locales) {
    for (const service of SERVICES) {
      paths.push({ locale, slug: service.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const t = await getTranslations({ locale, namespace: "serviceData" });
  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);

  const baseUrl = SITE_CONFIG.baseUrl;
  const canonicalUrl = locale === "es"
    ? `${baseUrl}/services/${slug}`
    : `${baseUrl}/${locale}/services/${slug}`;

  return {
    title: `${title} | Clínica Hispana Houston`,
    description,
    keywords: service.keywords,
    openGraph: {
      title: `${title} | Clínica Hispana Nueva Salud Gessner`,
      description,
      url: canonicalUrl,
      siteName: "Clínica Hispana Nueva Salud Gessner",
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
      images: service.image ? [
        {
          url: `${baseUrl}${service.image}`,
          width: 1200,
          height: 630,
          alt: `${title} - Clínica Hispana Houston`,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Clínica Hispana Houston`,
      description,
      images: service.image ? [`${baseUrl}${service.image}`] : undefined,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/services/${slug}`,
        en: `${baseUrl}/en/services/${slug}`,
      },
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "serviceData" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tDetail = await getTranslations({ locale, namespace: "serviceDetail" });
  const tCategories = await getTranslations({ locale, namespace: "categories" });

  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const longDescription = t(`${slug}.longDescription`);
  const features = t.raw(`${slug}.features`) as string[];

  const isEn = locale === "en";
  const faqs = getServiceFaqs(slug).map((f) => ({
    question: isEn ? f.questionEn : f.question,
    answer: isEn ? f.answerEn : f.answer,
  }));

  const servicesHref = locale === "es" ? "/services" : `/${locale}/services`;
  const phoneUrl = `tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`;

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: locale === "es" ? "Servicios" : "Services", url: `${SITE_CONFIG.baseUrl}${servicesHref}` },
          { name: title, url: `${SITE_CONFIG.baseUrl}${servicesHref}/${slug}` },
        ]}
      />
      <JsonLdService
        name={title}
        description={description}
        provider={{
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.baseUrl,
        }}
      />
      {faqs.length > 0 && <JsonLdServiceFAQ faqs={faqs} />}

      <main className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative text-white pt-28 sm:pt-32 lg:pt-40 pb-20 overflow-hidden">
          {/* Background Image */}
          {service.image && (
            <>
              <Image
                src={service.image}
                alt={`${title} clinica hispana houston`}
                fill
                className="object-cover object-center -z-20"
                priority
                quality={85}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/75 to-black/60 -z-10" />
            </>
          )}
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Link
              href={servicesHref}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
              <span>{locale === "es" ? "Todos los servicios" : "All services"}</span>
            </Link>

            <div className="max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {tCategories(service.category)}
                </Badge>
                {service.highlighted && (
                  <Badge className="bg-primary text-white">
                    {locale === "es" ? "Destacado" : "Featured"}
                  </Badge>
                )}
                {service.id === "examenes-inmigracion" && (
                  <Badge className="bg-amber-500 text-white">
                    USCIS {locale === "es" ? "Autorizado" : "Authorized"}
                  </Badge>
                )}
              </div>

              {/* Icon */}
              <div className="size-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                <ServiceIcon name={service.icon} className="size-8 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/30 h-14 px-8 text-base font-semibold"
                >
                  <a href={phoneUrl}>
                    <Phone className="size-5 mr-2" weight="fill" />
                    {tCommon("callNow")}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white hover:bg-white hover:text-secondary backdrop-blur-sm h-14 px-8 text-base font-semibold"
                >
                  <a
                    href={CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="size-5 mr-2" weight="fill" />
                    {tCommon("location")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* About Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {tDetail("aboutService")}
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_li]:marker:text-primary [&_p]:leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {longDescription}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {tDetail("includes")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl border border-border/50"
                    >
                      <CheckCircle
                        className="size-6 text-primary shrink-0 mt-0.5"
                        weight="fill"
                      />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className="bg-muted/50 rounded-xl border border-border/50 px-5"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                <p className="text-muted-foreground">
                  {tDetail("additionalInfo")}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {locale === "es"
                    ? "¿Listo para agendar tu cita?"
                    : "Ready to schedule your appointment?"}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-8 text-base font-semibold"
                  >
                    <a href={phoneUrl}>
                      <Phone className="size-5 mr-2" weight="fill" />
                      {CONTACT_INFO.phone}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base font-semibold"
                  >
                    <Link href={`${locale === "es" ? "" : `/${locale}`}/#contact`}>
                      {locale === "es" ? "Enviar Mensaje" : "Send Message"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
