import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLdBreadcrumb, JsonLdClinicLight } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts, formatDate } from "@/lib/blog";
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
  const title = seoTitle(isEs ? "Blog de Salud en Español" : "Health Blog in Spanish and English");
  const description = isEs
    ? "Consejos de salud en español del equipo médico de Clínica Hispana Nueva Salud Gessner, en Spring Branch, Houston."
    : "Health tips in Spanish and English from the medical team at Clínica Hispana Nueva Salud Gessner in Spring Branch, Houston.";
  const alternates = buildAlternates("/blog", locale);
  return {
    title: { absolute: title },
    description,
    alternates,
    ...buildSocial({ title, description, url: alternates.canonical, locale }),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const blogUrl = locale === "es" ? `${SITE_CONFIG.baseUrl}/blog` : `${SITE_CONFIG.baseUrl}/${locale}/blog`;
  const homeHref = locale === "es" ? "" : `/${locale}`;

  // Get all posts from markdown files (localized, fallback to Spanish)
  const posts = getAllPosts(locale);

  return (
    <>
      <JsonLdClinicLight />
      <JsonLdBreadcrumb locale={locale} items={[{ name: "Blog", url: blogUrl }]} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative isolate bg-teal-dark text-white pt-28 sm:pt-32 lg:pt-40 pb-20 overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images/services/services-hero.webp"
            alt={locale === "es"
              ? "clinica hispana nueva salud gessner houston"
              : "hispanic clinic nueva salud gessner houston"}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-center -z-20"
          />
          <div className="absolute inset-0 bg-black/60 -z-10" />
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
      </div>
    </>
  );
}
