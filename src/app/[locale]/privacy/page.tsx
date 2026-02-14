import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG, CONTACT_INFO } from "@/lib/constants";
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
  const canonicalUrl =
    locale === "es" ? `${baseUrl}/privacy` : `${baseUrl}/${locale}/privacy`;

  return {
    title:
      locale === "es"
        ? "Política de Privacidad HIPAA | Clínica Hispana Nueva Salud Gessner"
        : "HIPAA Privacy Policy | Hispanic Clinic Nueva Salud Gessner",
    description:
      locale === "es"
        ? "Política de privacidad HIPAA de Clínica Hispana Nueva Salud Gessner en Houston, TX. Protección de información médica protegida (PHI)."
        : "HIPAA privacy policy of Clínica Hispana Nueva Salud Gessner in Houston, TX. Protection of Protected Health Information (PHI).",
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("privacy");
  const homeHref = locale === "es" ? "/" : `/${locale}`;

  return (
    <section className="py-24 sm:py-28 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back link */}
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm font-medium">{t("backHome")}</span>
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          {t("title")}
        </h1>

        {/* Content */}
        <div className="prose prose-gray max-w-none space-y-6">
          {/* Introduction */}
          <p className="text-muted-foreground leading-relaxed">
            {t("intro")}
          </p>

          {/* Information Collection */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("collectionTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("collectionText")}
          </p>

          {/* Data Protection */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("protectionTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("protectionText")}
          </p>

          {/* Use of Information */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("useTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("useText")}
          </p>

          {/* Third Parties */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("thirdPartyTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("thirdPartyText")}
          </p>

          {/* Patient Rights */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("rightsTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("rightsText")}
          </p>

          {/* Complaints */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("complaintsTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("complaintsText")}
          </p>

          {/* Disclaimer */}
          <h2 className="text-xl font-bold text-foreground mt-8">
            {t("disclaimerTitle")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("disclaimerText")}
          </p>

          {/* Contact */}
          <div className="mt-10 p-6 bg-muted rounded-xl">
            <h2 className="text-lg font-bold text-foreground mb-3">
              {t("contactTitle")}
            </h2>
            <p className="text-muted-foreground text-sm mb-2">
              {SITE_CONFIG.name}
            </p>
            <p className="text-muted-foreground text-sm mb-2">
              {CONTACT_INFO.address}
            </p>
            <p className="text-muted-foreground text-sm">
              {t("phoneLabel")}:{" "}
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="text-primary hover:underline font-medium"
              >
                {CONTACT_INFO.phone}
              </a>
            </p>
          </div>

          {/* Notice */}
          <p className="text-sm text-muted-foreground italic mt-6">
            {t("notice")}
          </p>
        </div>
      </div>
    </section>
  );
}
