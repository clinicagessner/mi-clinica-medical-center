"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Question, Phone } from "@phosphor-icons/react/dist/ssr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function FAQ() {
  const t = useTranslations("faq");

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
            {t("title")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
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
            {FAQ_KEYS.map((num) => (
              <AccordionItem
                key={num}
                value={`item-${num}`}
                className="bg-white rounded-xl px-6 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {t(`q${num}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {t(`a${num}`)}
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
            {t("moreQuestions")}
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}>
                <Phone className="size-5 mr-2" weight="fill" />
                {t("callButton")}
              </a>
            </Button>
          </div>
        </motion.div>

        {/* SEO Text */}
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-3xl mx-auto">
          {t("seoText")}
        </p>
      </div>
    </section>
  );
}
