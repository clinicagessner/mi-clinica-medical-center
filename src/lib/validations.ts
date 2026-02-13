import { z } from "zod";
import { SERVICES } from "@/lib/constants";

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  telefono: z
    .string()
    .min(10, "Ingrese un número de teléfono válido")
    .regex(
      /^[\d\s\-\(\)]+$/,
      "El teléfono solo puede contener números, espacios, guiones y paréntesis"
    ),
  email: z.string().email("Ingrese un correo electrónico válido").optional().or(z.literal("")),
  servicio: z.string().min(1, "Seleccione un servicio"),
  mensaje: z
    .string()
    .max(500, "El mensaje no puede exceder 500 caracteres")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Generar opciones de servicios directamente desde SERVICES
export const serviceOptions = [
  ...SERVICES.map((service) => ({
    value: service.id,
    label: service.title,
  })),
  { value: "otro", label: "Otro Servicio" },
];
