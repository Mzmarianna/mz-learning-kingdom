# 🚀 Push Your Code to GitHub - Quick Guide

## Method 1: Automated Script (Easiest) ⭐

### Mac/Linux:
```bash
# Make script executable
chmod +x setup-github.sh

# Run setup script
./setup-github.sh
```

### Windows:
```cmd
# Double-click setup-github.bat
# OR run in Command Prompt:
setup-github.bat
```

The script will:
✅ Initialize git  
✅ Create .gitignore  
✅ Add all files  
✅ Create initial commit  
✅ Connect to GitHub  
✅ Push your code  

---

## Method 2: Manual Setup (5 minutes)

### Step 1: Open Terminal/Command Prompt

**Mac:** Applications → Utilities → Terminal  
**Windows:** Start → Command Prompt or PowerShell  
**Navigate to your project folder**

### Step 2: Run These Commands

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Complete LMS with portfolio system"

# Connect to GitHub
git remote add origin https://github.com/Mzmarianna/roblox-learning-hub.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Authenticate

When prompted:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

**Get a token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Roblox Learning Hub"
4. Select: `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY IT** (you won't see it again!)
7. Paste as password when pushing

---

## What Gets Pushed?

Everything in your project EXCEPT:
- ❌ `node_modules/` (dependencies - too large)
- ❌ `.env` files (secrets - never commit!)
- ❌ `build/` or `dist/` folders (generated files)
- ❌ `.DS_Store`, `Thumbs.db` (OS files)
- ❌ Log files

This is controlled by `.gitignore`

---

## ⚠️ IMPORTANT: Protect Your Secrets!

### Before Pushing, Check:

```bash
# View what will be committed
git status

# If you see .env files listed, STOP!
# Make sure .gitignore includes .env
```

### .gitignore Should Include:

```
.env
.env.local
.env.production
node_modules/
```

### If You Accidentally Committed Secrets:

1. **Immediately rotate your Firebase API keys** in Firebase Console
2. Remove from git history:
   ```bash
   git rm --cached .env
   git commit -m "Remove .env from tracking"
   git push
   ```

---

## Verify It Worked

1. Go to: https://github.com/Mzmarianna/roblox-learning-hub
2. You should see all your files!
3. Check the commit message shows your description

---

## Daily Workflow (After Initial Push)

```bash
# Check what changed
git status

# Add changed files
git add .

# Commit with description
git commit -m "Add parent portfolio viewing feature"

# Push to GitHub
git push
```

**Pro tip:** Commit often! End of each work session is a good habit.

---

## Troubleshooting

### "fatal: not a git repository"
→ You're not in the project folder. Navigate to it first.

### "Permission denied (publickey)"
→ Use HTTPS instead of SSH (the commands above use HTTPS)

### "Authentication failed"
→ Use Personal Access Token, not your GitHub password

### "Repository not found"
→ Check the URL is correct:
```bash
git remote -v
```

### "Your branch is ahead of 'origin/main'"
→ Your local code is newer. Push it:
```bash
git push
```

### "Your branch is behind 'origin/main'"
→ GitHub has newer code. Pull it:
```bash
git pull
```

---

## Next Steps After Pushing

### 1. Connect to Vercel (Auto-Deploy)

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import `Mzmarianna/roblox-learning-hub`
4. Framework: **Vite**
5. Add environment variables (Firebase config)
6. Deploy!

**Now every push to GitHub auto-deploys to production** 🚀

### 2. Invite Collaborators

In GitHub:
- Settings → Collaborators
- Add team members
- They can clone and contribute

### 3. Set Up Branch Protection

In GitHub:
- Settings → Branches → Add rule
- Branch name: `main`
- ✅ Require pull request reviews
- ✅ Require status checks to pass

---

## Quick Reference

### Common Commands

```bash
# Check status
git status

# View changes
git diff

# Commit all changes
git add .
git commit -m "Description"
git push

# Pull latest from GitHub
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

### Useful Aliases (Optional)

Add to `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
```

Now you can use `git st` instead of `git status`, etc.

---

## Resources

- **GitHub Setup Guide:** `/GITHUB_SETUP.md` (detailed)
- **Git Basics:** https://guides.github.com/
- **Vercel Git Integration:** https://vercel.com/docs/git

---

## ✅ Checklist

Before pushing:
- [ ] `.gitignore` includes `.env` and `node_modules/`
- [ ] No sensitive data (API keys, passwords) in code
- [ ] Firebase config uses environment variables
- [ ] All files you want to share are added
- [ ] Commit message is descriptive

After pushing:
- [ ] Verified code is on GitHub
- [ ] Connected to Vercel for auto-deploy
- [ ] Added environment variables to Vercel
- [ ] Tested deployment works

---

## 🎉 You're Ready!

Your code will be:
✅ Safely backed up on GitHub  
✅ Version controlled (undo changes anytime)  
✅ Ready for collaboration  
✅ Auto-deployed on every push  

**Run the setup script or manual commands above to get started!**

Questions? Check the detailed guide: `/GITHUB_SETUP.md`
