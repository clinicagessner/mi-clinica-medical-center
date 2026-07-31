"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Check, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES, CONTACT_INFO } from "@/lib/constants";

// IDs de los 3 servicios destacados para el landing
const FEATURED_SERVICE_IDS = ["infecciones-urinarias", "ginecologia", "ultrasonido"];

// Obtener los servicios destacados del array SERVICES
const FEATURED_SERVICES = SERVICES.filter((service) =>
  FEATURED_SERVICE_IDS.includes(service.id)
).sort(
  (a, b) =>
    FEATURED_SERVICE_IDS.indexOf(a.id) - FEATURED_SERVICE_IDS.indexOf(b.id)
);

// Imágenes de fondo para los servicios destacados
const serviceImages: Record<string, string> = {
  "infecciones-urinarias": "/images/services/infecciones-urinarias.webp",
  "ginecologia": "/images/services/ginecologia.webp",
  "ultrasonido": "/images/services/ultrasonido.webp",
};

// Alt text para SEO
const serviceAltText: Record<string, Record<string, string>> = {
  es: {
    "infecciones-urinarias": "examen de orina infeccion urinaria clinica hispana houston",
    "ginecologia": "consulta ginecologia clinica hispana houston",
    "ultrasonido": "ultrasonido embarazo clinica hispana houston",
  },
  en: {
    "infecciones-urinarias": "urinalysis urinary infection hispanic clinic houston",
    "ginecologia": "gynecology consultation hispanic clinic houston",
    "ultrasonido": "pregnancy ultrasound hispanic clinic houston",
  },
};

// Service translations
const serviceTranslations: Record<string, Record<string, { title: string; description: string; features: string[] }>> = {
  es: {
    "infecciones-urinarias": {
      title: "Tratamiento de Infecciones Urinarias",
      description: "Examen de orina y tratamiento de infecciones urinarias el mismo día en nuestra clínica hispana de Houston.",
      features: [
        "Examen de orina en la clínica",
        "Diagnóstico el mismo día",
        "Tratamiento inmediato",
        "Atención sin cita en español",
      ],
    },
    "ginecologia": {
      title: "Servicios de Ginecología",
      description: "Ginecología en la clínica hispana de Houston. Atención integral para la salud de la mujer en español.",
      features: [
        "Papanicolaou",
        "Examen de mama",
        "Salud reproductiva",
        "Consulta ginecológica",
      ],
    },
    "ultrasonido": {
      title: "Ultrasonido",
      description: "Ultrasonidos en la clínica hispana de Houston. Embarazo, abdominal, pélvico y más con resultados inmediatos.",
      features: [
        "Ultrasonido de embarazo",
        "Ultrasonido abdominal",
        "Ultrasonido pélvico",
        "Resultados inmediatos",
      ],
    },
  },
  en: {
    "infecciones-urinarias": {
      title: "Urinary Infection Treatment",
      description: "Urinalysis and same-day urinary infection treatment at our Hispanic clinic in Houston.",
      features: [
        "In-clinic urinalysis",
        "Same-day diagnosis",
        "Immediate treatment",
        "Walk-ins welcome, in Spanish",
      ],
    },
    "ginecologia": {
      title: "Gynecology Services",
      description: "Gynecology at our Hispanic clinic in Houston. Comprehensive women's health care in Spanish.",
      features: [
        "Pap smear",
        "Breast exam",
        "Reproductive health",
        "Gynecological consultation",
      ],
    },
    "ultrasonido": {
      title: "Ultrasound",
      description: "Ultrasounds at our Hispanic clinic in Houston. Pregnancy, abdominal, pelvic and more with immediate results.",
      features: [
        "Pregnancy ultrasound",
        "Abdominal ultrasound",
        "Pelvic ultrasound",
        "Immediate results",
      ],
    },
  },
};

export function Services() {
  const t = useTranslations();
  const locale = useLocale();
  const servicesHref = locale === "es" ? "/services" : `/${locale}/services`;

  return (
    <section id="services" className="py-16 bg-green-bg-alt">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("services.title")}{" "}
            <span className="text-primary">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {FEATURED_SERVICES.map((service, index) => {
            const serviceData = serviceTranslations[locale]?.[service.id] || serviceTranslations.es[service.id];
            const altText = serviceAltText[locale]?.[service.id] || serviceAltText.es[service.id];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={
                  index === FEATURED_SERVICES.length - 1
                    ? "md:col-span-2 md:justify-self-center md:w-[calc(50%-0.75rem)] lg:col-span-1 lg:w-full"
                    : ""
                }
              >
                <Card className="h-full relative overflow-hidden border-0 flex flex-col hover:shadow-xl transition-shadow">
                  {/* Background Image */}
                  {serviceImages[service.id] && (
                    <>
                      <Image
                        src={serviceImages[service.id]}
                        alt={altText}
                        fill
                        className="object-cover object-[center_20%] md:object-[center_30%] xl:object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/40" />
                    </>
                  )}

                  <CardHeader className="relative z-10 pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-white drop-shadow-md">
                        {serviceData.title}
                      </CardTitle>
                      <Badge className="bg-white/90 text-secondary shrink-0">
                        {t("services.featured")}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/80 mt-2">
                      {serviceData.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10 flex-1 flex flex-col">
                    {/* Features - mostrar solo 4 */}
                    <ul className="space-y-2">
                      {serviceData.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="size-4 text-green-400 shrink-0" weight="bold" />
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 space-y-2">
                      <div className="flex gap-2">
                        <Button
                          asChild
                          className="flex-1 bg-white text-secondary hover:bg-white/90 font-semibold"
                        >
                          <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                            <Phone className="size-4 mr-1.5" weight="fill" />
                            {t("common.call")}
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 bg-transparent border-white text-white hover:bg-white/20 font-semibold"
                        >
                          <a
                            href={CONTACT_INFO.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="size-4 mr-1.5" weight="fill" />
                            {t("common.location")}
                          </a>
                        </Button>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full text-white font-semibold hover:bg-white/20 hover:text-white"
                      >
                        <Link href={`${servicesHref}/${service.slug}`}>
                          {t("common.learnMore")} →
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Ver más button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button asChild size="lg" variant="outline">
            <Link href={servicesHref}>
              {t("common.viewAllServices")} →
            </Link>
          </Button>
        </motion.div>

        {/* SEO Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto"
        >
          {t("services.seoText")}
        </motion.p>
      </div>
    </section>
  );
}
