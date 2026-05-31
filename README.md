# 🏆 MAISON FOURRURE — Luxury Fur Fashion E-Commerce Prototype

> **"Timeless Elegance, Crafted Since 1985"**

![Hero Section](https://burst.shopifycdn.com/photos/high-fashion-in-fur.jpg?width=1200)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Design System](#-design-system)
- [Technical Stack](#-technical-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Routes & Pages](#-routes--pages)
- [Prototype Data](#-prototype-data)
- [Deployment Pipeline](#-deployment-pipeline)
- [Version Control](#-version-control)

---

## 🏛️ Overview

**Maison Fourrure** (French for "Fur House") is a high-fidelity interactive prototype for an 18+ age-restricted online fur fashion boutique. It was built to demonstrate a complete luxury e-commerce experience — from age-gated entry through product discovery to checkout — for stakeholder presentation.

### The Problem

A physical fur boutique with decades of heritage had **zero digital presence**. Their international clientele had no way to browse inventory, understand the brand's craftsmanship story, or initiate purchases online. The luxury fur market is highly visual and trust-driven — a generic Shopify template wouldn't communicate the atelier's heritage.

### The Solution

A custom-crafted Next.js prototype that:

- **Enforces 18+ age verification** at the entry point (account-based birthdate validation)
- **Showcases 30 products** across 6 categories with editorial-quality imagery
- **Delivers a complete shopping flow** — browse, filter, product detail, cart, multi-step checkout
- **Provides an admin dashboard** for inventory and order management
- **Embodies luxury** through a meticulously designed UI system

### Business Goals

| Goal | How the Prototype Addresses It |
|---|---|
| Global brand awareness | Professional digital storefront accessible worldwide |
| Lead generation | Account creation captures interested buyers |
| Physical store foot traffic | Store location info + CTA to visit boutique |
| Market validation | Full prototype to test demand before full build |
| Investor/stakeholder buy-in | Polished UX to demonstrate vision and capability |

---

## 🎨 Design System

### Brand Identity

**Name:** Maison Fourrure  
**Tagline:** "Timeless Elegance"  
**Tone:** Editorial, luxurious, understated, heritage-driven  
**Vibe:** *Harper's Bazaar meets Net-a-Porter* — premium editorial with clean commerce UX

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `luxury-charcoal` | `#1A1A1A` | Primary text, buttons, dark sections |
| `luxury-ivory` | `#FFFFF0` | Page background, light sections, text-on-dark |
| `luxury-cream` | `#F5F0E8` | Section alt backgrounds, cards |
| `luxury-gold` | `#C9A84C` | Accents, CTAs, highlights, dividers |
| `luxury-goldLight` | `#E8D48B` | Gold hover states |
| `luxury-black` | `#0A0A0A` | Hero overlays, footer, modal backdrops |
| `luxury-white` | `#FFFFFF` | Input backgrounds, card surfaces |
| `luxury-gray-light` | `#F3F3F3` | Image placeholders, subtle dividers |
| `luxury-gray` | `#888888` | Secondary text, metadata, captions |
| `luxury-gray-dark` | `#444444` | Body paragraph text |

### Typography

| Role | Font | Weight | Sizing |
|---|---|---|---|
| **Display / Headings** | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | 400–700 italic | `text-3xl` to `text-7xl` |
| **Body / UI Labels** | [Inter](https://fonts.google.com/specimen/Inter) | 300–700 | `text-xs` to `text-base` |

**Hierarchy Rules:**
- Hero headings: `font-display font-bold text-4xl/6xl/7xl`
- Section titles: `font-display font-bold text-3xl/4xl/5xl`
- Subtitles: `font-body text-sm md:text-base uppercase tracking-[0.25em] text-luxury-gray font-semibold`
- Body: `font-body text-sm md:text-base text-luxury-gray-dark leading-relaxed`
- Labels/CTAs: `font-display text-sm uppercase tracking-widest font-semibold`

### UI Components

#### Buttons

| Variant | Style | Usage |
|---|---|---|
| `btn-primary` | Charcoal bg, ivory text, shadow | Primary actions (Shop, Sign In) |
| `btn-secondary` | Transparent, 2px charcoal border | Secondary actions (Our Story) |
| `btn-gold` | Gold bg, charcoal text, gold glow | Hero CTAs, featured actions |
| `btn-ghost` | Transparent, no border | Subtle actions (Sign Out) |

All buttons have:
- `font-display text-sm tracking-widest uppercase font-semibold`
- Hover: color inversion or darkening
- `transition-colors duration-300 ease-out`
- `disabled:opacity-50 disabled:cursor-not-allowed`

#### Form Elements

| Element | Style |
|---|---|
| `input-field` | White bg, 1px gray border, gold focus ring |
| Quantity selector | Border container with − / + buttons |

#### Cards

| Component | Description |
|---|---|
| `ProductCard` | 3:4 aspect ratio image, material label, product name, price, rating stars |
| Category card | Aspect-ratio image with gradient overlay + text overlay |

#### Navigation

**Header** (sticky, backdrop-blur):
- Logo: MAISON FOURRURE (gold accent)
- 4 nav items: **Collection**, **Categories** (dropdown with 6 categories), **About**, **Bag** (with badge)
- Auth: Sign In button / user name + Sign Out
- Fully responsive with mobile hamburger menu

**Footer:**
- Brand story, quick links (categories), contact info
- Est. 1985 · Milano · Paris · New York
- 18+ notice, copyright, legal links

### UX Patterns

| Pattern | Implementation |
|---|---|
| **Age Gate** | Full-screen modal on first visit. Requires birthdate (DD/MM/YYYY). Age calculated client-side. 18+ required. Stores verification in sessionStorage. |
| **Auth Flow** | Login with demo credentials. Signup with 2-step process (age verify → create account). Session via sessionStorage + Zustand store. |
| **Loading States** | Spinner component for async data. Featured products show inline spinner until fetched. |
| **Empty States** | Empty cart shows illustration + CTA to shop. No results shows "No Results Found" with suggestion to adjust filters. |
| **Error Handling** | API errors caught client-side. Product not found shows 404 page with link back to collection. |
| **Responsiveness** | Mobile-first. Breakpoints at sm (640), md (768), lg (1024). Grid adapts from 1→2→4 columns. |
| **Checkout Flow** | 4-step: Shipping → Review → Payment (mock) → Confirmation. Progress indicator. |
| **Admin Auth** | Client-side role check via sessionStorage. Non-admin users redirected to login. |

---

## ⚙️ Technical Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.2.35 | React framework with App Router |
| [React](https://react.dev/) | 18.3.0 | UI runtime |
| [TypeScript](https://www.typescriptlang.org/) | 5.4+ | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.0 | Utility-first styling |
| [Zustand](https://github.com/pmndrs/zustand) | 4.5.7 | Lightweight state management |

### Supporting Libraries

| Library | Purpose |
|---|---|
| `next-auth` | Auth session framework (scaffolded for future use) |
| `zustand/middleware` | State persistence (removed for SSR safety, ready to re-enable) |
| `Playfair Display` + `Inter` | Google Fonts (loaded via CSS @import) |

### Why No Backend?

This is a **frontend-only prototype**. All product, category, user, and order data is served from:

1. **JSON files** (`/data/*.json`) — readable via Next.js API Route Handlers (`/api/*`)
2. **next/image** configured for remote images from Burst (Shopify CDN) and Unsplash

In production, these JSON files would be replaced with a real database (PostgreSQL, MongoDB) and an API layer (Node.js/Express, Python/FastAPI, etc.).

---

## 📁 Project Structure

```
fashion_store_v1/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page (hero, categories, featured, CTA)
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── globals.css               # Tailwind + luxury design tokens
│   │
│   ├── (public)/                 # Age-gated shop routes
│   │   ├── products/page.tsx     # Product listing (filter, sort, search)
│   │   ├── products/[slug]/      # Product detail (gallery, sizes, add-to-cart)
│   │   ├── cart/page.tsx         # Shopping cart
│   │   └── checkout/page.tsx     # Multi-step checkout
│   │
│   ├── auth/                     # Public auth routes
│   │   ├── login/page.tsx        # Login with demo credentials
│   │   └── signup/page.tsx       # 2-step: age verify → create account
│   │
│   ├── admin/                    # Admin routes (role-gated)
│   │   ├── dashboard/page.tsx    # Stats, products, orders overview
│   │   ├── products/page.tsx     # Full product table
│   │   └── orders/page.tsx       # Order management table
│   │
│   └── api/                      # Mock REST API route handlers
│       ├── products/route.ts     # GET /api/products (list, filter, search)
│       ├── products/[id]/route   # GET /api/products/:id
│       ├── categories/route.ts   # GET /api/categories
│       ├── users/route.ts        # GET /api/users
│       ├── orders/route.ts       # GET /api/orders
│       └── auth/route.ts         # POST /api/auth (login), GET (verify age)
│
├── components/
│   ├── layout/Header.tsx         # Sticky nav with 4 items + auth
│   ├── layout/Footer.tsx         # Brand story + links + contact
│   ├── product/ProductCard.tsx   # Product grid card
│   └── ui/AgeGateModal.tsx       # 18+ verification modal
│
├── data/                         # Mock JSON databases
│   ├── products.json             # 30 products across 6 categories
│   ├── categories.json           # 6 categories with images
│   ├── users.json                # Mock users (admin + customers)
│   └── orders.json               # Sample orders
│
├── lib/
│   ├── api.ts                    # Data fetching utilities (Node.js fs-based)
│   └── utils.ts                  # Format price, date, age calc, slugify
│
├── store/
│   ├── authStore.ts              # Zustand auth state (in-memory)
│   └── cartStore.ts              # Zustand cart state (in-memory)
│
├── middleware.ts                 # Route protection scaffold
├── next.config.mjs               # Next.js config (remote image patterns)
├── tailwind.config.ts            # Tailwind config (extended colors, fonts)
└── tsconfig.json                 # TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (tested on v20.20.2)
- **npm** 9+ (tested on 10.8.2)

### Installation

```bash
# Clone the repository
git clone git@github.com:HussamAlraggad/fashion_store_v1.git
cd fashion_store_v1

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# → http://localhost:3000
```

### Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@fashionstore.com | admin123 |
| **Customer** | elena.voss@example.com | customer123 |

### Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🗺️ Routes & Pages

| Route | Type | Auth Required | Description |
|---|---|---|---|
| `/` | Static | 18+ | Landing page — hero, categories, featured products, brand story, CTA |
| `/products` | Static | 18+ | Product listing — grid with filter, sort, search |
| `/products/[slug]` | Dynamic | 18+ | Product detail — image gallery, sizes, add-to-cart |
| `/cart` | Static | 18+ | Shopping cart — quantity controls, order summary |
| `/checkout` | Static | 18+ | Multi-step checkout — shipping → review → payment → confirmation |
| `/auth/login` | Static | None | Account login with demo credentials |
| `/auth/signup` | Static | None | Account creation with age verification |
| `/admin/dashboard` | Static | Admin | Dashboard — stats, recent orders, product overview |
| `/admin/products` | Static | Admin | Product management table |
| `/admin/orders` | Static | Admin | Order management table |
| `/api/*` | Dynamic | None | Mock REST API endpoints |

---

## 📊 Prototype Data

### Products — 30 Items Across 6 Categories

| Category | Count | Example Products |
|---|---|---|
| **Outerwear** | 4 | Imperial Mink Overcoat, Sable Fur Jacket, Chinchilla Vest |
| **Stoles & Wraps** | 4 | Silver Fox Stole, Lynx Shawl, Sable Stole |
| **Intimate Apparel** | 5 | Fur-Trimmed Silk Kimono, Mink Bodysuit, Fox Lingerie Set |
| **Accessories** | 9 | Bucket Hat, Earmuffs, Trapper Hat, Gloves, Headband, Belt |
| **Faux Fur** | 5 | Leopard Coat, Snood Scarf, Gilet, Pom Pom Scarf, Bolero |
| **Home Decor** | 3 | Throw Pillow, Throw Blanket, Area Rug |

### Image Sources

All product images are served online from:

- **Burst (Shopify CDN)** — `burst.shopifycdn.com` — Real fur/faux fur fashion photography (13 images)
- **Unsplash** — `images.unsplash.com` — Fur coats, accessories, intimate, luxury lifestyle (8 images)

All 21 image URLs are verified working (HTTP 200) and return JPEG content.

---

## 🚢 Deployment Pipeline

### Phase 1: Prototype Review ✅ *Current*

- Local development on `http://localhost:3000`
- Stakeholder walkthrough
- Feedback collection
- Iteration on design + content

### Phase 2: GitHub Setup ✅ *Complete*

- Repository initialized: `git@github.com:HussamAlraggad/fashion_store_v1.git`
- Branch: `main`
- `.gitignore` configured for Next.js artifacts

### Phase 3: Static Export or Vercel Deployment

**Option A — Vercel (Recommended)**

Vercel is the official Next.js deployment platform and offers the smoothest experience:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Advantages:
- Automatic HTTPS/SSL
- Automatic preview deployments per branch
- Zero configuration for Next.js
- Edge Functions support
- Analytics built-in

**Option B — Static Export**

If a simple static site is preferred:

```bash
# Build with static export
npm run build

# The /out directory contains the static site
# Serve it via any static host (GitHub Pages, Netlify, S3, etc.)
```

Note: Static export disables API routes and dynamic features (cart, auth, checkout). Only suitable for a static catalog demo.

### Phase 4: Custom Domain & Branding

- Configure custom domain (e.g., `maisonfourrure.com`)
- Set up email forwarding
- Configure analytics (Vercel Analytics, Google Analytics, or Plausible)

### Phase 5: Production Transition

- Replace mock JSON data with real database (PostgreSQL / Supabase)
- Implement real authentication (NextAuth.js with credentials/JWT)
- Integrate payment processing (Stripe)
- Add real product images provided by the store
- Implement proper 18+ verification with document upload if required by jurisdiction

---

## 🔄 Version Control

### Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable prototype, always deployable |
| `feature/*` | New features or experiments |
| `fix/*` | Bug fixes |

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add product listing page with filters
fix: resolve age gate rendering on initial load
fix: replace placeholder images with fur fashion photography
docs: add design system documentation to README
chore: update dependencies
```

---

## 📸 Screenshots

<!-- Screenshots will be added here once UI is finalized -->
<!-- ![Landing Page](screenshots/landing.png) -->
<!-- ![Product Detail](screenshots/product-detail.png) -->
<!-- ![Checkout Flow](screenshots/checkout.png) -->

---

## 📝 License

MIT — See [LICENSE](./LICENSE) for details.

---

*Built with ❤️ for Maison Fourrure — "Timeless Elegance, Crafted Since 1985"*
