# Kheelona Website - Project Documentation

## Overview

Official website for Kheelona Robotics — an AI-powered educational toy company. The site is a full e-commerce platform built with Next.js 16, Tailwind CSS 4, and Wix as a headless backend for products, blog, members, and checkout.

**Live URL:** https://kheelona.com
**Vercel Preview:** https://website-flame-tau-98.vercel.app
**GitHub:** https://github.com/Kheelona/website
**Deployment:** Vercel (standalone output)

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.1 |
| Runtime | React (Server + Client Components) | 19.2.3 |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS + PostCSS | 4 |
| UI Components | Radix UI (Dialog, Accordion, Navigation, ScrollArea) | Latest |
| Animation | Framer Motion | 12.23 |
| Icons | Lucide React | 0.562 |
| Backend | Wix SDK (Stores, Blog, CRM/Members) | 1.21.2 |
| Payment | Wix Checkout → Razorpay (gateway) | — |
| Validation | Zod | 4.2.1 |
| Analytics | Vercel Analytics + Speed Insights | — |
| Fonts | Google Fonts (Luckiest Guy, Lato) | — |

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, SEO, JSON-LD, providers)
│   ├── page.tsx                  # Homepage
│   ├── error.tsx                 # Global error page
│   ├── loading.tsx               # Loading state
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # Dynamic XML sitemap
│   ├── globals.css               # Global styles
│   ├── shop/page.tsx             # Product listing
│   ├── product/[id]/page.tsx     # Product detail (dynamic)
│   ├── blog/page.tsx             # Blog listing
│   ├── blog/[id]/page.tsx        # Blog post (dynamic)
│   ├── about/page.tsx            # About page
│   ├── contact/page.tsx          # Contact page
│   ├── community/page.tsx        # Community page
│   ├── checkout/
│   │   ├── success/page.tsx      # Payment success
│   │   └── failure/page.tsx      # Payment failure
│   ├── privacy/page.tsx          # Privacy policy
│   ├── terms/page.tsx            # Terms & conditions
│   ├── shipping/page.tsx         # Shipping info
│   ├── refund/page.tsx           # Refund policy
│   └── api/                      # API Routes
│       ├── cart/
│       │   ├── route.ts          # Cart CRUD (GET, POST, PATCH, DELETE)
│       │   └── checkout/route.ts # Create checkout session (POST)
│       ├── member/
│       │   ├── login/route.ts    # Email/password login (POST)
│       │   ├── signup/route.ts   # Register member (POST)
│       │   ├── logout/route.ts   # Clear session (POST)
│       │   ├── session/route.ts  # Check auth status (GET)
│       │   ├── forgot-password/route.ts  # Send reset email (POST)
│       │   └── orders/route.ts   # Order history (GET)
│       └── contact/route.ts      # Contact form submission (POST)
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Navigation with member control + cart
│   │   ├── Footer.tsx            # Site footer
│   │   └── Promo.tsx             # Promotional banner
│   ├── sections/                 # 27 self-contained page sections
│   │   ├── HeroSection.tsx
│   │   ├── ProductCards.tsx
│   │   ├── ProductCards2.tsx
│   │   ├── ProductHeroSection.tsx
│   │   ├── ShopProductGrid.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Testimonials2.tsx
│   │   ├── ParentingGrowth.tsx
│   │   ├── InteractiveLearning.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── UsageScenarios.tsx
│   │   ├── FAQSection.tsx
│   │   ├── WhatsAppCommunity.tsx
│   │   ├── WhatsAppCommunity2.tsx
│   │   ├── BlogsSwippable.tsx
│   │   ├── BlogsGrid.tsx
│   │   ├── AboutHeroSection.tsx
│   │   ├── CommunityHeroSection.tsx
│   │   ├── ContactUs.tsx
│   │   ├── Team.tsx
│   │   ├── JoinUs.tsx
│   │   ├── OnlineSession.tsx
│   │   ├── OurMission.tsx
│   │   ├── WhyJoinUs.tsx
│   │   └── (more as needed)
│   ├── ui/
│   │   ├── Button.tsx            # Primary button
│   │   ├── LinkButton.tsx        # Link styled as button
│   │   ├── Cart.tsx              # Shopping cart dialog (Radix Dialog)
│   │   ├── HeaderMemberControl.tsx  # Auth/profile dropdown
│   │   ├── CheckoutStatusPage.tsx   # Payment success/failure template
│   │   ├── CheckoutReturnSync.tsx   # Post-checkout sync logic
│   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   ├── SectionHeader.tsx     # Section title component
│   │   ├── DecoStar.tsx          # Decorative star element
│   │   ├── ListItemWithIcon.tsx  # List item with icon
│   │   └── client-only.tsx       # Client-side only wrapper
│   └── JsonLd.tsx                # JSON-LD structured data renderer
├── context/
│   ├── CartContext.tsx            # Cart state + Wix API sync
│   └── ProductsContext.tsx        # Product list state
├── lib/
│   ├── metadata.ts               # Centralized SEO metadata generator
│   ├── seo.ts                    # SEO utilities & schema generators
│   ├── validation.ts             # Zod form validation schemas
│   └── wix/
│       ├── client.ts             # Wix client factory (OAuth strategy)
│       ├── auth.ts               # Token storage (httpOnly cookies, 30-day expiry)
│       ├── member-auth.ts        # Member session helpers
│       └── services/
│           ├── products.ts       # getProducts() with fallback data
│           ├── productById.ts    # getProductById(id)
│           ├── blogs.ts          # Blog listing service
│           └── blogById.ts       # Individual blog post service
└── assets/                       # Static assets

e2e/                              # Playwright E2E tests
├── homepage.spec.ts
├── navigation.spec.ts
├── form-submission.spec.ts
├── accessibility.spec.ts
└── accessibility-axe.spec.ts

public/
├── images/                       # Product, feature, and lifestyle images
│   └── og-image.jpg              # OpenGraph image (1200x630)
├── videos/                       # Hero and promo videos (mp4)
├── robots.txt                    # Search engine directives
└── manifest.json                 # PWA manifest

scripts/
└── optimize-images.js            # Sharp-based image optimization
```

## Backend Architecture (Wix SDK)

The site uses Wix as a headless backend via `@wix/sdk`. All data (products, blog posts, members, orders) lives in Wix.

### Client Setup

```typescript
// src/lib/wix/client.ts — OAuth client factory
import { createClient, OAuthStrategy } from "@wix/sdk";

const wixClient = createClient({
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID }),
  modules: { /* stores, blog, crm, etc. */ },
});
```

### Data Services

All services include **fallback data** so builds succeed even if Wix API is unreachable:

| Service | File | Usage |
|---------|------|-------|
| `getProducts()` | `lib/wix/services/products.ts` | Homepage, shop page |
| `getProductById(id)` | `lib/wix/services/productById.ts` | Product detail page |
| `getBlogs()` | `lib/wix/services/blogs.ts` | Blog listing, homepage carousel |
| `getBlogById(id)` | `lib/wix/services/blogById.ts` | Blog post page |

### Token Management

- Cookie: `wix_tokens` (httpOnly, secure, sameSite: strict, 30-day expiry)
- Functions in `lib/wix/auth.ts`: `getWixTokenStorage()`, `clearWixTokenCookie()`, `isWixConfigured()`

## Authentication System

Full member authentication via Wix Members + OAuth:

### Flows

**Login:** Email/password → POST `/api/member/login` → Wix `authentication.login()` → establish member session → set cookie → return member data

**Signup:** Name + email + password → POST `/api/member/signup` → Wix `authentication.register()` → establish session → return member data

**Forgot Password:** Email → POST `/api/member/forgot-password` → Wix `recovery.sendRecoveryEmail()` → user receives reset link

**Session Check:** GET `/api/member/session` → reads cookie → `getCurrentLoggedInMember()` → returns member or null

**Order History:** GET `/api/member/orders` → requires authenticated member → queries Wix Orders API (uses API key strategy)

### UI

`HeaderMemberControl.tsx` renders the login/signup dialog and profile dropdown in the Header. Uses Radix Dialog for modal.

## Cart & Checkout Flow

### Cart (React Context + Wix API)

`CartContext.tsx` provides:
- `addToCart(item)` → POST `/api/cart`
- `removeFromCart(id)` → DELETE `/api/cart`
- `updateQuantity(id, qty)` → PATCH `/api/cart`
- `clearCart()` → DELETE `/api/cart` (clearAll)
- `refreshCart()` → GET `/api/cart`
- `isCartOpen` / `setCartOpen()` — toggle cart dialog

**Fallback mode:** When Wix is not configured, cart operates with local state only.

### Checkout

1. User clicks "Checkout" in cart dialog
2. POST `/api/cart/checkout` → creates Wix checkout session
3. Wix generates a redirect URL to its hosted payment page
4. Razorpay processes the payment on Wix's side
5. User redirected to `/checkout/success` or `/checkout/failure`

### Razorpay Integration

Razorpay is the payment gateway configured through Wix — there is no direct Razorpay SDK in the codebase.

| Detail | Value |
|--------|-------|
| Plan | Razorpay Standard |
| Merchant ID | RwbjDewrajeQlz |
| Account | finance@kheelona.com |
| Website | https://www.kheelona.com/ (Approved) |
| Payment Methods | Cards, UPI/QR, Netbanking, EMI, Wallet, Pay Later, International |
| Setup Status | 2/3 complete — awaiting first live transaction |

## Design System

### Brand Color Hierarchy

**Primary Brand Colors** (in order of usage frequency):

| Color            | Hex       | Usage                                           |
| ---------------- | --------- | ----------------------------------------------- |
| Tangerine        | `#EF762F` | Primary brand color, CTAs, highlights, headings |
| Sky Blue         | `#50B2D5` | Secondary color, Lumi branding, emphasis        |
| Muted Tan Orange | `#F1A23B` | Accent, subtle harmony, containers              |

**Secondary/Neutral Colors**:

| Color      | Hex       | Usage                                    |
| ---------- | --------- | ---------------------------------------- |
| Pure Black | `#000000` | Text, strokes                            |
| Pure White | `#FFFFFF` | Backgrounds, text on colored backgrounds |

### Color Pairing Rules

| Pairing                      | When to Use                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| Tangerine + Sky Blue         | Maximum vibrancy and contrast to emphasize content (primary pairing for children's toys) |
| Tangerine + Muted Tan Orange | Blended, subtle visual harmony to guide user's eye (e.g., CTAs in containers)            |
| Sky Blue + Muted Tan Orange  | Substitute pairing only when ideal pairs clash in terms of contrast or visibility        |

**Important:** Maximum 2-3 colors in the same canvas/section.

### Typography

| Element       | Font                     | Usage                                         |
| ------------- | ------------------------ | --------------------------------------------- |
| Main Headings | `Luckiest Guy` (Regular) | Hero titles, section headings, short headings |
| Body Text     | `Lato` (400, 700)        | Body content, secondary text, subheadings     |

CSS variables: `--font-lato`, `--font-luckiest-guy`

**Typography Guidelines:**

- Use bright colored headings with thick neutral stroke (black/white) to make content pop while staying readable
- Leave negative space — fonts are already rounded and crowded, so space helps readability
- For lots of body content, use neutral colors (black/white) over muted color backgrounds

### Brand Taglines

- "Smartest playmates for brightest minds"
- "Magical Pets for Little Explorers"

### Tone of Voice

| Attribute       | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| **Playful**     | Speak with enthusiastic spark of fun, curiosity and humor (invite adventure)    |
| **Imaginative** | Use storytelling and vivid imagery, introduce characters and possibilities      |
| **Warm**        | Talk like a caring friend of the same age group — help them feel seen and loved |
| **Joyful**      | Keep the mood light and happy                                                   |
| **Empowering**  | Use uplifting and confident language to boost confidence and character building |
| **Trustworthy** | Communicate with clarity and honesty — show parents they can rely on the toys   |

### Tone of Visuals

- **Vibrant** — Vivid colors
- **Playful** — Quirky fonts
- **Whimsical** — Magical feeling
- **Bold** — Thick fonts, thick strokes

### Communication Do's & Don'ts

**DO:**
- Use lighthearted, imaginative, encouraging words and adventurous tones
- Speak gently, empathically, hopeful and with confidence in the child
- Use regular affirmations and words of encouragement

**DON'T:**
- Force baby-ish words or over-coddle — don't seem overdramatic
- Be overly factual, harsh, dry, robotic, or emotionless
- Invalidate emotions — instead acknowledge and say "I know it's hard, but we can figure it out together"

### Visual Design Do's & Don'ts

**DO:**
- Use bright colored headings with thick neutral stroke (black/white) for pop + readability
- Leave negative space for content to breathe and be absorbed
- Use neutral colors for text-heavy sections over muted backgrounds

**DON'T:**
- Overuse bright colors in wrong context/background — avoid overcrowded look
- Mix too many colors — maximum 2-3 colors per canvas/section
- Imbalance Luckiest Guy and Lato fonts — use proper proportion as per design guidelines

## Commands

```bash
# Development
npm run dev               # Start dev server
npm run build             # Production build
npm start                 # Start production server
npm run analyze           # Bundle analysis (ANALYZE=true)

# Code Quality
npm run lint              # ESLint check
npm run lint:fix          # ESLint auto-fix
npm run format            # Prettier format
npm run format:check      # Prettier check

# Testing
npm run test              # Vitest (watch mode)
npm run test:run          # Vitest (single run)
npm run test:coverage     # Vitest with coverage
npm run test:e2e          # Playwright E2E
npm run test:e2e:ui       # Playwright with UI
npm run test:e2e:headed   # Playwright headed browsers
```

## Environment Variables

```env
# .env.local (required for full functionality)

# Public (accessible in browser)
NEXT_PUBLIC_WIX_CLIENT_ID=your-wix-oauth-client-id

# Private (server-only)
WIX_API_KEY=your-wix-api-key
WIX_ACCOUNT_ID=your-wix-account-id
WIX_CONTACT_FUNCTION_URL=your-wix-contact-webhook-url
```

Without these, the site still builds and renders (fallback data), but cart, auth, checkout, and contact form won't work.

## Responsive Design

All components use Tailwind CSS responsive prefixes:

```tsx
<h1 className="text-2xl md:text-4xl lg:text-6xl">Heading</h1>
```

Tailwind default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## SEO

### JSON-LD Structured Data (layout.tsx)

- `BreadcrumbList` — navigation hierarchy
- `Organization` — company info, logo, social links
- `WebSite` — site metadata with search action
- `WebPage` — page-level metadata
- `Product` — Lumi toy (price, ratings, reviews)
- `FAQPage` — 50+ FAQ items

### Meta Tags

- OpenGraph with locale alternates (en_US, en_IN, hi_IN)
- Twitter cards
- AI/LLM optimization tags (ai:description, ai:keywords, etc.)
- Geographic metadata (Bangalore, India)
- Dublin Core metadata

### Search Engine Configuration

- `robots.txt` — allows AI crawlers (OpenAI, Anthropic, Perplexity), blocks `/api/`, `/admin/`, `/private/`
- `sitemap.ts` — dynamic sitemap with 20+ URLs, priority-weighted
- `llms.txt` / `llms-full.txt` — AI system documentation

### Metadata Utilities

```typescript
// src/lib/metadata.ts — centralized SEO for all pages
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Shop",
  description: "...",
  path: "/shop",
});
```

## Image Guidelines

Always use Next.js `Image` for optimization:

```tsx
import Image from "next/image";

// Above-fold (eager load)
<Image src="/images/hero.webp" alt="..." width={1920} height={1080} priority sizes="100vw" />

// Below-fold (lazy load)
<Image src="/images/product.webp" alt="..." width={800} height={600} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
```

Remote images from Wix CDN (`static.wixstatic.com`) are configured in `next.config.ts`.

Image formats: AVIF, WebP (configured in next.config.ts).

## Security Headers

Configured in `next.config.ts`:

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer info |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Restrict browser features |
| X-XSS-Protection | 1; mode=block | Legacy XSS protection |
| Content-Security-Policy | Strict CSP (self + Google Analytics) | Prevent XSS |
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Force HTTPS |
| X-Powered-By | (hidden) | Removed via `poweredByHeader: false` |

## Code Quality Standards

### Formatting (Prettier — `.prettierrc`)

- 2-space indentation
- Double quotes for strings
- ES5 trailing commas
- 100 character line width
- LF line endings
- Bracket spacing enabled

### Linting (ESLint 9)

- Next.js rules
- Accessibility rules (jsx-a11y)

### Pre-commit Hooks (Husky + lint-staged)

- Auto-format staged `.ts`, `.tsx`, `.js`, `.jsx` files
- Run ESLint fix on staged files
- Format `.json`, `.css`, `.md` files

## Error Handling

1. **ErrorBoundary** (`components/ui/ErrorBoundary.tsx`) — wraps app in layout.tsx, catches React errors
2. **error.tsx** — Next.js App Router error page with "Try Again"
3. **not-found.tsx** — Custom 404 page
4. **API fallbacks** — Wix services return fallback data if API fails during build
5. **Cart fallback** — Works with local state when Wix is not configured

## Testing

### Unit Tests (Vitest)

- Config: `vitest.config.ts` (jsdom environment, globals enabled)
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Setup: `src/test/setup.ts`

### E2E Tests (Playwright)

- Config: `playwright.config.ts`
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Tests: homepage, navigation, form submission, accessibility (axe-core)
- Auto-starts dev server on port 3000

## Deployment

| Setting | Value |
|---------|-------|
| Platform | Vercel |
| Output | standalone |
| Build | `npm run build` |
| Framework | Next.js (auto-detected) |
| Domain | kheelona.com |
| Config | `vercel.json` |

## CI/CD

### Dependabot (`.github/dependabot.yml`)

- NPM: weekly on Monday 03:00 UTC, limit 5 PRs, prefix `chore(deps)`, reviewer @tanmoy
- GitHub Actions: weekly Monday 04:00 UTC
- Ignores Next.js major version bumps

## State Management

### CartContext (`src/context/CartContext.tsx`)

Client-side cart state synced with Wix currentCart API. Provides `useCart()` hook with add, remove, update, clear, refresh operations. Includes `isCartOpen` state for cart dialog toggle.

### ProductsContext (`src/context/ProductsContext.tsx`)

Client-side product list. Provides `useProducts()` hook with `setProducts()` and `firstProduct` computed accessor.

## Key Patterns

- **Server Components**: All pages are async server components that fetch data at render time
- **Client Components**: Cart, auth UI, and interactive sections use `"use client"` directive
- **Fallback data**: Wix services include hardcoded fallback products/blogs for build reliability
- **Cookie auth**: httpOnly, Secure, SameSite cookies for Wix member tokens
- **Section architecture**: Each section component is self-contained with its own data and styling
