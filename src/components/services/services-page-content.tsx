"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MagnifyingGlass,
  Funnel,
  Phone,
  Chat,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceIcon } from "@/components/services/service-icon";
import { SERVICES, CONTACT_INFO } from "@/lib/constants";
import type { Service } from "@/types";

// Esquema de color por categoría: badge + contenedor del icono (con hover vívido).
const categoryStyles: Record<Service["category"], { badge: string; icon: string }> = {
  "medicina-general": {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
  },
  "salud-mujer": {
    badge: "bg-pink-50 text-pink-700 border-pink-200",
    icon: "bg-pink-100 text-pink-700 group-hover:bg-pink-600 group-hover:text-white",
  },
  examenes: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white",
  },
  laboratorio: {
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    icon: "bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white",
  },
  tratamientos: {
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    icon: "bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white",
  },
};

export function ServicesPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    Service["category"] | "all"
  >("all");
  const locale = useLocale();
  const t = useTranslations();
  const tCategories = useTranslations("categories");
  const tServices = useTranslations("servicesPage");

  const getServiceUrl = (slug: string) => {
    return locale === "es" ? `/services/${slug}` : `/${locale}/services/${slug}`;
  };

  const filteredServices = SERVICES.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.order - b.order);

  const categories: Array<Service["category"] | "all"> = [
    "all",
    "medicina-general",
    "salud-mujer",
    "examenes",
    "laboratorio",
    "tratamientos",
  ];

  return (
    <>
      {/* Search and Filter Section */}
      <section className="py-8 bg-green-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl shadow-sm border border-border p-4 md:p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <label htmlFor="services-search" className="sr-only">
                  {tServices("searchPlaceholder")}
                </label>
                <MagnifyingGlass
                  className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="services-search"
                  type="search"
                  placeholder={tServices("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50/50"
                />
              </div>

              {/* Category Filter */}
              <div
                className="flex items-center gap-2 flex-wrap justify-center"
                role="group"
                aria-label={locale === "es" ? "Filtrar por categoría" : "Filter by category"}
              >
                <Funnel className="size-5 text-muted-foreground hidden sm:block" aria-hidden="true" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    className={`rounded-full transition-all ${
                      selectedCategory === category
                        ? "shadow-md shadow-primary/25"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category === "all" ? tServices("filterAll") : tCategories(category)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {filteredServices.length === SERVICES.length ? (
                  locale === "es" ? "Mostrando todos los servicios" : "Showing all services"
                ) : (
                  <>
                    {locale === "es" ? "Mostrando" : "Showing"}{" "}
                    <span className="font-semibold text-foreground">
                      {filteredServices.length}
                    </span>{" "}
                    {locale === "es" ? "servicios" : "services"}
                  </>
                )}
              </p>
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {locale === "es" ? "Limpiar búsqueda" : "Clear search"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-green-bg">
        <div className="container mx-auto px-4">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-2xl shadow-sm"
            >
              <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlass className="size-8 text-gray-400" />
              </div>
              <p className="text-lg text-muted-foreground mb-2">
                {tServices("noResults")}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {tServices("tryAgain")}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                {locale === "es" ? "Limpiar filtros" : "Clear filters"}
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => {
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: Math.min(index * 0.03, 0.15) }}
                  >
                    <Link href={getServiceUrl(service.slug)} className="block h-full">
                      <Card
                        aria-label={t("accessibility.openServiceDetails")}
                        className={`h-full cursor-pointer group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex flex-col ${
                          service.highlighted
                            ? "border-2 border-primary shadow-lg shadow-primary/10 bg-linear-to-br from-white via-white to-green-50"
                            : "border border-border hover:border-primary/30 hover:shadow-xl bg-card"
                        }`}
                      >
                        {service.image && (
                          <>
                            <Image
                              src={service.image}
                              alt={`${service.title} - Clínica Hispana Nueva Salud Gessner, Houston TX`}
                              fill
                              className="object-cover object-center z-0"
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-white via-white/90 to-white/70 z-0" />
                          </>
                        )}
                        <CardHeader className="pb-3 relative z-10">
                          {/* Badges row */}
                          <div className="flex items-center justify-between mb-3">
                            <Badge
                              variant="outline"
                              className={`text-xs font-medium ${categoryStyles[service.category].badge}`}
                            >
                              {tCategories(service.category)}
                            </Badge>
                            {service.highlighted && (
                              <Badge className="bg-primary text-white text-xs">
                                {locale === "es" ? "Destacado" : "Featured"}
                              </Badge>
                            )}
                          </div>

                          {/* Icon */}
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                              service.highlighted
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : categoryStyles[service.category].icon
                            }`}
                          >
                            <ServiceIcon name={service.icon} className="size-7" />
                          </div>
                          <CardTitle className="text-lg mt-4 group-hover:text-primary transition-colors leading-snug">
                            {service.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0 relative z-10 flex-1 flex flex-col">
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                            {service.description}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {service.features.slice(0, 3).map((feature) => (
                              <span
                                key={feature}
                                className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full border border-border"
                              >
                                {feature}
                              </span>
                            ))}
                            {service.features.length > 3 && (
                              <span className="text-xs text-primary font-medium px-2.5 py-1">
                                +{service.features.length - 3} {locale === "es" ? "más" : "more"}
                              </span>
                            )}
                          </div>

                          <Button
                            variant={service.highlighted ? "default" : "outline"}
                            size="sm"
                            className={`w-full transition-all mt-auto ${
                              service.highlighted
                                ? "shadow-md shadow-primary/25"
                                : "group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                            }`}
                          >
                            {t("common.learnMore")}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/services/services-cta.webp"
          alt="atencion medica clinica hispana houston"
          fill
          className="object-cover object-center -z-20"
          quality={85}
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary/90 -z-10" />
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15)_0%,transparent_60%)] -z-10" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6"
            >
              <span className="size-2.5 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white/90">
                {locale === "es" ? "Estamos para ayudarte" : "We're here to help"}
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {tServices("ctaTitle")}
            </h2>
            <p className="text-white/90 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {tServices("ctaDescription")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 h-14 px-8 text-base font-semibold"
              >
                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                  <Phone className="size-5 mr-2" weight="fill" />
                  {t("common.callNow")}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-secondary backdrop-blur-sm transition-all duration-300 hover:scale-105 h-14 px-8 text-base font-semibold"
              >
                <Link href={locale === "es" ? "/#contact" : `/${locale}/#contact`}>
                  <Chat className="size-5 mr-2" />
                  {locale === "es" ? "Enviar Mensaje" : "Send Message"}
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-primary rounded-full" />
                <span>{locale === "es" ? "Atención en español" : "Spanish-speaking care"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-primary rounded-full" />
                <span>{locale === "es" ? "Sin cita previa" : "Walk-ins welcome"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 bg-primary rounded-full" />
                <span>{locale === "es" ? "Abierto 7 días" : "Open 7 days"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
