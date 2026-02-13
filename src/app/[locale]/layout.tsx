import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Poppins } from "next/font/google";
import { locales, type Locale } from "@/i18n/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/layout/floating-buttons";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import {
  JsonLdMedicalClinic,
  JsonLdFAQ,
  JsonLdBreadcrumb,
} from "@/components/seo/json-ld";

// Fuente para títulos - Poppins: moderna, profesional, geométrica
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Fuente para cuerpo - Inter: legible, limpia, excelente para texto largo
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = messages.metadata;

  const isSpanish = locale === "es";
  const baseUrl = "https://clinicagessner.com";
  const canonicalUrl = isSpanish ? baseUrl : `${baseUrl}/en`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t.title,
      template: t.titleTemplate,
    },
    description: t.description,
    keywords: [
      "clinica hispana",
      "clinica hispana cerca de mi",
      "ginecologos cerca de mi",
      "ginecologo que hablen español",
      "clinica hispana houston",
      "examenes medicos de inmigracion",
      "clinicas gratuitas cerca de mi",
      "clinica hispana familiar",
      "clinica hispana near me",
      "ultrasonido de embarazo cerca de mi",
      "examen Green Card Houston",
      "examen I-693 Houston",
      "clínica latina Houston",
      "USCIS civil surgeon Houston",
    ],
    authors: [{ name: "Clínica Hispana Nueva Salud Gessner" }],
    creator: "Clínica Hispana Nueva Salud Gessner",
    publisher: "Clínica Hispana Nueva Salud Gessner",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: isSpanish ? "es_MX" : "en_US",
      url: canonicalUrl,
      siteName: "Clínica Hispana Nueva Salud Gessner",
      title: t.title,
      description: t.ogDescription,
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isSpanish
            ? "Clínica Hispana cerca de mi en Houston TX - Clínica Hispana Nueva Salud Gessner"
            : "Hispanic Clinic near me in Houston TX - Clínica Hispana Nueva Salud Gessner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    verification: {
      google: "0e75VFJfRJHj87jse_2qkMBJ6I78XsHEBeUHuB3yJlY",
    },
    category: "Medical Clinic",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F7FDF9" />
        <meta name="msapplication-TileColor" content="#16A34A" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLdMedicalClinic />
          <JsonLdFAQ />
          <JsonLdBreadcrumb />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
