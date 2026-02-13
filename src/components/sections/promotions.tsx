"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROMOTIONS, CONTACT_INFO } from "@/lib/constants";

const promoImages: Record<string, string> = {
  ginecologia: "/images/promotions/gynecology-promo.webp",
  inmigracion: "/images/promotions/immigration-promo.webp",
  "ultrasonido-embarazo": "/images/promotions/ultrasound-promo.webp",
};

const promoAltText: Record<string, string> = {
  ginecologia: "consulta ginecologia clinica hispana houston",
  inmigracion: "examen inmigracion green card clinica hispana houston",
  "ultrasonido-embarazo": "ultrasonido embarazo clinica hispana houston",
};

export function Promotions() {
  const t = useTranslations();

  return (
    <section className="py-16 bg-linear-to-b from-green-bg to-green-bg-alt">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("promotions.title")}{" "}
            <span className="text-primary">{t("promotions.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("promotions.description")}
          </p>
        </motion.div>

        {/* Promotion Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PROMOTIONS.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={
                index === PROMOTIONS.length - 1
                  ? "md:col-span-2 md:justify-self-center md:w-[calc(50%-0.75rem)] lg:col-span-1 lg:w-full"
                  : ""
              }
            >
              <Card
                className={`h-full relative overflow-hidden border-0 ${
                  index === 0
                    ? "ring-2 ring-primary shadow-2xl md:scale-105"
                    : "hover:shadow-xl transition-shadow"
                }`}
              >
                {/* Background Image */}
                {promoImages[promo.id] && (
                  <>
                    <Image
                      src={promoImages[promo.id]}
                      alt={promoAltText[promo.id] || promo.title}
                      fill
                      className="object-cover object-[center_20%] md:object-[center_30%] xl:object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/70 to-black/40" />
                  </>
                )}

                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-xl text-white drop-shadow-md">
                    {promo.title}
                  </CardTitle>
                  {/* Badge debajo del título */}
                  <Badge
                    className={`w-fit mt-2 ${
                      index === 0
                        ? "bg-primary text-white"
                        : index === 2
                          ? "bg-success text-white"
                          : "bg-white/90 text-secondary"
                    }`}
                  >
                    {promo.badge}
                  </Badge>
                  <p className="text-sm text-white/80 mt-2">
                    {promo.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white drop-shadow-lg">
                      {promo.price}
                    </span>
                    {promo.originalPrice && (
                      <span className="text-lg text-white/75 line-through">
                        {promo.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Includes */}
                  <ul className="space-y-2">
                    {promo.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="size-4 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="flex gap-2 mt-4">
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          * Precios válidos en nuestra clínica hispana Clínica Hispana Nueva Salud Gessner
          en Houston, TX. Sujetos a cambio sin previo aviso.
        </p>
      </div>
    </section>
  );
}
