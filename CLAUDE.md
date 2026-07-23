# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Clínica Hispana Nueva Salud Gessner** - Hispanic medical clinic website in Houston, TX.

- **Production:** https://www.clinicagessner.com
- **Vercel team:** clinica-gessners-projects
- **GTM ID:** GTM-K5R8SDQV

## Commands

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Framework |
| React 19 | UI |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styles (CSS-first with `@theme inline` in globals.css) |
| shadcn/ui (New York) | UI Components |
| next-intl | i18n (ES default, EN with /en prefix) |
| React Hook Form + Zod | Forms & validation |
| Framer Motion | Animations (below-fold only for LCP) |
| Resend + React Email | Email delivery |
| Phosphor/Health Icons | Iconography |

## Critical Rules

### Commits
```
NEVER add "Co-Authored-By" from any AI in commits.
Commits must appear 100% written by the human developer.

Format: <type>(<scope>): <description>
Types: feat, fix, docs, style, refactor, perf, test, chore
```

### Code Patterns

**ALWAYS:**
- Server Components by default (only `'use client'` when truly needed)
- Direct imports: `import { Button } from '@/components/ui/button'`
- Validate with Zod (client + server via `schema.safeParse()`)
- `next/image` for all images with descriptive alt text
- `Promise.all` for parallel fetching
- Mobile-first Tailwind: `w-full md:w-[800px]`
- CSS variables for colors: `bg-primary`, `text-green-dark`
- Translation keys via next-intl for all user text
- `async/await` params in layouts/pages (Next.js 16 pattern)

**NEVER:**
- Barrel imports: ~~`import { Button, Card } from '@/components/ui'`~~
- Hardcoded hex colors: ~~`bg-[#166534]`~~
- Native `<img>` tags
- `forwardRef` in React 19 (use ref directly as prop)
- `tailwind.config.ts` (Tailwind v4 uses `@theme inline` in globals.css)
- Framer Motion in hero/above-fold (use CSS animations for LCP)

## Architecture

### Routing (next-intl)
```
Spanish (default, no prefix):    /services, /blog, /privacy
English (prefix):                /en/services, /en/blog, /en/privacy
```

Middleware: `src/proxy.ts` (next-intl createMiddleware)

### Key Directories
```
src/app/[locale]/          # Locale-based routing
src/app/actions/           # Server actions (send-contact-email.ts)
src/components/ui/         # shadcn/ui components
src/components/sections/   # Homepage sections
src/components/forms/      # Form components (RHF + Zod)
src/components/seo/        # JSON-LD schemas
src/emails/                # React Email templates
src/lib/constants.ts       # Static data (SERVICES, PROMOTIONS, etc.)
src/lib/validations.ts     # Zod schemas
src/lib/google-reviews.ts  # Google Places API (24h cache)
src/messages/{es,en}.json  # Translations
content/blog/{es,en}/      # Markdown blog posts per locale (gray-matter)
```

### Section Anchor IDs
```
#home, #services, #testimonials, #green-card, #location, #contact, #faq
```

### i18n Usage
```typescript
// Server Components (async)
const t = await getTranslations('namespace');

// Client Components
const t = useTranslations('namespace');
```

### Blog System
Bilingual markdown files in `content/blog/es/` and `content/blog/en/` — same filename (slug) in both directories. Slugs are read from `es/` (canonical); if the `en/` translation is missing, the Spanish content is served as fallback. Gray-matter frontmatter:
```yaml
---
title: "Post Title"
description: "Description"
date: "2024-01-15"
author: "Equipo Nueva Salud Gessner"
image: "/images/services/existing-image.webp"
featured: false
---
```
The `featured` flag in frontmatter is ignored: `getAllPosts()` always marks the newest post (sorted by date desc) as featured. Internal links in `en/` posts must use the `/en/` prefix (e.g. `/en/services/slug`).

## Color Palette (Green Monochromatic)

```css
--green-dark: #166534      /* CTAs, primary actions */
--green-primary: #15803D
--green-medium: #16A34A
--green-light: #DCFCE7
--green-warm: #F7FDF9      /* Main background */
--teal-dark: #115E59       /* Secondary headers */
--teal-primary: #0D9488
```

Typography: Poppins (headings), Inter (body)

## Environment Variables

```bash
GOOGLE_PLACES_API_KEY=     # Google Places API for reviews
GOOGLE_PLACE_ID=           # ChIJtTabmd7EQIYRd2cADSAUndw
RESEND_API_KEY=            # Email delivery
```

## Business Data (NAP)

```
Name:    Clínica Hispana Nueva Salud Gessner
Address: 1914 Gessner Rd B, Houston, TX 77080
Phone:   +1 (346) 226-5820
Hours:   Mon-Sun 9:00 AM - 9:00 PM
```

## Import Order

```typescript
// 1. React/Next
// 2. Third-party (zod, react-hook-form, framer-motion, next-intl)
// 3. Icons (@phosphor-icons, healthicons-react)
// 4. UI Components (@/components/ui/*)
// 5. Local components
// 6. Utilities (@/lib/utils)
// 7. Types
// 8. Constants
```

## SEO

JSON-LD schemas: MedicalClinic, FAQPage, Service, BreadcrumbList, BlogPosting, AggregateRating

Target keywords: "clinica hispana Houston", "I-693 civil surgeon Houston", "medico en español Houston"

Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
