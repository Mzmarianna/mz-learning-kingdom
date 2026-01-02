# Deployment Guide - Mz. Marianna's Learning Kingdom

This guide provides step-by-step instructions for deploying the Learning Kingdom application to **Firebase Hosting**.

## Application Structure

This repository contains a **Vite + React** application that deploys to Firebase Hosting:
- **Primary App**: Vite React app in `src/` folder
- **Build Output**: `build/` folder (configured in firebase.json)
- **Build Command**: `npm run build` (runs `vite build`)

## Prerequisites

Before deploying, ensure you have:

1. **Node.js** (v20 or later) and npm installed
2. **Firebase CLI** installed:
   ```bash
   npm install -g firebase-tools
   ```

3. **Firebase Project**: `mz-marianna-kingdom-learning` (Project ID from `.firebaserc`)

4. **Firebase Authentication**: Login to Firebase CLI:
   ```bash
   firebase login
   ```

## Firebase Configuration

The application is now configured with production Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD3y0PAKH97pYnh5RqCxFzTPzYWuHn8YHo",
  authDomain: "mz-marianna-kingdom-learning.firebaseapp.com",
  databaseURL: "https://mz-marianna-kingdom-learning-default-rtdb.firebaseio.com",
  projectId: "mz-marianna-kingdom-learning",
  storageBucket: "mz-marianna-kingdom-learning.firebasestorage.app",
  messagingSenderId: "102564887145",
  appId: "1:102564887145:web:19c7a5262abaeb1e0140f8",
  measurementId: "G-14DW5GV1CH"
};
```

✅ **Firebase Analytics is enabled** and will track user interactions.

## Build Status ✓

The project builds successfully using Vite:

- ✓ **Build System**: Vite 6.3.5
- ✓ **Output Directory**: `build/`
- ✓ **Build Time**: ~4-5 seconds
- ✓ **Bundle Size**: ~1MB (optimized for production)

## Deployment Methods

### Method 1: Firebase Hosting (Recommended)

Firebase Hosting provides fast, secure hosting for your web app:

1. **Build the Application**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to Firebase Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

3. **Your app will be live** at:
   - `https://mz-marianna-kingdom-learning.web.app`
   - `https://mz-marianna-kingdom-learning.firebaseapp.com`

### Method 2: Deploy with Preview Channel

Test your deployment before going live:

1. **Build**:
   ```bash
   npm run build
   ```

2. **Deploy to Preview Channel**:
   ```bash
   firebase hosting:channel:deploy preview
   ```

3. **Review the preview URL** provided, then promote to live when ready:
   ```bash
   firebase hosting:channel:deploy live
   ```

## Pre-Deployment Checklist

Before deploying to production:

- [x] Firebase credentials configured in `firebase.ts`
- [x] Firebase project set up (`mz-marianna-kingdom-learning`)
- [x] Build completes successfully (`npm run build`)
- [x] Firebase Analytics enabled
- [x] Vite configuration optimized for production
- [ ] Firestore security rules configured
- [ ] Firebase Authentication providers enabled (Email/Password, Google)
- [ ] Test locally with `npm run dev`
- [ ] Review Firebase Hosting configuration in `firebase.json`

## Post-Deployment Steps

1. **Verify Deployment**:
   - Access your deployed URL
   - Test critical user flows:
     - Homepage loads correctly
     - Authentication works (if enabled)
     - Firestore data loads correctly
     - Analytics tracking works

2. **Configure Firebase Services**:
   - Enable Authentication providers in Firebase Console
   - Set up Firestore security rules
   - Configure Firestore indexes
   - Enable Performance Monitoring (optional)

3. **Configure Custom Domain** (Optional):
   - Go to Firebase Console → Hosting → Add custom domain
   - Follow DNS configuration instructions
   - Wait for SSL certificate provisioning (automatic)

## Continuous Deployment

### GitHub Actions

The repository includes a Cloud Run deployment workflow. To use Firebase Hosting instead, create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
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
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: mz-marianna-kingdom-learning
```

Remember to add `FIREBASE_SERVICE_ACCOUNT` secret to your GitHub repository.

## Troubleshooting

### Build Fails
- **Check Node version**: Ensure you're using Node 20+
- **Clear cache**: `rm -rf node_modules package-lock.json && npm install`
- **Check for errors**: Review build output for specific errors

### Deployment Fails
- **Check Firebase CLI**: Ensure you're logged in (`firebase login`)
- **Verify project**: Check `.firebaserc` has correct project ID
- **Check permissions**: Ensure you have deploy permissions in Firebase Console

### Runtime Errors
- Check browser console for errors
- Verify Firebase credentials in `firebase.ts`
- Check Firestore security rules allow your operations
- Ensure Authentication providers are enabled

## Project Structure

```
mz-learning-kingdom/
├── src/                    # Vite React application source
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── ...                # Other components and assets
├── build/                 # Build output (generated)
├── public/                # Static assets
├── firebase.ts            # Firebase configuration
├── firebase.json          # Firebase Hosting config
├── vite.config.ts         # Vite configuration
├── package.json           # Dependencies and scripts
└── ...
```

## Quick Command Reference

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server (port 3000)

# Build
npm run build           # Build for production (outputs to build/)

# Deployment
firebase login          # Authenticate with Firebase
firebase deploy --only hosting  # Deploy to Firebase Hosting
firebase hosting:channel:deploy preview  # Deploy to preview channel

# Monitoring
firebase hosting:sites:list  # List hosting sites
firebase hosting:channel:list  # List hosting channels
```

## Support & Resources

- **Firebase Console**: https://console.firebase.google.com/project/mz-marianna-kingdom-learning
- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Vite Documentation**: https://vite.dev/
- **GitHub Repository**: https://github.com/Mzmarianna/mz-learning-kingdom

## Summary

The application is **ready for deployment** to Firebase Hosting:
- ✓ Vite build system configured and working
- ✓ Firebase credentials set up with Analytics
- ✓ Build outputs to `build/` folder
- ✓ Firebase Hosting configured correctly

**Quick Deploy Command**:
```bash
npm install && npm run build && firebase deploy --only hosting
```

Your app will be live in minutes! 🚀
