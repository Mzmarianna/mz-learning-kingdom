#!/bin/bash

# GitHub Setup Script for Mz. Marianna's Academy
# This script initializes git and pushes to GitHub

echo "🚀 Setting up GitHub for Mz. Marianna's Academy..."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   - Mac: brew install git"
    echo "   - Windows: https://git-scm.com/download/win"
    echo "   - Linux: sudo apt-get install git"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already initialized
if [ -d .git ]; then
    echo "⚠️  Git repository already exists"
    echo "   Do you want to continue? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
else
    # Initialize git
    echo "📦 Initializing git repository..."
    git init
    echo ""
fi

# Check if .gitignore exists
if [ ! -f .gitignore ]; then
    echo "⚠️  .gitignore not found. Creating one..."
    # Create basic .gitignore
    cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.DS_Store
dist/
build/
.vercel
*.log
EOF
    echo "✅ Created .gitignore"
else
    echo "✅ .gitignore exists"
fi
echo ""

# Add all files
echo "📝 Adding all files to git..."
git add .
echo ""

# Check git config
if [ -z "$(git config user.name)" ]; then
    echo "⚙️  Git user not configured"
    echo "   Enter your name:"
    read -r git_name
    git config user.name "$git_name"
fi

if [ -z "$(git config user.email)" ]; then
    echo "   Enter your email:"
    read -r git_email
    git config user.email "$git_email"
fi

echo "✅ Git configured as: $(git config user.name) <$(git config user.email)>"
echo ""

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Complete LMS with portfolio system

Features:
- Role-based authentication (Student, Parent, Admin, Teacher, Tutor, School)
- Student dashboard with quest map, avatar customizer, XP system
- Portfolio system (video recording, image upload, text reflections)
- Parent dashboard with portfolio viewing
- Tutor review queue with feedback system
- Admin dashboard for student management
- Neurodivergent-first design with Calm Mastery principles
- Firebase integration (Auth, Firestore, Storage)
- Responsive design for all devices"

echo ""

# Add remote
echo "🔗 Adding GitHub remote..."
REPO_URL="https://github.com/Mzmarianna/roblox-learning-hub.git"

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo "   Remote 'origin' already exists"
    echo "   Current URL: $(git remote get-url origin)"
    echo "   Update to $REPO_URL? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo "✅ Updated remote URL"
    fi
else
    git remote add origin "$REPO_URL"
    echo "✅ Added remote: $REPO_URL"
fi
echo ""

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main
echo ""

# Push to GitHub
echo "🚀 Ready to push to GitHub!"
echo "   Repository: $REPO_URL"
echo ""
echo "   ⚠️  IMPORTANT: You'll need to authenticate with GitHub"
echo "   If prompted for password, use a Personal Access Token (PAT)"
echo "   Generate one at: https://github.com/settings/tokens"
echo ""
echo "   Push now? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo "Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ SUCCESS! Your code is now on GitHub!"
        echo ""
        echo "🎉 Next steps:"
        echo "   1. View your repository: https://github.com/Mzmarianna/roblox-learning-hub"
        echo "   2. Connect to Vercel: https://vercel.com/new"
        echo "   3. Add environment variables in Vercel (Firebase config)"
        echo ""
        echo "📚 Documentation:"
        echo "   - GITHUB_SETUP.md - Complete GitHub guide"
        echo "   - DEPLOYMENT_GUIDE.md - Vercel deployment"
        echo "   - PORTFOLIO_SYSTEM_GUIDE.md - Portfolio features"
        echo ""
    else
        echo ""
        echo "❌ Push failed. Common issues:"
        echo "   - Need to authenticate (use Personal Access Token)"
        echo "   - Repository doesn't exist or you don't have access"
        echo "   - Network connection issue"
        echo ""
        echo "📖 See GITHUB_SETUP.md for troubleshooting"
    fi
else
    echo ""
    echo "Skipped push. When ready, run:"
    echo "   git push -u origin main"
fi

echo ""
echo "✨ Setup complete!"
