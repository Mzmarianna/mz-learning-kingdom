# Firebase Project Setup Guide

Follow these steps to bring the `mz-marianna-kingdom-learning` Firebase project online. Use this checklist during Phase 2 of the deployment roadmap and mark items complete in `docs/deployment-roadmap.md` as you finish them.

## 1. Create or Verify the Firebase Project
1. Visit <https://console.firebase.google.com/> and sign in with the project owner account.
2. From the project picker, search for `mz-marianna-kingdom-learning`.
   - If the project exists, open it and confirm the **Project ID** and **Default GCP region** are correct (`us-central`).
   - If it does not exist, click **Add project**, enter the project name, accept the default analytics location, and ensure the region is set to `us-central`.
3. Record the **Project ID** and **Web App ID** once created. You will need these values for environment variables and CI secrets.

## 2. Register the Web App and Retrieve Config
1. In the project dashboard, click the web (`</>`) icon to register a new web app if one is not already present.
2. Name the app `Learning Kingdom Web` and leave Firebase Hosting unchecked for now.
3. Copy the generated config object (API key, auth domain, project ID, storage bucket, messaging sender ID, app ID). Paste these values into:
   - `.env.local`
   - `.env.production`
   - Vercel environment variables (Preview + Production)
4. Store the sensitive values in your password manager or secret vault.

## 3. Enable Authentication Providers
1. Navigate to **Build → Authentication → Get started**.
2. Enable **Email/Password** provider.
3. Enable **Google** provider:
   - Provide support email (e.g., support@mzmarianna.com).
   - Download the generated OAuth client credentials and store them securely for future use.
4. Add any additional providers you expect to support before launch.

## 4. Configure Firestore
1. Go to **Build → Firestore Database → Create database**.
2. Select **Production mode** and region `us-central`.
3. Create the initial collections:
   - `students`
   - `guardians`
   - `sessions`
   - `questLogs`
   - `achievements`
4. Export the current rules via the Firebase CLI so they can be versioned in `firestore.rules`:
   ```powershell
   firebase login
   firebase use mz-marianna-kingdom-learning
   firebase firestore:rules:get > firestore.rules
   ```
5. Define required composite indexes (example shown below). Add entries to `firestore.indexes.json` and deploy:
   ```json
   {
     "collectionGroup": "sessions",
     "queryScope": "COLLECTION",
     "fields": [
       { "fieldPath": "studentId", "order": "ASCENDING" },
       { "fieldPath": "startAt", "order": "DESCENDING" }
     ]
   }
   ```
   Deploy indexes:
   ```powershell
   firebase deploy --only firestore:indexes
   ```

## 5. Configure Firebase Hosting (Fallback)
1. From **Build → Hosting**, click **Get started** and follow the prompts.
2. When asked for a site ID, use something like `learning-kingdom-fallback`.
3. Back in the repo, update `firebase.json` with the selected site name if it differs from the default.
4. Deploy a placeholder build to confirm hosting works:
   ```powershell
   npm run build
   firebase deploy --only hosting
   ```

## 6. Enable Analytics and Performance Monitoring
1. Under **Build → Analytics → Dashboard**, make sure Google Analytics is enabled for the project.
2. Copy the **Measurement ID** (format `G-XXXXXXXXXX`) and update `.env.production` and Vercel production env vars.
3. Enable **Performance Monitoring** via **Build → Performance → Get started**.
4. Add the Firebase Performance SDK when the Next.js app is ready (track in the backlog).

## 7. Service Account & CI/CD Tokens
1. Generate a CI token for Firebase deployments:
   ```powershell
   firebase login:ci
   ```
   Store the token as `FIREBASE_TOKEN` in GitHub and Vercel.
2. Ensure the primary service account has the required IAM roles (Firebase Admin, Cloud Functions Admin if needed).

## 8. Verification Checklist
- [ ] Project exists in `us-central`.
- [ ] Web app registered and config captured.
- [ ] Email/Password and Google auth enabled.
- [ ] Firestore initialized with collections and rules.
- [ ] Composite indexes defined for key queries.
- [ ] Hosting fallback site created and deploy verified.
- [ ] Analytics & Performance Monitoring enabled.
- [ ] CI token generated and stored in secrets.

Update the deployment roadmap as you complete each step. Reach out if you hit blockers—I can help translate console settings into repo config changes.
