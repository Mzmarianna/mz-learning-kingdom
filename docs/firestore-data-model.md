# Firestore Data Model

This document captures the Learning Kingdom Firestore collections, canonical ID patterns, and TypeScript interfaces shared across the app and Cloud Functions.

## Collections & ID Patterns

### Curriculum (read-only for students/parents)
- `curriculumPrograms/{programId}`
- `curriculumLevels/{levelCode}` (e.g. `L3`)
- `questTemplates/{questId}` (e.g. `L3UM-CORE`)
- `challengeTemplates/{challengeId}` (e.g. `L3UM-CORE-08`)
- `standards/{standardId}` (optional mapping)
- `badgeTemplates/{badgeId}`

### Runtime (per student/cohort)
- `users/{uid}` – stores profile + role + org relationships
- `orgs/{orgId}`
- `cohorts/{cohortId}`
- `students/{studentId}` – optionally separate from `users`
- `questInstances/{questInstanceId}`
- `challengeInstances/{challengeInstanceId}`
- `submissions/{submissionId}`
- `xpEvents/{xpEventId}`
- `badgesEarned/{badgeEarnedId}`

### ID Recipes
- Quest template: `L{level}{unit}-{overlay}` → `L3UM-CORE`, `L3UM-PRAXIS`
- Challenge template: `{questId}-{##}` → `L3UM-CORE-08`
- Quest instance: use `${questId}-${studentUid}` or ULID/UUID (track in ADR later)
- Challenge instance: `${challengeId}-${studentUid}` or ULID/UUID

## Core TypeScript Interfaces

```ts
export type UnitCode = 'UM' | 'UR' | 'UW' | 'US' | 'UEF';
export type OverlayCode = 'CORE' | 'PRAXIS' | 'EXPLORERS' | 'WARRIORS';
export type LevelCode = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';

export interface QuestTemplate {
  questId: string;
  level: LevelCode;
  unit: UnitCode;
  overlay: OverlayCode;
  title: string;
  description?: string;
  badgeName: string;
  usesRoblox: boolean;
  requiredCheckpoints: number[];
  totalChallenges: number;
  masteryRule: {
    minCompleted: number;
    requiresTutorConfirm: boolean;
    requiresAssessmentAt: number[];
  };
}

export type ChallengeType =
  | 'ASSESSMENT' | 'LEARN' | 'PRACTICE' | 'APPLY'
  | 'ROBLOX' | 'PROJECT' | 'REFLECT' | 'CHECKPOINT';

export type EvidenceType =
  | 'NONE' | 'CHECKBOX' | 'QUIZ' | 'PHOTO' | 'VIDEO' | 'AUDIO'
  | 'LINK' | 'UPLOAD' | 'RUBRIC';

export interface ChallengeTemplate {
  challengeId: string;
  questId: string;
  number: number;
  title: string;
  type: ChallengeType;
  instructions: string;
  resourceLink?: string;
  robloxGameLink?: string;
  evidenceType: EvidenceType;
  xp: {
    baseComplete: number;
    correctnessBonus?: number;
    effortBonus?: number;
  };
  isCheckpoint: boolean;
}

export interface QuestInstance {
  questInstanceId: string;
  questId: string;
  studentUid: string;
  cohortId?: string;
  assignedAt: number;
  status: 'ACTIVE' | 'MASTERED' | 'ARCHIVED';
  progress: {
    completedCount: number;
    requiredCompleted: boolean;
    mastered: boolean;
    tutorConfirmed: boolean;
  };
}

export interface ChallengeInstance {
  challengeInstanceId: string;
  challengeId: string;
  questInstanceId: string;
  studentUid: string;
  status: 'TODO' | 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETE';
  completedAt?: number;
  evidence?: {
    type: EvidenceType;
    value?: string;
  };
}

export interface XpEvent {
  xpEventId: string;
  studentUid: string;
  questInstanceId?: string;
  challengeInstanceId?: string;
  type: 'VIDEO_COMPLETE' | 'LESSON_COMPLETE' | 'QUIZ_CORRECT' | 'EFFORT_BONUS' | 'BADGE_AWARDED';
  xp: number;
  createdAt: number;
  createdBy: string;
}
```

Use the shared TypeScript definitions in `lib/types/firestore.ts` to keep the app and Cloud Functions aligned.

## Auth & Roles

- Roles live in Firebase Auth custom claims: `student`, `parent`, `tutor`, `admin`.
- Assign claims via the Admin SDK (Cloud Functions or CLI script).
- Mirror the role plus relationship metadata in `users/{uid}` (e.g., parent ⇄ student links, org affiliations).

### Sample `users/{uid}` Document
```json
{
  "role": "student",
  "displayName": "Ava",
  "parentUids": ["parentUid1"],
  "studentUids": [],
  "orgIds": ["org1"],
  "cohortIds": ["cohort1"]
}
```

## Security Rules Snapshot

The repository root now contains `firestore.rules` implementing:
- Read-only access to curriculum collections for signed-in users.
- Tutor/admin write access to curriculum and runtime assignments.
- Student-restricted updates to their own quest/challenge instance progress.
- Append-only XP events and badge awards through tutor/admin actions.

Deploy via:
```powershell
firebase deploy --only firestore:rules
```

## Next Steps
- Capture composite indexes in `firestore.indexes.json` as queries emerge.
- Draft ADRs covering ID generation strategy and role/claim lifecycle.
- Mirror this schema in Cloud Functions validators before writes.
