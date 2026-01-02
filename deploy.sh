#!/bin/bash

# 🚀 Mz. Marianna's Learning Kingdom - Deployment Script
# This script builds and deploys your application to Firebase Hosting

set -e  # Exit on error

echo "=================================="
echo "🏗️  Building Application..."
echo "=================================="

# Build the application
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo ""
echo "=================================="
echo "✅ Build successful!"
echo "=================================="
echo ""

# Check if firebase CLI is available
if ! command -v firebase &> /dev/null; then
    echo "⚠️  Firebase CLI not found."
    echo "📦 Installing firebase-tools..."
    npm install -g firebase-tools
fi

echo "=================================="
echo "🚀 Deploying to Firebase Hosting..."
echo "=================================="
echo ""

# Deploy to Firebase
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "=================================="
    echo "✅ Deployment Complete!"
    echo "=================================="
    echo ""
    echo "🌍 Your application is live at:"
    echo "   https://mz-marianna-kingdom-learning.web.app"
    echo ""
    echo "📊 View in Firebase Console:"
    echo "   https://console.firebase.google.com/project/mz-marianna-kingdom-learning/hosting"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Please check the error messages above."
    exit 1
fi
