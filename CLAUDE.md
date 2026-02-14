# CLAUDE.md - Clínica Hispana Nueva Salud Gessner

## Proyecto

**Sitio web para Clínica Hispana Nueva Salud Gessner** - Clínica hispana en Houston, TX con servicios médicos en español.

**URL de producción:** https://clinicagessner.com
**Dominio alternativo:** https://miclinicamedicalcenter.com

---

## Tech Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 16.1.6 | Framework principal (App Router) |
| React | 19.2.3 | UI Library |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 4 | Estilos (CSS-first, @theme inline) |
| shadcn/ui | latest | Componentes UI (New York style) |
| next-intl | 4.8.2 | Internacionalización ES/EN |
| React Hook Form | 7.71+ | Manejo de formularios |
| Zod | 4.3+ | Validación de schemas |
| Framer Motion | 12.31+ | Animaciones |
| Resend | 6.9+ | Envío de emails |
| React Email | 2.0+ | Templates de email |
| Embla Carousel | 8.6+ | Carruseles (testimonios, promociones) |
| Phosphor Icons | 2.1+ | Iconografía principal |
| Health Icons | 3.5+ | Iconos médicos especializados |
| Lucide React | 0.563+ | Iconos complementarios |
| sharp | 0.34+ | Optimización de imágenes |

---

## Reglas Criticas

### No Co-Autoría de IA en Commits

```
NUNCA agregar "Co-Authored-By" de ninguna IA en los commits.
NUNCA mencionar que el código fue generado por IA.
Los commits deben parecer escritos 100% por el desarrollador humano.
```

### Formato de Commits

```bash
# Formato estándar
<type>(<scope>): <description>

# Types válidos
feat:     Nueva funcionalidad
fix:      Bug fix
docs:     Documentación
style:    Formateo (no afecta lógica)
refactor: Refactoring
perf:     Performance
test:     Tests
chore:    Mantenimiento
```

---

## Información del Negocio

### Datos de Contacto (NAP)

```
Nombre:    Clínica Hispana Nueva Salud Gessner
Dirección: 1914 Gessner Rd B, Houston, TX 77080
Teléfono:  +1 (346) 226-5820
Horario:   Lunes a Domingo: 9:00 AM - 9:00 PM
```

### Redes Sociales

- **Instagram:** @miclinicamedicalcenter
- **Facebook:** Clinica Hispana Nueva Salud Gessner

### Google Place ID

```
ChIJtTabmd7EQIYRd2cADSAUndw
```

### Servicios Médicos (18 servicios)

**Especiales:** Medicina Familiar, Exámenes de Inmigración (I-693), Chequeos Médicos
**Especialidades:** Ginecología, Pediatría, Dermatología, Cardiología
**Diagnóstico:** Laboratorio Clínico, Ultrasonidos, Rayos X
**Salud de la Mujer:** Ginecología, Planificación Familiar
**Otros:** Alergias, Diabetes, Hipertensión, Infecciones, Dolores, Nutrición, Salud Mental, Vacunas

---

## Variables de Entorno

```bash
# .env.local (requeridas)
GOOGLE_PLACES_API_KEY=    # API key de Google Places para reviews
GOOGLE_PLACE_ID=          # Place ID de la clínica en Google Maps
RESEND_API_KEY=           # API key de Resend para envío de emails
```

---

## Arquitectura del Proyecto

### Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (minimal, importa globals.css)
│   ├── globals.css                 # Tailwind + CSS variables del tema
│   ├── sitemap.ts                  # Sitemap dinámico (servicios + blog + locales)
│   ├── robots.ts                   # robots.txt
│   ├── actions/
│   │   └── send-contact-email.ts   # Server action: Resend + Zod validation
│   └── [locale]/                   # Routing dinámico por idioma (ES/EN)
│       ├── layout.tsx              # Locale layout (html lang, fonts, i18n provider)
│       ├── page.tsx                # Homepage (secciones con dynamic imports)
│       ├── error.tsx               # Error boundary
│       ├── not-found.tsx           # 404
│       ├── services/
│       │   ├── page.tsx            # Grid de servicios con filtrado
│       │   └── [slug]/page.tsx     # Detalle de servicio individual
│       └── blog/
│           ├── page.tsx            # Listado de artículos
│           └── [slug]/page.tsx     # Artículo individual
│
├── components/
│   ├── ui/                         # shadcn/ui (accordion, badge, button, card,
│   │                               #   carousel, input, label, select, sheet,
│   │                               #   skeleton, textarea, tooltip)
│   ├── layout/
│   │   ├── header.tsx              # Nav + mobile menu + language switcher
│   │   ├── footer.tsx              # Links, contacto, redes sociales
│   │   ├── floating-buttons.tsx    # Botones flotantes (teléfono/WhatsApp)
│   │   ├── scroll-to-top.tsx       # Botón scroll to top
│   │   ├── language-switcher.tsx   # Toggle ES/EN
│   │   └── tooltip-link.tsx        # Link con tooltip reutilizable
│   ├── sections/                   # Secciones del homepage
│   │   ├── hero.tsx                # Hero con rating de Google
│   │   ├── services.tsx            # Grid de servicios destacados
│   │   ├── promotions.tsx          # Tarjetas de promociones
│   │   ├── testimonials.tsx        # Sección de testimonios Google
│   │   ├── testimonials-carousel.tsx # Carousel de testimonios
│   │   ├── green-card.tsx          # Sección I-693 inmigración
│   │   ├── location.tsx            # Mapa y horarios
│   │   ├── contact.tsx             # Sección de formulario
│   │   └── faq.tsx                 # FAQ accordion
│   ├── services/
│   │   └── services-page-content.tsx # Contenido con filtrado de servicios
│   ├── forms/
│   │   └── contact-form.tsx        # RHF + Zod + server action
│   └── seo/
│       ├── json-ld.tsx             # Schema MedicalClinic (@graph)
│       └── json-ld-reviews.tsx     # Schema de reviews
│
├── emails/
│   └── contact-email.tsx           # Template React Email
│
├── i18n/
│   ├── config.ts                   # Locales: ["es", "en"], default: "es"
│   ├── request.ts                  # getRequestConfig para next-intl
│   └── navigation.ts              # createNavigation helpers (Link, redirect, etc.)
│
├── lib/
│   ├── constants.ts                # Datos estáticos (SERVICES, FAQS, CONTACT_INFO, BLOG_POSTS, etc.)
│   ├── validations.ts              # Schemas Zod (contactForm)
│   ├── utils.ts                    # cn(), formatPhone(), helpers
│   └── google-reviews.ts           # Google Places API + unstable_cache (24h)
│
├── messages/
│   ├── es.json                     # Traducciones español (~24KB)
│   └── en.json                     # Traducciones inglés (~22KB)
│
├── types/
│   └── index.ts                    # Service, Promotion, FAQ, ContactInfo, BlogPost, etc.
│
└── proxy.ts                        # Middleware next-intl
```

### Routing e Internacionalización

```
Español (default, sin prefijo):
/                          → Homepage
/services                  → Lista de servicios
/services/[slug]           → Detalle de servicio
/blog                      → Blog
/blog/[slug]               → Artículo

Inglés (prefijo /en):
/en                        → Homepage
/en/services               → Services list
/en/services/[slug]        → Service detail
/en/blog                   → Blog
/en/blog/[slug]            → Blog post
```

**Traducciones:** Usar `getTranslations()` en Server Components, `useTranslations()` en Client Components. Namespace keys anidados en `messages/es.json` y `messages/en.json`.

---

## Paleta de Colores (Verde Monocromático)

```css
:root {
  /* Verde - Color Principal (CTAs y Acciones) */
  --green-dark: #166534;
  --green-primary: #15803D;
  --green-medium: #16A34A;
  --green-light: #DCFCE7;
  --green-bg: #F0FDF4;
  --green-bg-alt: #ECFDF5;
  --green-warm: #F7FDF9;       /* Fondo principal del sitio */

  /* Teal - Color Secundario */
  --teal-dark: #115E59;
  --teal-primary: #0D9488;
  --teal-light: #CCFBF1;

  /* shadcn/ui tokens mapeados a la paleta verde */
  --primary: #166534;           /* CTAs */
  --secondary: #0F766E;         /* Headers/destacados */
  --background: #F7FDF9;        /* Fondo general */
  --foreground: #1F2937;        /* Texto principal */
  --muted: #F0FDF4;
  --accent: #DCFCE7;
}
```

### Tipografía

- **Headings:** Poppins (`--font-poppins`)
- **Body:** Inter (`--font-inter`)

### Uso de Colores

```typescript
// SIEMPRE usar variables CSS via Tailwind
className="bg-primary text-primary-foreground"
className="bg-green-dark text-white"
className="text-teal-primary"

// NUNCA hardcodear hex
className="bg-[#166534]"  // ❌
```

---

## Reglas de Desarrollo

### SIEMPRE

1. **Server Components por defecto** - Solo `'use client'` cuando hay useState/useEffect/event handlers/browser APIs
2. **Imports directos** de shadcn/ui (nunca barrel imports)
3. **Validar con Zod** antes de enviar datos (client + server)
4. **next/image** para todas las imágenes, con alt text descriptivo
5. **Promise.all** para data fetching paralelo
6. **Mobile-first** en Tailwind (`w-full md:w-[800px]`)
7. **Loading states** en botones y formularios
8. **CSS variables** para colores del tema
9. **next-intl** para todo texto visible al usuario (usar translation keys)
10. **Reduced motion** support en animaciones con Framer Motion

### NUNCA

1. `'use client'` sin necesidad real
2. Waterfalls de datos (fetch secuencial cuando puede ser paralelo)
3. Barrel imports (`import { Button, Card } from '@/components/ui'`)
4. Hardcodear colores hex en clases
5. Usar `<img>` nativo (usar next/image)
6. Omitir alt text en imágenes
7. Textos hardcodeados (usar translation keys de next-intl)
8. `forwardRef` en React 19 (usar ref directamente como prop)
9. `tailwind.config.ts` en Tailwind v4 (usar `@theme inline` en globals.css)
10. Agregar `Co-Authored-By` de IA en commits

---

## Orden de Imports

```typescript
// 1. React/Next
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// 3. Icons
import { Phone, MapPin } from '@phosphor-icons/react';
import { Stethoscope } from 'healthicons-react/outline';

// 4. UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 5. Local components
import { ContactForm } from '@/components/forms/contact-form';

// 6. Utilities
import { cn } from '@/lib/utils';

// 7. Types
import type { Service } from '@/types';

// 8. Constants
import { SERVICES, CONTACT_INFO } from '@/lib/constants';
```

---

## Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Archivos/Carpetas | kebab-case | `contact-form.tsx` |
| Componentes | PascalCase | `ContactForm` |
| Variables | camelCase | `isSubmitting` |
| Constantes | SCREAMING_SNAKE | `CONTACT_INFO` |
| Hooks | useCamelCase | `useContactForm` |
| Types/Interfaces | PascalCase | `ServiceType` |
| Translation keys | dot.notation | `hero.title`, `serviceData.medicina-familiar.title` |

---

## SEO y Schema Markup

### Keywords Objetivo (SEO Local - Houston, TX)

- "clínica hispana Houston"
- "médico en español Houston"
- "examen Green Card Houston"
- "I-693 civil surgeon Houston"
- "medicina familiar clínica hispana"
- "ginecología en español Houston"
- "doctor cerca de mi Houston"

### Schemas JSON-LD Implementados

| Schema | Página | Componente |
|--------|--------|------------|
| MedicalClinic + MedicalBusiness (@graph) | Homepage | `json-ld.tsx` |
| FAQPage | Homepage (FAQ section) | `json-ld.tsx` |
| Service | Cada `/services/[slug]` | `json-ld.tsx` |
| BreadcrumbList | Todas las páginas internas | `json-ld.tsx` |
| BlogPosting | Cada `/blog/[slug]` | `json-ld.tsx` |
| AggregateRating | Homepage | `json-ld-reviews.tsx` |

### Metadata por Página

```typescript
// Server Components: metadata estática o generateMetadata()
export const metadata: Metadata = {
  title: 'Servicios | Clínica Hispana Nueva Salud Gessner',
  description: '...',
  alternates: {
    canonical: 'https://clinicagessner.com/services',
    languages: { en: '/en/services', es: '/services' },
  },
};
```

### Core Web Vitals (Objetivos)

| Métrica | Objetivo |
|---------|----------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |

---

## Google Places API Integration

```typescript
// src/lib/google-reviews.ts
// Usa unstable_cache() con revalidación cada 24 horas
// Fallback data definido en caso de error de API
// Requiere: GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID en .env.local
```

---

## Formulario de Contacto (Flujo)

```
ContactForm (Client Component)
  → React Hook Form + Zod (validación client-side)
  → Server Action: sendContactEmail()
    → Zod safeParse (validación server-side)
    → Resend API (envío de email)
    → React Email template (contact-email.tsx)
    → Response: { success: boolean, message: string }
```

---

## Performance Best Practices

### Eliminar Waterfalls

```typescript
// SIEMPRE paralelo para datos independientes
const [services, testimonials, faqs] = await Promise.all([
  getServices(),
  getTestimonials(),
  getFAQs()
]);
```

### Code Splitting

```typescript
// Homepage: dynamic imports para secciones below-the-fold
import dynamic from 'next/dynamic';

const Promotions = dynamic(() => import('@/components/sections/promotions'));
const FAQ = dynamic(() => import('@/components/sections/faq'));
```

### Bundle Size

```typescript
// Imports directos siempre
import { Button } from '@/components/ui/button';

// next/dynamic para componentes pesados
// React.cache() para deduplicar fetches en server
```

### Re-renders

```typescript
// Hoisted defaults para evitar re-renders
const DEFAULT_ITEMS: string[] = [];
function Component({ items = DEFAULT_ITEMS }) { ... }

// useReducedMotion de Framer Motion para accessibility
```

---

## Accessibility (WCAG 2.1 AA)

### Reglas Principales

- Todos los botones con iconos necesitan `aria-label`
- Iconos decorativos llevan `aria-hidden="true"`
- Formularios con `aria-invalid` y `aria-describedby` para errores
- Focus visible con `outline: 2px solid var(--primary)`
- Contraste mínimo texto: 4.5:1, iconos/UI: 3:1
- Respetar `prefers-reduced-motion`
- Modales: focus trap, Escape para cerrar, restaurar focus al cerrar

---

## Checklist Pre-Deploy

- [ ] `npm run build` exitoso sin errores
- [ ] Sin `console.log` en producción
- [ ] Todas las imágenes con `alt` descriptivo
- [ ] Metadata configurada en todas las páginas
- [ ] Schema JSON-LD validado (Google Rich Results Test)
- [ ] Core Web Vitals dentro de umbrales
- [ ] Accesibilidad WCAG 2.1 AA verificada
- [ ] Formulario validado client + server
- [ ] URLs canónicas y alternates de idioma correctos
- [ ] Sitemap y robots.txt funcionando
- [ ] Variables de entorno documentadas y configuradas
- [ ] Traducciones completas en es.json y en.json
