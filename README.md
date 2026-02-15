# Clínica Hispana Nueva Salud Gessner

Website for a Hispanic medical clinic in Houston, TX. Bilingual (ES/EN), optimized for local SEO, conversions, and accessibility.

**Production:** [www.clinicagessner.com](https://www.clinicagessner.com)

## Tech Stack

### Core
| Technology | Version | Description |
|------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 16.1.6 | React framework with App Router |
| [React](https://react.dev/) | 19.2.3 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first CSS (CSS-first config) |
| [next-intl](https://next-intl.dev/) | 4.8.2 | Internationalization (ES/EN) |

### UI Components
| Technology | Version | Description |
|------------|---------|-------------|
| [shadcn/ui](https://ui.shadcn.com/) | - | Accessible components (Radix UI) |
| [Framer Motion](https://www.framer.com/motion/) | 12.31.0 | Animations |
| [Embla Carousel](https://www.embla-carousel.com/) | 8.6.0 | Testimonials carousel |

### Icons
| Technology | Version | Description |
|------------|---------|-------------|
| [Phosphor Icons](https://phosphoricons.com/) | 2.1.10 | Main icons |
| [Health Icons](https://healthicons.org/) | 3.5.0 | Medical icons |
| [Lucide React](https://lucide.dev/) | 0.563.0 | Additional icons |

### Forms & Validation
| Technology | Version | Description |
|------------|---------|-------------|
| [React Hook Form](https://react-hook-form.com/) | 7.71.1 | Form handling |
| [Zod](https://zod.dev/) | 4.3.6 | Schema validation |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 5.2.2 | RHF + Zod integration |

### Backend & Email
| Technology | Version | Description |
|------------|---------|-------------|
| [Resend](https://resend.com/) | 6.9.2 | Email delivery |
| [@react-email](https://react.email/) | 1.0.7 | Email templates |

### Utilities
| Technology | Version | Description |
|------------|---------|-------------|
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Class utility |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Tailwind class merge |
| [class-variance-authority](https://cva.style/) | 0.7.1 | Component variants |
| [Sharp](https://sharp.pixelplumbing.com/) | 0.34.5 | Image optimization |

## Features

- **Bilingual (ES/EN)**: Full internationalization with next-intl, Spanish as default
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD schemas (MedicalClinic, FAQPage, Service, BlogPosting), sitemap
- **Performance**: Next.js Image optimization, lazy loading, dynamic imports, code splitting
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, ARIA labels, reduced motion support
- **Responsive**: Mobile-first design
- **Contact Form**: Client + server validation with Zod, email delivery via Resend
- **Google Reviews**: Live Google Places API integration with 24h cache
- **Blog**: Static blog with bilingual articles
- **Analytics**: Google Tag Manager integration

## Requirements

- Node.js 18.17+
- npm

## Installation

```bash
# Clone repository
git clone https://github.com/clinicagessner/mi-clinica-medical-center.git

# Enter directory
cd mi-clinica-medical-center

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file:

```env
# Google Places API (for reviews)
GOOGLE_PLACES_API_KEY=your_api_key
GOOGLE_PLACE_ID=your_place_id

# Resend (for email delivery)
RESEND_API_KEY=your_resend_api_key
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Tailwind + CSS theme variables
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── actions/                # Server actions (email)
│   └── [locale]/               # Dynamic locale routing (ES/EN)
│       ├── layout.tsx          # Locale layout (fonts, i18n provider, GTM)
│       ├── page.tsx            # Homepage
│       ├── privacy/            # HIPAA privacy policy
│       ├── services/           # Services list + detail pages
│       └── blog/               # Blog list + article pages
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/                 # Header, Footer, FloatingButtons, LanguageSwitcher
│   ├── sections/               # Hero, Services, Promotions, Testimonials, Contact, FAQ, etc.
│   ├── forms/                  # Contact form (RHF + Zod)
│   ├── services/               # Service page components
│   └── seo/                    # JSON-LD schemas
├── i18n/                       # Internationalization config
├── lib/                        # Constants, validations, utilities, Google Reviews
├── messages/                   # Translation files (es.json, en.json)
├── emails/                     # React Email templates
├── types/                      # TypeScript types
└── proxy.ts                    # next-intl middleware
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage (Spanish) |
| `/en` | Homepage (English) |
| `/services` | Services list |
| `/services/[slug]` | Service detail |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog article |
| `/privacy` | HIPAA privacy policy |

All routes support `/en` prefix for English.

## Medical Services

The clinic offers 18+ medical services including:

- Immigration Exams (I-693)
- Gynecology
- Ultrasounds
- Clinical Laboratory
- Family Medicine
- Pediatrics
- And more...

## Deployment

Deployed on [Vercel](https://vercel.com/) via GitHub integration.

### Environment Variables on Vercel

Configure in the Vercel dashboard:
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- `RESEND_API_KEY`

## License

Private project - All rights reserved.

---

Developed for **RC Web Solutions LLCes** - Houston, TX
