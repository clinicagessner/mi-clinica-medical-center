"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  CheckCircle,
  Heart,
  Pulse,
  Flask,
  Phone,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CONTACT_INFO } from "@/lib/constants";

export function ChronicCare() {
  const t = useTranslations("chronicCare");
  const locale = useLocale();
  const homeHref = locale === "es" ? "/" : `/${locale}`;
  const serviceHref =
    locale === "es"
      ? "/services/condiciones-cronicas"
      : `/${locale}/services/condiciones-cronicas`;

  const conditions = [
    { icon: Pulse, key: "diabetes" },
    { icon: Heart, key: "hypertension" },
    { icon: Flask, key: "cholesterol" },
    { icon: Pulse, key: "thyroid" },
  ];

  const features = [
    "feature1",
    "feature2",
    "feature3",
    "feature4",
    "feature5",
    "feature6",
  ];

  return (
    <section
      id="chronic-care"
      className="py-20 text-white relative overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/services/chronic-conditions.webp"
        alt="control de enfermedades cronicas diabetes hipertension clinica hispana houston"
        fill
        className="object-cover object-center -z-20"
        quality={85}
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 -z-10" />
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.2)_0%,transparent_50%)] -z-10" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-white/15 text-white border border-white/30 hover:bg-white/20 mb-4">
            <Heart className="size-4 mr-2" weight="fill" />
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}{" "}
            <span className="text-green-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Conditions Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-white/5 px-6 py-4 border-b border-white/10">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                      <Pulse className="size-5 text-white" weight="fill" />
                    </div>
                    <span className="text-green-light">
                      {t("conditionsTitle")}
                    </span>
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {conditions.map((condition, index) => {
                      const Icon = condition.icon;
                      return (
                        <motion.div
                          key={condition.key}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/40 transition-all duration-300 group"
                        >
                          <div className="size-10 bg-primary/20 group-hover:bg-primary rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 border border-primary/40 group-hover:scale-110">
                            <Icon
                              className="size-5 text-white"
                              weight="fill"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {t(`conditions.${condition.key}.title`)}
                            </p>
                            <p className="text-sm text-white/80 mt-1">
                              {t(`conditions.${condition.key}.description`)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Features + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Features Checklist */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4">
                  {t("featuresTitle")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {features.map((featureKey, index) => (
                    <motion.div
                      key={featureKey}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2 group"
                    >
                      <div className="size-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle
                          className="size-4 text-black"
                          weight="bold"
                        />
                      </div>
                      <span className="text-sm text-white/90">
                        {t(featureKey)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learn More Link */}
            <Link
              href={serviceHref}
              className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-primary/40 transition-all duration-300 group"
            >
              <span className="text-white font-medium">{t("learnMore")}</span>
              <ArrowRight
                className="size-5 text-green-light group-hover:translate-x-1 transition-transform"
                weight="bold"
              />
            </Link>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] h-14 text-base font-semibold"
              >
                <Link href={`${homeHref}#contact`}>
                  <Heart className="size-5 mr-2" weight="fill" />
                  {t("ctaSchedule")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] h-14 text-base font-semibold"
              >
                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                  <Phone className="size-5 mr-2" weight="fill" />
                  {t("ctaCall")}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom SEO Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white/70 mt-16 max-w-3xl mx-auto leading-relaxed"
        >
          {t("seoText")}
        </motion.p>
      </div>
    </section>
  );
}
