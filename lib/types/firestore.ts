// Shared Firestore data model definitions for the Learning Kingdom LMS.
// Import these types in both the Next.js frontend and Cloud Functions to keep schemas aligned.

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
  | 'ASSESSMENT'
  | 'LEARN'
  | 'PRACTICE'
  | 'APPLY'
  | 'ROBLOX'
  | 'PROJECT'
  | 'REFLECT'
  | 'CHECKPOINT';

export type EvidenceType =
  | 'NONE'
  | 'CHECKBOX'
  | 'QUIZ'
  | 'PHOTO'
  | 'VIDEO'
  | 'AUDIO'
  | 'LINK'
  | 'UPLOAD'
  | 'RUBRIC';

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

export type XpEventType =
  | 'VIDEO_COMPLETE'
  | 'LESSON_COMPLETE'
  | 'QUIZ_CORRECT'
  | 'EFFORT_BONUS'
  | 'BADGE_AWARDED';

export interface XpEvent {
  xpEventId: string;
  studentUid: string;
  questInstanceId?: string;
  challengeInstanceId?: string;
  type: XpEventType;
  xp: number;
  createdAt: number;
  createdBy: string;
}
