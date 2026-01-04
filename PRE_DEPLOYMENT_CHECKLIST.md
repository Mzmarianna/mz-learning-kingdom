# ✅ Pre-Deployment Checklist

Use this checklist before deploying to ensure everything is ready for production.

## 🔧 Build & Environment

- [ ] **Dependencies installed**: Run `npm install`
- [ ] **Build succeeds locally**: Run `npm run build` without errors
- [ ] **Development server works**: Run `npm run dev` and test locally
- [ ] **Environment variables configured**: 
  - [ ] `.env.local` exists with Firebase config
  - [ ] Variables use `VITE_` prefix (for Vite) or `NEXT_PUBLIC_` (for Next.js)
  - [ ] `.env.local` is in `.gitignore`

## 🔐 Security

- [ ] **No secrets in code**: No hardcoded API keys or passwords
- [ ] **Firebase rules deployed**:
  - [ ] Firestore rules configured: `firestore.rules`
  - [ ] Storage rules configured: `storage.rules`
  - [ ] Database rules configured (if using RTDB): `database.rules.json`
- [ ] **Sensitive files excluded**: Check `.gitignore` includes:
  - [ ] `.env.local`
  - [ ] `.env.production`
  - [ ] `/node_modules`
  - [ ] `/build` or `/dist`

## 🔥 Firebase Configuration

- [ ] **Firebase project exists**: Project ID `mz-marianna-kingdom-learning`
- [ ] **Firebase CLI installed**: `npm install -g firebase-tools`
- [ ] **Firebase authenticated**: Run `firebase login`
- [ ] **Firebase project selected**: Run `firebase use mz-marianna-kingdom-learning`
- [ ] **Hosting configured**: `firebase.json` has hosting config
- [ ] **Build directory correct**: `firebase.json` points to `build` directory

## 🧪 Testing

- [ ] **Critical features tested locally**:
  - [ ] Home page loads
  - [ ] Navigation works
  - [ ] Authentication (login/register)
  - [ ] Quiz flow
  - [ ] Results page
  - [ ] Student dashboard
  - [ ] Profile management
  - [ ] Database reads/writes
- [ ] **No console errors**: Open browser DevTools (F12), check console
- [ ] **Mobile responsive**: Test on mobile device or use DevTools device emulation

## 📦 Assets & Content

- [ ] **All images load**: Check for 404s in Network tab
- [ ] **Fonts load correctly**: Verify typography appears as expected
- [ ] **Icons display**: Check all iconography renders
- [ ] **External resources accessible**: Any third-party scripts/APIs working

## 🌐 Domain & Hosting

- [ ] **Firebase hosting target set**: Check `.firebaserc` has correct project
- [ ] **Custom domain ready** (if applicable):
  - [ ] Domain purchased
  - [ ] DNS configured
  - [ ] SSL certificate (automatic with Firebase)

## 📊 Analytics & Monitoring

- [ ] **Firebase Analytics enabled** (optional):
  - [ ] Analytics configured in Firebase Console
  - [ ] Tracking code added to app
- [ ] **Error tracking setup** (optional):
  - [ ] Sentry or similar service configured
  - [ ] Error boundaries in place

## 🚀 Deployment Process

- [ ] **Deployment method chosen**:
  - [ ] Manual deployment via Firebase CLI
  - [ ] Script deployment (`./deploy.sh` or `deploy.bat`)
  - [ ] GitHub Actions CI/CD
- [ ] **GitHub Actions secrets configured** (if using CI/CD):
  - [ ] `VITE_FIREBASE_API_KEY`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN`
  - [ ] `VITE_FIREBASE_PROJECT_ID`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `VITE_FIREBASE_APP_ID`
  - [ ] `VITE_FIREBASE_DATABASE_URL`
  - [ ] `FIREBASE_SERVICE_ACCOUNT`

## 📝 Documentation

- [ ] **README updated**: Current and accurate instructions
- [ ] **Deployment docs reviewed**: `DEPLOY_NOW.md` and `DEPLOYMENT_STEPS.md`
- [ ] **Environment variables documented**: `.env.example` up to date

## ✅ Ready to Deploy!

Once all items are checked:

```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Or use the deployment script:

```bash
# Mac/Linux
./deploy.sh

# Windows
deploy.bat
```

## 🔄 Post-Deployment Verification

After deploying, verify these on your live site:

- [ ] **Site accessible**: Visit https://mz-marianna-kingdom-learning.web.app
- [ ] **Home page loads**: No errors, displays correctly
- [ ] **Authentication works**: Test login/register
- [ ] **Navigation functional**: All routes accessible
- [ ] **Data loads**: Firestore data displays correctly
- [ ] **Images display**: All assets load properly
- [ ] **Mobile responsive**: Check on mobile device
- [ ] **No console errors**: Check browser console (F12)
- [ ] **Performance acceptable**: Page loads in reasonable time

## 🚨 Rollback Plan

If something goes wrong after deployment:

### Option 1: Revert in Firebase Console
1. Go to Firebase Console → Hosting
2. Find previous working deployment
3. Click "Rollback"

### Option 2: Redeploy Previous Version
```bash
# If using git
git checkout <previous-commit>
npm run build
firebase deploy --only hosting
git checkout main
```

## 📞 Support Resources

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Deployment Steps](./DEPLOYMENT_STEPS.md)

---

**Good luck with your deployment! 🚀**
