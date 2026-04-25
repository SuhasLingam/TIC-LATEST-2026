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

## Ecosystem Architecture

TIC is built as a distributed surgical ecosystem with a shared data core. The following diagrams illustrate the lifecycle of a founder and the underlying technical synchronization.

### The Founder Lifecycle
```mermaid
sequenceDiagram
    autonumber
    participant F as Founder (User)
    participant S as Supabase / DB
    participant A as Admin (TIC Team)
    participant M as Mailer / Logic

    Note over F, A: PHASE 1: THE INTAKE (Application)
    F->>F: Fills Application Wizard (Building Context, Traction, etc.)
    F->>S: Auto-saves draft via saveDraft mutation
    F->>F: Clicks "Submit Application"
    F->>S: Finalizes status: "pending"
    S-->>M: Triggers Confirmation Emails
    M-->>F: Sends "Application Received" email

    Note over F, A: PHASE 2: THE VETTING (Admin Review)
    A->>A: Accesses TIC-ADMIN "Dealflow"
    A->>S: Fetches "pending" applications
    A->>A: Reviews Founder Context & ICP Score
    alt Option A: Under Review
        A->>M: Sends "Under Review" nudge
    else Option B: Approval
        A->>A: Assigns Tier (Explorer/Visionary/Trailblazer)
        A->>M: Sends Acceptance Email (+ Calendly Link)
        A->>S: Updates status to "approved"
    end

    Note over F, A: PHASE 3: ONBOARDING (Activation)
    F->>F: Receives Acceptance & logs into TIC App
    F->>F: Selects Membership Card (NFT/Identity)
    F->>M: Requests OTP Verification
    M-->>F: Sends 8-digit secure code
    F->>S: Completes OTP & Setup (Role, Company, Motivation)
    F->>F: Payment Step (Pay Now/Later)
    F->>S: Status updated to "active"

    Note over F, A: PHASE 4: ENGAGEMENT (Realtime Dashboard)
    F->>F: Views Dashboard (Perks, Insights, Profile)
    A->>S: Admin updates "Internal Founder Context" or Notes
    S-->>F: Supabase Realtime Channel broadcasts change
    F->>F: RealtimeSync triggers tRPC cache invalidation
    F->>F: UI updates instantly with new Admin feedback
```

### System Design
```mermaid
graph TD
    subgraph "Member Experience (TIC)"
        M_UI[Next.js App Router]
        M_TRPC[tRPC Client]
        M_SYNC[RealtimeSync Component]
    end

    subgraph "Admin Experience (TIC-ADMIN)"
        A_UI[Next.js Admin Suite]
        A_TRPC[tRPC Client]
    end

    subgraph "Shared Infrastructure"
        DB[(PostgreSQL - Supabase)]
        DRZ[Drizzle ORM]
        OTP[Supabase Auth / OTP]
        RPC[tRPC API Server]
    end

    M_UI --> M_TRPC
    A_UI --> A_TRPC
    M_TRPC --> RPC
    A_TRPC --> RPC
    RPC --> DRZ
    DRZ --> DB
    
    DB -- "Postgres CDC" --> M_SYNC
    M_SYNC -- "Invalidate Cache" --> M_TRPC
```

## 6-Stage Application Funnel

1. **Stage 1 (Discovery):** User views tiers on `/membership` for comparison only.
2. **Stage 2 (Application Wizard):** Multi-step, save-and-resume form on `/apply` capturing identity, company background, building context, and fit signals.
3. **Stage 3 (Review):** Application submitted. User can check their 48-72hr SLA status at `/application-status`.
4. **Stage 4 (Acceptance):** TIC team accepts/declines application via backend, assigning a tier.
5. **Stage 5 (Activation):** User lands on `/activate-membership`, signs in via Supabase OTP Magic Link, confirms details, and activates.
6. **Stage 6 (Dashboard Intake):** First-time dashboard login requires completing a mandatory Founder Clarity Intake to align operational execution tasks and select their Digital Identity Card.

## Database Schema

The `applications` and `profiles` tables support this flow:

### Applications Table (`TIC_application`)
- `token` - Unique UUID for save & resume tracking
- `status` - draft/pending/accepted/declined
- `email`, `name`, `mobileNumber` - Identity
- `companyName`, `website`, `role`, `startupStage` - Company
- `buildingContext`, `currentChallenge` - Context
- `traction`, `teamSize`, `whyTic`, `tierInterest` - Fit Signals
- `icpScore` - Internal routing score
- `assignedTier` - Final tier assignment by admin

### Profiles Table (`TIC_profile`)
- `id` - Supabase Auth User ID
- `tier` - Active membership tier
- `selectedCardId` - Chosen digital identity card
- `onboardingStep` - Tracks progress (0 = Needs Intake, 1 = Active)
- `paymentStatus` - e.g., 'completed'

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
