# Deployment Guide - Mz. Marianna's Learning Kingdom

This guide provides step-by-step instructions for deploying the Learning Kingdom application to Firebase App Hosting.

## Prerequisites

Before deploying, ensure you have:

1. **Firebase CLI** installed:
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase Project**: `mz-marianna-kingdom-learning` (Project ID from `.firebaserc`)

3. **Firebase Authentication**: Login to Firebase CLI:
   ```bash
   firebase login
   ```

## Environment Variables

The application requires the following Firebase environment variables for production:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mz-marianna-kingdom-learning.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mz-marianna-kingdom-learning
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mz-marianna-kingdom-learning.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=102564887145
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://mz-marianna-kingdom-learning-default-rtdb.firebaseio.com
```

### Setting Environment Variables in Firebase App Hosting

1. Go to [Firebase Console](https://console.firebase.google.com/project/mz-marianna-kingdom-learning)
2. Navigate to **App Hosting**
3. Click on your backend configuration
4. Go to **Environment Variables** section
5. Add each of the above variables

Alternatively, update `apphosting.yaml` with the correct values:

```yaml
env:
  - variable: NEXT_PUBLIC_FIREBASE_API_KEY
    value: your_actual_api_key
    availability:
      - BUILD
      - RUNTIME
  # Add other variables...
```

## Build Status ✓

The project has been verified to build successfully:

- ✓ **Linting**: No ESLint warnings or errors
- ✓ **Tests**: All tests passing (1/1)
- ✓ **Build**: Production build successful
  - 11 pages generated
  - Static and dynamic routes compiled
  - No build errors

## Deployment Methods

### Method 1: Firebase App Hosting (Recommended)

Firebase App Hosting provides integrated CI/CD with GitHub:

1. **Connect Repository**:
   ```bash
   firebase apphosting:backends:create
   ```
   - Select the GitHub repository: `Mzmarianna/mz-learning-kingdom`
   - Choose the branch: `main` (or your production branch)
   - Configure build settings (auto-detected from Next.js)

2. **Deploy**:
   - Push to the configured branch
   - Firebase automatically builds and deploys
   - Monitor deployment in Firebase Console

3. **Manual Deploy**:
   ```bash
   firebase deploy --only apphosting
   ```

### Method 2: Firebase Hosting (Static Export)

For static hosting without server-side features:

1. **Update `next.config.ts`** to enable static export:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     // ... other config
   };
   ```

2. **Build**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   firebase deploy --only hosting
   ```

Note: Static export doesn't support server-side features like API routes or dynamic rendering.

### Method 3: Vercel (Alternative)

The application can also be deployed to Vercel:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All environment variables are configured
- [ ] Firebase project is properly set up
- [ ] Firestore security rules are configured
- [ ] Firebase Authentication providers are enabled (Email/Password, Google)
- [ ] Build completes successfully (`npm run build`)
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] `.env.production` or Firebase environment variables are set
- [ ] Domain configuration is complete (if using custom domain)

## Post-Deployment Steps

1. **Verify Deployment**:
   - Access the deployed URL
   - Test critical user flows:
     - Homepage loads correctly
     - Quiz functionality works
     - Authentication works (if applicable)
     - Profile pages load
     - LMS dashboard works

2. **Monitor**:
   - Check Firebase Console for errors
   - Review Firebase Performance Monitoring
   - Check Firebase Analytics for traffic

3. **Configure Custom Domain** (Optional):
   - Go to Firebase Console → Hosting → Add custom domain
   - Follow DNS configuration instructions
   - Wait for SSL certificate provisioning (automatic)

## Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: mz-marianna-kingdom-learning
```

Don't forget to add secrets to GitHub repository settings.

## Rollback Procedure

If issues occur after deployment:

### Firebase App Hosting Rollback:
1. Go to Firebase Console → App Hosting
2. Click on your backend
3. View deployment history
4. Select a previous stable version
5. Click "Rollback to this version"

### Manual Rollback:
```bash
# Checkout previous stable commit
git checkout <previous-commit-sha>

# Deploy
firebase deploy --only apphosting
```

## Troubleshooting

### Build Fails
- **Font Loading Issues**: Fonts now load at runtime via `<link>` tags
- **Firebase Config Missing**: Build works without Firebase env vars (runtime initialization)
- **Check logs**: `firebase apphosting:backends:logs <backend-id>`

### Runtime Errors
- Check browser console for errors
- Verify environment variables are set correctly
- Check Firebase Console → Functions/Hosting logs

### Connection Issues
- Verify Firebase credentials are correct
- Check Firestore security rules
- Ensure Authentication providers are enabled

## Support & Resources

- **Firebase Documentation**: https://firebase.google.com/docs/app-hosting
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Project Repository**: https://github.com/Mzmarianna/mz-learning-kingdom
- **Deployment Roadmap**: See `docs/deployment-roadmap.md`

## Summary

The application is **ready for deployment**:
- ✓ Build system is working
- ✓ Tests are passing
- ✓ Configuration files are in place
- ✓ Firebase project is configured

**Quick Deploy Command**:
```bash
# From repository root
npm install
npm run build
firebase deploy --only apphosting
```

For immediate deployment assistance, follow the "Firebase App Hosting" method above.
