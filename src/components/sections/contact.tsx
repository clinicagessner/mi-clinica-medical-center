"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, Clock, MapPin, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT_INFO } from "@/lib/constants";

export function Contact() {
  const t = useTranslations("contact");

  const benefits = [
    t("benefit1"),
    t("benefit2"),
    t("benefit3"),
    t("benefit4"),
  ];

  return (
    <section id="contacto" className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/contact/contact-bg.webp"
          alt="contacto clinica hispana houston"
          fill
          className="object-cover"
          quality={80}
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary/95 via-secondary/90 to-primary/80 -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("title")}{" "}
            <span className="text-primary-foreground">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Options - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Contact Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Phone Button */}
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="size-14 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="size-7 text-white" weight="fill" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">{t("callLabel")}</p>
                  <p className="text-primary font-semibold">
                    {CONTACT_INFO.phone}
                  </p>
                </div>
              </a>

              {/* Maps Button */}
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="size-14 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="size-7 text-white" weight="fill" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">{t("addressLabel")}</p>
                  <p className="text-secondary font-semibold">{t("viewOnMaps")}</p>
                </div>
              </a>
            </div>

            {/* Info Cards */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="space-y-5">
                {/* Hours */}
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Clock className="size-6 text-white" weight="fill" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t("hoursLabel")}</p>
                    <p className="text-white/80 text-sm">{CONTACT_INFO.hours}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <MapPin className="size-6 text-white" weight="fill" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t("addressLabel")}</p>
                    <p className="text-white/80 text-sm">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-white text-lg mb-4">
                {t("infoTitle")}
              </h3>
              <ul className="space-y-3">
                {benefits.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <div className="size-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="size-4 text-white" weight="bold" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* SEO Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white/80 mt-12 max-w-3xl mx-auto"
        >
          {t("seoText")}
        </motion.p>
      </div>
    </section>
  );
}
