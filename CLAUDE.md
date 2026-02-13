# CLAUDE.md - Clínica Hispana Nueva Salud Gessner

## Proyecto

**Sitio web para Clínica Hispana Nueva Salud Gessner** - Clínica hispana en Houston, TX con servicios médicos en español.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Zod, React Hook Form, Framer Motion, Phosphor Icons, Health Icons

---

## ⛔ REGLAS CRÍTICAS

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

## 1. VERCEL REACT BEST PRACTICES

### 1.1 Eliminar Waterfalls (CRÍTICO)

```typescript
// ❌ MAL - Waterfall secuencial
const user = await getUser();
const posts = await getPosts(user.id);
const comments = await getComments(posts[0].id);

// ✅ BIEN - Paralelo con Promise.all
const [user, posts] = await Promise.all([
  getUser(),
  getPosts()
]);
```

**Reglas async:**
- Posicionar `await` solo donde se consume el valor
- Usar `Promise.all()` para operaciones independientes
- Usar Suspense para streaming de contenido
- En API routes: iniciar promises temprano, await al final

### 1.2 Bundle Size (CRÍTICO)

```typescript
// ❌ MAL - Barrel imports
import { Button, Card, Input } from '@/components/ui';

// ✅ BIEN - Imports directos
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

**Reglas bundle:**
- Usar `next/dynamic` para code splitting
- Cargar analytics/logging post-hidratación
- Precargar recursos en hover/focus
- Cargar features condicionalmente

### 1.3 Server-Side Performance (ALTO)

```typescript
// ✅ Usar React.cache() para deduplicación por request
import { cache } from 'react';

export const getUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } });
});
```

**Reglas server:**
- Autenticar server actions como API routes
- Usar `React.cache()` para deduplicación
- Reducir datos serializados a client components
- Usar `after()` para operaciones en background

### 1.4 Re-renders (MEDIO)

```typescript
// ❌ MAL - Default props no primitivos
function Component({ items = [] }) { ... }

// ✅ BIEN - Hoisted defaults
const DEFAULT_ITEMS: string[] = [];
function Component({ items = DEFAULT_ITEMS }) { ... }
```

**Reglas re-render:**
- No suscribirse a state usado solo en callbacks
- Extraer cálculos costosos a componentes memoizados
- Usar valores primitivos en dependencias de effects
- Usar `startTransition` para updates diferidos
- Usar refs para valores que cambian frecuentemente

### 1.5 JavaScript Performance

```typescript
// ✅ Usar Set/Map para lookups O(1)
const validIds = new Set(items.map(i => i.id));
if (validIds.has(targetId)) { ... }

// ✅ Cachear resultados de funciones
const expensiveResult = cache(() => computeExpensive());
```

---

## 2. NEXT.JS BEST PRACTICES

### 2.1 File Conventions

```
app/
├── page.tsx           # Página
├── layout.tsx         # Layout
├── loading.tsx        # Loading UI
├── error.tsx          # Error boundary
├── not-found.tsx      # 404
├── route.ts           # API Route
└── [slug]/            # Dynamic route
```

### 2.2 RSC Boundaries

```typescript
// ❌ MAL - Async client component (inválido)
'use client';
export default async function Component() { ... }

// ✅ BIEN - Server component async
export default async function Component() {
  const data = await fetchData();
  return <ClientChild data={data} />;
}
```

**Reglas RSC:**
- `params` y `searchParams` son async en Next.js 15+
- `cookies()` y `headers()` son funciones async
- Props deben ser serializables entre server/client

### 2.3 Data Patterns

```typescript
// ✅ Eliminar waterfalls con Promise.all
export default async function Page() {
  const [services, testimonials, faqs] = await Promise.all([
    getServices(),
    getTestimonials(),
    getFAQs()
  ]);

  return <HomePage services={services} testimonials={testimonials} faqs={faqs} />;
}
```

### 2.4 Image Optimization

```typescript
// ✅ SIEMPRE usar next/image
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Clínica Hispana Nueva Salud Gessner - Clínica hispana en Houston"
  width={200}
  height={200}
  priority // Para LCP images
/>
```

**Reglas imágenes:**
- NUNCA usar `<img>` nativo
- Configurar remote sources explícitamente
- Usar `sizes` responsive
- Añadir blur placeholders
- Priorizar imágenes LCP

### 2.5 Metadata

```typescript
// ✅ Metadata estática
export const metadata: Metadata = {
  title: 'Clínica Hispana Nueva Salud Gessner | Clínica Hispana Houston',
  description: 'Clínica hispana en Houston, TX. Atención médica en español.',
};

// ✅ Metadata dinámica
export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await getService(params.slug);
  return {
    title: `${service.title} | Clínica Hispana Nueva Salud Gessner`,
    description: service.description,
  };
}
```

### 2.6 Error Handling

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Algo salió mal</h2>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  );
}
```

---

## 3. SHADCN/UI GUIDELINES

### 3.1 Principios Core

- shadcn/ui NO es un paquete npm - son componentes que copias
- Los componentes son TUYOS para personalizar
- Usar path aliases (@/components, @/lib)

### 3.2 Instalación de Componentes

```bash
# Instalar componentes individuales según necesidad
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

### 3.3 Patrones de Componentes

```typescript
// ✅ Button con variantes
<Button variant="default" size="lg">
  Agendar Cita
</Button>

// ✅ Form con React Hook Form + Zod
<Form {...form}>
  <FormField
    control={form.control}
    name="nombre"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Nombre</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### 3.4 Client Components

```typescript
// ✅ Componentes interactivos necesitan 'use client'
'use client';

import { Button } from '@/components/ui/button';

export function InteractiveComponent() {
  const [open, setOpen] = useState(false);
  return <Button onClick={() => setOpen(true)}>Click</Button>;
}
```

---

## 4. TAILWIND CSS v4 DESIGN SYSTEM

### 4.1 CSS-First Configuration

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.55 0.2 25);
  --color-secondary: oklch(0.45 0.15 250);
  --color-success: oklch(0.6 0.15 145);

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

### 4.2 Dark Mode

```css
@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(0.15 0.01 250);
  --color-foreground: oklch(0.95 0.01 250);
}
```

### 4.3 Component Architecture

```typescript
// ✅ Patrón: Base → Variants → Sizes → States
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### 4.4 Best Practices

```typescript
// ✅ HACER
- Usar @theme blocks para configuración
- Componer variantes con CVA
- Implementar tokens de color semánticos
- Usar size-* en lugar de h-* w-* separados

// ❌ NO HACER
- No usar tailwind.config.ts en v4
- No hardcodear colores en clases
- No omitir dark mode
- No usar forwardRef en React 19
```

---

## 5. SEO AUDIT GUIDELINES

### 5.1 Prioridad de Auditoría

1. **Crawlability & Indexación** - ¿Pueden los buscadores descubrir el sitio?
2. **Fundamentos Técnicos** - ¿Performance optimizado?
3. **On-Page** - ¿Páginas optimizadas para keywords?
4. **Calidad de Contenido** - ¿El contenido merece rankear?
5. **Autoridad & Links** - ¿Tiene señales de credibilidad?

### 5.2 Core Web Vitals (Objetivos)

| Métrica | Objetivo |
|---------|----------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |

### 5.3 Title Tags

```typescript
// ✅ Reglas para titles
- Único por página
- Keyword principal cerca del inicio
- 50-60 caracteres
- Nombre de marca al final

// Ejemplo
"Ginecología en Español Houston | Clínica Hispana Nueva Salud Gessner"
```

### 5.4 Meta Descriptions

```typescript
// ✅ Reglas para descriptions
- Único por página
- 150-160 caracteres
- Incluir keyword principal
- Propuesta de valor clara
- Call-to-action

// Ejemplo
"Atención ginecológica 100% en español en Houston, TX. Doctores certificados, precios accesibles. Agenda tu cita hoy. ☎️ (346) 226-5820"
```

### 5.5 Heading Structure

```html
<!-- ✅ Estructura correcta -->
<h1>Clínica Hispana en Houston - Clínica Hispana Nueva Salud Gessner</h1>
  <h2>Nuestros Servicios</h2>
    <h3>Ginecología</h3>
    <h3>Pediatría</h3>
  <h2>Testimonios</h2>
  <h2>Contacto</h2>
```

### 5.6 SEO Local (Crítico para clínica)

- NAP consistente (Name, Address, Phone)
- Schema LocalBusiness implementado
- Google Business Profile optimizado
- Keywords locales: "clínica hispana Houston", "médico español cerca de mi"

---

## 6. SCHEMA MARKUP GUIDELINES

### 6.1 Formato JSON-LD

```typescript
// ✅ Siempre usar JSON-LD (recomendado por Google)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Clínica Hispana Nueva Salud Gessner",
  "url": "https://miclinicamedicalcenter.com",
  "telephone": "+1-346-226-5820",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1914 Gessner Rd B",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77080"
  }
}
</script>
```

### 6.2 Schemas Requeridos para este Proyecto

| Schema | Página | Campos Requeridos |
|--------|--------|-------------------|
| MedicalClinic | Homepage | name, url, telephone, address |
| MedicalBusiness | Homepage | priceRange, openingHours |
| FAQPage | Sección FAQ | mainEntity (array Q&A) |
| Service | Cada servicio | name, description, provider |
| BreadcrumbList | Todas | itemListElement |

### 6.3 Validación

- Google Rich Results Test
- Schema.org Validator
- Search Console Enhancements

---

## 7. ACCESSIBILITY (WCAG)

### 7.1 Nombres Accesibles (CRÍTICO)

```typescript
// ❌ MAL - Botón sin nombre accesible
<button><Phone /></button>

// ✅ BIEN - Con aria-label
<button aria-label="Llamar a la clínica">
  <Phone aria-hidden="true" />
</button>

// ✅ BIEN - Con texto visible
<button>
  <Phone aria-hidden="true" />
  <span>Llamar</span>
</button>
```

### 7.2 Acceso por Teclado (CRÍTICO)

```typescript
// ❌ MAL - div como botón
<div onClick={handleClick}>Click me</div>

// ✅ BIEN - elemento nativo
<button onClick={handleClick}>Click me</button>

// ✅ Si necesitas div, añade soporte completo
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

### 7.3 Focus & Dialogs (CRÍTICO)

```typescript
// ✅ Reglas para modales/dialogs
- Focus debe quedar atrapado dentro del modal
- Restaurar focus al trigger al cerrar
- Escape debe cerrar el modal
- Establecer focus inicial dentro del dialog
```

### 7.4 Formularios (ALTO)

```typescript
// ✅ Campos con errores
<input
  id="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert">
    {errors.email.message}
  </span>
)}
```

### 7.5 Contraste & Estados

- Contraste mínimo texto: 4.5:1
- Contraste mínimo iconos/UI: 3:1
- No depender solo del color para estados
- Focus visible siempre presente

### 7.6 Media & Motion

```typescript
// ✅ Respetar preferencias de movimiento reducido
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. REACT HOOK FORM + ZOD

### 8.1 Setup Básico

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  telefono: z.string().min(10, 'Teléfono inválido'),
  email: z.string().email('Email inválido').optional(),
  servicio: z.string().min(1, 'Selecciona un servicio'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: '',
      telefono: '',
      email: '',
      servicio: '',
    },
  });
}
```

### 8.2 Reglas Críticas

```typescript
// ✅ SIEMPRE establecer defaultValues
const form = useForm({
  defaultValues: { name: '', email: '' }, // REQUERIDO
});

// ✅ SIEMPRE validar en servidor también
// Client-side validation puede ser bypassed

// ✅ Usar z.infer para type safety
type FormData = z.infer<typeof schema>;
```

### 8.3 Componentes de Terceros

```typescript
// ✅ Usar Controller para componentes sin ref
<Controller
  name="servicio"
  control={form.control}
  render={({ field }) => (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona servicio" />
      </SelectTrigger>
      <SelectContent>
        {services.map(s => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )}
/>
```

### 8.4 Manejo de Errores

```typescript
// ✅ Mostrar errores de servidor
const onSubmit = async (data: FormData) => {
  try {
    await submitForm(data);
  } catch (error) {
    form.setError('root', {
      message: 'Error al enviar. Intenta de nuevo.',
    });
  }
};
```

---

## 9. MOTION PERFORMANCE (Framer Motion)

### 9.1 Propiedades Compuestas (SIEMPRE)

```typescript
// ✅ USAR - Composite properties (baratas)
animate={{ opacity: 1, x: 0, scale: 1 }}

// ❌ EVITAR - Layout properties (costosas)
animate={{ width: 100, height: 100, top: 0 }}
```

### 9.2 Jerarquía de Costo de Renderizado

| Tipo | Costo | Propiedades |
|------|-------|-------------|
| Composite | Bajo | transform, opacity |
| Paint | Medio | color, borders, gradients |
| Layout | Alto | size, position, flex |

### 9.3 Anti-Patrones (NUNCA)

```typescript
// ❌ NUNCA - Layout thrashing
elements.forEach(el => {
  const height = el.offsetHeight; // READ
  el.style.height = height + 10; // WRITE
});

// ✅ BIEN - Batch reads, then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10;
});
```

### 9.4 Scroll Animations

```typescript
// ❌ NUNCA - Scroll event handlers
window.addEventListener('scroll', () => {
  element.style.transform = `translateY(${scrollY}px)`;
});

// ✅ BIEN - Usar Framer Motion scroll
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
```

### 9.5 Reglas will-change

```css
/* ✅ Usar temporalmente y quirúrgicamente */
.animating {
  will-change: transform, opacity;
}

/* Remover después de la animación */
```

### 9.6 Reduced Motion

```typescript
// ✅ Siempre respetar preferencias del usuario
import { useReducedMotion } from 'framer-motion';

function Component() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{
        x: shouldReduceMotion ? 0 : 100,
        opacity: 1
      }}
    />
  );
}
```

---

## 10. METADATA GUIDELINES

### 10.1 Principios Core

- **Una fuente de verdad** - Metadata en un solo lugar por página
- **Valores determinísticos** - Sin generación random
- **Sanitizar inputs** - Escapar strings dinámicos

### 10.2 Titles & Descriptions (ALTO)

```typescript
// ✅ Cada página necesita title único
export const metadata: Metadata = {
  title: 'Servicios Médicos | Clínica Hispana Nueva Salud Gessner',
  description: 'Descubre nuestros servicios médicos en español...',
};
```

### 10.3 Canonical & Indexing (ALTO)

```typescript
// ✅ Canonical correcto
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://miclinicamedicalcenter.com/servicios',
  },
};

// ✅ noindex solo para páginas privadas/duplicadas
export const metadata: Metadata = {
  robots: {
    index: false, // Solo si es necesario
  },
};
```

### 10.4 Open Graph (ALTO)

```typescript
export const metadata: Metadata = {
  openGraph: {
    title: 'Clínica Hispana Nueva Salud Gessner',
    description: 'Clínica hispana en Houston, TX',
    url: 'https://miclinicamedicalcenter.com', // Debe coincidir con canonical
    siteName: 'Clínica Hispana Nueva Salud Gessner',
    images: [
      {
        url: 'https://miclinicamedicalcenter.com/og-image.jpg', // URL ABSOLUTA
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### 10.5 Checklist

1. ✅ Titles únicos por página
2. ✅ Descriptions con propuesta de valor
3. ✅ Canonical URLs correctos
4. ✅ OG images con URLs absolutas
5. ✅ og:url = canonical
6. ✅ lang attribute en html
7. ✅ JSON-LD validado

---

## ESTRUCTURA DE ARCHIVOS

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── servicios/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/           # shadcn components
│   ├── sections/     # Secciones de página
│   ├── layout/       # Header, Footer
│   ├── forms/        # Formularios
│   └── seo/          # JSON-LD, etc.
├── lib/
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── stores/
├── types/
└── hooks/
```

---

## IMPORTS ORDER

```typescript
// 1. React/Next
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

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

## CONVENCIONES

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Archivos/Carpetas | kebab-case | `contact-form.tsx` |
| Componentes | PascalCase | `ContactForm` |
| Variables | camelCase | `isSubmitting` |
| Constantes | SCREAMING_SNAKE | `CONTACT_INFO` |
| Hooks | useCamelCase | `useContactForm` |
| Types | PascalCase | `ServiceType` |

---

## CHECKLIST PRE-DEPLOY

- [ ] Build local exitoso (`npm run build`)
- [ ] Sin `console.log` en producción
- [ ] Todas las imágenes tienen `alt`
- [ ] Metadata configurada en todas las páginas
- [ ] Schema JSON-LD validado
- [ ] Core Web Vitals < umbrales
- [ ] Accesibilidad verificada
- [ ] Formularios validados client + server
- [ ] URLs canónicas correctas
- [ ] Sitemap y robots.txt funcionando
