"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock, Car, Wheelchair, Bus, Shield } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

const featureIcons = [Car, Wheelchair, Bus, Shield];
const featureKeys = ["feature1", "feature2", "feature3", "feature4"] as const;

export function Location() {
  const t = useTranslations("location");

  return (
    <section id="location" className="py-16 bg-green-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[280px] sm:h-[350px] lg:h-full lg:min-h-[450px] rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.8!2d-95.5442136!3d29.806681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c4de999b36b5%3A0xdc9d14200d006777!2sCLINICA+HISPANA+NUEVA+SALUD+GESSNER!5e0!3m2!1ses!2sus!4v1700000000000!5m2!1ses!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapTitle")}
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address Card */}
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t("addressTitle")}</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                    <Button asChild variant="link" className="p-0 h-auto mt-1">
                      <a
                        href={CONTACT_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("viewOnMaps")}
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t("phoneTitle")}</h3>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("callClinic")}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t("hoursTitle")}</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.hours}</p>
                    <p className="text-sm text-success font-medium mt-1">
                      {t("openNow")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-4">
                  {t("facilitiesTitle")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {featureKeys.map((key, index) => {
                    const Icon = featureIcons[index];
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <Icon className="size-5 text-success" />
                        <span className="text-sm text-muted-foreground">
                          {t(key)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Button asChild size="lg" className="w-full">
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="size-5 mr-2" />
                {t("howToGet")}
              </a>
            </Button>
          </motion.div>
        </div>

        {/* SEO Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10 max-w-3xl mx-auto"
        >
          {t("seoText")}
        </motion.p>
      </div>
    </section>
  );
}
