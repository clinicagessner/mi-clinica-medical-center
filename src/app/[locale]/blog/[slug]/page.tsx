import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CalendarBlank, ArrowLeft, User } from "@phosphor-icons/react/dist/ssr";
import { JsonLdBreadcrumb, JsonLdBlogPost } from "@/components/seo/json-ld";
import { SITE_CONFIG, BLOG_POSTS, getBlogPostBySlug } from "@/lib/constants";
import { locales } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    BLOG_POSTS.forEach((post) => {
      params.push({ locale, slug: post.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  const baseUrl = SITE_CONFIG.baseUrl;

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // We need to get translations for the post title/description
  const tPosts = await getTranslations({ locale, namespace: "blogPosts" });
  const title = tPosts(`${slug}.title`);
  const excerpt = tPosts(`${slug}.excerpt`);

  const canonicalUrl = locale === "es"
    ? `${baseUrl}/blog/${slug}`
    : `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title: `${title} | ${locale === "es" ? "Clínica Hispana Nueva Salud Gessner" : "Hispanic Clinic Nueva Salud Gessner"}`,
    description: excerpt,
    keywords: post.keywords,
    openGraph: {
      title,
      description: excerpt,
      url: canonicalUrl,
      siteName: "Clínica Hispana Nueva Salud Gessner",
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
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

// Simple markdown-like parser for the blog content
function parseContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-foreground mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-foreground mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-muted-foreground">$1</li>')
    // Paragraphs (lines that aren't headers or lists)
    .replace(/^(?!<[hlu])(.*$)/gm, (match) => {
      if (match.trim() === '') return '';
      if (match.startsWith('<')) return match;
      return `<p class="text-muted-foreground leading-relaxed mb-4">${match}</p>`;
    })
    // Wrap consecutive <li> in <ul>
    .replace(/(<li.*?<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-2 mb-6">$&</ul>')
    // Phone/location emojis
    .replace(/📞/g, '<span aria-hidden="true">📞</span>')
    .replace(/📍/g, '<span aria-hidden="true">📍</span>');
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const tPosts = await getTranslations({ locale, namespace: "blogPosts" });

  const baseUrl = SITE_CONFIG.baseUrl;
  const blogUrl = locale === "es" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;
  const postUrl = locale === "es" ? `${baseUrl}/blog/${slug}` : `${baseUrl}/${locale}/blog/${slug}`;
  const homeHref = locale === "es" ? "" : `/${locale}`;

  const title = tPosts(`${slug}.title`);
  const content = tPosts(`${slug}.content`);
  const excerpt = tPosts(`${slug}.excerpt`);

  // Format date based on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Blog", url: blogUrl },
          { name: title, url: postUrl },
        ]}
      />
      <JsonLdBlogPost
        title={title}
        description={excerpt}
        url={postUrl}
        image={post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-image.jpg`}
        publishedAt={post.publishedAt}
        author={post.author}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white pt-28 sm:pt-32 lg:pt-40 pb-16 overflow-hidden">
          {post.image ? (
            <>
              <Image
                src={post.image}
                alt={title}
                fill
                className="object-cover object-center -z-20"
                priority
                quality={85}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/70 -z-10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-teal-dark -z-10" />
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
                {title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarBlank className="size-4" aria-hidden="true" />
                  <time dateTime={post.publishedAt}>
                    {t("publishedOn")} {formatDate(post.publishedAt)}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <User className="size-4" aria-hidden="true" />
                  <span>{t("by")} {post.author.name}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <article className="max-w-3xl mx-auto">
              {/* Parsed content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: parseContent(content) }}
              />

              {/* Author Card */}
              <div className="mt-12 p-6 bg-muted rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="size-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
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
