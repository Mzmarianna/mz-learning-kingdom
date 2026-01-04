# 🚀 Deployment Blockers Fixed - Ready to Deploy

**Date:** January 4, 2026  
**Status:** ✅ Critical deployment issues resolved

---

## ✅ Issues Fixed

### 1. Environment Variables ✅ FIXED
**Problem:** Using `process.env.NEXT_PUBLIC_*` in a Vite app  
**Solution:** Converted to `import.meta.env.VITE_*`

**Files Modified:**
- `firebase.ts` - Updated all env variable references
- `.env.example` - Updated with correct VITE_ prefixed variables

**What Changed:**
```diff
- process.env.NEXT_PUBLIC_FIREBASE_API_KEY
+ import.meta.env.VITE_FIREBASE_API_KEY

- process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN  
+ import.meta.env.VITE_FIREBASE_AUTH_DOMAIN

// ... and all other Firebase env vars
```

### 2. Build Output Configuration ✅ VERIFIED
**Status:** Already correct! No changes needed.

- `vite.config.ts` has `outDir: 'build'`
- `firebase.json` has `public: 'build'`
- These match perfectly ✅

### 3. Security Rules Consistency ✅ FIXED
**Problem:** Firestore used custom claims (`token.role`), Storage used Firestore doc flags (`isAdmin`)  
**Solution:** Aligned Storage rules to use custom claims

**Files Modified:**
- `storage.rules` - Now uses `request.auth.token.role == 'admin'`

**Benefit:** Single source of truth for authorization

---

## 📋 Deployment Checklist

### Before First Deploy

1. **Set up Firebase project** (if not already done)
   ```bash
   firebase login
   firebase init
   ```
   - Select: Hosting, Firestore, Storage, Functions
   - Choose existing project or create new one

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual Firebase config values
   ```

   Get values from Firebase Console → Project Settings → General

3. **Enable Firebase services**
   - ✅ Authentication (Email/Password, Google, etc.)
   - ✅ Firestore Database
   - ✅ Storage (bucket)
   - ✅ Hosting
   - ⚠️ Functions (if you need custom claims/roles)

4. **Set up custom claims** (if using role-based access)
   
   You'll need a Cloud Function or script to set user roles:
   ```javascript
   // In functions/src/index.ts
   import { auth } from 'firebase-admin';
   
   export const setUserRole = functions.https.onCall(async (data, context) => {
     // Verify admin permission first
     await auth().setCustomUserClaims(data.uid, { role: data.role });
   });
   ```

### Deploy Commands

```bash
# Install dependencies
npm ci

# Build the app
npm run build

# Deploy everything
firebase deploy

# Or deploy specific services:
firebase deploy --only hosting
firebase deploy --only firestore
firebase deploy --only storage
firebase deploy --only functions
```

---

## 🔧 Environment Variables Reference

### Required Variables

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Optional Variables

```env
# Realtime Database (only if you use it)
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Analytics (recommended for production)
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# App Check (recommended for production)
VITE_FIREBASE_APPCHECK_SITE_KEY=your-recaptcha-v3-site-key
VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=debug-token-for-local-dev
```

---

## 🎯 What Was the Build Output Issue?

**Short Answer:** It was already correct! No fix needed.

**Long Answer:**
- Vite's default output folder is `dist/`
- Your `vite.config.ts` was already configured with `outDir: 'build'`
- Your `firebase.json` already pointed to `public: 'build'`
- These matched, so hosting would work correctly ✅

---

## 🔐 Security Rules - Custom Claims Approach

Both Firestore and Storage now use custom claims for role-based access:

### How Custom Claims Work

1. **Admin sets user role** (via Cloud Function or Admin SDK)
   ```javascript
   admin.auth().setCustomUserClaims(uid, { role: 'admin' });
   ```

2. **Token includes role claim**
   ```javascript
   // In client code
   const token = await user.getIdTokenResult();
   console.log(token.claims.role); // 'admin', 'tutor', 'student'
   ```

3. **Security rules check the claim**
   ```
   // In firestore.rules
   function role() { return request.auth.token.role; }
   function isAdmin() { return role() == "admin"; }
   
   // In storage.rules  
   allow write: if request.auth.token.role == 'admin';
   ```

### Setting Up Roles (One-Time Setup)

You'll need to create a Cloud Function to set roles. Example:

```javascript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Call this once per user to set their role
export const setUserRole = functions.https.onCall(async (data, context) => {
  // Only admins can set roles
  if (!context.auth?.token.role || context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can set roles'
    );
  }

  const { uid, role } = data;
  
  if (!['admin', 'tutor', 'student'].includes(role)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid role');
  }

  await admin.auth().setCustomUserClaims(uid, { role });
  
  return { success: true, message: `Role ${role} set for user ${uid}` };
});
```

---

## 🧪 Testing the Build

```bash
# Build the project
npm run build

# Check that build/ folder was created
ls -la build/

# Preview the build locally
npx vite preview --outDir build --port 3000
```

Expected output in `build/` folder:
- `index.html`
- `assets/` folder with JS and CSS bundles
- Any static assets from `public/`

---

## 📊 Deployment Timeline

| Task | Status | Time |
|------|--------|------|
| Fix environment variables | ✅ Done | 10 min |
| Fix security rules | ✅ Done | 5 min |
| Verify build config | ✅ Done | 2 min |
| Test build process | ⏳ Next | 5 min |
| Deploy to Firebase | ⏳ Next | 10 min |

**Total time to deploy:** ~30 minutes from now

---

## 🎉 Next Steps

1. ✅ **Environment variables** - Fixed
2. ✅ **Security rules** - Fixed  
3. ⏳ **Test build** - Run `npm run build`
4. ⏳ **Deploy** - Run `firebase deploy`
5. ⏳ **Set up roles** - Create admin user and assign role
6. ⏳ **Test in production** - Verify all features work

---

## 💡 Pro Tips

1. **Use .env for local, GitHub Secrets for CI/CD**
   - Local: `.env` file (gitignored)
   - CI/CD: GitHub Secrets → Firebase Hosting secrets

2. **Test locally before deploying**
   ```bash
   npm run build
   firebase emulators:start
   ```

3. **Deploy incrementally**
   - First time: `firebase deploy --only hosting`
   - Test it works
   - Then: `firebase deploy --only firestore,storage`
   - Finally: `firebase deploy --only functions`

4. **Monitor after deploy**
   - Check Firebase Console → Hosting
   - Check browser console for errors
   - Test auth flow
   - Test role-based access

---

## ❓ FAQ

**Q: Do I need a container?**  
A: No. Firebase Hosting serves your Vite SPA directly. Only use containers if you need a custom backend.

**Q: Do I need the Realtime Database?**  
A: Only if you use it. Check your code - if you're only using Firestore, you can skip Realtime Database.

**Q: What about the Functions folder?**  
A: It exists and is configured. Deploy it if you need server-side logic (like setting custom claims).

**Q: Storage bucket - do I need it?**  
A: Yes! You're using `getStorage()` in firebase.ts and have storage.rules, so enable it.

---

*Ready to deploy! All critical blockers are now fixed.* 🚀
