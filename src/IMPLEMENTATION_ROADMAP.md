# Mz. Marianna's Academy - Implementation Roadmap

## 🎯 Project Overview
A neurodivergent-first, gamified LMS that replaces shame with visible progress using predictable patterns to reduce anxiety for ADHD/Dyslexic students.

## 📋 Implementation Phases

### Phase 1: Foundation & Design System (Week 1)
**Status: CURRENT PHASE**

#### 1.1 Design System Setup
- [ ] Update globals.css with Calm Mastery theme (Teal/Cyan backgrounds, Purple/Pink rewards)
- [ ] Add custom fonts: Lexend (primary), Nunito/Inter (UI), Orbitron (XP/Badges)
- [ ] Create color palette constants
- [ ] Build core UI components with neurodivergent-first principles

#### 1.2 Firebase Configuration
- [ ] Create firebase.config.ts with environment variables
- [ ] Set up Firebase Auth (Email/Password, Google OAuth)
- [ ] Configure Firestore indexes
- [ ] Deploy security rules (already done)
- [ ] Set up Firebase Storage rules

#### 1.3 Data Models & Types
- [ ] Create TypeScript interfaces for all data structures
- [ ] Define curriculum template types (Program, Level, Quest, Challenge)
- [ ] Define runtime types (User, QuestInstance, XPEvent)
- [ ] Create helper functions for XP calculations

### Phase 2: Authentication & User Management (Week 1-2)

#### 2.1 Authentication System
- [ ] Login/Signup pages with role selection
- [ ] Password reset flow
- [ ] Session management
- [ ] Role-based routing guards

#### 2.2 User Profiles
- [ ] Student profile setup (avatar, preferences, accessibility settings)
- [ ] Parent profile with linked students
- [ ] Tutor profile with assigned students
- [ ] Admin dashboard access

### Phase 3: Core Learning Engine (Week 2-3)

#### 3.1 Curriculum Management
- [ ] Run seed.ts to populate L1-L6 templates
- [ ] Quest template viewer (admin only)
- [ ] Challenge template editor
- [ ] Unit structure implementation (UM, UR, UW, US, UEF)

#### 3.2 Quest Assignment System
- [ ] Quest assignment logic (tutor assigns to student)
- [ ] Quest instance creation from templates
- [ ] Progress tracking (0-16 challenges)
- [ ] Checkpoint system (#1, #8, #16)

#### 3.3 Challenge Interaction
- [ ] Challenge display component (instructions, resources)
- [ ] Evidence submission (text, image, video upload)
- [ ] Student "mark as done" functionality
- [ ] Tutor review & confirmation interface
- [ ] Roblox integration for Math (UM) challenges

### Phase 4: XP & Progression System (Week 3-4)

#### 4.1 XP Engine
- [ ] XP event logger (append-only to xpEvents collection)
- [ ] XP calculation system (sum all events)
- [ ] XP display components (always visible, never decreases)
- [ ] Level progression logic

#### 4.2 Mastery & Certificates
- [ ] Mastery checker (16/16 + tutor confirm)
- [ ] Level-up celebration animation
- [ ] Certificate generator (downloadable PDF)
- [ ] Badge system for achievements

#### 4.3 Gamification Features
- [ ] Progress bars (per quest, per level, overall)
- [ ] Streak tracking (daily/weekly)
- [ ] Reward unlocks (cosmetic avatars, badges)
- [ ] Weekly rhythm calendar view

### Phase 5: Student Interface (Week 4-5)

#### 5.1 Student Dashboard
- [ ] "What do I do next?" prominent display
- [ ] Current quest overview
- [ ] Weekly schedule view (predictable rhythm)
- [ ] XP & level display (always visible)

#### 5.2 Quest View
- [ ] Challenge list (1-16)
- [ ] Progress indicator
- [ ] Current challenge focus mode
- [ ] Evidence submission interface

#### 5.3 Celebration & Feedback
- [ ] Checkpoint celebrations (#1, #8, #16)
- [ ] Positive feedback animations
- [ ] Mastery celebration page
- [ ] Certificate display

### Phase 6: Tutor Interface (Week 5-6)

#### 6.1 Tutor Dashboard
- [ ] Student list with progress overview
- [ ] Pending review queue
- [ ] Quest assignment interface
- [ ] Quick actions (approve, request revision)

#### 6.2 Review System
- [ ] Evidence review interface
- [ ] Feedback submission (encouraging only, no red/punitive)
- [ ] Mastery confirmation workflow
- [ ] Communication with students/parents

#### 6.3 Analytics
- [ ] Student progress reports
- [ ] Time-to-mastery metrics
- [ ] Struggle indicators (for intervention)
- [ ] Weekly summary reports

### Phase 7: Parent Interface (Week 6)

#### 7.1 Parent Dashboard
- [ ] Child progress overview
- [ ] Weekly summary view
- [ ] XP & achievement display
- [ ] Communication with tutors

#### 7.2 Settings & Management
- [ ] Notification preferences
- [ ] Schedule management
- [ ] Accessibility settings for child

### Phase 8: Admin Interface (Week 7)

#### 8.1 System Management
- [ ] User management (CRUD)
- [ ] Curriculum management
- [ ] Quest/Challenge editor
- [ ] Analytics dashboard

#### 8.2 Content Management
- [ ] Bulk import/export
- [ ] Template duplication
- [ ] Archive management

### Phase 9: Advanced Features (Week 8-9)

#### 9.1 Accessibility
- [ ] Screen reader optimization
- [ ] Keyboard navigation
- [ ] High contrast mode
- [ ] Dyslexia-friendly fonts/spacing
- [ ] ADHD-friendly focus modes

#### 9.2 Notifications
- [ ] Email notifications (gentle reminders, celebrations)
- [ ] In-app notifications
- [ ] Weekly rhythm reminders
- [ ] Parent updates

#### 9.3 Roblox Integration
- [ ] Roblox OAuth integration
- [ ] Math challenge embedding
- [ ] Progress sync from Roblox games
- [ ] Badge rewards in Roblox

### Phase 10: Testing & Optimization (Week 9-10)

#### 10.1 Testing
- [ ] User testing with neurodivergent students
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Security audit

#### 10.2 Documentation
- [ ] User guides (student, parent, tutor)
- [ ] Admin documentation
- [ ] API documentation
- [ ] Deployment guide

#### 10.3 Launch Preparation
- [ ] Production Firebase setup
- [ ] Environment variables configuration
- [ ] Backup strategy
- [ ] Monitoring setup (Firebase Analytics, Crashlytics)

## 🎨 Design Principles Checklist

Every screen must satisfy:
- [ ] "What do I do next?" is immediately clear
- [ ] No red/punitive visual feedback
- [ ] XP is prominently displayed and never decreases
- [ ] Progress is always visible
- [ ] Calm colors (teal/cyan) dominate
- [ ] Rewards use purple/pink
- [ ] Fonts support dyslexia (Lexend)
- [ ] Predictable layout (consistent navigation)

## 🔥 Critical Path (MVP - 4 Weeks)

1. **Week 1**: Design system + Firebase setup + Auth
2. **Week 2**: Curriculum seed + Quest assignment + Student dashboard
3. **Week 3**: Challenge interaction + XP system + Tutor review
4. **Week 4**: Mastery flow + Certificates + Polish

## 📊 Success Metrics

- Student engagement: Daily active usage
- Completion rates: Quests completed per week
- Time to mastery: Average days to complete level
- Anxiety reduction: Self-reported stress levels (surveys)
- Parent satisfaction: Weekly summary engagement

## 🚀 Next Immediate Steps

1. Update globals.css with Calm Mastery theme
2. Create Firebase configuration files
3. Define TypeScript interfaces
4. Build authentication system
5. Create student dashboard skeleton
