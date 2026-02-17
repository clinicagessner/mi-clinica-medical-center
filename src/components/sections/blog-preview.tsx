import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, formatDate } from "@/lib/blog";

type Props = {
  locale: string;
};

export async function BlogPreview({ locale }: Props) {
  const t = await getTranslations({ locale });
  const blogHref = locale === "es" ? "/blog" : `/${locale}/blog`;
  const homeHref = locale === "es" ? "" : `/${locale}`;

  // Get latest 3 posts from markdown files
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <span className="size-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary">
              {t("blogPreview.badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("blogPreview.title")}{" "}
            <span className="text-primary">{t("blogPreview.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("blogPreview.description")}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={
                posts.length === 1
                  ? "md:col-span-2 lg:col-span-3 max-w-md mx-auto"
                  : ""
              }
            >
              <Link href={`${homeHref}/blog/${post.slug}`} className="block h-full">
                <Card className="h-full overflow-hidden border border-border hover:shadow-xl transition-shadow duration-300 group">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-green-bg to-teal-light">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">NS</span>
                      </div>
                    )}
                    {post.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary text-white">
                        {t("blogPreview.featured")}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <CalendarBlank className="size-4" aria-hidden="true" />
                      <time dateTime={post.date}>
                        {formatDate(post.date, locale)}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {post.description}
                    </p>

                    {/* Read More */}
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      {t("blogPreview.readMore")}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild size="lg" variant="outline">
            <Link href={blogHref}>
              {t("blogPreview.viewAll")}
              <ArrowRight className="size-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* SEO Text */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
          {t("blogPreview.seoText")}
        </p>
      </div>
    </section>
  );
}
