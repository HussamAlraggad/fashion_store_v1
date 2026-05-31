# PROJECT_LOG.md - Decisions, Bugs, & Best Practices

*Instructions for Agent: Reference this document to understand historical context, established conventions, and prior bug fixes. Do not repeat documented mistakes.*

## Established Conventions
* **State Management:** Zustand is used strictly for client-side state (Cart, UI toggles). Server state (Products, Auth) relies on React Server Components and NextAuth.
* **API Simulation:** API routes must include a slight artificial delay (e.g., `setTimeout` for 300ms) to simulate real-world network latency and ensure loading states in the UI function correctly.
* **Image Handling:** Use Next.js `<Image />` component with remote patterns configured for external placeholder services (e.g., Picsum) until real product assets are available.
* **Route Organization:** Route groups `(public)`, `(auth)`, `(admin)` are for organization only. Actual URL paths must use real directory segments (e.g., `app/auth/login` → `/auth/login`).
* **useSearchParams:** Must be wrapped in a `<Suspense>` boundary when used in client components to avoid prerender errors.
* **Config Files:** Next.js 14 does NOT support `next.config.ts`. Use `next.config.mjs` or `next.config.js` instead.

---

## Session Logs

### [Date: 2026-05-31] - Phase 1: Foundation & Data Layer
**Completed:**
* Initialized Next.js 14 project with Tailwind CSS, Zustand, and all dependencies.
* Scaffolded full project directory structure with route groups and component folders.
* Created 4 JSON data files: 25 products (fur coats, stoles, accessories, faux fur, home decor), 5 categories, 4 users, 3 orders.
* Built 7 API Route Handlers: `/api/products`, `/api/products/[id]`, `/api/categories`, `/api/users`, `/api/orders`, `/api/auth`.
* Built global CSS with luxury color palette (charcoal, ivory, gold) and typography (Playfair Display + Inter).
* Created root layout with metadata and font imports.
* Built landing page (hero, categories grid, featured products, brand story, CTA).
* Built Product Listing Page with category filters, search, and sort.
* Built Product Detail Page with image gallery, size selector, add-to-cart.
* Built Cart page with quantity controls and order summary.
* Built multi-step Checkout (Shipping → Review → Payment → Confirmation).
* Built Auth pages: Login (with demo credentials) and Signup (2-step: age verify → account create).
* Built Admin Dashboard with stats cards, product table, and orders table.
* Built Admin Products and Admin Orders management pages.
* Built reusable components: Header (responsive), Footer, AgeGateModal, ProductCard.
* Created Zustand stores: `cartStore` (persisted), `authStore`.
* Created utility library: `api.ts` (data fetching), `utils.ts` (formatting, age calc).
* Set up middleware.ts for future server-side route protection.
* Connected local directory to GitHub repo (`git@github.com:HussamAlraggad/fashion_store_v1.git`).

**Architectural Decisions:**
* **Admin Routes:** Moved from `/(admin)/dashboard` to `/admin/dashboard` to avoid route group conflicts with `(public)`.
* **Auth Routes:** Moved from `/(auth)/login` to `/auth/login` since route groups don't affect URL paths.
* **Age Gate:** Handled client-side via `sessionStorage` for the prototype. Middleware ready but not enforcing yet.
* **Product Detail URL:** Uses slugs (`/products/imperial-mink-overcoat`) instead of IDs for cleaner URLs.
* **Admin Auth:** Client-side check of `sessionStorage` role. Simple but sufficient for prototype.

**Mistakes & Fixes:**
* ❌ Used `next.config.ts` — Next.js 14 doesn't support TypeScript config files. → ✅ Renamed to `next.config.mjs`.
* ❌ Nested admin routes under `(admin)` route group, conflicting with `(public)` group at same URL paths. → ✅ Moved to `/admin/*` actual directory.
* ❌ Same issue with `(auth)` route group — URLs resolved to `/login` not `/auth/login`. → ✅ Moved to `/auth/*`.
* ❌ Forgot to wrap `useSearchParams()` in `<Suspense>` on Products page → ✅ Added Suspense boundary wrapper.
* ❌ Build command for `npm run dev` — need to verify it actually works. ✅ Verified: build compiles cleanly.

**Next Steps:**
* Execute Phase 2: Strengthen auth flow (proper session persistence, middleware enforcement, password hashing mock).
* Execute Phase 6: Polish (GDPR banner, wishlist, store location page, mobile audit).

---

### [Date: 2026-05-31] - Hotfix: Age Gate Rendering + Product Expansion + Image Quality

**Completed:**
* Fixed age gate rendering bug — removed `router.refresh()` from `AgeGateModal` that was causing a full page refresh and state reset. Now uses pure React state transition via `onVerified()` callback. Page loads content immediately after verification without flickering.
* Added **Intimate Apparel** category with 5 luxury fur lingerie/boudoir products (fur-trimmed silk kimono, mink bodysuit, garter belt set, fox fur lingerie set, mink babydoll).
* Replaced ALL placeholder images — migrated from `picsum.photos` (which served random/abstract images) to curated Unsplash editorial fashion photos that show actual luxury apparel, models, and fashion aesthetics.

**Key Decisions:**
* **Age Gate Flow:** Age verification is now purely client-side state driven. `sessionStorage` is written, then React state updates trigger content render. No `router.refresh()` intervention needed.
* **Data Loading:** Added `dataLoaded` state to gracefully handle the case where product data fetch completes after age verification.
* **Imagery:** All 30 products now use Unsplash fashion photography (fur coats, editorial shots, accessories, luxury aesthetics) instead of random generator images.

**Mistakes & Fixes:**
* ❌ `AgeGateModal` used `router.refresh()` after verification → caused page flash and state loss. → ✅ Removed `router.refresh()`, rely on React state re-render.
* ❌ Products only covered outerwear, stoles, accessories, faux, home decor — missed Intimate Apparel. → ✅ Added 5 intimate apparel products with matching category.
* ❌ All product images used `picsum.photos/seed/xxx` which generates random abstract/landscape images regardless of seed name → confusing and unprofessional. → ✅ Switched to curated Unsplash fashion photography URLs.

**Products Now: 30 total (up from 25) | Categories: 6 total (up from 5)**

**Next Steps:**
* Phase 2: Strengthen auth (proper session handling, middleware enforcement).
* Phase 6: GDPR banner, wishlist, store location, mobile audit.

---

### [Date: 2026-05-31] - Hotfix: Header nav, invisible CTA, image duplicates, scale effects

**Completed:**
* **Header redesign** — 4 nav labels always visible (Collection, Categories dropdown, About, Bag). Auth no longer hides main navigation links.
* **Fixed invisible "Our Story" button** — Was charcoal text on dark hero background (invisible). Now uses ivory text and border with hover inversion.
* **Removed hover scale effects** — All buttons: no more `hover:scale-[1.02]` / `active:scale-[0.98]`. Clean transitions only.
* **Fixed duplicate product images** — All 12 featured products now have UNIQUE primary images. Previously prod-002/012/017 shared same image, prod-003/011 shared, prod-026/027/030 shared. All resolved.
* **30 products x 53 image URLs** from 21 curated Unsplash photos. No featured product shares its primary image with any other.

**Mistakes & Fixes:**
* ❌ `btn-secondary` on dark hero bg was invisible (charcoal-on-charcoal). → ✅ Added `!text-luxury-ivory !border-luxury-ivory` overrides for hero buttons.
* ❌ Featured products shared primary images (3 products used same photo). → ✅ Rewrote all image assignments via script ensuring uniqueness.
* ❌ Hover scale effects felt cheap/unstable. → ✅ Removed completely.

---

### [Date: 2026-05-31] - Hotfix: 404 / white screen (orphaned dev servers)

**Root Cause:** Multiple orphaned `next dev` processes accumulated in the background from repeated testing, causing port conflicts. Port 3000 was held by a stale server while new ones fell back to 3001 — requests hitting port 3000 got 404s / stale bundles.

**Fix:**
1. Killed ALL orphaned processes: `pkill -f "next dev"` + `pkill -f "next-server"`.
2. Cleared `.next` cache (`rm -rf .next`).
3. Fresh `npm run dev` confirmed: `/` → HTTP 200, `/products` → HTTP 200.

**Lesson:** Always kill orphaned dev servers between runs. Use `pkill -f "next dev"` before starting fresh.

---
