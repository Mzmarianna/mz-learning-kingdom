# 🚀 Deployment Guide - Mz. Marianna's Academy

## Quick Answer

**✅ Recommended Setup:**
1. **Save code**: GitHub (version control + backup)
2. **Deploy to**: Vercel (automatic deployments, free tier, perfect for React)
3. **Local development**: Your computer (with Git)

**Why this combo?**
- GitHub = Industry standard, free, unlimited private repos
- Vercel = Zero-config React deployment, automatic SSL, edge CDN, preview URLs
- Git on your computer = Work offline, commit when ready

---

## 📋 Complete Deployment Workflow

### **Step 1: Set Up GitHub** (10 minutes)

#### 1.1 Create GitHub Account
- Go to https://github.com
- Sign up (free)
- Choose username (e.g., "mz-mariannas-academy")

#### 1.2 Create Repository
```bash
# On GitHub.com:
1. Click "New Repository"
2. Name: "mz-mariannas-academy"
3. Description: "Neurodivergent-first gamified LMS"
4. Privacy: Private (keep code private for now)
5. DO NOT initialize with README (you already have code)
6. Click "Create Repository"
```

#### 1.3 Install Git on Your Computer
**Windows:**
- Download: https://git-scm.com/download/win
- Run installer (default settings)

**Mac:**
- Open Terminal
- Run: `xcode-select --install`

**Verify:**
```bash
git --version
# Should show: git version 2.x.x
```

#### 1.4 Connect Your Project to GitHub
```bash
# Open terminal in your project folder
cd /path/to/your/project

# Initialize Git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - MVP ready for deployment"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mz-mariannas-academy.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANT: Before first commit**
Make sure `.env.local` is in `.gitignore`:
```bash
# Check .gitignore contains:
.env.local
.env
.env*.local
```

---

### **Step 2: Deploy to Vercel** (5 minutes)

#### 2.1 Create Vercel Account
- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub" (easiest)
- Authorize Vercel to access GitHub

#### 2.2 Import Project
```bash
1. Click "Add New Project"
2. Select "Import Git Repository"
3. Choose "mz-mariannas-academy" from list
4. Click "Import"
```

#### 2.3 Configure Build Settings
**Vercel will auto-detect Vite. Verify:**
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 2.4 Add Environment Variables
**CRITICAL: Add your Firebase config**

```bash
# In Vercel dashboard, go to:
Settings > Environment Variables

# Add each variable (from your .env.local file):
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# For each variable:
1. Name: VITE_FIREBASE_API_KEY (exact name from .env.local)
2. Value: (paste the value)
3. Environment: Production, Preview, Development (check all 3)
4. Click "Add"
```

#### 2.5 Deploy!
```bash
1. Click "Deploy"
2. Wait 2-3 minutes
3. Vercel will show: "Deployment Ready"
4. You'll get a URL like: https://mz-mariannas-academy.vercel.app
```

#### 2.6 Test Your Live App
- Click the production URL
- Test login, student dashboard, quest map
- If issues, check Vercel logs: Functions > Logs

---

### **Step 3: Set Up Custom Domain** (Optional, 15 minutes)

#### 3.1 Buy Domain
**Recommended registrars:**
- Namecheap ($12/year)
- Google Domains ($12/year)
- GoDaddy ($15/year)

**Suggested domains:**
- `mzmariannas.academy` (perfect!)
- `mzmariannasacademy.com`
- `wowllearning.com`

#### 3.2 Connect to Vercel
```bash
# In Vercel dashboard:
1. Go to project Settings > Domains
2. Click "Add Domain"
3. Enter: mzmariannas.academy
4. Click "Add"

# Vercel will show DNS records to add:
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### 3.3 Update DNS
```bash
# In your domain registrar (Namecheap, etc.):
1. Go to DNS Management
2. Add the A record (points @ to 76.76.21.21)
3. Add the CNAME record (points www to Vercel)
4. Save changes
5. Wait 5-60 minutes for DNS propagation
```

#### 3.4 Enable SSL (Automatic)
- Vercel auto-generates SSL certificate (HTTPS)
- Wait 5-10 minutes after DNS propagates
- Your site will be: `https://mzmariannas.academy`

---

### **Step 4: Configure Firebase** (Important!)

#### 4.1 Add Authorized Domains
```bash
# In Firebase Console:
1. Go to Authentication > Settings
2. Click "Authorized domains"
3. Add your Vercel URL:
   - mz-mariannas-academy.vercel.app
   - mzmariannas.academy (if using custom domain)
4. Click "Add domain"
```

#### 4.2 Update CORS (for Storage uploads)
```bash
# Create a file: cors.json
[
  {
    "origin": ["https://mz-mariannas-academy.vercel.app"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]

# Apply CORS settings (requires Firebase CLI):
gsutil cors set cors.json gs://your-project-id.appspot.com
```

---

## 🔄 Development Workflow (Day-to-Day)

### **Option A: Work Locally, Deploy When Ready**

#### Daily Workflow:
```bash
# 1. Make changes on your computer
# Edit files in VS Code, test locally

# 2. Test locally
npm run dev
# Open http://localhost:5173

# 3. When satisfied, commit to Git
git add .
git commit -m "Added payment processing"

# 4. Push to GitHub
git push

# 5. Vercel automatically deploys! (30-60 seconds)
# Check: https://mz-mariannas-academy.vercel.app
```

**Benefits:**
- ✅ Work offline
- ✅ Test before deploying
- ✅ Automatic deployments (just push to GitHub)
- ✅ Version history (can revert mistakes)

---

### **Option B: Edit Directly on GitHub (Not Recommended)**

```bash
# On GitHub.com:
1. Navigate to file (e.g., App.tsx)
2. Click "Edit" (pencil icon)
3. Make changes
4. Click "Commit changes"
5. Vercel auto-deploys

# Why not recommended:
❌ No local testing (changes go live immediately)
❌ Harder to debug
❌ Can't run npm install for new packages
```

**Only use for:**
- Quick typo fixes
- README updates
- Small text changes

---

## 🌿 Branch Strategy (For Teams or Future)

### **Simple Git Flow** (Recommended for MVP)

```bash
# Main branch = Production (live site)
main → Vercel Production → https://mzmariannas.academy

# Development branch = Staging (testing)
dev → Vercel Preview → https://dev-mz-mariannas.vercel.app

# Feature branches = Experimental
feature/payment → Vercel Preview → https://payment-xyz123.vercel.app
```

#### Workflow:
```bash
# 1. Create feature branch
git checkout -b feature/wowl-ai

# 2. Make changes, commit
git add .
git commit -m "Integrated ChatGPT for Wowl"

# 3. Push feature branch
git push origin feature/wowl-ai

# 4. Vercel creates preview URL automatically!
# https://feature-wowl-ai-abc123.vercel.app

# 5. Test preview, if good, merge to main
git checkout main
git merge feature/wowl-ai
git push

# 6. Production auto-updates!
```

**Benefits:**
- ✅ Test features before going live
- ✅ Share preview URLs with team/beta testers
- ✅ Easy rollbacks if something breaks

---

## 🔐 Security Best Practices

### **Environment Variables** (CRITICAL)

#### ✅ DO:
```bash
# Store secrets in Vercel Environment Variables
VITE_FIREBASE_API_KEY=... (safe to expose, it's client-side)
STRIPE_SECRET_KEY=... (server-side only, keep in Vercel)
OPENAI_API_KEY=... (server-side only)
```

#### ❌ DON'T:
```bash
# NEVER commit .env.local to GitHub
# NEVER hardcode API keys in code
const apiKey = "sk-abc123"; // BAD!

# NEVER expose server-side secrets to frontend
```

### **Firebase Security Rules**

#### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Students can only read their own quests
    match /questInstances/{questId} {
      allow read: if request.auth != null && 
                     resource.data.studentId == request.auth.uid;
      allow write: if request.auth != null && 
                      request.auth.token.role == 'admin';
    }
  }
}
```

#### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /evidence/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
                            request.auth.uid == userId;
    }
  }
}
```

---

## 📊 Monitoring & Analytics

### **Vercel Analytics** (Free)
```bash
# In Vercel dashboard:
1. Go to Analytics
2. See: Page views, top pages, countries, devices
3. Enable Speed Insights (Core Web Vitals)
```

### **Firebase Crashlytics** (Optional)
```bash
# For error tracking:
npm install firebase-crashlytics

# In your app:
import { crashlytics } from 'firebase/crashlytics';

// Logs errors automatically
```

### **Sentry** (Recommended for Production)
```bash
# For advanced error tracking:
npm install @sentry/react

# In main.tsx:
Sentry.init({
  dsn: "https://your-sentry-dsn",
  environment: import.meta.env.MODE, // 'production' or 'development'
});
```

---

## 🚨 Troubleshooting Common Issues

### **Issue 1: "Cannot find module" after deploy**
```bash
# Solution: Ensure package.json lists all dependencies
npm install --save missing-package
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

### **Issue 2: Environment variables not working**
```bash
# Check:
1. Variables start with VITE_ (for Vite apps)
2. Added to ALL environments in Vercel (Production, Preview, Development)
3. Re-deployed after adding variables (Vercel > Deployments > Redeploy)
```

### **Issue 3: Firebase authentication fails**
```bash
# Check:
1. Domain added to Firebase > Authentication > Authorized domains
2. Correct Firebase config in Vercel environment variables
3. CORS configured for Storage uploads
```

### **Issue 4: Build fails on Vercel**
```bash
# Check build logs:
1. Vercel > Deployments > Click failed deployment
2. Read error message
3. Common fixes:
   - Missing dependency: npm install package-name
   - TypeScript error: Fix type errors locally first
   - Build command wrong: Check vercel.json
```

### **Issue 5: Slow page loads**
```bash
# Optimize:
1. Enable Vercel Speed Insights
2. Lazy load images: <img loading="lazy" />
3. Code splitting: React.lazy() for routes
4. Optimize images: Use WebP format
5. Enable Vercel Edge Network (automatic)
```

---

## 📁 Recommended File Structure

```
your-project/
├── .git/                    # Git version control (hidden)
├── .gitignore               # Files to NOT commit
├── .env.local               # Local secrets (NEVER commit!)
├── .env.example             # Template (safe to commit)
├── src/                     # Your React code
├── public/                  # Static assets
├── dist/                    # Build output (auto-generated)
├── package.json             # Dependencies
├── vite.config.ts           # Vite config
├── vercel.json              # Vercel config (optional)
└── README.md                # Project docs
```

### **vercel.json (Optional Config)**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🎯 Deployment Checklist

### **Before First Deploy:**
- [ ] `.env.local` is in `.gitignore`
- [ ] Firebase project created
- [ ] All API keys secured
- [ ] Code committed to GitHub
- [ ] Vercel account created
- [ ] Environment variables added to Vercel
- [ ] Firebase authorized domains updated

### **After Deploy:**
- [ ] Test login on live URL
- [ ] Test student dashboard
- [ ] Test file uploads
- [ ] Test payments (Stripe test mode)
- [ ] Check Firebase console for errors
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel analytics
- [ ] Share preview URL with beta testers

---

## 💰 Costs (First Year)

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel** | Free | Hobby plan (personal projects) |
| **GitHub** | Free | Unlimited private repos |
| **Firebase** | $0-$50/month | Spark (free) → Blaze (pay-as-you-go) |
| **Domain** | $12/year | .com or .academy |
| **Total** | ~$20/month | Scales with usage |

**When to upgrade:**
- Vercel Pro ($20/month): Team features, better analytics, priority support
- Firebase Blaze: When >50K reads/day or >20K writes/day

---

## 🚀 Alternative Deployment Options

### **Option 1: Vercel** ⭐ RECOMMENDED
**Pros:**
- ✅ Zero config for Vite/React
- ✅ Automatic deployments from GitHub
- ✅ Free SSL, CDN, edge network
- ✅ Preview URLs for every branch
- ✅ Generous free tier

**Cons:**
- ❌ Locked into Vercel ecosystem (but easy to migrate)

---

### **Option 2: Netlify**
**Pros:**
- ✅ Similar to Vercel (auto-deploys, free SSL)
- ✅ Great for static sites
- ✅ Netlify Forms (free form submissions)

**Cons:**
- ❌ Slightly slower builds than Vercel
- ❌ Less optimized for React/Vite

**When to use:** If you prefer Netlify's interface or need built-in forms

---

### **Option 3: Firebase Hosting**
**Pros:**
- ✅ Integrated with Firebase (already using it)
- ✅ Global CDN
- ✅ Free SSL

**Cons:**
- ❌ Manual deployments (no auto-deploy from GitHub)
- ❌ Requires Firebase CLI
- ❌ No preview URLs

**Deploy commands:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**When to use:** If you want everything in Firebase ecosystem

---

### **Option 4: Your Own Server (DigitalOcean, AWS)**
**Pros:**
- ✅ Full control
- ✅ Can run backend servers

**Cons:**
- ❌ Expensive ($5-50/month)
- ❌ Manual setup (Nginx, SSL, etc.)
- ❌ No auto-deploys
- ❌ You manage security updates

**When to use:** Only if you need custom server-side logic (not for MVP)

---

## ✅ Final Recommendation

**For Mz. Marianna's Academy MVP:**

```
✅ Code: GitHub (private repo)
✅ Deploy: Vercel (automatic from GitHub)
✅ Domain: mzmariannas.academy (via Namecheap)
✅ Backend: Firebase (Auth, Firestore, Storage, Functions)
✅ Payments: Stripe (webhooks to Vercel Serverless Functions)
```

**This setup gives you:**
- Professional, fast, secure website
- Free (until you scale)
- Automatic deployments (just push to GitHub)
- Preview URLs for testing
- Easy to maintain (no servers to manage)

---

## 🎓 Next Steps

1. **Today**: Set up GitHub, push code
2. **Tomorrow**: Deploy to Vercel, test live site
3. **This Week**: Buy domain, configure DNS
4. **Next Week**: Launch beta with 10 families

**You're ready to go live!** 🚀💜🦉

---

**Questions?** Check:
- Vercel docs: https://vercel.com/docs
- Firebase docs: https://firebase.google.com/docs
- Git basics: https://git-scm.com/book/en/v2
