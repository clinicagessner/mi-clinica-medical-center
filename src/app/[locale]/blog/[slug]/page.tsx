import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalendarBlank, ArrowLeft, User, Clock } from "@phosphor-icons/react/dist/ssr";
import { JsonLdBreadcrumb, JsonLdBlogPost } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { getPostBySlug, getAllSlugs, formatDate, calculateReadTime } from "@/lib/blog";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  const baseUrl = SITE_CONFIG.baseUrl;

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const canonicalUrl = locale === "es"
    ? `${baseUrl}/blog/${slug}`
    : `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title: `${post.title} | ${locale === "es" ? "Clínica Hispana Nueva Salud Gessner" : "Hispanic Clinic Nueva Salud Gessner"}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: "Clínica Hispana Nueva Salud Gessner",
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  const baseUrl = SITE_CONFIG.baseUrl;
  const blogUrl = locale === "es" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;
  const postUrl = locale === "es" ? `${baseUrl}/blog/${slug}` : `${baseUrl}/${locale}/blog/${slug}`;
  const homeHref = locale === "es" ? "" : `/${locale}`;

  const readTime = calculateReadTime(post.content);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Blog", url: blogUrl },
          { name: post.title, url: postUrl },
        ]}
      />
      <JsonLdBlogPost
        title={post.title}
        description={post.description}
        url={postUrl}
        image={post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-image.jpg`}
        publishedAt={post.date}
        author={{ name: post.author, role: "Administración" }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white pt-28 sm:pt-32 lg:pt-40 pb-16 overflow-hidden">
          {post.image ? (
            <>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover object-center -z-20"
                priority
                quality={85}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/70 -z-10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-secondary to-teal-dark -z-10" />
          )}

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto">
              {/* Back to blog */}
              <Link
                href={`${homeHref}/blog`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                {t("backToBlog")}
              </Link>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarBlank className="size-4" aria-hidden="true" />
                  <time dateTime={post.date}>
                    {t("publishedOn")} {formatDate(post.date, locale)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="size-4" aria-hidden="true" />
                  <span>{t("by")} {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4" aria-hidden="true" />
                  <span>{readTime} min {locale === "es" ? "de lectura" : "read"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <article className="max-w-3xl mx-auto">
              {/* Markdown content */}
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground prose-ul:my-6 prose-ol:my-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Author Card */}
              <div className="mt-12 p-6 bg-muted rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="size-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Administración</p>
                  </div>
                </div>
              </div>

              {/* Back to blog */}
              <div className="mt-12 text-center">
                <Link
                  href={`${homeHref}/blog`}
                  className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {t("backToBlog")}
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
