import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLdBreadcrumb } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts, formatDate } from "@/lib/blog";
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
  const canonicalUrl = locale === "es" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;

  return {
    title: locale === "es"
      ? "Blog | Noticias de la Clínica Hispana Nueva Salud Gessner Houston"
      : "Blog | News from Hispanic Clinic Nueva Salud Gessner Houston",
    description: locale === "es"
      ? "Noticias, consejos de salud y actualizaciones de la Clínica Hispana Nueva Salud Gessner en Houston, TX. Información médica en español para la comunidad hispana."
      : "News, health tips and updates from Clínica Hispana Nueva Salud Gessner in Houston, TX. Medical information in Spanish for the Hispanic community.",
    keywords: [
      "blog clínica hispana Houston",
      "noticias salud Houston",
      "consejos médicos español",
      "Nueva Salud Gessner blog",
    ],
    openGraph: {
      title: locale === "es"
        ? "Blog | Clínica Hispana Nueva Salud Gessner"
        : "Blog | Hispanic Clinic Nueva Salud Gessner",
      description: locale === "es"
        ? "Noticias, consejos de salud y actualizaciones para la comunidad hispana de Houston."
        : "News, health tips and updates for Houston's Hispanic community.",
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
            ? "Blog - Clínica Hispana Nueva Salud Gessner Houston"
            : "Blog - Hispanic Clinic Nueva Salud Gessner Houston",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "es"
        ? "Blog | Clínica Hispana Nueva Salud Gessner"
        : "Blog | Hispanic Clinic Nueva Salud Gessner",
      description: locale === "es"
        ? "Noticias, consejos de salud y actualizaciones para la comunidad hispana de Houston."
        : "News, health tips and updates for Houston's Hispanic community.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/blog`,
        en: `${baseUrl}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const blogUrl = locale === "es" ? `${SITE_CONFIG.baseUrl}/blog` : `${SITE_CONFIG.baseUrl}/${locale}/blog`;
  const homeHref = locale === "es" ? "" : `/${locale}`;

  // Get all posts from markdown files
  const posts = getAllPosts();

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Blog", url: blogUrl },
        ]}
      />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white pt-28 sm:pt-32 lg:pt-40 pb-20 overflow-hidden bg-linear-to-br from-secondary to-teal-dark">
          <div className="container mx-auto px-4 relative">
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

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t("noPostsFound")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
                  >
                    <Link href={`${homeHref}/blog/${post.slug}`} className="block">
                      {/* Image */}
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-linear-to-br from-green-bg to-teal-light">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary/30">NS</span>
                          </div>
                        )}
                        {post.featured && (
                          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {locale === "es" ? "Destacado" : "Featured"}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <CalendarBlank className="size-4" aria-hidden="true" />
                          <time dateTime={post.date}>
                            {formatDate(post.date, locale)}
                          </time>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {post.description}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          {t("readMore")}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {/* SEO Text */}
            <div className="mt-16 text-center">
              <p className="text-muted-foreground text-sm max-w-3xl mx-auto">
                {t("seoText")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
