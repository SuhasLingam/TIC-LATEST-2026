# Styling & Theme Documentation

## The Incite Crew (TIC) Design System

---

## Table of Contents

1. [Theme System](#theme-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Sizing](#spacing--sizing)
5. [Buttons](#buttons)
6. [UI Components](#ui-components)
7. [Animations & Transitions](#animations--transitions)
8. [Responsive Design](#responsive-design)
9. [UX Patterns](#ux-patterns)
10. [Special Effects](#special-effects)

---

## Theme System

### Technology Stack
- **Library**: `next-themes`
- **ThemeProvider**: Wrapped at root level in `layout.tsx`
- **Default Theme**: `dark`
- **System Detection**: Enabled via `enableSystem` prop

### Implementation
```tsx
// src/components/theme-provider.tsx
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Theme Access
```tsx
const { theme, setTheme, resolvedTheme } = useTheme()
const isDark = mounted && resolvedTheme === "dark"
```

### CSS Variables
```css
:root {
  --background: transparent;
  --foreground: #09090b;
}
.dark {
  --background: transparent;
  --foreground: #ffffff;
}
```

---

## Color Palette

### Base Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | transparent | transparent | Page background |
| `--foreground` | `#09090b` | `#ffffff` | Primary text |

### Opacity Scale
The design uses foreground color with opacity modifiers:
- `/5` - Subtle backgrounds
- `/10` - Minimal borders, inactive elements
- `/15` - Default borders
- `/20` - Hover states
- `/25` - Secondary text
- `/30` - Disabled states
- `/35` - Labels, taglines
- `/40` - Muted text
- `/45` - Eyebrow text
- `/50` - Secondary descriptions
- `/55` - Tertiary text
- `/60` - Active text
- `/70` - Strong emphasis
- `/80` - Near-full opacity

### Special Colors

#### Gold Accent (Trailblazer Tier)
- **Border**: `rgba(212, 175, 55, 0.40)`
- **Glow**: `rgba(212, 175, 55, 0.55)`
- **Outer Glow**: `rgba(212, 175, 55, 0.10)`
- **Checkmark**: `rgba(212, 175, 55, 0.7)`
- **Hover BG**: `rgba(212, 175, 55, 0.05)`

#### Soft Glow (Visionary Tier)
- **Border**: `rgba(150, 150, 170, 0.25)`
- **Glow**: `rgba(150, 150, 170, 0.06)`

#### Shader Colors (ThreeBackground)
**Dark Theme:**
- Base: `#020203`
- Highlights: `#2e2e38`
- Smoke: `#0.02, 0.02, 0.03` to `#0.18, 0.18, 0.22`

**Light Theme:**
- Lavender: `#0.85, 0.85, 0.95`
- Sky Blue: `#0.80, 0.90, 0.98`
- Peach: `#0.98, 0.88, 0.85`

#### CTA Background Glows
- **Purple**: `radial-gradient(ellipse at center, rgba(120,100,200,0.35) 0%, rgba(80,60,160,0.10) 50%, transparent 80%)`
- **Gold Accent**: `radial-gradient(ellipse at center, rgba(212,175,55,0.30) 0%, transparent 70%)`

---

## Typography

### Font Families
| Variable | Font File | Weight | Usage |
|----------|-----------|--------|-------|
| `--font-heading` | `NeueMontreal-Medium.otf` | 500 | Headings, titles |
| `--font-sans` | `Nord-Regular.woff2` | 400 | Body, labels |

### Font Feature Settings
```css
font-feature-settings: "rlig" 1, "calt" 1;
```

### Type Scale

#### Headings
```tsx
// H1 / Hero
className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-medium tracking-tight"

// H2 / Section
className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight"

// H3 / Card Title
className="text-2xl md:text-3xl font-heading"

// H4 / Subsection
className="text-xl md:text-2xl font-heading"
```

#### Body Text
```tsx
// Large body
className="text-lg md:text-xl text-foreground/80 leading-snug"

// Default body
className="text-sm md:text-base text-foreground/60 leading-relaxed"

// Small body
className="text-xs text-foreground/55"
```

#### Labels & Eyeboolean
```tsx
// Eyebrow (uppercase, wide tracking)
className="text-xs tracking-[0.2em] uppercase text-foreground/40"

// Label (extra small, widest tracking)
className="text-[9px] uppercase tracking-widest text-foreground/60"

// Tag
className="text-[10px] tracking-widest uppercase text-foreground/35"
```

#### Tracking Values
- `tracking-tight` - Headings
- `tracking-wide` - Standard text
- `tracking-[0.2em]` - Eyebrows
- `tracking-[0.25em]` - Navigation
- `tracking-[0.3em]` - Buttons
- `tracking-[0.4em]` - Loading screen
- `tracking-widest` - Labels (9px)

---

## Spacing & Sizing

### Section Padding
```tsx
// Horizontal padding
className="px-6 md:px-16 lg:px-24"

// Vertical padding
className="py-28 md:py-32"
```

### Gap Scale
| Class | Usage |
|-------|-------|
| `gap-2` | Inline elements, tags |
| `gap-3` | Related items |
| `gap-4` | Form fields, card internals |
| `gap-5` | Component sections |
| `gap-6` | Related sections |
| `gap-10` | Major sections |
| `gap-12 lg:gap-20` | Layout grids |

### Element Sizing

#### Buttons
- **Primary**: `px-6 py-2.5` (small), `px-8 py-3` (large)
- **Secondary**: `py-3` with border
- **Icon Button**: `w-10 h-10`

#### Inputs
- **Padding**: `px-3 py-3`
- **Font**: `text-sm`
- **Border**: `border-foreground/10`

#### Cards
- **Padding**: `p-6`, `p-8`
- **Border Radius**: `rounded-2xl`, `rounded-[2.5rem]`

#### Circles (HowItWorks)
- **Desktop**: `w-56 h-56 lg`
- **Tablet**: `w-40 h-40 md`
- **Mobile**: `w-28 h-28`

### Layout Breakpoints
```tsx
// Grid columns
grid-cols-1 md:grid-cols-2
grid-cols-1 md:grid-cols-3
grid-cols-1 lg:grid-cols-[1fr_420px]
grid-cols-1 lg:grid-cols-[280px_1fr]
```

---

## Buttons

### Primary Button (Filled)
```tsx
className="group relative inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-foreground/90 dark:bg-transparent dark:text-foreground dark:border-2 dark:border-white/30 dark:hover:bg-white/10 dark:hover:border-white/60"
```

**Characteristics:**
- Rounded pill shape (`rounded-full`)
- Solid foreground background in light mode
- Transparent with border in dark mode
- Scale hover effect (`hover:scale-105`)
- Arrow icon translates on hover

### Secondary Button (Outline)
```tsx
className="border border-foreground/20 hover:border-foreground/40 py-3 text-[9px] uppercase tracking-[0.3em] font-medium transition-all"
```

**Characteristics:**
- Thin border
- Extra small uppercase text
- Wide letter spacing
- Subtle hover state

### Tier Selection Button
```tsx
className={`py-3 text-[9px] uppercase tracking-widest border transition-all ${
  selected
    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
    : "bg-transparent text-foreground/60 border-foreground/10 hover:border-foreground/30"
}`}
```

### Icon Button (FAB)
```tsx
className="relative w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/18 border border-foreground/10 backdrop-blur-sm"
```

### CTA Button (Tier Cards)
```tsx
// Gold variant (Trailblazer)
className="border border-[rgba(212,175,55,0.40)] text-foreground hover:border-[rgba(212,175,55,0.65)] hover:bg-[rgba(212,175,55,0.05)]"

// Default variant
className="border border-foreground/15 text-foreground hover:border-foreground/30 hover:bg-foreground/[0.04]"
```

---

## UI Components

### Cards
```tsx
// Base card
className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20"

// Premium card (gold glow)
className="bg-foreground/[0.04] border border-[rgba(212,175,55,0.30)]"
```

### Inputs
```tsx
className="w-full bg-foreground/[0.03] border border-foreground/10 rounded-none px-3 py-3 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
```

**Characteristics:**
- No border radius (`rounded-none`)
- Subtle background
- Focus state strengthens border
- Transparent background option

### Modal
```tsx
// Backdrop
className="absolute inset-0 bg-background/80 backdrop-blur-xl"

// Content
className="relative w-full max-w-2xl bg-background border border-foreground/10 shadow-2xl"
```

### Accordion (FAQ)
```tsx
className="rounded-xl border border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20"
```

### Progress Bar
```tsx
// Scroll progress
className="fixed top-0 left-0 right-0 h-1 origin-left bg-foreground"

// Form progress
className="h-full bg-foreground"
```

### Tags
```tsx
className="font-sans text-[11px] tracking-wide text-foreground/35 border border-foreground/10 rounded-full px-3 py-1"
```

---

## Animations & Transitions

### Framer Motion Variants

#### Fade Up Variant
```tsx
const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" }
    })
}
```

#### Card Variant
```tsx
const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.75, ease: "easeOut" }
    }
}
```

### Custom Easing
```tsx
// Primary ease (used throughout)
ease: [0.16, 1, 0.3, 1]  // Custom cubic-bezier

// Loading shutter
ease: [0.7, 0, 0.2, 1]

// Standard easings
ease: "easeOut"
ease: "easeInOut"
```

### Transition Durations
| Duration | Usage |
|----------|-------|
| `0.18` | Icon rotations, small toggles |
| `0.2` | Form step transitions |
| `0.22` | Panel expansions |
| `0.3` | Hover effects, accordions |
| `0.35` | Text fades |
| `0.4` | Scale animations |
| `0.45` | Card content |
| `0.55` - `0.65` | Section entrances |
| `0.7` - `0.8` | Hero animations |
| `0.9` | Traveling dots |
| `1.1` | Shutter animation |
| `1.2` | Page entrance |

### CSS Transitions
```tsx
// Color transitions
className="transition-colors duration-500"

// Transform transitions
className="transition-transform duration-300"

// All properties
className="transition-all duration-300"
```

### Hover Animations
```tsx
// Scale hover
className="hover:scale-105"

// Translate hover
className="group-hover:translate-x-1"

// Combined
className="hover:scale-[1.02] active:scale-[0.98]"
```

---

## Responsive Design

### Breakpoint Strategy
| Breakpoint | Width | Usage |
|------------|-------|-------|
| `md` | 768px | Tablet layouts |
| `lg` | 1024px | Desktop layouts |
| `xl` | 1280px | Large screens |

### Responsive Patterns

#### Text Scaling
```tsx
className="text-5xl md:text-6xl lg:text-7xl"
className="text-sm md:text-base"
className="text-[10px] md:text-xs"
```

#### Layout Changes
```tsx
// Flex direction
className="flex-col md:flex-row"

// Grid columns
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Conditional visibility
className="hidden md:block"
```

#### Spacing Adjustments
```tsx
className="px-6 md:px-16 lg:px-24"
className="gap-6 md:gap-10"
className="py-7 md:py-8"
```

#### Component-Specific
```tsx
// Circles
className="w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56"

// Grid
className="grid grid-cols-1 lg:grid-cols-[1fr_420px]"
```

---

## UX Patterns

### Loading States
- **LoadingScreen**: Shutter animation with circular progress
- **Duration**: 2 seconds progress + 150ms hold + 1.1s reveal
- **Progress indicator**: SVG circle with animated stroke
- **Grain texture**: Subtle noise overlay

### Scroll Behavior
- **Smooth Scroll**: Lenis with `lerp: 0.1`, `duration: 1.5`
- **Scroll Progress**: Top progress bar tracking `scrollYProgress`
- **Overflow**: Hidden on body, handled by Lenis

### Modal Behavior
- **Scroll lock**: `overflow: hidden` on body when open
- **Backdrop**: Blurred background
- **Animation**: Scale + fade entrance
- **Max height**: `max-h-[90vh]` with scroll

### Form UX
- **Multi-step**: 3 steps with progress bar
- **Validation**: Required fields marked
- **Feedback**: Loading state with spinner
- **Success**: Checkmark confirmation screen

### Interactive Feedback
- **Hover states**: All clickable elements have hover
- **Active states**: Scale down on tap (`scale-[0.98]`)
- **Disabled states**: Opacity 50%, cursor not-allowed
- **Focus states**: Border strengthening on inputs

### Auto-advance Patterns
- **WhatIsTIC card**: 3 second intervals
- **HowItWorks steps**: 3.5 second intervals
- **Progress bar**: Visual countdown per slide

---

## Special Effects

### WebGL Background (ThreeBackground)
```tsx
// Dark theme: Sparse smoke clouds
uniforms: { time: 0.8x speed }
noise: Simplex 2D
colors: #020203 base, #2e2e38 highlights

// Light theme: Fluid pastel gradient
uniforms: { time: 0.6x speed }
colors: Lavender, Sky Blue, Peach
```

### Glow Effects
```tsx
// Radial glow
className="bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)]"

// Box shadow glow
style={{ boxShadow: "0 0 50px 8px rgba(212,175,55,0.10)" }}

// Blur glow
className="blur-[140px] bg-foreground/5"
```

### Backdrop Blur
```tsx
// Heavy blur
className="backdrop-blur-xl"

// Light blur
className="backdrop-blur-sm"
```

### Grain Texture
```tsx
className="bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 opacity-[0.03]"
```

### Gradient Borders
```tsx
// Card border glow
style={{
    background: "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.12) 100%)",
    boxShadow: "0 0 60px rgba(255,255,255,0.04)"
}}
```

### Divider Lines
```tsx
// Gradient divider
className="h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"

// Solid divider
className="h-px bg-foreground/10"
```

---

## File Locations

### Core Files
| File | Path | Purpose |
|------|------|---------|
| Theme Provider | `src/components/theme-provider.tsx` | Theme context |
| Global Styles | `src/styles/globals.css` | CSS variables, Tailwind |
| Layout | `src/app/layout.tsx` | Font loading, theme setup |
| PostCSS Config | `postcss.config.js` | Tailwind v4 setup |

### Component Files
| Component | Path |
|-----------|------|
| Hero | `src/components/Hero.tsx` |
| WhatIsTIC | `src/components/WhatIsTIC.tsx` |
| HowItWorks | `src/components/HowItWorks.tsx` |
| WhoItsFor | `src/components/WhoItsFor.tsx` |
| Offerings | `src/components/Offerings.tsx` |
| FAQ | `src/components/FAQ.tsx` |
| CTA | `src/components/CTA.tsx` |
| ApplicationModal | `src/components/ApplicationModal.tsx` |
| ApplicationForm | `src/components/ApplicationForm.tsx` |
| LoadingScreen | `src/components/LoadingScreen.tsx` |
| PageEntrance | `src/components/PageEntrance.tsx` |
| ThreeBackground | `src/components/ThreeBackground.tsx` |
| FloatingSettings | `src/components/FloatingSettings.tsx` |
| SmoothScroll | `src/components/SmoothScroll.tsx` |
| ScrollProgress | `src/components/ScrollProgress.tsx` |

### Fonts
| Font | Path |
|------|------|
| Neue Montreal | `public/fonts/NeueMontreal-Medium.otf` |
| Nord | `public/fonts/Nord-Regular.woff2` |

---

## Dependencies

```json
{
  "tailwindcss": "^4.0.15",
  "@tailwindcss/postcss": "^4.0.15",
  "framer-motion": "^latest",
  "next-themes": "^latest",
  "lenis": "^latest",
  "@react-three/fiber": "^latest",
  "@react-three/drei": "^latest",
  "lucide-react": "^latest",
  "tailwind-merge": "^3.5.0",
  "clsx": "^2.1.1",
  "prettier-plugin-tailwindcss": "^0.6.11"
}
```

---

## Design Principles

1. **Clarity First**: Minimal, focused design that removes noise
2. **Theme Adaptive**: Seamless dark/light mode transitions
3. **Motion Purposeful**: Animations serve UX, not decoration
4. **Premium Feel**: Gold accents, blur effects, grain textures
5. **Responsive Native**: Mobile-first scaling throughout
6. **Accessible**: Proper focus states, contrast ratios
7. **Performance**: GPU-accelerated transforms, optimized shaders

---

*Generated from codebase analysis - The Incite Crew Design System*
