# 🎯 MVP Launch Checklist - Mz. Marianna's Academy

**Goal**: Launch with 50 paying students in 8 weeks

---

## ✅ WHAT YOU HAVE (Ready to go!)

- ✅ Landing page with messaging
- ✅ Role-based authentication (6 roles)
- ✅ Student dashboard with quest map
- ✅ Avatar customization system
- ✅ XP tracking infrastructure
- ✅ Calm Mastery design system
- ✅ Firestore data architecture
- ✅ Type system and models
- ✅ Placement quiz
- ✅ Beautiful onboarding flow

**Status**: ~60% complete

---

## ❌ CRITICAL BLOCKERS (Must fix to launch)

### 🔴 **P0: Cannot Launch Without**

#### 1. Payment Processing
- [ ] Stripe account setup
- [ ] Subscription tiers ($30/$80/$99)
- [ ] Payment form
- [ ] Webhook handling
- [ ] Invoice generation for ESA

**Time**: 3-5 days  
**Owner**: Developer

---

#### 2. Live Class System
- [ ] Zoom SDK integration OR embed links
- [ ] Class scheduling UI
- [ ] Calendar for students/parents
- [ ] Email reminders (SendGrid)
- [ ] Recording storage links

**Time**: 5-7 days  
**Owner**: Developer

---

#### 3. Evidence Submission
- [ ] Firebase Storage setup
- [ ] File upload component (images, videos)
- [ ] Text submission form
- [ ] Upload progress indicator
- [ ] Submit button workflow

**Time**: 3-4 days  
**Owner**: Developer

---

#### 4. Tutor Review Queue
- [ ] Pending submissions list
- [ ] Evidence viewer
- [ ] Feedback text editor
- [ ] Approve/Needs Revision buttons
- [ ] XP award trigger
- [ ] Email notification to student

**Time**: 4-5 days  
**Owner**: Developer

---

#### 5. Parent Dashboard (Real Data)
- [ ] Show child's current quests
- [ ] Display XP earned this week
- [ ] Show completed challenges
- [ ] Weekly email summary
- [ ] Link to child's student view

**Time**: 2-3 days  
**Owner**: Developer

---

#### 6. Curriculum Content (L1 Math Only)
- [ ] 6 quests written (L1-UM-Q1 through Q6)
- [ ] 96 challenges created (16 per quest)
- [ ] Learning objectives defined
- [ ] Video lessons recorded OR sourced
- [ ] Roblox math activities documented
- [ ] Evidence requirements specified

**Time**: 10-15 days  
**Owner**: Curriculum designer

---

### 🟡 **P1: Nice to Have for Launch**

#### 7. Wowl AI Assistant
- [ ] OpenAI API integration
- [ ] Chat interface
- [ ] Context awareness (student progress)
- [ ] Encouraging personality prompts

**Time**: 3-4 days  
**Owner**: Developer

---

#### 8. Email Automation
- [ ] Welcome sequence (5 emails)
- [ ] Weekly parent summary
- [ ] Class reminder (24h before)
- [ ] Quest completion celebration

**Time**: 2-3 days  
**Owner**: Developer + Marketer

---

#### 9. Analytics
- [ ] Mixpanel or Amplitude setup
- [ ] Track key events (signup, quest start, completion)
- [ ] Conversion funnel
- [ ] Retention cohorts

**Time**: 2 days  
**Owner**: Developer

---

## 📅 8-Week Sprint Plan

### **Week 1-2: Foundation**
- Payment system (Stripe)
- Evidence upload (Firebase Storage)
- Tutor review queue
- **Milestone**: Can collect money + review work

### **Week 3-4: Content & Classes**
- Zoom integration
- L1 Math curriculum (outsource if needed)
- Class scheduling
- **Milestone**: Can deliver first live class

### **Week 5-6: Polish & Testing**
- Parent dashboard improvements
- Email automation
- Wowl AI v1
- Beta testing with 5 families
- **Milestone**: Smooth user experience

### **Week 7-8: Launch Prep**
- Bug fixes
- Marketing campaign
- Recruit 10-20 beta students
- Press outreach
- **Milestone**: Public launch, 50 students

---

## 📊 Success Metrics

### **Launch Goals (Week 8)**
- 50 students enrolled
- $6,000-$12,000 MRR
- 10+ parent testimonials
- 90%+ retention (first month)
- NPS score >70

### **Month 3 Goals**
- 150 students
- $18,000-$36,000 MRR
- 5 video testimonials
- <10% churn rate
- 1 case study published

---

## 🚨 Biggest Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Curriculum takes too long** | 🔴 High | Start with 1 quest only, expand weekly |
| **Can't find tutors** | 🟡 Medium | Recruit teachers, use Upwork, start with 1:30 ratio |
| **Zoom integration complex** | 🟢 Low | Use calendar links as fallback |
| **Low signups** | 🔴 High | Run beta program, offer 50% off first month |

---

## 🎯 MVP Feature Set (Simplified)

**For Students:**
- ✅ Login
- ✅ See assigned quests
- ✅ Click challenges
- ✅ Submit evidence (photo/text)
- ✅ Earn XP
- ✅ Customize avatar
- ✅ Join live Zoom classes

**For Parents:**
- ✅ Login
- ✅ See child's progress
- ✅ View upcoming classes
- ✅ Pay subscription
- ✅ Download ESA invoices

**For Tutors:**
- ✅ Login
- ✅ See review queue
- ✅ Approve/request revision
- ✅ Give encouraging feedback
- ✅ Host Zoom classes

**For You (Admin):**
- ✅ Assign quests to students
- ✅ Create new users
- ✅ View analytics
- ✅ Manage subscriptions

---

## 🛠️ Tech Stack (Confirmed)

- **Frontend**: React + TypeScript + Tailwind
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Payments**: Stripe
- **Video**: Zoom SDK or Daily.co
- **Email**: SendGrid
- **Analytics**: Mixpanel
- **AI**: OpenAI API
- **Hosting**: Vercel

---

## 💰 Launch Budget

| Item | Cost |
|------|------|
| **Firebase** | $50/month |
| **Stripe** | 2.9% + $0.30/transaction |
| **Zoom** | $150/month (Pro) |
| **SendGrid** | $20/month |
| **OpenAI** | $50/month |
| **Mixpanel** | Free (starter) |
| **Vercel** | Free (hobby) |
| **Domain** | $12/year |
| **Curriculum freelancer** | $2,000 one-time |
| **Tutor (part-time)** | $1,000/month |
| **Total First Month** | ~$3,500 |

---

## 🎬 Launch Sequence

### **Week 7: Soft Launch**
- Email existing placement quiz signups
- Post in homeschool Facebook groups
- Reach out to 5 influencers
- Offer 50% off first month

### **Week 8: Public Launch**
- Press release
- Product Hunt launch
- LinkedIn/Twitter announcement
- Paid ads ($500 budget)
- Webinar for parents

### **Week 9-12: Growth**
- Referral program (give $20, get $20)
- Case study blog posts
- SEO content (10 articles)
- Partnerships with ADHD/dyslexia orgs

---

## ✅ Definition of "Done" (MVP)

**A successful MVP launch means:**

1. ✅ Payment works (can collect $30-$99/week)
2. ✅ Students can submit evidence
3. ✅ Tutors can review and approve
4. ✅ XP is awarded correctly
5. ✅ Parents can see progress
6. ✅ Live classes happen weekly
7. ✅ At least 1 full quest (16 challenges) exists
8. ✅ 50 paying students enrolled
9. ✅ <5 critical bugs
10. ✅ 90% of users complete onboarding

---

## 🚀 Next 48 Hours

**Your immediate action items:**

### **Today:**
1. Read `/COMPETITIVE_ANALYSIS.md`
2. Decide: Build yourself or hire developer?
3. Set up Stripe account
4. Outline L1-UM-Q1 (first quest)

### **Tomorrow:**
1. Start Firebase Storage setup
2. Build evidence upload component
3. Recruit curriculum writer (Upwork/Fiverr)
4. Draft beta invite email

### **This Week:**
1. Complete payment flow
2. Complete tutor review queue
3. Write first 3 challenges
4. Schedule beta testing

---

**You're closer than you think. Focus on these 6 blockers, and you'll have a launchable product in 8 weeks.** 🚀💜

**Questions? Check:**
- `/COMPETITIVE_ANALYSIS.md` - Full strategic analysis
- `/NEXT_STEPS.md` - Detailed technical roadmap
- `/PROJECT_SUMMARY.md` - What's already built
