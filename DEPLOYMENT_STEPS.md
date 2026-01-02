# 🚀 Deployment Guide - Mz. Marianna's Learning Kingdom

## Quick Start - Deploy to Firebase Hosting

You're ready to deploy! Your application is built and configured for Firebase Hosting.

### Prerequisites
- ✅ Build successful (`npm run build` creates `/build` directory)
- ✅ Firebase project exists: `mz-marianna-kingdom-learning`
- ✅ Firebase configuration in place

---

## 📋 Step-by-Step Deployment Process

### Option 1: Deploy Using Firebase CLI (Recommended)

#### Step 1: Install Firebase Tools

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Verify installation
firebase --version
```

#### Step 2: Login to Firebase

```bash
# Authenticate with your Google account
firebase login

# This will open a browser window for authentication
# Sign in with the Google account that owns the Firebase project
```

#### Step 3: Verify Project Configuration

```bash
# Check that you're connected to the correct project
firebase projects:list

# Should show: mz-marianna-kingdom-learning
```

#### Step 4: Build Your Application

```bash
# Build the production-ready application
npm run build

# This creates the /build directory with optimized files
```

#### Step 5: Deploy to Firebase Hosting

```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Or deploy everything (hosting + functions + firestore rules)
firebase deploy
```

#### Step 6: Access Your Live Application

After deployment completes, Firebase will display your hosting URL:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/mz-marianna-kingdom-learning/overview
Hosting URL: https://mz-marianna-kingdom-learning.web.app
```

---

### Option 2: Quick Deploy Script

Create a simple deployment script for faster future deployments:

**deploy.sh** (Linux/Mac):
```bash
#!/bin/bash
echo "🏗️  Building application..."
npm run build

echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "Visit: https://mz-marianna-kingdom-learning.web.app"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

**deploy.bat** (Windows):
```batch
@echo off
echo Building application...
call npm run build

echo Deploying to Firebase Hosting...
call firebase deploy --only hosting

echo Deployment complete!
echo Visit: https://mz-marianna-kingdom-learning.web.app
pause
```

---

### Option 3: GitHub Actions (Automated CI/CD)

For automatic deployments on every push to main branch, see the section below on CI/CD setup.

---

## 🔧 Firebase Project Configuration

### Current Configuration

Your project is already configured:
- **Project ID**: `mz-marianna-kingdom-learning`
- **Build Directory**: `build` (configured in firebase.json)
- **SPA Rewrites**: Enabled (all routes redirect to /index.html)
- **Asset Caching**: Static assets cached for 1 year

### Verify Firebase Configuration

Check `.firebaserc`:
```json
{
  "projects": {
    "default": "mz-marianna-kingdom-learning"
  }
}
```

Check `firebase.json`:
```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🌍 Environment Variables for Production

### Important: Update Environment Variables

Your app uses environment variables for Firebase configuration. Make sure these are correctly set:

**For local development (.env.local)**:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mz-marianna-kingdom-learning
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
```

**For production**: These variables are embedded during the build process. Make sure your `.env.local` or `.env.production` file contains the correct production Firebase credentials before running `npm run build`.

> **Note**: Since this is a Vite project, the build process will embed environment variables that start with `VITE_` prefix. If you're using `NEXT_PUBLIC_` prefix, you may need to update your environment variables to use `VITE_` instead.

### Update Environment Variable Prefix (If Needed)

Check if your codebase uses `NEXT_PUBLIC_` or `VITE_` prefix:

```bash
# Search for environment variable usage
grep -r "NEXT_PUBLIC_" src/
grep -r "VITE_" src/
grep -r "import.meta.env" src/
```

Update `.env.example` and your actual environment files accordingly.

---

## 🔐 Security Checklist Before Deployment

- [ ] `.env.local` is in `.gitignore` (✅ Already configured)
- [ ] No API keys or secrets committed to git
- [ ] Firebase security rules configured for Firestore
- [ ] Firebase security rules configured for Storage
- [ ] Authentication properly configured
- [ ] CORS settings configured if needed

### Verify Firestore Rules

```bash
# View current rules
cat firestore.rules

# Deploy rules separately if needed
firebase deploy --only firestore:rules
```

### Verify Storage Rules

```bash
# View current rules
cat storage.rules

# Deploy rules separately if needed
firebase deploy --only storage
```

---

## ✅ Post-Deployment Verification

After deploying, verify everything works:

1. **Visit your live site**: https://mz-marianna-kingdom-learning.web.app

2. **Test critical functionality**:
   - [ ] Home page loads correctly
   - [ ] Images and assets display
   - [ ] Navigation works (all routes accessible)
   - [ ] Authentication works (login/register)
   - [ ] Firestore data loads correctly
   - [ ] Quiz flow works
   - [ ] Results page displays

3. **Check browser console** (F12):
   - [ ] No JavaScript errors
   - [ ] No 404s for assets
   - [ ] Firebase initializes correctly

4. **Test on mobile**:
   - [ ] Responsive design works
   - [ ] Touch interactions function properly

---

## 🔄 Updating Your Live Site

After making changes to your code:

```bash
# 1. Test locally
npm run dev

# 2. Build for production
npm run build

# 3. Deploy updated version
firebase deploy --only hosting

# The live site updates in ~30 seconds
```

---

## 🚨 Troubleshooting Common Issues

### Issue 1: "Firebase command not found"
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Or use npx (no installation required)
npx firebase-tools deploy --only hosting
```

### Issue 2: "Error: Not authorized"
```bash
# Re-authenticate
firebase logout
firebase login
```

### Issue 3: "Build directory not found"
```bash
# Make sure you built the app first
npm run build

# Verify the build directory exists
ls -la build/
```

### Issue 4: "Environment variables not working"
- Vite requires variables to start with `VITE_` prefix
- Variables are embedded at build time, not runtime
- Rebuild after changing environment variables

```bash
# Update your .env files to use VITE_ prefix
VITE_FIREBASE_API_KEY=your-key

# In your code, access via:
import.meta.env.VITE_FIREBASE_API_KEY
```

### Issue 5: "Blank page after deployment"
- Check browser console for errors (F12)
- Verify all assets loaded (Network tab)
- Check Firebase hosting rewrites in firebase.json
- Verify environment variables are correct

### Issue 6: "Firebase project not found"
```bash
# Verify you're using the correct project
firebase use mz-marianna-kingdom-learning

# Or list all projects
firebase projects:list
```

---

## 🚀 Advanced: GitHub Actions CI/CD

For automatic deployments whenever you push to GitHub:

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: mz-marianna-kingdom-learning
```

### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_SERVICE_ACCOUNT` (JSON key from Firebase Console)

### Step 3: Get Firebase Service Account

```bash
# Generate service account key
firebase init hosting:github

# Follow the prompts to set up GitHub Actions
```

---

## 📊 Monitoring Your Deployed App

### Firebase Hosting Metrics

View hosting analytics in Firebase Console:
- https://console.firebase.google.com/project/mz-marianna-kingdom-learning/hosting

Metrics include:
- Requests per second
- Bandwidth usage
- Error rates
- Popular pages

### View Deployment History

```bash
# List recent deployments
firebase hosting:releases:list

# View deployment details
firebase hosting:releases
```

---

## 💰 Cost Considerations

### Firebase Hosting (Free Tier)
- **Storage**: 10 GB
- **Transfer**: 360 MB/day
- **Custom domain**: Yes (free SSL)

This free tier is sufficient for:
- ~10,000 page views per day
- ~300 concurrent users

### When to Upgrade

Upgrade to Blaze plan (pay-as-you-go) when you exceed:
- 10 GB storage
- 360 MB/day bandwidth
- Need Cloud Functions

---

## 🎯 Next Steps

Now that you're ready to deploy:

1. **First Deployment**: Follow Option 1 above to deploy manually
2. **Custom Domain**: (Optional) Add your own domain in Firebase Console
3. **CI/CD**: (Optional) Set up GitHub Actions for automated deployments
4. **Monitoring**: Set up Firebase Analytics and Performance Monitoring
5. **Share**: Share your live URL with beta testers!

---

## 📚 Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [GitHub Actions for Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)

---

## ✨ You're Ready to Deploy!

Your application is production-ready. Run these commands to go live:

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy --only hosting
```

**Your live site will be available at**: https://mz-marianna-kingdom-learning.web.app

🎉 Happy deploying! 🚀
