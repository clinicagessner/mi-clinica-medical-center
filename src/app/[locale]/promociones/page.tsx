import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Star } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/forms/contact-form";
import { PromotionsGrid } from "@/components/promotions/promotions-grid";
import { JsonLdBreadcrumb, JsonLdServiceFAQ } from "@/components/seo/json-ld";
import { getGoogleReviews, FALLBACK_REVIEWS } from "@/lib/google-reviews";
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
  const t = await getTranslations({ locale, namespace: "promotions" });
  const baseUrl = SITE_CONFIG.baseUrl;
  const canonicalUrl =
    locale === "es" ? `${baseUrl}/promociones` : `${baseUrl}/${locale}/promociones`;

  return {
    title: `${t("pageTitle")} | ${SITE_CONFIG.name}`,
    description: t("pageSubtitle"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/promociones`,
        en: `${baseUrl}/en/promociones`,
      },
    },
    openGraph: {
      title: `${t("pageTitle")} | ${SITE_CONFIG.name}`,
      description: t("pageSubtitle"),
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
    },
  };
}

export default async function PromocionesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "promotions" });

  const reviews = (await getGoogleReviews()) || FALLBACK_REVIEWS;
  const rating = reviews.rating;
  const reviewsCount = reviews.user_ratings_total;
  const roundedRating = Math.round(rating);

  const faqs = [1, 2, 3].map((n) => ({
    question: t(`faq${n}Q`),
    answer: t(`faq${n}A`),
  }));

  const promosUrl = `${SITE_CONFIG.baseUrl}${locale === "es" ? "" : `/${locale}`}/promociones`;

  return (
    <>
      <JsonLdBreadcrumb items={[{ name: t("pageTitle"), url: promosUrl }]} />
      <JsonLdServiceFAQ faqs={faqs} />

      <main className="min-h-screen">
        {/* Hero header (consistente con blog / servicios) */}
        <section className="relative overflow-hidden pt-28 pb-20 text-white sm:pt-32 lg:pt-40">
          {/* Background Image */}
          <Image
            src="/images/services/services-cta.webp"
            alt={
              locale === "es"
                ? "promociones clinica hispana nueva salud gessner houston"
                : "promotions hispanic clinic nueva salud gessner houston"
            }
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-center -z-20"
          />
          <div className="absolute inset-0 -z-10 bg-black/60" />

          <div className="container relative mx-auto px-4">
            {/* Back to home */}
            <Link
              href="/"
              className="group mb-8 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
              <span>{t("backToHome")}</span>
            </Link>

            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                <span className="text-sm font-medium text-white/90">
                  {t("eyebrow")}
                </span>
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                {t("pageTitle")}
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                {t("pageSubtitle")}
              </p>

              {/* Live reviews badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      weight="fill"
                      className={`size-4 ${i < roundedRating ? "text-amber-400" : "text-white/30"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-white/80">
                  · {reviewsCount}+ {t("reviewsSuffix")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid + FAQ + Form */}
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <PromotionsGrid />

            {/* FAQ */}
            <div className="mx-auto mt-16 max-w-3xl">
              <h2 className="mb-6 text-center text-2xl font-bold text-foreground md:text-3xl">
                {t("faqTitle")}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/50 bg-card p-5"
                  >
                    <h3 className="mb-1 font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead form */}
            <div id="lead-form" className="mx-auto mt-16 max-w-2xl scroll-mt-28">
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                  {t("formTitle")}
                </h2>
                <p className="text-muted-foreground">{t("formSubtitle")}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
