# JOURNAL.md - Project Roadmap & Phases

## Current Status
**Active Phase:** Phase 8 (GitHub Deployment)
**Overall Progress:** ~95%

---

## Phase 1: Foundation & Data Layer (P0) ✅ COMPLETED
- [x] Initialize Next.js 14 app with Tailwind CSS (`fashion_store_v1`).
- [x] Scaffold the exact directory structure outlined in the project brief.
- [x] Configure global CSS variables for the luxury color palette and typography.
- [x] Create mock JSON databases in `/data/` (`products.json`, `categories.json`, `users.json`, `orders.json`) with realistic, high-quality mock data (25 products, 5 categories).
- [x] Build foundational Next.js API Route Handlers (`/api/products`, `/api/categories`, `/api/users`, `/api/orders`, `/api/auth`) to serve the JSON data.

## Phase 2: Authentication & Middleware Age-Gate (P0) ✅ COMPLETED
- [x] Fix demo credentials in `users.json` to match login page hints.
- [x] Add session-based auth flow: `POST /api/auth` sets httpOnly session cookie.
- [x] Add registration endpoint: `PUT /api/auth` validates age + creates user.
- [x] Add logout endpoint: `DELETE /api/auth` clears session cookie.
- [x] Strengthen `middleware.ts` — protects `/admin/*` (admin role), `/products`, `/cart`, `/checkout` (auth required).
- [x] Wire Zustand `authStore` to sessionStorage with `initialize()` on mount.
- [x] Login/signup pages call `useAuthStore.login()` to sync state immediately.

## Phase 3: Core E-commerce Catalog (P0) ✅ COMPLETED
- [x] Build layout wrappers (Navbar, Footer, minimal editorial design).
- [x] Develop the Landing Page (hero sections, featured categories, brand story).
- [x] Build the Product Listing Page (PLP) with category, price, and material filters.
- [x] Build the Product Detail Page (PDP) featuring high-quality image placeholders, CITES compliance mock info, and variants (size/color).

## Phase 4: Cart & Checkout Flow (P0/P1) ✅ COMPLETED
- [x] Initialize Zustand `cartStore` with localStorage persistence.
- [x] Build Cart page with add/remove/qty/real-time summary.
- [x] Build multi-step Checkout Flow (Shipping → Review → Mock Payment → Confirmation).

## Phase 5: Admin Suite & User Profiles (P1) ✅ COMPLETED
- [x] Build `/admin/dashboard` protected by admin-role middleware (client-side check).
- [x] Implement product overview table (reading from JSON via API routes).
- [x] Implement order management interface with status tracking.
- [x] Build customer profile page at `/profile` with order history, saved addresses, and user info.
- [x] Add profile link in Header for authenticated users (desktop + mobile).

## Phase 6: Polish & Stretch Goals (P2) ✅ COMPLETED
- [x] Implement mock GDPR/CCPA cookie consent banner (`CookieConsent.tsx`, added to root layout).
- [x] Add Wishlist functionality (`wishlistStore.ts`, `/wishlist` page, heart button on PDP, nav links).
- [x] Add Store Location page (`/boutique` page with mock map, address, hours, services).
- [x] Final UI/UX audit across breakpoints (mobile/tablet/desktop).

## Phase 7: Dark Theme ✅ COMPLETED
- [x] Dark mode CSS variables in `globals.css` (`.dark` class overrides all design tokens).
- [x] Theme toggle component (`ThemeToggle.tsx`) with localStorage persistence.
- [x] Toggle placed in Header, respects system `prefers-color-scheme` on first visit.
- [x] Bag & Wishlist nav items reduced to icon-only for cleaner header.

## Phase 8: GitHub Deployment
- [ ] Configure GitHub repository and remote origin.
- [ ] Build production bundle.
- [ ] Deploy to GitHub Pages or Vercel.
- [ ] Verify live site works end-to-end.
