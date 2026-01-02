# Firestore Integration Guide

This guide explains how the canonical Firestore data model has been integrated into Mz. Marianna's Academy.

## Overview

The application now supports two modes:
1. **Demo Mode** - Uses mock data when Firebase is not configured
2. **Production Mode** - Uses real Firestore data with the canonical schema

## File Structure

### Core Schema Files

- **`/lib/types/firestore.ts`** - Canonical Firestore TypeScript interfaces
  - Matches the schema documented in your Firestore Data Model doc
  - Uses proper ID patterns (e.g., `L3UM-CORE-08`)
  - Implements the correct status enums (`ACTIVE`, `COMPLETE`, etc.)

- **`/lib/types.ts`** - Legacy component types
  - Kept for backward compatibility with existing components
  - Will be gradually phased out as components migrate to new schema

- **`/lib/data-adapters.ts`** - Bridge between schemas
  - Converts new Firestore types to legacy component types
  - Allows gradual migration without breaking existing UI
  - Key functions:
    - `convertQuestInstance()` - Converts Firestore quest + challenges to legacy format
    - `generateXPSummary()` - Calculates XP summary from events
    - `convertChallengeInstance()` - Maps challenge status and data

### Firestore Operations

- **`/lib/firestore-helpers.ts`** - All database CRUD operations
  - Uses canonical Firestore schema
  - Functions for users, quests, challenges, XP, badges
  - Implements proper ID generation helpers
  - Key functions:
    - `createQuestInstance()` - Creates quest + 16 challenge instances
    - `submitChallengeEvidence()` - Student submits work
    - `approveChallengeSubmission()` - Tutor approves and awards XP
    - `addXPEvent()` - Records XP (append-only ledger)
    - `awardBadge()` - Awards achievement badges

### Mock Data

- **`/lib/mock-data.ts`** - Demo data generator
  - Generates realistic demo data for testing
  - Two sets of functions:
    - Firestore-compatible data (`generateMockQuestInstance()`, etc.)
    - Legacy-compatible data (`generateMockQuestLegacy()`, etc.)
  - Used when Firebase is not configured

### Security & Rules

- **`/firestore.rules`** - Security rules
  - Role-based access control (student, parent, tutor, admin)
  - Read-only curriculum templates
  - Student-restricted updates to own progress
  - Append-only XP events and badges
  - Parent and tutor access to assigned students

- **`/firestore.indexes.json`** - Composite indexes
  - Pre-defined for common queries
  - Deploy with: `firebase deploy --only firestore:indexes`

## Data Architecture

### Key Differences: Old vs New Schema

#### Old Schema (Legacy Components)
```typescript
QuestInstance {
  challenges: ChallengeInstance[]  // Embedded array
  status: 'in_progress' | 'completed'
}
```

#### New Schema (Canonical Firestore)
```typescript
// Separate collections
questInstances/{questInstanceId}
challengeInstances/{challengeInstanceId}

QuestInstance {
  status: 'ACTIVE' | 'MASTERED' | 'ARCHIVED'
  progress: {
    completedCount: number
    mastered: boolean
  }
}
```

### ID Patterns

```typescript
// Quest Template: L{level}{unit}-{overlay}
'L3UM-CORE'      // Level 3, Math, Core program
'L3UM-PRAXIS'    // Level 3, Math, Praxis overlay

// Challenge Template: {questId}-{number:02d}
'L3UM-CORE-08'   // Quest L3UM-CORE, Challenge 8

// Quest Instance: {questId}-{studentUid}
'L3UM-CORE-abc123'

// Challenge Instance: {challengeId}-{studentUid}
'L3UM-CORE-08-abc123'
```

## Deployment Steps

### 1. Set Up Firebase Project

```bash
# Create .env.local file
cp .env.example .env.local

# Add your Firebase credentials
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

### 3. Deploy Indexes

```bash
firebase deploy --only firestore:indexes
```

### 4. Seed Initial Data (Optional)

Create curriculum data in Firestore:

```typescript
// Example: Create a quest template
import { doc, setDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { COLLECTIONS } from './lib/types/firestore';

const questTemplate = {
  questId: 'L1UM-CORE',
  level: 'L1',
  unit: 'UM',
  overlay: 'CORE',
  title: 'Number Sense Adventure',
  badgeName: 'Number Ninja',
  usesRoblox: true,
  requiredCheckpoints: [1, 8, 16],
  totalChallenges: 16,
  masteryRule: {
    minCompleted: 16,
    requiresTutorConfirm: true,
    requiresAssessmentAt: [1, 8, 16],
  },
};

await setDoc(
  doc(db, COLLECTIONS.QUEST_TEMPLATES, 'L1UM-CORE'),
  questTemplate
);
```

### 5. Create Users with Roles

Set custom claims via Firebase Admin SDK or Functions:

```typescript
// Cloud Function or Admin SDK
import admin from 'firebase-admin';

await admin.auth().setCustomUserClaims(uid, { role: 'student' });

// Also create user document
await admin.firestore().collection('users').doc(uid).set({
  uid,
  email: 'student@example.com',
  role: 'student',
  displayName: 'Student Name',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  currentLevel: 'L1',
  totalXP: 0,
});
```

## Usage Examples

### Student Starting a Quest

```typescript
import { createQuestInstance } from './lib/firestore-helpers';

// Tutor assigns quest to student
const questInstanceId = await createQuestInstance(
  'L1UM-CORE',     // questId
  'student-uid',   // studentUid
  'cohort-123'     // cohortId (optional)
);

// This automatically:
// 1. Creates quest instance document
// 2. Creates 16 challenge instance documents
// 3. Sets first challenge to TODO, rest locked
```

### Student Submitting Work

```typescript
import { submitChallengeEvidence } from './lib/firestore-helpers';

await submitChallengeEvidence(
  'L1UM-CORE-01-student-uid',  // challengeInstanceId
  'PHOTO',                      // evidenceType
  'https://storage.../photo.jpg' // evidenceValue
);
```

### Tutor Approving Work

```typescript
import { approveChallengeSubmission } from './lib/firestore-helpers';

await approveChallengeSubmission(
  'L1UM-CORE-01-student-uid',  // challengeInstanceId
  'tutor-uid',                  // tutorUid
  100,                          // xpAwarded
  'Great work! 🌟'              // feedback
);

// This automatically:
// 1. Updates challenge status to COMPLETE
// 2. Creates XP event
// 3. Updates user's total XP
// 4. Updates quest progress
```

### Viewing Student Progress

```typescript
import { getStudentQuestInstances, convertQuestInstances } from './lib';

// Get Firestore data
const firestoreQuests = await getStudentQuestInstances('student-uid');

// Convert to legacy format for existing components
const legacyQuests = await convertQuestInstances(firestoreQuests);

// Use in components
<QuestMap questInstance={legacyQuests[0]} />
```

## Migration Path

### Phase 1: ✅ Complete
- [x] Create canonical Firestore types
- [x] Create security rules
- [x] Create Firestore helper functions
- [x] Create data adapters
- [x] Update mock data
- [x] Make existing components work with new schema

### Phase 2: In Progress
- [ ] Seed curriculum templates (quests, challenges)
- [ ] Create Cloud Functions for:
  - User creation with custom claims
  - XP calculations
  - Badge awards
  - Certificate generation
- [ ] Build tutor dashboard for reviewing work
- [ ] Build admin dashboard for curriculum management

### Phase 3: Future
- [ ] Migrate components to use Firestore types directly
- [ ] Remove legacy types and adapters
- [ ] Add real-time listeners for live updates
- [ ] Implement offline support
- [ ] Add analytics and reporting

## Testing

### Demo Mode (No Firebase)
```bash
# Just run the app - it will use mock data
npm run dev
```

### Production Mode (With Firebase)
```bash
# 1. Configure Firebase
# 2. Deploy rules and indexes
# 3. Create test data
# 4. Run app
npm run dev
```

## Troubleshooting

### "Permission Denied" Errors
- Check that security rules are deployed
- Verify user has correct custom claims
- Ensure user is authenticated

### "Document Not Found" Errors
- Check that curriculum templates exist
- Verify ID patterns match schema
- Check collection names match `COLLECTIONS` constants

### Missing XP Updates
- Verify XP events are being created
- Check `addXPEvent()` is being called after approvals
- Ensure user document is being updated

## Next Steps

1. **Deploy Security Rules**: `firebase deploy --only firestore:rules`
2. **Deploy Indexes**: `firebase deploy --only firestore:indexes`
3. **Seed Curriculum Data**: Create quest and challenge templates
4. **Create Test Users**: Add students, tutors, parents with proper roles
5. **Test Complete Flow**: Quest assignment → Work submission → Approval → XP award

## Resources

- [Firestore Data Model Documentation](./FIRESTORE_DATA_MODEL.md) (if you have one)
- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Security Rules Docs](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
