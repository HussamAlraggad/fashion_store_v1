# JOURNAL.md - Project Roadmap & Phases

## Current Status
**Active Phase:** Phase 1 (Foundation & Data Layer)
**Overall Progress:** 0%

---

## Phase 1: Foundation & Data Layer (P0)
* [ ] Initialize Next.js 14 app with Tailwind CSS (`fashion_store_v1`).
* [ ] Scaffold the exact directory structure outlined in the project brief.
* [ ] Configure global CSS variables for the luxury color palette and typography.
* [ ] Create mock JSON databases in `/data/` (`products.json`, `categories.json`, `users.json`, `orders.json`) with realistic, high-quality mock data.
* [ ] Build foundational Next.js API Route Handlers (`/api/products`, etc.) to serve the JSON data.

## Phase 2: Authentication & Middleware Age-Gate (P0)
* [ ] Configure NextAuth.js with a custom credentials provider.
* [ ] Build the `/(auth)/signup` page requiring a valid birthdate (must calculate to 18+).
* [ ] Build the `/(auth)/login` page.
* [ ] Implement Next.js `middleware.ts` to protect all shop and admin routes, redirecting unverified users to a blocked/login view.

## Phase 3: Core E-commerce Catalog (P0)
* [ ] Build layout wrappers (Navbar, Footer, minimal editorial design).
* [ ] Develop the Landing Page (hero sections, featured categories).
* [ ] Build the Product Listing Page (PLP) with category, price, and material filters.
* [ ] Build the Product Detail Page (PDP) featuring high-quality image placeholders, CITES compliance mock info, and variants (size/color).

## Phase 4: Cart & Checkout Flow (P0/P1)
* [ ] Initialize Zustand `cartStore` with localStorage persistence.
* [ ] Build slide-out Cart component (Add/Remove/Update qty/Real-time summary).
* [ ] Build multi-step Checkout Flow (Shipping → Review → Mock Payment → Confirmation).

## Phase 5: Admin Suite & User Profiles (P1)
* [ ] Build `/(admin)/dashboard` protected by admin-role middleware.
* [ ] Implement product CRUD interface (reading/writing to JSON via API routes).
* [ ] Implement order management interface.
* [ ] Build customer profile page (Order history, saved addresses).

## Phase 6: Polish & Stretch Goals (P2)
* [ ] Implement mock GDPR/CCPA cookie consent banner.
* [ ] Add Wishlist functionality (Zustand).
* [ ] Add Store Location page with mock map and physical boutique info.
* [ ] Final UI/UX audit across breakpoints (mobile/tablet/desktop).
