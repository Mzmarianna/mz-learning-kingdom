# 🚀 GitHub Setup Guide - Push Your Code to Repository

## Quick Setup (5 Minutes)

Your repository is ready at: `https://github.com/Mzmarianna/roblox-learning-hub`

Follow these steps to push all your code:

---

## Step 1: Initialize Git (in your project folder)

Open Terminal (Mac) or Command Prompt (Windows) in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Make your first commit
git commit -m "Initial commit: Portfolio system + complete LMS"
```

---

## Step 2: Connect to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/Mzmarianna/roblox-learning-hub.git

# Verify it was added
git remote -v
```

---

## Step 3: Push Your Code

```bash
# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

**If you get an authentication error:**
- GitHub requires a Personal Access Token (PAT) instead of password
- Go to: GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Click "Generate new token (classic)"
- Give it a name: "Roblox Learning Hub"
- Select scopes: `repo` (full control)
- Click "Generate token"
- **COPY THE TOKEN** (you won't see it again!)
- Use the token as your password when pushing

---

## Step 4: Create .gitignore

Before pushing, let's make sure we don't commit sensitive data:

```bash
# Create .gitignore file
touch .gitignore
```

Add this content to `.gitignore`:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/
.next/
out/

# Environment variables (IMPORTANT - never commit!)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Firebase
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Vercel
.vercel

# Temporary files
*.tmp
*.temp
.cache/
```

Then update your commit:

```bash
git add .gitignore
git commit -m "Add .gitignore to protect sensitive data"
git push
```

---

## Step 5: Protect Your Firebase Config

**IMPORTANT:** Never commit Firebase API keys to public repos!

### Option A: Use Environment Variables (Recommended)

1. Create `.env.local` file in your project root:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

2. Update `/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

3. Add to Vercel:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add each `VITE_FIREBASE_*` variable
   - Redeploy

### Option B: Firebase App Check (Extra Security)

Firebase App Check prevents unauthorized access even if keys are exposed:

1. Go to Firebase Console → App Check
2. Enable for your web app
3. Use reCAPTCHA provider for web
4. Add to your app:

```typescript
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('your-recaptcha-site-key'),
  isTokenAutoRefreshEnabled: true
});
```

---

## GitHub Best Practices

### Branching Strategy

```bash
# Create a development branch
git checkout -b development

# Work on features in feature branches
git checkout -b feature/portfolio-system
git add .
git commit -m "Add portfolio submission component"
git push -u origin feature/portfolio-system

# Merge to development when ready
git checkout development
git merge feature/portfolio-system
git push

# Merge to main when stable
git checkout main
git merge development
git push
```

### Commit Message Guidelines

Use clear, descriptive messages:

```bash
# Good ✅
git commit -m "Add video recording to portfolio submission"
git commit -m "Fix camera permission handling in Safari"
git commit -m "Update parent dashboard with portfolio stats"

# Bad ❌
git commit -m "updates"
git commit -m "fix bug"
git commit -m "wip"
```

### Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- filename.tsx

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# Delete branch
git branch -d branch-name

# Pull latest changes
git pull origin main

# View differences
git diff filename.tsx
```

---

## Connect to Vercel (Auto-Deploy)

Once your code is on GitHub, connect to Vercel for automatic deployments:

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `Mzmarianna/roblox-learning-hub`
4. Configure:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables (your Firebase config)
6. Click "Deploy"

**Now every push to `main` automatically deploys!** 🚀

---

## Collaboration Workflow

If you're working with a team:

### 1. Protect Main Branch

In GitHub:
- Go to Settings → Branches
- Add rule for `main`
- Enable: "Require pull request reviews before merging"

### 2. Pull Request Process

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push -u origin feature/new-feature

# Go to GitHub and create Pull Request
# Request review from team member
# Merge when approved
```

### 3. Keep Your Fork Updated

```bash
# Add upstream repository
git remote add upstream https://github.com/Mzmarianna/roblox-learning-hub.git

# Fetch latest changes
git fetch upstream

# Merge into your main branch
git checkout main
git merge upstream/main
git push
```

---

## Backup Strategy

### Daily Commits

```bash
# End of day commit
git add .
git commit -m "End of day: $(date +%Y-%m-%d)"
git push
```

### Create Releases/Tags

```bash
# Tag important milestones
git tag -a v1.0.0 -m "MVP Release - Portfolio System"
git push origin v1.0.0

# View tags
git tag -l
```

### GitHub Releases

1. Go to GitHub → Releases
2. Click "Create a new release"
3. Choose tag: `v1.0.0`
4. Title: "MVP Launch - Portfolio System"
5. Description: List features
6. Publish release

---

## Troubleshooting

### "Permission denied (publickey)"

Generate SSH key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
```

Add to GitHub: Settings → SSH and GPG keys → New SSH key

### "Repository not found"

Check remote URL:

```bash
git remote -v
git remote set-url origin https://github.com/Mzmarianna/roblox-learning-hub.git
```

### "Your branch is ahead/behind"

Sync with remote:

```bash
git pull --rebase origin main
git push
```

### Merge Conflicts

```bash
# Open conflicted files and resolve
# Look for <<<<<<< HEAD markers
# Keep the changes you want
# Remove conflict markers

git add resolved-file.tsx
git commit -m "Resolve merge conflict"
git push
```

---

## GitHub Features to Use

### 1. Issues

Track bugs and features:
- Go to Issues → New Issue
- Use labels: `bug`, `enhancement`, `documentation`
- Assign to team members
- Reference in commits: `git commit -m "Fix #12: Camera permission"`

### 2. Projects

Kanban board for tasks:
- Go to Projects → New Project
- Create columns: To Do, In Progress, Done
- Add issues as cards
- Track progress visually

### 3. Actions (CI/CD)

Auto-test on every push:

Create `.github/workflows/test.yml`:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
```

### 4. Wiki

Documentation:
- Go to Wiki → Create the first page
- Add setup guides, API docs, etc.

---

## Security Checklist

Before pushing:

- [ ] `.env` files in `.gitignore`
- [ ] No API keys in code
- [ ] Firebase config using environment variables
- [ ] No passwords in commit history
- [ ] `.gitignore` is comprehensive

If you accidentally committed secrets:

```bash
# Remove from history (dangerous!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

**Better:** Rotate the exposed keys immediately in Firebase Console

---

## Quick Reference

```bash
# Clone repository
git clone https://github.com/Mzmarianna/roblox-learning-hub.git

# Pull latest
git pull

# Create branch
git checkout -b feature-name

# Stage changes
git add .

# Commit
git commit -m "Description"

# Push
git push

# Merge main into your branch
git checkout feature-name
git merge main

# View changes
git status
git diff

# Undo changes
git checkout -- file.tsx
git reset --hard HEAD
```

---

## Next Steps

1. **Now:** Push your code to GitHub
2. **Today:** Connect to Vercel for auto-deploy
3. **This week:** Set up branch protection rules
4. **Ongoing:** Commit daily, use pull requests

---

## Resources

- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Vercel Git Integration](https://vercel.com/docs/git)

---

## ✅ Summary

**Run these commands to get started:**

```bash
git init
git add .
git commit -m "Initial commit: Complete LMS with portfolio system"
git remote add origin https://github.com/Mzmarianna/roblox-learning-hub.git
git branch -M main
git push -u origin main
```

**Your code is now:**
✅ Version controlled  
✅ Backed up on GitHub  
✅ Ready for collaboration  
✅ Ready for Vercel auto-deploy  

🚀 **You're all set!**
