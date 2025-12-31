# Next Steps: Mz. Marianna's Academy Implementation

## ✅ What's Been Completed

### 1. Design System ✓
- **Calm Mastery theme** implemented in `globals.css`
- Teal/Cyan calm backgrounds
- Purple/Pink reward colors
- Custom fonts: Lexend (primary), Nunito (UI), Orbitron (XP)
- Dyslexia-friendly typography and spacing
- Accessibility features (high contrast, reduced motion support)

### 2. Type System ✓
- Complete TypeScript interfaces in `/lib/types.ts`
- All data structures defined (User, Quest, Challenge, XP, etc.)
- Firestore collection constants

### 3. Core Libraries ✓
- Firebase initialization (`/lib/firebase.ts`)
- XP calculation engine (`/lib/xp-calculator.ts`)
- Firestore helper functions (`/lib/firestore-helpers.ts`)

### 4. Authentication ✓
- Login/Signup page with role selection
- Firebase Auth integration
- User creation in Firestore

### 5. Dashboard Skeletons ✓
- Student Dashboard (most complete)
- Tutor Dashboard (basic structure)
- Parent Dashboard (basic structure)
- Admin Dashboard (basic structure)

### 6. Core Components ✓
- XP Display component
- Loading screen
- Current Quest Card
- Weekly Rhythm placeholder
- Achievements placeholder

---

## 🎯 Critical Path: Next 20 Steps

### Immediate Actions (Must Do First)

#### 1. **Set Up Firebase Project**
```bash
# If not done yet:
firebase login
firebase init

# Select:
# ✓ Firestore
# ✓ Hosting
# ✓ Functions
# ✓ Storage

# Choose: Use existing project or create new
```

#### 2. **Configure Environment Variables**
```bash
# Copy the template
cp .env.example .env.local

# Fill in your Firebase config from:
# Firebase Console > Project Settings > General > Your apps
```

#### 3. **Deploy Firestore Security Rules**
Create `firestore.rules` if not exists:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Quest/Challenge templates are read-only
    match /questTemplates/{questId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.role == 'admin';
    }
    
    match /challengeTemplates/{challengeId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.role == 'admin';
    }
    
    // Quest instances - students can read own, tutors can manage
    match /questInstances/{instanceId} {
      allow read: if request.auth != null;
      allow create: if request.auth.token.role in ['tutor', 'admin'];
      allow update: if request.auth != null;
    }
    
    // XP events are append-only
    match /xpEvents/{eventId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if false; // Never allow updates or deletes
    }
    
    // Certificates
    match /certificates/{certId} {
      allow read: if request.auth != null;
      allow create: if request.auth.token.role in ['tutor', 'admin'];
      allow update, delete: if false;
    }
    
    // Achievements
    match /achievements/{achievementId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```

Deploy:
```bash
firebase deploy --only firestore:rules
```

#### 4. **Seed the Curriculum**
You mentioned `seed.ts` exists. Run it:
```bash
# Assuming it's in functions/
cd functions
npm run seed
# or
node seed.js
```

Verify in Firebase Console > Firestore that you have:
- `questTemplates` collection (30 quests)
- `challengeTemplates` collection (480 challenges = 30 × 16)
- `levels` collection (L1-L6)
- `programs` collection (CORE, PRAXIS, EXPLORERS)

#### 5. **Create Firebase Indexes**
Create `firestore.indexes.json`:
```json
{
  "indexes": [
    {
      "collectionGroup": "xpEvents",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "studentId", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "questInstances",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "studentId", "order": "ASCENDING" },
        { "fieldPath": "assignedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "questTemplates",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "levelId", "order": "ASCENDING" },
        { "fieldPath": "unit", "order": "ASCENDING" },
        { "fieldPath": "questNumber", "order": "ASCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

Deploy:
```bash
firebase deploy --only firestore:indexes
```

### Phase 1: Complete Student Experience (Week 1)

#### 6. **Challenge Detail View**
Create `/components/student/ChallengeView.tsx`:
- Display challenge instructions
- Show video/resources
- Evidence upload interface
- "Mark as Done" button
- Checkpoint celebrations

#### 7. **Evidence Submission**
- Text input
- Image upload (Firebase Storage)
- Video upload
- Roblox integration placeholder

#### 8. **XP Celebration Animations**
Create `/components/common/XPCelebration.tsx`:
- Animated confetti
- "+XP" floating numbers
- Sound effects (optional)
- Level-up modal

#### 9. **Progress Persistence**
- Auto-save challenge progress
- Mark challenges as "in_progress"
- Update quest instance status

#### 10. **Checkpoint System**
- Special UI for challenges #1, #8, #16
- Assessment prompts
- Midpoint encouragement
- Final celebration

### Phase 2: Tutor Workflow (Week 2)

#### 11. **Quest Assignment Interface**
Create `/components/tutor/AssignQuestModal.tsx`:
- Select student
- Select quest template
- Create quest instance
- Initialize 16 challenge instances

#### 12. **Review Queue**
Create `/components/tutor/ReviewQueue.tsx`:
- List all submitted challenges
- Filter by student
- Sort by submission date
- Quick approve/feedback actions

#### 13. **Evidence Review Interface**
Create `/components/tutor/EvidenceReviewer.tsx`:
- Display submitted evidence
- View images/videos
- Text feedback (positive only!)
- Approve or request revision (gentle language)

#### 14. **Mastery Confirmation**
- Check if 16/16 approved
- "Confirm Mastery" button
- Award quest completion XP
- Trigger certificate generation
- Award achievement

#### 15. **Student Progress Dashboard**
Create `/components/tutor/StudentProgress.tsx`:
- Individual student view
- All quest instances
- XP timeline graph
- Struggle indicators

### Phase 3: Critical Features (Week 3)

#### 16. **Real-time XP Calculation**
- Listen to xpEvents collection
- Auto-update XP display
- Check for level-ups
- Trigger celebrations

#### 17. **Certificate Generator**
Create `/lib/certificate-generator.ts`:
- Use Canvas API or PDF library
- Student name
- Quest title
- Completion date
- Download button

#### 18. **Achievement System**
Create `/lib/achievement-checker.ts`:
- Check for achievement unlocks on XP events
- First quest complete
- Streak milestones
- Perfect week
- Speed bonuses

#### 19. **Weekly Rhythm Scheduler**
Create `/components/student/WeeklyScheduleBuilder.tsx`:
- Tutor helps student set weekly pattern
- Drag-and-drop challenge assignment
- Save to `weeklySchedules` collection
- Show in student dashboard

#### 20. **Notification System**
- Email reminders (Firebase Functions)
- In-app notifications
- Weekly digest for parents

---

## 🚀 How to Proceed (Step-by-Step)

### Day 1: Firebase Setup
1. Complete steps 1-5 above
2. Test authentication (create test accounts for each role)
3. Verify curriculum data in Firestore

### Day 2-3: Student Quest Flow
1. Implement Challenge Detail View (#6)
2. Add Evidence Submission (#7)
3. Test uploading to Firebase Storage
4. Create XP Celebration (#8)

### Day 4-5: Tutor Review System
1. Build Quest Assignment (#11)
2. Create Review Queue (#12)
3. Implement Evidence Reviewer (#13)
4. Test full cycle: assign → student submits → tutor reviews

### Day 6-7: Mastery & Progression
1. Mastery confirmation flow (#14)
2. Certificate generation (#17)
3. Real-time XP updates (#16)
4. Achievement system (#18)

### Week 2: Polish & Launch
1. Weekly Rhythm (#19)
2. Notifications (#20)
3. User testing with real students
4. Bug fixes
5. Deploy to production

---

## 📚 Additional Files Needed

### Firebase Functions
Create `/functions/src/index.ts`:
```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Email notification on quest completion
export const onQuestComplete = functions.firestore
  .document('questInstances/{instanceId}')
  .onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    
    if (after.status === 'mastered' && before.status !== 'mastered') {
      // Send celebration email
      // Award achievement
      // Notify parent
    }
  });

// Weekly digest email
export const weeklyDigest = functions.pubsub
  .schedule('every sunday 18:00')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    // Generate weekly summary for all students
    // Send to parents
  });
```

### Storage Rules
Create `storage.rules`:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /evidence/{studentId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == studentId;
    }
    
    match /certificates/{certId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.role in ['tutor', 'admin'];
    }
  }
}
```

---

## 🎨 Design System Usage Guide

### Colors
```tsx
// Calm backgrounds (most screens)
className="bg-calm-bg"
className="bg-calm-surface"
className="border-calm-border"

// Rewards (XP, achievements, celebrations)
className="bg-reward-purple"
className="bg-reward-pink"
className="reward-bg" // gradient

// Success (completed challenges)
className="bg-success"
className="bg-success-light"

// Needs attention (NOT red! Gentle amber)
className="bg-needs-attention"
className="bg-needs-attention-light"
```

### Typography
```tsx
// XP displays
className="xp-display" // Uses Orbitron font

// Regular text uses Lexend automatically
// UI elements use Nunito automatically
```

### Accessibility
```tsx
// Focus mode (ADHD-friendly)
className="focus-mode" // Dims everything
className="focus-mode-active" // Highlights current task
```

---

## 🔍 Testing Checklist

Before launching:
- [ ] Create test accounts (1 student, 1 tutor, 1 parent, 1 admin)
- [ ] Student can sign up and see dashboard
- [ ] Tutor can assign a quest to student
- [ ] Student can view quest and challenges
- [ ] Student can submit evidence
- [ ] Tutor can review and approve
- [ ] XP is awarded correctly
- [ ] Level-up happens at correct XP thresholds
- [ ] Certificate generates on mastery
- [ ] Parent can view child's progress
- [ ] All colors follow Calm Mastery (no red!)
- [ ] Fonts load correctly
- [ ] Mobile responsive
- [ ] Keyboard navigation works
- [ ] Screen reader compatible

---

## 📞 Support & Documentation

### Key Files Reference
- **Types**: `/lib/types.ts`
- **XP Logic**: `/lib/xp-calculator.ts`
- **Database**: `/lib/firestore-helpers.ts`
- **Auth**: `/lib/firebase.ts`
- **Styles**: `/styles/globals.css`

### Firebase Console Links
- **Authentication**: https://console.firebase.google.com/project/YOUR_PROJECT/authentication
- **Firestore**: https://console.firebase.google.com/project/YOUR_PROJECT/firestore
- **Storage**: https://console.firebase.google.com/project/YOUR_PROJECT/storage
- **Functions**: https://console.firebase.google.com/project/YOUR_PROJECT/functions

---

## 🎯 Success Criteria

Your MVP is ready when:
1. A student can complete a full quest (16 challenges)
2. XP accumulates correctly (never decreases)
3. Tutor can review and provide positive feedback
4. Mastery triggers certificate + level-up (if applicable)
5. Parent can see child's progress
6. UI follows Calm Mastery design (teal/cyan, purple/pink, no red)
7. "What do I do next?" is always clear

---

## 💡 Pro Tips

1. **Start Small**: Get one quest working end-to-end before scaling
2. **Test with Real Users**: Find a neurodivergent student to test ASAP
3. **Iterate on Feedback**: The design principles are guidelines - adjust based on user needs
4. **Celebrate Small Wins**: Every feature completed deserves a celebration! 🎉
5. **Document Edge Cases**: What happens if a tutor leaves? If a student skips a checkpoint?

---

## 🚨 Common Issues & Solutions

### Issue: "Firebase not initialized"
**Solution**: Check `.env.local` has all VITE_ prefixed variables

### Issue: "XP not updating"
**Solution**: Check xpEvents are being created. Use Firebase Console to verify.

### Issue: "Fonts not loading"
**Solution**: Ensure Google Fonts import is in globals.css (already done)

### Issue: "Challenges not showing"
**Solution**: Verify seed script ran successfully. Check Firestore collections.

---

## 📈 Future Enhancements (Post-MVP)

- Social features (study groups, peer encouragement)
- Roblox game integration (Math challenges)
- AI-powered struggle detection
- Adaptive difficulty
- Voice input for evidence submission
- Multi-language support
- Custom avatar creation (reward system)
- Leaderboards (opt-in, positive framing)
- Printable progress reports
- Integration with Google Classroom

---

**You've got a solid foundation! Follow the critical path steps 1-20, and you'll have a working MVP in 2-3 weeks. The neurodivergent students will love it! 🌟**
