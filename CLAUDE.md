# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Clínica Hispana Nueva Salud Gessner** - Hispanic medical clinic website in Houston, TX.

- **Production URL:** https://www.clinicagessner.com
- **Vercel team:** clinica-gessners-projects
- **GTM ID:** GTM-K5R8SDQV

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Framework |
| React 19 | UI |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styles (@theme inline, no config file) |
| shadcn/ui (New York) | UI Components |
| next-intl | i18n (ES default, EN with /en prefix) |
| React Hook Form + Zod | Forms & validation |
| Framer Motion | Animations |
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
- Validate with Zod (client + server)
- `next/image` for all images with descriptive alt text
- `Promise.all` for parallel fetching
- Mobile-first Tailwind: `w-full md:w-[800px]`
- CSS variables for colors: `bg-primary`, `text-green-dark`
- Translation keys via next-intl for all user text

**NEVER:**
- Barrel imports: ~~`import { Button, Card } from '@/components/ui'`~~
- Hardcoded hex colors: ~~`bg-[#166534]`~~
- Native `<img>` tags
- `forwardRef` in React 19 (use ref directly as prop)
- `tailwind.config.ts` (Tailwind v4 uses `@theme inline` in globals.css)

## Architecture

### Routing (next-intl)
```
Spanish (default, no prefix):    /services, /blog, /privacy
English (prefix):                /en/services, /en/blog, /en/privacy
```

### Key Directories
```
src/app/[locale]/          # Locale-based routing
src/app/actions/           # Server actions (contact email)
src/components/ui/         # shadcn/ui components
src/components/sections/   # Homepage sections
src/components/forms/      # Form components
src/components/seo/        # JSON-LD schemas
src/lib/constants.ts       # Static data (SERVICES, FAQS, etc.)
src/lib/validations.ts     # Zod schemas
src/messages/{es,en}.json  # Translations
```

### Section Anchor IDs
```
#home, #services, #testimonials, #green-card, #location, #contact, #faq
```

### i18n Usage
```typescript
// Server Components
const t = await getTranslations('namespace');

// Client Components
const t = useTranslations('namespace');
```

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

JSON-LD schemas implemented: MedicalClinic, FAQPage, Service, BreadcrumbList, BlogPosting, AggregateRating

Target keywords: "clinica hispana Houston", "I-693 civil surgeon Houston", "medico en español Houston"

Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1
