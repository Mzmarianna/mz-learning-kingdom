# ADR 001: Web Stack Selection
- **Date:** 2025-11-05
- **Status:** Accepted
- **Context**
  - Learning Kingdom needs a modern web platform that supports internationalization, fast iteration, and rich UI for tutoring quests and dashboards.
  - The team already favors React and TypeScript, but must balance SSR, routing, and deployment simplicity.
  - Hosting must integrate cleanly with Firebase services (Auth, Firestore, Functions) while allowing edge-friendly delivery and analytics.
  - The roadmap targets Vercel for primary hosting, so alignment with their build/runtime model reduces operational overhead.

- **Decision**
  - Use Next.js 15 App Router with TypeScript as the primary web framework, paired with Tailwind CSS for utility-first styling and component consistency.
  - Deploy the frontend through Vercel, while continuing to rely on Firebase (Auth, Firestore, Storage, Cloud Functions) for backend capabilities.
  - Maintain Jest for unit testing, with room to introduce Playwright for end-to-end coverage later.

- **Consequences**
  - **Positive:**
    - App Router provides built-in routing, layouts, and server actions aligned with product needs.
    - Tight Vercel integration simplifies preview deployments, environment management, and performance analytics.
    - Tailwind CSS accelerates UI development and keeps design tokens centralized.
    - Firebase handles real-time data, authentication, and serverless workloads without bespoke infrastructure.
  - **Negative / Mitigations:**
    - Must track Next.js release cadence and avoid canary regressions; pin to 15.5.6 and schedule upgrades.
    - Server-side rendering increases demand for careful caching and data-fetching patterns; document best practices in future ADRs.
    - Deep reliance on Vercel and Firebase introduces vendor coupling; keep IaC assets and export scripts to ease potential migrations.
