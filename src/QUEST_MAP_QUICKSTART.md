# 🎮 Quick Start: Quest Map Demo

## Instant Demo (No Setup Required)

The Quest Map system includes complete mock data, so you can see it in action immediately!

### 1. Start the App
```bash
npm run dev
```

### 2. Access Student Dashboard
- Visit `http://localhost:5173`
- The app will use mock data automatically if Firebase isn't configured
- You'll see a complete quest with 16 challenges in various states

### 3. Explore the Quest Map

**What You'll See:**
- **Quest Map Tab**: Visual world map with 16 challenge nodes
- **Green Pulsing Node**: Challenge 4 (ready to start)
- **Purple Nodes**: Challenges 1-3 (completed)
- **Blue Node**: Challenge 5 (in progress)
- **Amber Nodes**: Challenge 6 (needs revision) and 7 (under review)
- **Grey Nodes**: Challenges 8-16 (locked for future)

### 4. Click a Challenge Node

Try clicking the **green pulsing node** (Challenge 4):
- Challenge Card modal opens
- See embedded video section
- Read instructions with "Read Aloud" button
- View file upload section
- Try uploading a sample image

### 5. Submit a Challenge

1. Click the file upload area
2. Select any image from your computer
3. Optionally add a note in the textarea
4. Click "🚀 Submit Quest"
5. **Watch the celebration!** 🎉
   - Confetti animation
   - "+50 XP" display
   - Sound effect indicator
   - Auto-dismisses after 3 seconds

### 6. Check Your Progress

After submitting:
- Node turns amber (Under Review status)
- Progress bar updates
- XP increases in sidebar
- Return to map to see updated visual state

## 🎯 Navigation Guide

### Student Dashboard Tabs

1. **Quest Map** 🗺️
   - Visual journey of 16 challenges
   - Click nodes to open challenge cards
   - See real-time progress

2. **Weekly Rhythm** 📅
   - Predictable weekly schedule
   - Reduces decision fatigue
   - ADHD-friendly routine

3. **Achievements** 🏆
   - Earned badges (currently 2 unlocked)
   - Upcoming achievements to unlock
   - XP bonuses displayed

### Sidebar Widgets

- **XP Display**: Shows total XP, level, and progress bar
- **What's Next**: Clear "Continue Quest" button
- **Quick Stats**: Completed quests and achievements count

## 🎨 Visual Status Guide

| Color | Status | Meaning | Action |
|-------|--------|---------|--------|
| 🟢 Green (Pulsing) | Available | Ready to start | Click to begin |
| 💙 Teal (Pulsing) | In Progress | Working on it | Click to continue |
| 🟡 Amber | Submitted/Needs Revision | Under review or try again | Click to view feedback |
| 💜 Purple/Pink | Approved | Mastered! | Click to review your success |
| ⚫ Grey | Locked | Future content | Not yet accessible |

## 🧪 Test Different Scenarios

### Scenario 1: Start a New Challenge
1. Click the green node (Challenge 4)
2. Watch the video (if present)
3. Read the instructions
4. Click "Read Aloud" to hear them spoken
5. Upload a file
6. Submit and celebrate!

### Scenario 2: Review Completed Work
1. Click a purple node (Challenges 1-3)
2. See "Challenge Mastered" banner
3. Read the tutor's positive feedback
4. See your submitted evidence

### Scenario 3: View "Needs Revision"
1. Click the amber node (Challenge 6)
2. Read encouraging tutor feedback: "Great start! Can you try..."
3. See previous submission
4. Upload improved work
5. Resubmit

### Scenario 4: Check Achievements
1. Click "Achievements" tab
2. See 2 earned badges:
   - 🎯 Quest Beginner (25 XP bonus)
   - 🔥 Week Warrior (50 XP bonus)
3. View upcoming achievements to unlock

## 🛠️ Customization Points

### Easy Modifications

**Change XP Rewards** (`/components/student/ChallengeCard.tsx`):
```typescript
baseXP: 50, // Change this number
```

**Adjust Challenge Count** (`/lib/mock-data.ts`):
```typescript
for (let i = 1; i <= 16; i++) { // Change 16 to different number
```

**Modify Colors** (`/styles/globals.css`):
```css
--calm-primary: oklch(0.55 0.12 200); /* Change hue value */
--reward-purple: oklch(0.60 0.20 300); /* Adjust color */
```

**Update Animation Speed** (`/components/student/RewardOverlay.tsx`):
```typescript
duration: 2.5, // Change confetti fall time
```

## 🔗 Firebase Integration (Optional)

When you're ready to use real data:

1. **Configure Firebase** (see `/QUICK_START.md`)
2. **Remove Mock Data Check**:
   - In `StudentDashboard.tsx`, the system auto-detects Firebase
   - If `.env` has valid credentials, uses real data
   - Otherwise, falls back to mock data

3. **Test Upload Flow**:
   - File uploads will save to Firebase Storage
   - Firestore will track challenge progress
   - XP events logged to database

## 📊 Mock Data Details

The demo quest includes:

### Completed Challenges (3)
- Challenge 1: Pre-Assessment ⭐
- Challenge 2: Roblox Multiplication Arena ⭐
- Challenge 3: Fraction Pizza Party ⭐

**Each has:**
- Tutor feedback (positive, encouraging)
- Mock evidence (screenshot)
- 50 XP awarded

### Current Challenge (1)
- Challenge 4: Number Pattern Detective 🟢
- Ready to start (available status)

### In Progress (1)
- Challenge 5: Math Story Problems 💙
- Student notes: "Working on this challenge now!"

### Needs Revision (1)
- Challenge 6: Times Table Challenge 🟡
- Feedback: "Great start! Can you try adding one more example?"

### Submitted (1)
- Challenge 7: Division Quest ⏳
- Under review by tutor

### Locked (9)
- Challenges 8-16 ⚫
- Will unlock after completing previous challenges

## 🎓 Educational Tips

### For Tutors
- Approve submissions quickly for motivation
- Leave encouraging feedback only
- Use amber (not red) for revisions
- Award bonus XP for extra effort

### For Parents
- Check "What's Next" widget for current task
- Celebrate purple nodes (mastered challenges)
- Don't nag - the system guides the student
- Print certificates when quests complete

### For Students
- Follow the green pulsing light
- Upload clear photos of your work
- Add notes to explain your thinking
- Celebrate every XP gain!

## 🚀 Next Actions

1. **Explore** the Quest Map
2. **Click** a green node
3. **Upload** a sample file
4. **Submit** and watch the celebration
5. **Check** your updated XP in the sidebar

## 💡 Pro Tips

- **Keyboard Nav**: Use Tab to navigate, Enter to click
- **Sound**: Browser must allow audio for "ding" effect
- **Reduced Motion**: System respects OS accessibility settings
- **Mobile**: Works on phones/tablets (touch-friendly)
- **Dark Mode**: Coming soon (currently light mode only)

---

**Have fun exploring the Quest Map!** 🎉

If you have questions, check:
- `/QUEST_MAP_GUIDE.md` - Detailed feature documentation
- `/IMPLEMENTATION_SUMMARY.md` - Technical overview
- `/QUICK_START.md` - Firebase setup guide
