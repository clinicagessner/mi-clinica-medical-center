import {
  SITE_CONFIG,
  CONTACT_INFO,
  SOCIAL_LINKS,
  SERVICES,
  PROMOTIONS,
} from "@/lib/constants";
import { PAGE_DATES, SERVICE_DATES, SERVICES_LAST_REVIEWED } from "@/lib/content-dates";
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
    ...[...Object.values(PAGE_DATES), ...Object.values(SERVICE_DATES), SERVICES_LAST_REVIEWED].map((d) => new Date(d).getTime()),
    ...getAllPosts("en").map((p) => new Date(p.updated ?? p.date).getTime()),
  ];
  return new Date(Math.max(...dates)).toISOString().slice(0, 10);
}

function header(): string {
  return `# ${SITE_CONFIG.name}

> Hispanic primary care walk-in clinic at 1914 Gessner Rd Ste B, Houston, TX 77080 (Spring Branch, west Houston), with care in Spanish and English. Civil Surgeon for I-693 immigration medical exams. Open 7 days a week, 9 AM to 9 PM, walk-ins welcome, no health insurance required.

Last updated: ${lastUpdated()}

## Business Information

- Official Name: ${SITE_CONFIG.name}
- Also Known As: ${SITE_CONFIG.shortName}, Clínica Gessner
- Type: Hispanic Medical Clinic / Primary Care / Walk-in Clinic
- Address: ${CONTACT_INFO.address}
- Phone: ${CONTACT_INFO.phone}
- WhatsApp: [${CONTACT_INFO.whatsapp}](https://wa.me/${WHATSAPP_DIGITS})
- Website: [Spanish](${BASE}) / [English](${BASE}/en)
- Hours: Monday through Sunday, 9:00 AM to 9:00 PM (open 7 days a week)
- Appointments: Not required, walk-ins welcome; you can also call to reserve a time
- Insurance: Not required; self-pay clinic
- Payments: Cash, debit and credit cards (Visa, MasterCard, American Express, Discover), NFC mobile payments; no checks
- Languages: Spanish, English
- Parking: Free on-site parking
- Accessibility: Wheelchair-accessible entrance, parking and restroom
- [Google Maps](${CONTACT_INFO.googleMapsUrl})

## Key Facts

- Civil Surgeon for USCIS I-693 immigration medical exams
- DOT physicals for CDL drivers
- Staff that speaks Spanish through the whole visit
- Walk-ins welcome, open 7 days a week including Sundays, 9 AM to 9 PM
- No insurance needed; ask for the price of your service before your visit
- Medicines indicated during the consultation are handed out at the clinic, plus over-the-counter products
- Free parking and wheelchair-accessible facility
`;
}

function servicesShort(): string {
  const items = [...SERVICES]
    .sort((a, b) => a.order - b.order)
    .map((s) => {
      const c = enServices[s.slug];
      const esTitle = esServices[s.slug]?.title ?? s.title;
      return `### ${c?.title ?? s.title} (${esTitle})
${c?.description ?? ""}
URL: [Spanish](${BASE}/services/${s.slug}) | [English](${BASE}/en/services/${s.slug})`;
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

URL: [Spanish](${BASE}/services/${s.slug}) | [English](${BASE}/en/services/${s.slug})
Category: ${s.category}

${c?.description ?? ""}

${c?.longDescription ?? ""}

What's included:
${(c?.features ?? []).map((f) => `- ${f}`).join("\n")}

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

Limited-time packages published on the [promotions page](${BASE}/promociones) (prices subject to change; call to confirm before your visit).

${items.join("\n")}
`;
}

function immigrationProcess(): string {
  return `## Immigration Exam I-693 Process

Step 1: Walk in or call ${CONTACT_INFO.phone} to reserve a time
Step 2: Medical examination with the Civil Surgeon
Step 3: Vaccination record review and the vaccines USCIS requires
Step 4: Required laboratory tests
Step 5: Signed I-693 form in a sealed envelope once the results are in

Details: [I-693 immigration medical exam](${BASE}/services/examenes-inmigracion)
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
Published: ${p.date}${p.updated ? ` | Updated: ${p.updated}` : ""} | Author: ${p.author}
URL: [Spanish](${BASE}/blog/${p.slug}) | [English](${BASE}/en/blog/${p.slug})
${p.description}`;
    return full ? `${base}\n\n${p.content.trim()}` : base;
  });
  return `## Blog & Health Articles (${posts.length})\n\n${items.join(full ? "\n\n---\n\n" : "\n\n")}\n`;
}

function footer(): string {
  return `## Contact Information

- Phone: ${CONTACT_INFO.phone}
- [WhatsApp](https://wa.me/${WHATSAPP_DIGITS})
- Address: ${CONTACT_INFO.address}
- [Website](${BASE})
- [Online contact form](${BASE}/#contact)
- [Google Maps](${CONTACT_INFO.googleMapsUrl})
- [Leave a Google review](${CONTACT_INFO.googleReviewUrl})

## Social Media

- [Instagram](${SOCIAL_LINKS.instagram})
- [Facebook](${SOCIAL_LINKS.facebook})

## Service Area

Houston, TX, mainly the west and northwest side of the city: ${SERVICE_AREAS.join(", ")} and nearby communities.

## Additional Resources

- [All services](${BASE}/services)
- [Promotions](${BASE}/promociones)
- [Blog and health articles](${BASE}/blog)
- [Privacy policy](${BASE}/privacy)
- [Sitemap](${BASE}/sitemap.xml)
- [Full version of this file](${BASE}/llms-full.txt)
`;
}

export function buildLlmsTxt(): string {
  return [header(), servicesShort(), promotions(false), immigrationProcess(), faq(), blog(false), footer()].join("\n");
}

export function buildLlmsFullTxt(): string {
  return [header(), servicesFull(), promotions(true), immigrationProcess(), faq(), blog(true), footer()].join("\n");
}
