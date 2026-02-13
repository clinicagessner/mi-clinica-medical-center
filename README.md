# Clínica Hispana Nueva Salud Gessner

Landing page for a Hispanic medical clinic in Houston, TX. Optimized for local SEO, conversions, and accessibility.

## Tech Stack

### Core
| Technology | Version | Description |
|------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 16.1.6 | React framework with App Router |
| [React](https://react.dev/) | 19.2.3 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 | Utility-first CSS |

### UI Components
| Technology | Version | Description |
|------------|---------|-------------|
| [shadcn/ui](https://ui.shadcn.com/) | - | Accessible components (Radix UI) |
| [Radix UI](https://www.radix-ui.com/) | 1.4.3 | UI primitives |
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
| [Resend](https://resend.com/) | 6.9.2 | Email sending |
| [@react-email](https://react.email/) | 1.0.7 | Email templates |

### Utilities
| Technology | Version | Description |
|------------|---------|-------------|
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.11 | Global state |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Class utility |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.0 | Tailwind class merge |
| [class-variance-authority](https://cva.style/) | 0.7.1 | Component variants |
| [Sharp](https://sharp.pixelplumbing.com/) | 0.34.5 | Image optimization |

## Features

- **SEO Optimized**: Meta tags, Open Graph, JSON-LD schemas, sitemap
- **Performance**: Next.js Image optimization, lazy loading, code splitting
- **Accessibility**: WCAG compliant, keyboard navigation, ARIA labels
- **Responsive**: Mobile-first design
- **PWA Ready**: Web manifest, optimized icons
- **Contact Form**: Client/server validation, email sending
- **Google Reviews**: Google Places API integration
- **Animations**: Scroll animations with Framer Motion

## Requirements

- Node.js 18.17+
- npm or yarn

## Installation

```bash
# Clone repository
git clone https://github.com/caballerorandy6/mi-clinica-medical-center.git

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

Create a `.env.local` file with the following variables:

```env
# Google Places API (for reviews)
GOOGLE_PLACES_API_KEY=your_api_key
GOOGLE_PLACE_ID=your_place_id

# Resend (for email sending)
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
│   ├── layout.tsx         # Main layout + metadata
│   ├── page.tsx           # Home page
│   ├── servicios/         # Services page
│   ├── error.tsx          # Error page
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # robots.txt configuration
│   ├── sitemap.ts         # Dynamic sitemap
│   └── actions/           # Server actions
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, FloatingButtons
│   ├── sections/          # Hero, Services, Contact, FAQ, etc.
│   ├── forms/             # Contact form
│   ├── services/          # Service components
│   └── seo/               # JSON-LD schemas
├── lib/
│   ├── constants.ts       # Static data (services, FAQs, etc.)
│   ├── validations.ts     # Zod schemas
│   └── utils.ts           # Utilities
├── emails/                # Email templates
├── hooks/                 # Custom hooks
└── types/                 # TypeScript types
```

## Medical Services

The clinic offers 18+ medical services including:

- Immigration Exams (I-693)
- Gynecology
- Ultrasounds
- Clinical Laboratory
- Diabetes Management
- Pediatrics
- And more...

## Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

Configure the following variables in the Vercel dashboard:
- `GOOGLE_PLACES_API_KEY`
- `GOOGLE_PLACE_ID`
- `RESEND_API_KEY`

## License

Private project - All rights reserved.

---

Developed for **Clínica Hispana Nueva Salud Gessner** - Houston, TX
