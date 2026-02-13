"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle,
  Shield,
  FileText,
  Clock,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GREEN_CARD_FEATURES, CONTACT_INFO } from "@/lib/constants";

const processSteps = [
  {
    step: 1,
    title: "Agende su cita",
    description: "Llame o visite nuestra clínica hispana sin cita previa",
  },
  {
    step: 2,
    title: "Examen físico",
    description: "Complete el examen con nuestro médico en español",
  },
  {
    step: 3,
    title: "Análisis de sangre",
    description: "Realizamos todos los análisis requeridos por USCIS",
  },
  {
    step: 4,
    title: "Revisión de vacunas",
    description: "Verificamos y actualizamos su historial de vacunas",
  },
  {
    step: 5,
    title: "Reciba su I-693",
    description: "Formulario sellado listo en 3-5 días hábiles",
  },
];

export function GreenCard() {
  return (
    <section
      id="green-card"
      className="py-20 text-white relative overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/green-card-bg.webp"
        alt="examen medico inmigracion i-693 clinica hispana houston"
        fill
        className="object-cover object-top sm:object-center lg:object-[center_30%] -z-20"
        quality={85}
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10" />
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
            <Shield className="size-4 mr-2" weight="fill" />
            Autorizado por USCIS
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Exámenes Médicos de{" "}
            <span className="text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] [text-shadow:0_0_30px_rgba(34,197,94,0.5)]">
              Inmigración
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Nuestra clínica hispana está autorizada para realizar el formulario
            I-693 con médico Civil Surgeon certificado. Todo el proceso en
            español.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Process Steps */}
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
                      <FileText className="size-5 text-white" weight="fill" />
                    </div>
                    <span className="text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] [text-shadow:0_0_20px_rgba(34,197,94,0.4)]">Proceso en la Clínica Hispana</span>
                  </h3>
                </div>
                <div className="p-6">
                  <ol className="space-y-5">
                    {processSteps.map((item, index) => (
                      <motion.li
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="relative">
                          <span className="size-10 bg-primary/20 group-hover:bg-primary rounded-xl flex items-center justify-center text-base font-bold text-white shrink-0 transition-all duration-300 border border-primary/40 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                            {item.step}
                          </span>
                          {index < processSteps.length - 1 && (
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-white/20" />
                          )}
                        </div>
                        <div className="pt-1">
                          <p className="font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-white/90">
                            {item.description}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Features + Stats + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="size-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Clock
                      className="size-7 text-white"
                      weight="fill"
                    />
                  </div>
                  <p className="font-bold text-3xl text-white">3-5</p>
                  <p className="text-sm text-white/90">Días para resultados</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="size-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Shield
                      className="size-7 text-white"
                      weight="fill"
                    />
                  </div>
                  <p className="font-bold text-3xl text-white">100%</p>
                  <p className="text-sm text-white/90">En español</p>
                </CardContent>
              </Card>
            </div>

            {/* Features Checklist */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4">
                  ¿Qué incluye el examen I-693?
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {GREEN_CARD_FEATURES.map((feature, index) => (
                    <motion.div
                      key={feature.id}
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
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02] h-14 text-base font-semibold"
              >
                <a href="/#contacto">
                  <FileText className="size-5 mr-2" weight="fill" />
                  Agendar Examen I-693
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 transition-all duration-300 hover:scale-[1.02] h-14 text-base font-semibold"
              >
                <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                  <Phone className="size-5 mr-2" weight="fill" />
                  Llamar Ahora
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
          Clínica Hispana Nueva Salud Gessner es la clínica hispana de preferencia en
          Houston para exámenes de Green Card I-693. Nuestra clínica hispana
          cuenta con médicos Civil Surgeon certificados por USCIS que completan
          todo el proceso en español.
        </motion.p>
      </div>
    </section>
  );
}
