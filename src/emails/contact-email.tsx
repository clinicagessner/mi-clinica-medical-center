import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  nombre: string;
  telefono: string;
  email?: string;
  servicio: string;
  mensaje?: string;
}

export function ContactEmail({
  nombre,
  telefono,
  email,
  servicio,
  mensaje,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nueva solicitud de cita - {servicio}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Nueva Solicitud de Cita</Heading>
            <Text style={headerSubtitle}>Clínica Hispana Nueva Salud Gessner</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading as="h2" style={sectionTitle}>
              Información del Paciente
            </Heading>

            {/* Nombre */}
            <Section style={row}>
              <Text style={label}>Nombre:</Text>
              <Text style={value}>{nombre}</Text>
            </Section>

            {/* Teléfono */}
            <Section style={row}>
              <Text style={label}>Teléfono:</Text>
              <Link href={`tel:${telefono.replace(/\D/g, "")}`} style={link}>
                {telefono}
              </Link>
            </Section>

            {/* Email */}
            <Section style={row}>
              <Text style={label}>Email:</Text>
              {email ? (
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              ) : (
                <Text style={valueLight}>No proporcionado</Text>
              )}
            </Section>

            {/* Servicio */}
            <Section style={row}>
              <Text style={label}>Servicio:</Text>
              <Text style={valueBold}>{servicio}</Text>
            </Section>

            {/* Mensaje */}
            {mensaje && (
              <>
                <Hr style={divider} />
                <Heading as="h3" style={messageTitle}>
                  Mensaje:
                </Heading>
                <Section style={messageBox}>
                  <Text style={messageText}>{mensaje}</Text>
                </Section>
              </>
            )}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este mensaje fue enviado desde el formulario de contacto de
            </Text>
            <Link href="https://clinicagessner.com" style={footerLink}>
              clinicagessner.com
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#16A34A",
  padding: "30px 40px",
  borderRadius: "8px 8px 0 0",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 5px 0",
};

const headerSubtitle = {
  color: "#bbf7d0",
  fontSize: "14px",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "30px 40px",
};

const sectionTitle = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 20px 0",
};

const row = {
  marginBottom: "15px",
};

const label = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px 0",
};

const value = {
  color: "#1f2937",
  fontSize: "16px",
  margin: "0",
};

const valueBold = {
  color: "#16A34A",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
};

const valueLight = {
  color: "#9ca3af",
  fontSize: "16px",
  fontStyle: "italic" as const,
  margin: "0",
};

const link = {
  color: "#16A34A",
  fontSize: "16px",
  textDecoration: "none",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "25px 0",
};

const messageTitle = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 10px 0",
};

const messageBox = {
  backgroundColor: "#f9fafb",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const messageText = {
  color: "#4b5563",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  backgroundColor: "#1f2937",
  padding: "25px 40px",
  borderRadius: "0 0 8px 8px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "13px",
  margin: "0 0 5px 0",
};

const footerLink = {
  color: "#16A34A",
  fontSize: "13px",
  textDecoration: "none",
};

export default ContactEmail;
