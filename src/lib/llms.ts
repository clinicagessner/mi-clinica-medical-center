import {
  SITE_CONFIG,
  CONTACT_INFO,
  SOCIAL_LINKS,
  SERVICES,
  PROMOTIONS,
  CONTENT_LAST_MODIFIED,
} from "@/lib/constants";
import { SERVICE_FAQS } from "@/lib/service-faqs";
import { getAllPosts } from "@/lib/blog";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

/**
 * Genera /llms.txt y /llms-full.txt desde los mismos datos que renderizan el
 * sitio (servicios, promociones, FAQs, blog, contacto). Así nunca quedan
 * desactualizados respecto a lo que ve un paciente. Idioma principal: inglés
 * (es el que mejor procesan los motores de IA), con los títulos en español.
 */

type ServiceCopy = { title: string; description: string; longDescription: string; features: string[] };
const enServices = en.serviceData as Record<string, ServiceCopy>;
const esServices = es.serviceData as Record<string, ServiceCopy>;
const enFaq = en.faq as Record<string, string>;

const BASE = SITE_CONFIG.baseUrl;
const WHATSAPP_DIGITS = CONTACT_INFO.whatsapp.replace(/\D/g, "");

// Zonas listadas en la sección "Áreas que servimos" de cada página de servicio.
const SERVICE_AREAS = [
  "Spring Branch",
  "Spring Branch West",
  "Hedwig Village",
  "Memorial",
  "Spring Shadows",
  "Long Point",
  "Carverdale",
  "Fairbanks",
];

function lastUpdated(): string {
  const dates = [
    ...Object.values(CONTENT_LAST_MODIFIED).map((d) => d.getTime()),
    ...getAllPosts("en").map((p) => new Date(p.date).getTime()),
  ];
  return new Date(Math.max(...dates)).toISOString().slice(0, 10);
}

function header(): string {
  return `# ${SITE_CONFIG.name}

> Hispanic primary care medical clinic in Houston, Texas (Spring Branch area) providing healthcare 100% in Spanish, also in English. USCIS-authorized Civil Surgeon for I-693 immigration medical exams. Open 7 days a week, 9 AM to 9 PM, walk-ins welcome, no health insurance required, affordable self-pay pricing starting at $50.

Last updated: ${lastUpdated()}

## Business Information

- Official Name: ${SITE_CONFIG.name}
- Also Known As: ${SITE_CONFIG.shortName}, Clínica Hispana Houston, Clínica Gessner
- Type: Hispanic Medical Clinic / Primary Care / Walk-in Clinic
- Address: ${CONTACT_INFO.address}
- Phone: ${CONTACT_INFO.phone}
- WhatsApp: ${CONTACT_INFO.whatsapp} (https://wa.me/${WHATSAPP_DIGITS})
- Website: ${BASE} (Spanish) / ${BASE}/en (English)
- Hours: Monday through Sunday, 9:00 AM to 9:00 PM (open 7 days a week)
- Appointments: Not required, walk-ins welcome; call to reserve a time
- Insurance: Not required; self-pay clinic with transparent pricing
- Payments: Cash, debit and credit cards (Visa, MasterCard, American Express, Discover), NFC mobile payments; no checks
- Languages: Spanish (primary), English
- Parking: Free on-site parking
- Accessibility: Wheelchair-accessible entrance, parking and restroom
- Google Maps: ${CONTACT_INFO.googleMapsUrl}

## Certifications & Authorizations

- USCIS Authorized Clinic for Immigration Medical Exams
- Certified Civil Surgeon on staff for I-693 forms
- DOT Certified Medical Examiner for CDL physicals
- HIPAA Compliant facility
- Licensed medical professionals

## Key Differentiators

- 100% Spanish-speaking staff - entire process in your language
- Walk-ins welcome - no appointment required
- Open 7 days a week including Sundays, 9 AM to 9 PM
- Affordable pricing - general consultations starting at $50
- Payment plans available for qualifying patients
- Uninsured patients welcome with special pricing
- Results in 3-5 business days for I-693 exams
- In-clinic pharmacy: prescriptions filled right after the visit
- Free parking and wheelchair accessible facility
`;
}

function servicesShort(): string {
  const items = [...SERVICES]
    .sort((a, b) => a.order - b.order)
    .map((s) => {
      const c = enServices[s.slug];
      const esTitle = esServices[s.slug]?.title ?? s.title;
      return `### ${c?.title ?? s.title} (${esTitle})
${c?.description ?? s.description}
URL: ${BASE}/services/${s.slug} (Spanish) | ${BASE}/en/services/${s.slug} (English)`;
    });
  return `## Medical Services Offered (${SERVICES.length})\n\n${items.join("\n\n")}\n`;
}

function servicesFull(): string {
  const items = [...SERVICES]
    .sort((a, b) => a.order - b.order)
    .map((s) => {
      const c = enServices[s.slug];
      const esTitle = esServices[s.slug]?.title ?? s.title;
      const faqs = (SERVICE_FAQS[s.slug] ?? [])
        .map((f) => `Q: ${f.questionEn}\nA: ${f.answerEn}`)
        .join("\n\n");
      return `### ${c?.title ?? s.title} (${esTitle})

URL: ${BASE}/services/${s.slug} (Spanish) | ${BASE}/en/services/${s.slug} (English)
Category: ${s.category}

${c?.description ?? s.description}

${c?.longDescription ?? s.longDescription}

What's included:
${(c?.features ?? s.features).map((f) => `- ${f}`).join("\n")}

${faqs ? `Frequently asked questions:\n\n${faqs}` : ""}`;
    });
  return `## Medical Services Offered (${SERVICES.length})\n\n${items.join("\n\n---\n\n")}\n`;
}

function promotions(full: boolean): string {
  const items = PROMOTIONS.map((p) => {
    const price = p.price ? ` - ${p.price}` : "";
    const base = `- ${p.titleEn} (${p.title})${price}: ${p.includesEn.join(", ")}`;
    return full ? `${base}\n  ${p.blurbEn}` : base;
  });
  return `## Current Promotions

Limited-time packages published at ${BASE}/promociones (prices subject to change; call to confirm before your visit).

${items.join("\n")}
`;
}

function immigrationProcess(): string {
  return `## Immigration Exam I-693 Process

Step 1: Schedule or Walk In - Call ${CONTACT_INFO.phone} or visit without appointment
Step 2: Medical Examination - Complete physical exam with certified Civil Surgeon
Step 3: Vaccinations - Verification and administration of USCIS-required vaccines
Step 4: Laboratory Tests - Required blood work and screening tests
Step 5: Documentation - Receive sealed and signed I-693 form in 3-5 business days

What's included: Certified Civil Surgeon evaluation, completed I-693 form, physical examination, required blood tests, vaccine history review, all documentation in Spanish.
Details: ${BASE}/services/examenes-inmigracion
`;
}

function faq(): string {
  const items: string[] = [];
  for (let i = 1; enFaq[`q${i}`]; i++) {
    items.push(`Q: ${enFaq[`q${i}`]}\nA: ${enFaq[`a${i}`]}`);
  }
  return `## Frequently Asked Questions\n\n${items.join("\n\n")}\n`;
}

function blog(full: boolean): string {
  const posts = getAllPosts("en");
  const items = posts.map((p) => {
    const base = `### ${p.title}
Published: ${p.date} | Author: ${p.author}
URL: ${BASE}/blog/${p.slug} (Spanish) | ${BASE}/en/blog/${p.slug} (English)
${p.description}`;
    return full ? `${base}\n\n${p.content.trim()}` : base;
  });
  return `## Blog & Health Articles (${posts.length})\n\n${items.join(full ? "\n\n---\n\n" : "\n\n")}\n`;
}

function footer(): string {
  return `## Contact Information

- Phone: ${CONTACT_INFO.phone}
- WhatsApp: https://wa.me/${WHATSAPP_DIGITS}
- Address: ${CONTACT_INFO.address}
- Website: ${BASE}
- Online Appointment Request: ${BASE}/#contact
- Google Maps: ${CONTACT_INFO.googleMapsUrl}
- Leave a Google Review: ${CONTACT_INFO.googleReviewUrl}

## Social Media

- Instagram: ${SOCIAL_LINKS.instagram}
- Facebook: ${SOCIAL_LINKS.facebook}

## Service Area

Houston, TX, mainly the west and northwest side of the city: ${SERVICE_AREAS.join(", ")} and nearby communities.

## Additional Resources

- All Services: ${BASE}/services
- Promotions: ${BASE}/promociones
- Blog & Health Articles: ${BASE}/blog
- Privacy Policy (HIPAA): ${BASE}/privacy
- Sitemap: ${BASE}/sitemap.xml
- Full version of this file: ${BASE}/llms-full.txt
`;
}

export function buildLlmsTxt(): string {
  return [header(), servicesShort(), promotions(false), immigrationProcess(), faq(), blog(false), footer()].join("\n");
}

export function buildLlmsFullTxt(): string {
  return [header(), servicesFull(), promotions(true), immigrationProcess(), faq(), blog(true), footer()].join("\n");
}
