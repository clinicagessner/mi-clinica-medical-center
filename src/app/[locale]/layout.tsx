import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Poppins } from "next/font/google";
import { locales, type Locale } from "@/i18n/config";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConversionEvents } from "@/components/tracking/conversion-events";
import { GoogleTags } from "@/components/tracking/google-tags";

const FloatingButtons = dynamic(() =>
  import("@/components/layout/floating-buttons").then((mod) => mod.FloatingButtons)
);

const ScrollToTop = dynamic(() =>
  import("@/components/layout/scroll-to-top").then((mod) => mod.ScrollToTop)
);

// IDs de tracking — se leen de variables de entorno (con fallback al valor actual
// para no romper si la env aún no está configurada en algún entorno).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-K5R8SDQV";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-VB3TG5G62M";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-17854586021";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1470050858204955";
const CALLRAIL_SCRIPT =
  process.env.NEXT_PUBLIC_CALLRAIL_SCRIPT_URL ??
  "//cdn.callrail.com/companies/483686736/2d24d58dab6b24257f83/12/swap.js";

// Fuente para títulos - Poppins: moderna, profesional, geométrica
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
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

// Solo se sirven los locales de generateStaticParams; cualquier otro segmento
// (/.env, /foo.php — rutas que saltan el middleware) responde 404 sin renderizar.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Rutas con punto (/.env, /foo.php) saltan el middleware y llegan aquí con un
  // locale inválido; el import dinámico fallaba con 500 antes de que el layout
  // pudiera responder 404.
  if (!locales.includes(locale as Locale)) notFound();

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const t = messages.metadata;

  const isSpanish = locale === "es";
  const baseUrl = "https://www.clinicagessner.com";
  const canonicalUrl = isSpanish ? baseUrl : `${baseUrl}/en`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t.title,
      template: t.titleTemplate,
    },
    description: t.description,
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
        "x-default": baseUrl,
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
    <html lang={locale} data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
          <ScrollToTop />
          <ConversionEvents />
        </NextIntlClientProvider>
        {/* GTM tras window.load; GA4, Google Ads y Meta Pixel con la primera interacción */}
        <GoogleTags gaId={GA_ID} adsId={GOOGLE_ADS_ID} pixelId={META_PIXEL_ID} gtmId={GTM_ID} />
        {CALLRAIL_SCRIPT && (
          <Script
            id="callrail-swap"
            src={CALLRAIL_SCRIPT}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
