# ⚡ Quick Deploy Reference - 15 Minutes to Live

## 🚀 TL;DR

```bash
# 1. Push to GitHub (2 min)
git init
git add .
git commit -m "Ready for launch"
git remote add origin https://github.com/YOUR_USERNAME/mz-mariannas-academy.git
git push -u origin main

# 2. Deploy to Vercel (3 min)
# - Go to vercel.com
# - Click "Import Project"
# - Select your GitHub repo
# - Add environment variables (copy from .env.local)
# - Click "Deploy"

# 3. Done! ✅
# Your app is live at: https://your-app.vercel.app
```

---

## 📋 Checklist Format

### **Pre-Deploy**
- [ ] Code works locally (`npm run dev`)
- [ ] `.env.local` is in `.gitignore`
- [ ] Firebase project created
- [ ] All features tested

### **GitHub Setup** (5 minutes)
- [ ] Create account at github.com
- [ ] Create new private repository
- [ ] Install Git on computer
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Run: `git remote add origin [YOUR_REPO_URL]`
- [ ] Run: `git push -u origin main`

### **Vercel Setup** (5 minutes)
- [ ] Create account at vercel.com (use GitHub login)
- [ ] Click "New Project"
- [ ] Import your GitHub repo
- [ ] Framework: Vite ✅
- [ ] Build command: `npm run build` ✅
- [ ] Output directory: `dist` ✅
- [ ] Add environment variables:
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes

### **Firebase Config** (2 minutes)
- [ ] Go to Firebase Console → Authentication → Settings
- [ ] Add authorized domain: `your-app.vercel.app`
- [ ] Test login on live site

### **Post-Deploy Testing** (3 minutes)
- [ ] Visit live URL
- [ ] Test login
- [ ] Test student dashboard
- [ ] Test quest map
- [ ] Test avatar customization
- [ ] Check console for errors (F12)

---

## 🔄 Daily Workflow

```bash
# Morning: Pull latest changes
git pull

# Work: Make your changes
# (Edit files in VS Code)

# Test locally
npm run dev

# Afternoon: Deploy to production
git add .
git commit -m "Added Wowl AI chat feature"
git push

# Vercel auto-deploys in 60 seconds! ✅
# Check: https://your-app.vercel.app
```

---

## 🚨 Emergency Rollback

**If you deployed a bug:**

```bash
# Option 1: Revert in Vercel (1 click)
1. Go to Vercel dashboard
2. Deployments tab
3. Find previous working deployment
4. Click "..." → "Promote to Production"

# Option 2: Revert in Git (terminal)
git revert HEAD
git push

# Previous version is live in 60 seconds! ✅
```

---

## 📞 Support Resources

| Problem | Solution |
|---------|----------|
| **Build fails** | Check Vercel logs, fix errors locally first |
| **Env vars not working** | Must start with `VITE_`, add to all environments |
| **Firebase auth fails** | Add Vercel domain to Firebase authorized domains |
| **Slow deploys** | Normal for first deploy (3-5 min), then 60 seconds |
| **404 errors** | Add `vercel.json` with SPA rewrite rules |

---

## 💰 Costs

**Free tier limits:**
- Vercel: Unlimited deployments, 100GB bandwidth/month
- Firebase: 50K reads/day, 20K writes/day, 1GB storage
- GitHub: Unlimited repos

**You won't pay anything until you have 200+ daily active users.** ✅

---

## 🎯 Success!

**When you see this, you're live:**

```
✅ Deployment Successful
🌍 https://mz-mariannas-academy.vercel.app

Production: Ready
   • Preview URL: https://git-main-abc123.vercel.app
   • Deployment ID: dpl_abc123xyz
```

**Share the URL with your first beta testers!** 🎉

---

## 🔗 Quick Links

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **Firebase Console**: https://console.firebase.google.com
- **Deployment Guide (full)**: `/DEPLOYMENT_GUIDE.md`

**Questions?** Read the full guide: `/DEPLOYMENT_GUIDE.md`

---

**You're ready to launch! 🚀💜🦉**
