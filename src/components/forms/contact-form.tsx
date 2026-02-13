"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { PaperPlaneTilt, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactFormSchema,
  type ContactFormData,
  serviceOptions,
} from "@/lib/validations";
import { sendContactEmail } from "@/app/actions/send-contact-email";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      servicio: "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await sendContactEmail(data);

      if (response.success) {
        setSubmitStatus("success");
        reset();
      } else {
        // Set root error for server-side validation failures
        setError("root", {
          type: "server",
          message: response.message,
        });
        setSubmitStatus("error");
      }
    } catch {
      setError("root", {
        type: "server",
        message: "Error de conexión. Por favor intenta de nuevo.",
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary/80 p-6 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          Solicita tu Cita
        </h3>
        <p className="text-white/80 text-sm mt-1">
          Completa el formulario y te contactaremos pronto
        </p>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-foreground font-medium">
              Nombre Completo *
            </Label>
            <Input
              id="nombre"
              placeholder="Tu nombre"
              className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
              {...register("nombre")}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            {errors.nombre && (
              <p id="nombre-error" role="alert" className="text-sm text-destructive">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-foreground font-medium">
              Teléfono *
            </Label>
            <Input
              id="telefono"
              type="tel"
              placeholder="(123) 456-7890"
              className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
              {...register("telefono")}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : undefined}
            />
            {errors.telefono && (
              <p id="telefono-error" role="alert" className="text-sm text-destructive">
                {errors.telefono.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Correo Electrónico (opcional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Service */}
          <div className="space-y-2">
            <Label htmlFor="servicio" className="text-foreground font-medium">
              Servicio de Interés *
            </Label>
            <Select onValueChange={(value) => setValue("servicio", value)}>
              <SelectTrigger
                id="servicio"
                className="h-12 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                aria-invalid={!!errors.servicio}
                aria-describedby={errors.servicio ? "servicio-error" : undefined}
              >
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.servicio && (
              <p id="servicio-error" role="alert" className="text-sm text-destructive">
                {errors.servicio.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="mensaje" className="text-foreground font-medium">
              Mensaje (opcional)
            </Label>
            <Textarea
              id="mensaje"
              placeholder="Cuéntanos más sobre tu consulta..."
              rows={3}
              className="bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary resize-none"
              {...register("mensaje")}
              aria-invalid={!!errors.mensaje}
              aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            />
            {errors.mensaje && (
              <p id="mensaje-error" role="alert" className="text-sm text-destructive">
                {errors.mensaje.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                {shouldReduceMotion ? (
                  <PaperPlaneTilt className="size-5 mr-2" aria-hidden="true" />
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                    aria-hidden="true"
                  >
                    <PaperPlaneTilt className="size-5" />
                  </motion.div>
                )}
                Enviando...
              </>
            ) : (
              <>
                <PaperPlaneTilt className="size-5 mr-2" aria-hidden="true" />
                Enviar Mensaje
              </>
            )}
          </Button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
              className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200"
            >
              <CheckCircle className="size-5 shrink-0" weight="fill" aria-hidden="true" />
              <span className="text-sm">
                ¡Mensaje enviado! Te contactaremos pronto.
              </span>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              aria-live="assertive"
              className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200"
            >
              <WarningCircle className="size-5 shrink-0" weight="fill" aria-hidden="true" />
              <span className="text-sm">
                {errors.root?.message || "Hubo un error. Por favor intenta de nuevo o llámanos."}
              </span>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
