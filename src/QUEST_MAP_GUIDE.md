# Quest Map System - Complete Guide

## Overview

The Quest Map is the core visual interface for students in Mz. Marianna's Academy. It transforms the traditional "list of assignments" into an engaging, game-like experience inspired by Candy Crush and Super Mario World.

## Key Components

### 1. QuestMap Component (`/components/student/QuestMap.tsx`)

**Purpose**: Displays a scrollable visual map showing all 16 challenges in a quest as connected nodes.

**Features**:
- **Visual Node States**: Each challenge has a distinct visual appearance based on its status
  - 🔒 **Locked** (Grey): Future challenges not yet accessible
  - 🟢 **Available** (Green, Pulsing): Ready to start - the "next mission"
  - 💙 **In Progress** (Teal, Pulsing): Currently being worked on
  - ⏳ **Submitted** (Amber): Waiting for tutor review
  - ⭐ **Approved** (Purple/Pink Gradient): Mastered and completed
  - ↩️ **Needs Revision** (Gentle Amber): Requires another attempt (NO RED)

- **Snake Path Layout**: Challenges are arranged in a snake pattern (left-to-right, then right-to-left) similar to classic board games
- **Connected Nodes**: SVG lines connect challenges showing the progression path
- **Special Checkpoints**: Challenges #1, #8, and #16 have special labels:
  - Challenge 1: 📋 Assessment
  - Challenge 8: 🎯 Midpoint
  - Challenge 16: 🎉 Celebration!

- **Interactive Nodes**: Click any unlocked node to open the Challenge Card modal
- **Progress Bar**: Shows overall quest completion (X/16 challenges)
- **Legend**: Visual guide explaining each status color

### 2. ChallengeCard Component (`/components/student/ChallengeCard.tsx`)

**Purpose**: Full-screen modal that appears when a student clicks a challenge node.

**Features**:

#### Content Sections
1. **Watch Section** (📺)
   - Embedded video player for micro-lessons
   - Only shows if the challenge includes a video

2. **Instructions Section** (📝)
   - Clear, large text (Lexend font, dyslexia-friendly)
   - "Read Aloud" button using Web Speech API
   - Accessibility-first design

3. **Your Turn Section** (🎯)
   - Step-by-step instructions in a friendly green box
   - Clear expectations: Complete → Photo → Upload → Submit

4. **Submit Work Section** (📤)
   - Drag-and-drop file upload
   - Supports images and videos
   - Optional student notes/comments textarea
   - Evidence prompt specific to challenge type

5. **Status Banners**
   - **Mastered**: Purple gradient banner celebrating completion
   - **Under Review**: Amber banner with calm messaging

6. **Tutor Feedback**
   - Only positive, encouraging feedback
   - Displayed in purple box when available

#### Actions
- **Close**: Return to Quest Map
- **Submit Quest**: Upload work and earn instant XP
- **Read Aloud**: Listen to instructions (ADHD-friendly)

### 3. RewardOverlay Component (`/components/student/RewardOverlay.tsx`)

**Purpose**: Celebration animation shown immediately after quest submission.

**Features**:
- **Confetti Animation**: 30 colorful particles falling from top
- **XP Display**: Large, animated "+50 XP" badge
- **Sound Effect**: Visual "🔊 Ding!" indicator (Class Dojo style)
- **Trophy Icon**: Spinning celebration graphics
- **Achievement Unlock**: Shows if new badge earned
- **Auto-dismiss**: Disappears after 3 seconds
- **No Motion Sickness**: Respects `prefers-reduced-motion`

**Psychology**: Provides instant dopamine hit - reward for EFFORT, not just correctness.

## Student Workflow ("The Game Loop")

### Daily Flow
1. **Login** → See dashboard with avatar, XP bar, and "Continue Adventure" button
2. **Click "Continue Quest"** → Opens Quest Map
3. **See Progress** → Visual map shows:
   - Green pulsing node = "Do this next!"
   - Completed nodes glow purple/pink
   - Clear path forward
4. **Click Green Node** → Opens Challenge Card
5. **Watch/Read/Listen** → Consume instructions
6. **Complete Activity** → Work offline (paper, Roblox, project)
7. **Upload Evidence** → Take photo/screenshot, upload
8. **Submit** → 🎉 Instant reward overlay! "+50 XP" celebration
9. **Return to Map** → See node turn amber (under review)
10. **Tutor Reviews** → Node turns purple/pink (mastered!)

### Special Challenge Types

#### Challenge 1: Pre-Assessment
- Labeled with 📋 "Assessment"
- Sets baseline - no pressure messaging
- Includes intro video

#### Challenge 8: Midpoint Check-In
- Labeled with 🎯 "Midpoint"
- Reflection activity
- Celebrates being halfway!

#### Challenge 16: Grand Celebration
- Labeled with 🎉 "Celebration!"
- Creative culminating project
- Biggest XP reward
- Triggers certificate generation

## Design Philosophy: "Calm Mastery"

### Visual Design
- **Backgrounds**: Teal/cyan (calm, focus-enhancing)
- **Rewards**: Purple/pink gradients (dopamine, celebration)
- **Success**: Gentle green (not bright/harsh)
- **Attention**: Amber (not red - no anxiety triggers)
- **No Red**: EVER. Red triggers anxiety in neurodivergent learners

### Typography
- **Primary Font**: Lexend (dyslexia-friendly)
- **Large Text**: 18px minimum for instructions
- **High Contrast**: Dark text on light backgrounds
- **Extra Spacing**: Letter-spacing and word-spacing for readability

### Interaction Design
- **Pulse Animations**: Draw attention to "current challenge"
- **Hover States**: Clear feedback on interactive elements
- **Focus Indicators**: 3px outline for keyboard navigation
- **Reduced Motion**: Automatically disables animations if user prefers

### ADHD-Friendly Features
1. **Clear "Next Action"**: Always one pulsing green node
2. **Visual Progress**: See the path, see what's done
3. **Instant Feedback**: XP awarded immediately on submission
4. **No Penalties**: XP never decreases
5. **Revision Loop**: "Try again" is positive, not punitive
6. **Predictable Layout**: Consistent structure reduces cognitive load

## Mock Data System

The app includes a complete mock data generator (`/lib/mock-data.ts`) that demonstrates the full quest experience:

### Sample Quest Features
- **16 Challenges** with varied statuses
- **3 Completed** challenges (approved, with tutor feedback)
- **1 Available** challenge (ready to start)
- **1 In Progress** challenge (partially done)
- **1 Needs Revision** challenge (with encouraging feedback)
- **1 Submitted** challenge (awaiting review)
- **9 Locked** challenges (future content)

### XP Summary
- **Total XP**: 450 (3 challenges × 50 XP + bonuses)
- **Progress Bar**: Visual percentage to next level
- **Level Display**: Current level with Orbitron font

### Achievements
- **Quest Beginner**: 🎯 First quest started
- **Week Warrior**: 🔥 7-day streak

## Integration with Firebase

When Firebase is configured, the system will:
1. Load real quest instances from Firestore
2. Upload evidence to Firebase Storage
3. Create XP events in the append-only ledger
4. Trigger Cloud Functions for tutor notifications
5. Generate certificates on quest completion

## Next Steps for Development

### Phase 1: Backend Integration
- [ ] Connect QuestMap to real Firestore data
- [ ] Implement file upload to Firebase Storage
- [ ] Create XP event logging
- [ ] Add tutor notification triggers

### Phase 2: Enhanced Features
- [ ] Sound effects (actual audio files)
- [ ] Certificate PDF generation
- [ ] Streak tracking
- [ ] Multi-subject quest maps
- [ ] Parent notification emails

### Phase 3: Advanced Gamification
- [ ] Unlockable avatars/frames
- [ ] Coins/shop system
- [ ] Robux rewards integration
- [ ] Power-ups (skip video, hint system)
- [ ] Leaderboard (optional, opt-in)

## Code Architecture

```
/components/student/
├── QuestMap.tsx           # Visual map of 16 challenges
├── ChallengeCard.tsx      # Modal for individual challenge
├── RewardOverlay.tsx      # Celebration animation
├── StudentDashboard.tsx   # Main dashboard wrapper
├── AchievementsList.tsx   # Badge collection
└── WeeklyRhythm.tsx       # Weekly schedule view

/lib/
├── mock-data.ts           # Demo data generator
├── types.ts               # TypeScript interfaces
└── firestore-helpers.ts   # Database queries
```

## Testing the System

1. **Start the app**: `npm run dev`
2. **Login as student**: Use demo credentials or create account
3. **View Quest Map**: Click "Quest Map" tab
4. **Click Green Node**: Open Challenge 4 (available)
5. **Upload File**: Add a sample image
6. **Submit**: Watch reward overlay celebrate!
7. **Check Progress**: See node turn amber (under review)

## Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader friendly labels
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Text-to-speech for instructions
- ✅ Large click targets (16x16 minimum)
- ✅ Clear focus indicators
- ✅ ARIA labels on all interactive elements

## Performance Optimizations

- Motion animations use `AnimatePresence` for cleanup
- SVG paths rendered once, not per-frame
- Images lazy-loaded
- Mock data generated on-demand
- Component-level state management (no global store needed)

---

**Built with love for neurodivergent learners** 💜
