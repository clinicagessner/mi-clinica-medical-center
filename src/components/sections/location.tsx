"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Car, Wheelchair, Bus, Shield } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, LOCATION_FEATURES } from "@/lib/constants";

const featureIcons = [Car, Wheelchair, Bus, Shield];

export function Location() {
  return (
    <section id="ubicacion" className="py-16 bg-green-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Clínica Hispana Cerca de Ti en{" "}
            <span className="text-primary">Houston</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visita nuestra clínica hispana Clínica Hispana Nueva Salud Gessner en Houston,
            TX. Estamos ubicados en un lugar conveniente con fácil acceso y
            estacionamiento gratuito.
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
              title="Ubicación de Clínica Hispana Nueva Salud Gessner - Clínica Hispana en Houston TX"
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
                    <h3 className="font-bold text-foreground mb-1">Dirección</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                    <Button asChild variant="link" className="p-0 h-auto mt-1">
                      <a
                        href={CONTACT_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver en Google Maps
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
                    <h3 className="font-bold text-foreground mb-1">Teléfono</h3>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Llama ahora a la clínica hispana
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Horario</h3>
                    <p className="text-muted-foreground">{CONTACT_INFO.hours}</p>
                    <p className="text-sm text-success font-medium mt-1">
                      Abierto ahora - 7 días a la semana
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-foreground mb-4">
                  Facilidades de la Clínica Hispana
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {LOCATION_FEATURES.map((feature, index) => {
                    const Icon = featureIcons[index];
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Icon className="size-5 text-success" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
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
                Cómo Llegar a la Clínica Hispana
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
          La clínica hispana Clínica Hispana Nueva Salud Gessner está ubicada en 1914
          Gessner Rd B, Houston, TX 77080. Nuestra clínica hispana es fácil de
          encontrar y cuenta con amplio estacionamiento gratuito para todos
          nuestros pacientes de la comunidad hispana de Houston.
        </motion.p>
      </div>
    </section>
  );
}
