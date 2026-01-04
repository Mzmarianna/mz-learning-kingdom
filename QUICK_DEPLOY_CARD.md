# ⚡ QUICK DEPLOY - 30 MINUTES TO LIVE

## Step 1: Environment (5 min)
```bash
cp .env.example .env
# Edit with your Firebase credentials
```

## Step 2: Deploy (10 min)
```bash
firebase deploy --only hosting,firestore,storage
```

## Step 3: Enable Services (15 min)
- Firebase Console → Authentication → Enable Email/Password
- Done! Your URL is live.

---

## Already Built ✅
- Kingdom Entry (HD animated)
- Landing page (testimonials, pricing)
- 3-min onboarding (avatar + subjects)
- Placement quiz
- 6 role-based dashboards
- 48 lessons (3 math levels)
- 48 badges (animated)
- XP system (never decreases)
- Portfolio system
- Avatar customization
- Mobile responsive
- Neurodivergent-optimized

---

## Commands
```bash
# Install dependencies (if needed)
npm install

# Build locally to test
npm run build

# Deploy
firebase login
firebase deploy --only hosting,firestore,storage
```

---

## Your Live URL
After deploy, Firebase gives you:
`https://your-project.web.app`

Add custom domain later (optional):
`learn.mzmarianna.com`

---

## First User
Create admin in Firebase Console:
1. Authentication → Users → Add user
2. Click user → Custom Claims
3. Add: `{"role": "admin"}`

---

**That's it. 30 minutes. LIVE. Optimized for neurodivergent children worldwide.** 🚀💜
