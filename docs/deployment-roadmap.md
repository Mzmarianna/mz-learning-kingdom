# Learning Kingdom Deployment & Infrastructure Roadmap

This roadmap captures the actionable steps for preparing, launching, and maintaining the Learning Kingdom tutoring platform. Each phase expands on the high-level checklist items supplied by the product brief so the engineering team can execute tasks consistently across environments.

## Phase 1 – Repository Setup & Version Control

### 1. GitHub Repository Creation
- [ ] Create the `learning-kingdom` repository under the `mz-marianna` organization.
- [ ] Enforce branch protection on `main` (required reviews, status checks, signed commits optional).
- [ ] Configure repository secrets required for CI/CD (`FIREBASE_TOKEN`, `VERCEL_TOKEN`, `GA_MEASUREMENT_ID`).

### 2. Project Structure Organization
- [x] Initialize the Vite + React project scaffold (`src`, `public`, `vite.config.js`).
- [ ] Introduce `docs/` for operational runbooks (this document) and `infrastructure/` for IaC templates when available.
- [ ] Track ADRs in `docs/decisions/` so architectural trade-offs are transparent.

## Phase 2 – Environment Configuration

### 3. Environment Variables Setup
- [ ] Duplicate `.env.example` into environment-specific files (`.env.local`, `.env.production`).
- [ ] Populate Firebase config keys and backend URLs from the secure secret manager.
- [ ] Commit non-sensitive defaults only; all secrets stay outside version control.

### 4. Firebase Project Setup – `mz-marianna-kingdom-learning`
- [ ] Create or verify the project at <https://console.firebase.google.com/project/mz-marianna-kingdom-learning> (region `us-central`).
- [ ] Create the Firebase project in the `us-central` region if it does not already exist.
- [ ] Enable Authentication providers (Email/Password, Google).
- [ ] Create Firestore in production mode with composite indexes for `students`, `sessions`, and `questLogs` collections.
- [ ] Configure Firebase Hosting (used as a fallback if Vercel is unavailable).
- [ ] Enable Analytics and Performance Monitoring in the Firebase console.

## Phase 3 – Code Optimisation & Build Process

### 5. `package.json` Configuration
- [ ] Verify scripts (`lint`, `test`, `build`, `preview`, `analyze`) and pin Node version via `engines`.
- [ ] Maintain dependency constraints and enable npm lockfile checking in CI.
- [ ] Document optional bundles like Three.js and flag their impact in the README (done).

### 6. Vercel Configuration
- [ ] Connect the GitHub repo to Vercel project `learning-kingdom`.
- [ ] Define environment variables in Vercel dashboard across preview and production environments.
- [ ] Enable automatic preview deployments for every pull request.

## Phase 4 – Domain & SSL Setup

### 7. Custom Domain Configuration
- [ ] Purchase `mzmarianna.com` via Google Domains.
- [ ] Add DNS records:
  - `A` record: `tutoring.mzmarianna.com` → Vercel IPv4 apex.
  - `CNAME`: `www.tutoring.mzmarianna.com` → `tutoring.mzmarianna.com`.
- [ ] Allow Vercel to provision SSL certificates automatically.

### 8. Subdomain Strategy
- [ ] Reserve `tutoring.mzmarianna.com` (main platform).
- [ ] Reserve `admin.mzmarianna.com` (admin dashboard) – optionally proxied through Vercel environment.
- [ ] Reserve `api.mzmarianna.com` (REST/GraphQL endpoints) – consider Firebase Hosting rewrites or Cloud Run.

## Phase 5 – Database & Backend Services

### 9. Firebase Firestore Setup
- [ ] Model collections (`students`, `guardians`, `sessions`, `quests`, `achievements`).
- [ ] Define security rules scoped by authenticated user role (student, guardian, tutor).
- [ ] Set up TTL policies for ephemeral session transcripts.

### 10. Google Cloud Functions (optional)
- [ ] Scaffold Cloud Functions project with `firebase init functions`.
- [ ] Implement scheduled jobs (daily XP sync, weekly progress email digest).
- [ ] Configure CI deployment pipeline for functions alongside Firestore rules.

## Phase 6 – Analytics & Monitoring Setup

### 11. Google Analytics 4 Integration
- [ ] Create GA4 property linked to Firebase project.
- [ ] Inject `GA_MEASUREMENT_ID` via `src/lib/analytics.js`.
- [ ] Set up events for dashboard interactions and tutoring session bookings.

### 12. Performance Monitoring
- [ ] Enable Firebase Performance Monitoring for the web app.
- [ ] Activate Vercel Analytics and create baseline page-performance budget.
- [ ] Integrate Google PageSpeed Insights into CI using the REST API for weekly reporting.
- [ ] Evaluate Sentry for runtime error tracking (optional but recommended).

## Phase 7 – Deployment Pipeline

### 13. GitHub Actions Workflow
- [ ] Add `.github/workflows/ci.yml` with install, lint, test, and build steps.
- [ ] Cache npm dependencies and fail PRs on lint/test regressions.
- [ ] Publish build artifacts for manual QA when necessary.

### 14. Vercel Deployment Steps
- [ ] Ensure `vercel.json` (if present) matches routing requirements.
- [ ] Trigger production deployments from protected `main` branch merges only.
- [ ] Document rollback process (select previous deployment in Vercel dashboard).

## Phase 8 – Security & Compliance

### 15. Security Headers & CSP
- [ ] Add Helmet middleware or configure Vercel headers for strict CSP, HSTS, X-Frame-Options.
- [ ] Maintain allow-list for external assets (Firebase, Google APIs, CDN textures).

### 16. GDPR Compliance Setup
- [ ] Implement cookie consent banner referencing privacy policy.
- [ ] Publish privacy policy page with data handling details.
- [ ] Draft Data Processing Agreements with service providers.
- [ ] Support user data export/deletion workflows via admin dashboard.

## Phase 9 – Testing & Quality Assurance

### 17. Pre-deployment Testing
- [ ] Write end-to-end tests (Playwright/Cypress) covering onboarding, session booking, XP visualization.
- [ ] Maintain unit and integration test suites for core utilities and hooks.
- [ ] Include accessibility audits (axe) in QA checklist.

### 18. Staging Environment
- [ ] Configure `staging.mzmarianna.com` with isolated Firebase project.
- [ ] Apply automated tests and smoke checks on staging before promoting to production.
- [ ] Mirror environment variables with staging-specific credentials.

## Phase 10 – Go-Live Process

### 19. Production Deployment Checklist
- [ ] DNS propagation complete.
- [ ] SSL certificate active.
- [ ] Database migrations/seed scripts executed.
- [ ] Environment variables verified.
- [ ] Analytics tracking validated.
- [ ] Performance benchmarks met (LCP < 2.5s desktop/mobile).
- [ ] Security scan passed (OWASP ZAP / Lighthouse security review).
- [ ] Backup systems active.

### 20. Post-Launch Monitoring
- [ ] Monitor uptime (Vercel status, Firebase status dashboard).
- [ ] Review analytics funnels and retention.
- [ ] Triage error logs daily for first two weeks after launch.

## Phase 11 – Maintenance & Updates

### 21. Automated Backups
- [ ] Schedule daily Firestore exports to Google Cloud Storage via Cloud Scheduler.
- [ ] Capture weekly VM snapshots (if using Cloud Run/Compute Engine).
- [ ] Verify restores quarterly.

### 22. Update Pipeline
- [ ] Establish monthly dependency review cadence.
- [ ] Maintain changelog documenting releases and migrations.
- [ ] Automate semantic versioning and release notes via GitHub Actions.

---

> **Status Legend**: `[ ]` pending, `[x]` complete, `[~]` in progress. Update this document as phases are completed to keep stakeholders aligned.
