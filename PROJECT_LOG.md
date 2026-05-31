# PROJECT_LOG.md - Decisions, Bugs, & Best Practices

*Instructions for Agent: Reference this document to understand historical context, established conventions, and prior bug fixes. Do not repeat documented mistakes.*

## Established Conventions
* **State Management:** Zustand is used strictly for client-side state (Cart, UI toggles). Server state (Products, Auth) relies on React Server Components and NextAuth.
* **API Simulation:** API routes must include a slight artificial delay (e.g., `setTimeout` for 300ms) to simulate real-world network latency and ensure loading states in the UI function correctly.
* **Image Handling:** Use Next.js `<Image />` component with remote patterns configured for external placeholder services (e.g., Picsum) until real product assets are available.

---

## Session Logs

### [Date: 2026-05-31] - Project Kickoff & Specification
**Completed:**
* Finalized the comprehensive project brief.
* Generated the 3 Sources of Truth (`AGENT.md`, `JOURNAL.md`, `PROJECT_LOG.md`).
* Established Next.js 14 App Router, Tailwind, and Zustand as the core stack.
* Locked in the primary visual inspiration for the product catalog and UI aesthetic (https://pin.it/33M8PRCAg).

**Architectural Decisions:**
* **Database:** Decided to bypass a real database for the prototype phase. All data will read from and write to local JSON files in the `/data/` directory using Node's `fs` module inside Next.js API routes.
* **Age Verification:** Handled purely through account creation. Guest checkout is disabled. Middleware will check for a valid session token before allowing access to product routes.

**Roadblocks / Mistakes:**
* *None yet.*

**Next Steps:**
* Execute Phase 1: Initialize the repository and scaffold the `fashion_store_v1` directory structure.

---
*(Append new entries below this line)*
