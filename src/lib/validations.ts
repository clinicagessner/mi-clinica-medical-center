import { z } from "zod";

// Los mensajes de error son claves de `contactForm` en src/messages/<lang>.json;
// el formulario los traduce al pintarlos.
import { SERVICES } from "@/lib/constants";

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "errors.nameMin")
    .max(100, "errors.nameMax"),
  telefono: z
    .string()
    .min(10, "errors.phoneInvalid")
    .regex(
      /^[\d\s\-\(\)]+$/,
      "errors.phoneChars"
    ),
  email: z.string().email("errors.emailInvalid").optional().or(z.literal("")),
  servicio: z.string().min(1, "errors.serviceRequired"),
  mensaje: z
    .string()
    .max(500, "errors.messageMax")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Opciones del selector: el texto visible sale de `contactForm.services.<id>`
// (nombres cortos por idioma, no los títulos SEO de cada página).
export const serviceOptions = [...SERVICES.map((service) => service.id), "otro"];
