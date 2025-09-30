
# Kingdom of Learning - Project Blueprint

## **Overview**

Kingdom of Learning is a gamified, interactive web application designed to make learning an adventure for students. It leverages modern web technologies to create an engaging experience for students, parents, and tutors, combining education with interactive quests, avatar customization, and real-time progress tracking.

---

## ✅ **Completed Items**

- **Phase 0: Initial Setup**
    - [x] Set up Next.js project.
    - [x] Initialized Firebase project.
    - [x] Established basic file structure.
    - [x] Created initial `blueprint.md`.
    - [x] Implemented basic email/password authentication.
    - [x] Created placeholder login, register, and profile pages.
- **Phase 1: UI/UX Foundation & Theming**
    - [x] Defined a vibrant, energetic, and modern design system.
    - [x] Configured `tailwind.config.ts` with custom colors and thematic fonts (`Inter` and `MedievalSharp`).
    - [x] Updated `globals.css` and `layout.tsx` to establish the new design foundation.
    - [x] Enabled Google Sign-In in Firebase and implemented the "Sign in with Google" button.
    - [x] Created directory structure for SVG avatar assets.
    - [x] Added initial SVG assets for avatar customization.
    - [x] Implemented internationalization (i18n) for English and Spanish.
    - [x] Created a language switcher component.
    - [x] Added a footer with copyright information.
    - [x] Integrated Wowl the Owl mascot as favicon and on the homepage.
    - [x] Created a placeholder page for Quests.

---

## 📋 **Development Roadmap & Checklist**

### **Phase 1: MVP (Target: 2-3 months)**

- **User Authentication System (In Progress)**
    - [x] Student/Parent/Tutor login.
    - [x] Profile creation and management.
    - [x] Password reset functionality.
- **Basic Student Dashboard**
    - [ ] **Interactive Avatar Customization System (In Progress)**.
    - [ ] XP & Level Progress Bars.
    - [ ] **Basic Quest Display (In Progress)**.
    - [ ] Progress Visualization (simple charts).
- **Parent Command Center Essentials**
    - [ ] Child progress overview.
    - [ ] Basic messaging system with tutor.
    - [ ] Session scheduling (Calendly integration).
- **Tutor Admin Panel Basics**
    - [ ] Student progress overview.
    - [ ] Basic curriculum assignment.

### **Phase 2: Enhanced Features (Target: 2-3 months)**

- **Advanced Gamification Engine**
    - [ ] Complex Quest System (daily, weekly, seasonal).
    - [ ] Quest Creation System for tutors.
    - [ ] Achievement badges and gallery.
    - [ ] Leaderboards and/or Guilds.
    - [ ] Reward Redemption Center.
- **Comprehensive Analytics & Reporting**
    - [ ] Detailed progress reports for parents.
    - [ ] Behavioral insights and reports.
    - [ ] ESA documentation generator.
    - [ ] Custom goal setting and milestone tracking.

### **Phase 3: Advanced Integration & AI (Target: 2-3 months)**

- **External Integrations**
    - [ ] Roblox integration for educational games & progress sync.
- **AI-Powered Features**
    - [ ] Personalized learning paths based on performance.
    - [ ] Adaptive difficulty for quests and challenges.
    - [ ] Predictive analytics for student success.

---

## 🏗️ **Technical Architecture & Configuration**

### **Recommended Tech Stack**

- **Frontend:** Next.js / React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Charts:** Chart.js
- **Backend & Database:** Firebase (Auth, Firestore, Functions, Storage)
- **Payments:** Stripe or PayPal
- **Scheduling:** Google Calendar API
- **Email:** SendGrid or Gmail
- **Automation:** Zapier

### **Database Structure (Firestore)**

- **users/**
    - `{userId}`
        - `role`: "student" | "parent" | "tutor"
        - `profile`: {...}
        - `createdAt`: timestamp
        - `lastLogin`: timestamp
- **students/**
    - `{studentId}`
        - `parentId`: string
        - `tutorId`: string
        - `avatar`: { hair: string, eyes: string, mouth: string, skin: string }
        - `xp`: number
        - `level`: number
        - `currentQuests`: array
        - `achievements`: array
- **progress/**
    - `{studentId}`
        - `subjects`: {...}
        - `sessions`: array
        - `timeSpent`: number
        - `lastActivity`: timestamp
- **quests/**
    - `{questId}`
        - `title`: string
        - `description`: string
        - `xpReward`: number
        - `type`: "daily" | "weekly" | "seasonal"
        - `requirements`: {...}

### **Storage Structure**

- `/avatars/{userId}/`
- `/workbooks/{studentId}/`
- `/certificates/{studentId}/`
- `/resources/`

### **Cloud Functions (to be created)**

- `onUserCreate`: Set up student/parent profiles.
- `updateXP`: Handle experience point calculations.
- `generateCertificate`: Create completion certificates.
- `sendNotifications`: Quest completions, achievements.

### **Security Rules**

- **Firestore Rules:**
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      // Allow authenticated users to read/write their own data
      match /users/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /students/{studentId} {
        allow read, write: if request.auth != null;
      }
      match /progress/{studentId} {
        allow read, write: if request.auth != null;
      }
      match /quests/{questId} {
        allow read: if request.auth != null;
      }
    }
  }
  ```
- **Storage Rules:**
  ```
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```

---

## 💰 **Business Optimization Strategy**

### **Conversion Rate Optimization (CRO)**
- [ ] A/B Test landing page variants (Headlines, CTAs, Pricing).
- [ ] Map the customer journey and identify drop-off points.
- [ ] Implement exit-intent popups with special offers.

### **Customer Acquisition**
- [ ] **Content Marketing:** ADHD parenting blog, YouTube channel, free resources.
- [ ] **Paid Advertising:** Facebook/Instagram/Google Ads targeting relevant demographics.
- [ ] **Partnerships:** ADHD therapists, homeschool co-ops, educational consultants.

---

## 🎯 **Immediate Next Steps (Week 1-2)**

- **High Priority**
    - [ ] **Create Proper Intake Forms:** Detailed student assessment, parent goals, learning style questionnaire.
    - [ ] **Set Up Payment Processing:** Integrate Stripe for subscriptions, PayPal as a backup.
    - [ ] **Add Social Proof:** Integrate video testimonials, before/after reports, and success stories.
- **Medium Priority**
    - [ ] **Technical Planning:** Create detailed wireframes for all dashboards.
    - [ ] **Content Creation:** Begin writing blog posts and creating social media content.
