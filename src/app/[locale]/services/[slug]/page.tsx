import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Phone, MapPin, CheckCircle, ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
import { JsonLdBreadcrumb, JsonLdService, JsonLdServiceFAQ, JsonLdClinicLight, JsonLdMedicalWebPage } from "@/components/seo/json-ld";
import { MedicalReview } from "@/components/seo/medical-review";
import { serviceDate, SERVICES_PUBLISHED } from "@/lib/content-dates";
import { SERVICES, CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";
import { getServiceFaqs } from "@/lib/service-faqs";
import { getAllPosts } from "@/lib/blog";
import { locales } from "@/i18n/config";
import { seoTitle, seoDescription, buildSocial, buildAlternates, ADS_LANDING_SLUGS, adsLegacyTitle } from "@/lib/seo";

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
    return { title: "Service Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "serviceData" });
  const pageTitle = t(`${slug}.title`);
  const isAds = ADS_LANDING_SLUGS.includes(slug);
  // Landings de Ads: título y meta tal cual hasta que el usuario apruebe los nuevos.
  const title = isAds ? adsLegacyTitle(pageTitle, locale) : seoTitle(pageTitle);
  const rawDescription = t(`${slug}.description`);
  const description = isAds ? rawDescription : seoDescription(rawDescription);
  const alternates = buildAlternates(`/services/${slug}`, locale);

  return {
    title: { absolute: title },
    description,
    // Sin `keywords` en servicios: Google no las usa y en salud del hombre
    // arrastraban términos de receta (§9).
    alternates,
    ...buildSocial({
      title,
      description,
      url: alternates.canonical,
      image: service.image,
      imageAlt: pageTitle,
      locale,
    }),
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

  // Enlazado interno (§12 B1): los 3 servicios siguientes de su categoría en
  // orden circular, así cada servicio recibe al menos 3 enlaces de contenido
  // de sus hermanos de categoría (todas tienen 4 o más). Después, hasta 2 de
  // los `related` elegidos a mano.
  const sameCategory = SERVICES.filter((s) => s.category === service.category).sort(
    (a, b) => a.order - b.order
  );
  const at = sameCategory.findIndex((s) => s.slug === slug);
  const cyclic = [1, 2, 3]
    .map((k) => sameCategory[(at + k) % sameCategory.length])
    .filter((s) => s.slug !== slug);
  const manual = (service.related ?? [])
    .map((relatedSlug) => SERVICES.find((s) => s.slug === relatedSlug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s) && !cyclic.includes(s!))
    .slice(0, 2);
  const relatedServices = [...cyclic, ...manual];

  // Artículos del blog que tratan este servicio (frontmatter `services`).
  const relatedPosts = getAllPosts(locale).filter((p) => p.services?.includes(slug));
  const blogHref = locale === "es" ? "/blog" : `/${locale}/blog`;

  return (
    <>
      <JsonLdClinicLight />
      <JsonLdBreadcrumb
        locale={locale}
        items={[
          { name: locale === "es" ? "Servicios" : "Services", url: `${SITE_CONFIG.baseUrl}${servicesHref}` },
          { name: title, url: `${SITE_CONFIG.baseUrl}${servicesHref}/${slug}` },
        ]}
      />
      <JsonLdService
        slug={slug}
        name={title}
        description={description}
        url={`${SITE_CONFIG.baseUrl}${servicesHref}/${slug}`}
        image={service.image}
      />
      {faqs.length > 0 && <JsonLdServiceFAQ faqs={faqs} />}
      <JsonLdMedicalWebPage
        url={`${SITE_CONFIG.baseUrl}${servicesHref}/${slug}`}
        slug={slug}
        name={title}
        description={description}
        lastReviewed={serviceDate(slug)}
        datePublished={SERVICES_PUBLISHED}
        locale={locale}
      />

      <div className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative isolate bg-teal-dark text-white pt-28 sm:pt-32 lg:pt-40 pb-20 overflow-hidden">
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

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {tDetail("relatedServices")}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {relatedServices.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`${servicesHref}/${related.slug}`}
                          className="group flex items-start gap-4 h-full p-5 bg-muted/50 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          <span className="size-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                            <ServiceIcon name={related.icon} className="size-6 text-primary" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                              {t(`${related.slug}.shortTitle`)}
                              <ArrowRight className="size-4 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </span>
                            <span className="block mt-1 text-sm text-muted-foreground line-clamp-2">
                              {t(`${related.slug}.description`)}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm">
                    <Link href={servicesHref} className="text-primary font-medium hover:underline">
                      {tDetail("viewAllServices")}
                    </Link>
                  </p>
                </div>
              )}

              {/* Artículos sobre este servicio */}
              {relatedPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {locale === "es" ? "Artículos sobre este servicio" : "Articles about this service"}
                  </h2>
                  <ul className="space-y-3">
                    {relatedPosts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`${blogHref}/${p.slug}`} className="text-primary font-medium hover:underline">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Revisión médica (§12 B2) */}
              <div className="mb-12">
                <MedicalReview published={SERVICES_PUBLISHED} reviewed={serviceDate(slug)} locale={locale} />
              </div>

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
      </div>
    </>
  );
}
