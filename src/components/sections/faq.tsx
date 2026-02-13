"use client";

import { motion } from "framer-motion";
import { Question, Phone } from "@phosphor-icons/react/dist/ssr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS, CONTACT_INFO } from "@/lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="py-16 bg-green-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-full mb-4">
            <Question className="size-8 text-primary" weight="duotone" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Preguntas Frecuentes sobre la{" "}
            <span className="text-primary">Clínica Hispana</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestra
            clínica hispana Clínica Hispana Nueva Salud Gessner en Houston, TX.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Additional SEO Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-6">
            ¿Tienes más preguntas sobre nuestra clínica hispana? Contáctanos
            ahora.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                <Phone className="size-5 mr-2" weight="fill" />
                Llamar a la Clínica Hispana
              </a>
            </Button>
          </div>
        </motion.div>

        {/* SEO Text */}
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-3xl mx-auto">
          Clínica Hispana Nueva Salud Gessner es la clínica hispana que responde todas tus
          preguntas en español. Nuestra clínica hispana en Houston está
          comprometida con brindar información clara y transparente a la
          comunidad latina.
        </p>
      </div>
    </section>
  );
}
