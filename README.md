# The Incite Crew (TIC)

A clarity-first ecosystem helping founders make better decisions and execute with intent. Built with the T3 Stack.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **UI** | React 19, Framer Motion, Tailwind CSS v4 |
| **3D Graphics** | Three.js + React Three Fiber |
| **API** | tRPC (type-safe RPC) |
| **Database** | PostgreSQL + Drizzle ORM |
| **Email** | Nodemailer |
| **Deployment** | Vercel |

## Features

- **Landing Page** - Multi-section marketing page with smooth scroll animations
- **Application System** - 3-step form for founder applications
- **Theme System** - Dark/light mode with WebGL shader backgrounds
- **Email Notifications** - Automated confirmation and team notifications
- **Analytics** - Vercel Analytics integration

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with providers, 3D background, analytics
│   └── page.tsx         # Main landing page
├── components/
│   ├── ThreeBackground.tsx   # WebGL shader background (dark/light themes)
│   ├── ApplicationForm.tsx   # Multi-step application form
│   ├── ApplicationModal.tsx  # Modal wrapper for applications
│   ├── Hero.tsx              # Hero section
│   ├── WhatIsTIC.tsx         # About section
│   ├── HowItWorks.tsx        # Process section
│   ├── WhoItsFor.tsx         # Target audience section
│   ├── Offerings.tsx         # Tiers/pricing section
│   ├── FAQ.tsx               # Frequently asked questions
│   ├── CTA.tsx               # Call-to-action section
│   ├── PageEntrance.tsx      # Entrance animation wrapper
│   ├── LoadingScreen.tsx     # Initial loading state
│   ├── FloatingSettings.tsx  # Theme/language controls
│   ├── ScrollProgress.tsx    # Scroll indicator
│   ├── SmoothScroll.tsx      # Lenis smooth scroll
│   └── theme-provider.tsx    # Dark/light mode provider
├── server/
│   ├── api/
│   │   ├── root.ts           # Main tRPC router
│   │   ├── trpc.ts           # tRPC configuration
│   │   └── routers/
│   │       └── application.ts # Application submission endpoint
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   └── schema.ts         # Drizzle ORM schema
│   └── mail.ts               # Email sending utilities
├── trpc/
│   ├── react.tsx             # React tRPC hooks
│   ├── server.ts             # Server-side tRPC
│   └── query-client.ts       # React Query config
└── styles/
    └── globals.css           # Tailwind CSS v4
```

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
POSTGRES_URL=postgresql://user:password@host:5432/dbname

# Email (SMTP)
SMTP_USER=your-email@gmail.com
GOOGLE_APP_KEY_SMTP=your-app-password
TEAM_EMAILS=admin@example.com,team@example.com

# Optional
SKIP_ENV_VALIDATION=true  # For Docker builds
```

See `.env.example` for the full list of required variables.

## Getting Started

### Installation

```bash
pnpm install
```

### Database Setup

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Or push schema directly
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

### Development

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
pnpm build
pnpm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format:check` | Check Prettier formatting |
| `pnpm format:write` | Fix formatting |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:studio` | Open Drizzle Studio |

## Application Flow

1. User clicks "Apply" button on landing page
2. ApplicationModal opens with ApplicationForm
3. 3-step form collects:
   - **Step 1:** Founder details (name, email, mobile)
   - **Step 2:** Startup info (name, website, pitch deck, overview)
   - **Step 3:** Business details (stage, revenue, goals, tier)
4. Submission saves to PostgreSQL database
5. Emails sent via Nicermail:
   - Confirmation to applicant
   - Notification to team

## Database Schema

The `applications` table (prefix: `TIC_`) includes:

- `id` - Auto-increment primary key
- `name`, `email`, `mobileNumber` - Founder contact
- `startupName`, `website`, `pitchDeck` - Startup info
- `overview` - Text description
- `founderStage` - Stage enum (Idea → Scaling)
- `primaryGoal` - Goal enum
- `monthlyRevenue` - Revenue bracket
- `tier` - Explorer/Visionary/Trailblazer
- `status` - pending/approved/rejected
- `createdAt`, `updatedAt` - Timestamps

## Custom Fonts

Located in `public/fonts/`:
- `NeueMontreal-Medium.otf` - Heading font
- `Nord-Regular.woff2` - Body font

## Audio

Background audio tracks in `public/audio/`:
- `Epic_Spectrum.mp3`
- `theojt_minimalist.mp3`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Database Migration in Production

Run migrations before first deploy:
```bash
pnpm db:migrate
```

## License

Private - All rights reserved
