# 🚀 Quick Deployment Reference

## Your Next Step: Deploy to Firebase Hosting

You have **three options** for deploying your application:

---

## ⚡ Option 1: Quick Manual Deploy (5 minutes)

**Perfect for**: First-time deployment or manual updates

### Commands:
```bash
# 1. Install Firebase CLI (first time only)
npm install -g firebase-tools

# 2. Login to Firebase (first time only)
firebase login

# 3. Build and deploy
npm run build
firebase deploy --only hosting
```

### Your live site will be at:
**https://mz-marianna-kingdom-learning.web.app**

---

## 🎯 Option 2: Use Deployment Script (Easiest)

**Perfect for**: Regular deployments

### On Mac/Linux:
```bash
./deploy.sh
```

### On Windows:
```cmd
deploy.bat
```

The script will:
1. ✅ Build your application
2. ✅ Check for Firebase CLI
3. ✅ Deploy to Firebase Hosting
4. ✅ Show you the live URL

---

## 🤖 Option 3: Automated CI/CD with GitHub Actions

**Perfect for**: Professional workflow with automatic deployments

### Setup Steps:

1. **Get Firebase Service Account Key:**
   ```bash
   firebase login
   firebase init hosting:github
   ```
   Follow the prompts to connect your GitHub repository.

2. **Add GitHub Secrets:**
   - Go to: GitHub Repository → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_FIREBASE_DATABASE_URL`
     - `FIREBASE_SERVICE_ACCOUNT` (JSON from step 1)

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Set up deployment"
   git push origin main
   ```

4. **Automatic Deployment!**
   - Every push to `main` branch triggers automatic deployment
   - View progress: GitHub → Actions tab

---

## 📝 What's Already Configured

✅ **Firebase Project**: `mz-marianna-kingdom-learning`
✅ **Build Process**: `npm run build` → creates `/build` directory
✅ **Firebase Config**: `firebase.json` with hosting settings
✅ **SPA Routing**: All routes redirect to index.html
✅ **Asset Caching**: Static files cached for optimal performance

---

## 🔍 Pre-Deployment Checklist

Before deploying, verify:

- [ ] Code works locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables are set correctly
- [ ] Firebase project exists and is accessible
- [ ] No sensitive data in code (check `.gitignore`)

---

## ⚠️ Important: Environment Variables

Your app uses Firebase config from environment variables. These should use the `VITE_` prefix for Vite to recognize them:

**Example `.env.local`:**
```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=mz-marianna-kingdom-learning.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mz-marianna-kingdom-learning
VITE_FIREBASE_STORAGE_BUCKET=mz-marianna-kingdom-learning.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_DATABASE_URL=https://mz-marianna-kingdom-learning.firebaseio.com
```

> **Note**: If your code currently uses `NEXT_PUBLIC_` prefix, you'll need to either:
> - Update all code to use `VITE_` prefix, OR
> - Add both prefixes to your env files

---

## 🎯 Recommended Workflow

**For your first deployment**, use **Option 1** (Manual):
1. Ensures everything works
2. Gives you control
3. Helps you understand the process

**For future deployments**, use **Option 2** (Script):
1. Faster and more convenient
2. Automates the process
3. Reduces chance of errors

**For production/team environments**, use **Option 3** (CI/CD):
1. Automatic deployments
2. Professional workflow
3. Preview deployments for pull requests

---

## 📚 Full Documentation

For detailed instructions, troubleshooting, and advanced topics, see:
- **[DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md)** - Complete deployment guide
- **[src/DEPLOYMENT_GUIDE.md](./src/DEPLOYMENT_GUIDE.md)** - Comprehensive deployment and hosting info

---

## 🚨 Troubleshooting

### "Firebase command not found"
```bash
npm install -g firebase-tools
```

### "Build failed"
```bash
# Check for errors
npm run build

# Install missing dependencies
npm install
```

### "Not authorized"
```bash
firebase logout
firebase login
```

### "Environment variables not working"
- Ensure variables start with `VITE_` prefix
- Rebuild after changing env vars: `npm run build`

---

## ✨ Next Steps After Deployment

1. ✅ Visit your live site: https://mz-marianna-kingdom-learning.web.app
2. ✅ Test all features on the live site
3. ✅ (Optional) Set up custom domain in Firebase Console
4. ✅ (Optional) Enable Firebase Analytics
5. ✅ Share with beta testers!

---

## 🎉 Ready to Deploy!

Choose your preferred option above and deploy your application now!

**Need help?** See [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) for detailed instructions.
