"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { ContactEmail } from "@/emails/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = "miclinicamedicalcenter@gmail.com";
const SENDER_EMAIL = "Clínica Hispana Nueva Salud Gessner <noreply@clinicagessner.com>";

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function sendContactEmail(
  formData: ContactFormData
): Promise<ActionResponse> {
  // Validate form data on server
  const result = contactFormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Datos del formulario inválidos. Por favor revisa los campos.",
    };
  }

  const { nombre, telefono, email, servicio, mensaje } = result.data;

  try {
    const { error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `Nueva solicitud de cita - ${servicio}`,
      react: ContactEmail({
        nombre,
        telefono,
        email: email || undefined,
        servicio,
        mensaje: mensaje || undefined,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Error al enviar el mensaje. Por favor intenta de nuevo.",
      };
    }

    return {
      success: true,
      message: "¡Mensaje enviado! Te contactaremos pronto.",
    };
  } catch (error) {
    console.error("Send email error:", error);
    return {
      success: false,
      message: "Error al enviar el mensaje. Por favor intenta de nuevo o llámanos.",
    };
  }
}
