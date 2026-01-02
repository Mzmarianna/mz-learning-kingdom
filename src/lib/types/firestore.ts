/**
 * Firestore Data Model Types
 * Canonical TypeScript interfaces aligned with the Firestore schema
 * Shared across app and Cloud Functions
 */

// ============================================================================
// CURRICULUM CODES & ENUMS
// ============================================================================

export type UnitCode = 'UM' | 'UR' | 'UW' | 'US' | 'UEF';
export type OverlayCode = 'CORE' | 'PRAXIS' | 'EXPLORERS' | 'WARRIORS';
export type LevelCode = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';

// Map unit codes to friendly names
export const UNIT_NAMES: Record<UnitCode, string> = {
  UM: 'Math',
  UR: 'Reading',
  UW: 'Writing',
  US: 'STEAM',
  UEF: 'Executive Function',
};

// Map level codes to numbers
export const LEVEL_NUMBERS: Record<LevelCode, number> = {
  L1: 1,
  L2: 2,
  L3: 3,
  L4: 4,
  L5: 5,
  L6: 6,
};

// ============================================================================
// CURRICULUM TEMPLATES (Read-Only Collections)
// ============================================================================

export interface CurriculumProgram {
  programId: string; // 'CORE', 'PRAXIS', 'EXPLORERS', 'WARRIORS'
  name: string;
  description: string;
  isOverlay: boolean; // CORE=false, others=true
  color: string; // Primary color for UI
}

export interface CurriculumLevel {
  levelCode: LevelCode; // 'L1', 'L2', etc.
  levelNumber: number; // 1-6
  name: string; // e.g., "Level 1: Foundation"
  description: string;
  skillFocus: string; // Not age-based
  questsPerUnit: number; // Should be 6
  totalQuests: number; // Should be 30 (5 units × 6 quests)
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

export interface QuestTemplate {
  questId: string; // e.g., 'L3UM-CORE'
  level: LevelCode;
  unit: UnitCode;
  overlay: OverlayCode;
  title: string;
  description?: string;
  badgeName: string; // Certificate/badge awarded on completion
  usesRoblox: boolean; // true for Math (UM) quests
  requiredCheckpoints: number[]; // e.g., [1, 8, 16]
  totalChallenges: number; // Always 16
  masteryRule: {
    minCompleted: number; // e.g., 16 (all challenges)
    requiresTutorConfirm: boolean; // Always true for mastery
    requiresAssessmentAt: number[]; // Challenge numbers that must be completed
  };
}

export interface ChallengeTemplate {
  challengeId: string; // e.g., 'L3UM-CORE-08'
  questId: string; // Parent quest ID
  number: number; // 1-16
  title: string;
  type: ChallengeType;
  instructions: string;
  resourceLink?: string; // Video URL or learning resource
  robloxGameLink?: string; // For Roblox-based challenges
  evidenceType: EvidenceType;
  xp: {
    baseComplete: number; // Base XP for completion
    correctnessBonus?: number; // Additional XP for correct answers
    effortBonus?: number; // Additional XP for exceptional work
  };
  isCheckpoint: boolean; // true for challenges 1, 8, 16
}

export interface Standard {
  standardId: string; // e.g., 'CCSS.MATH.3.OA.A.1'
  source: string; // 'Common Core', 'NGSS', etc.
  code: string;
  description: string;
  gradeLevel?: string;
}

export interface BadgeTemplate {
  badgeId: string;
  name: string;
  description: string;
  iconUrl?: string;
  color: string; // Hex color
  questId?: string; // If tied to a specific quest
  criteria: string; // Description of how to earn
}

// ============================================================================
// RUNTIME DATA (Per Student/Cohort Collections)
// ============================================================================

export interface User {
  uid: string;
  email: string;
  role: 'student' | 'parent' | 'tutor' | 'admin';
  displayName: string;
  avatarUrl?: string;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
  
  // Relationships
  parentUids?: string[];
  studentUids?: string[]; // For parents
  orgIds?: string[];
  cohortIds?: string[];
  
  // Student-specific
  currentLevel?: LevelCode;
  totalXP?: number;
}

export interface Organization {
  orgId: string;
  name: string;
  type: 'school' | 'homeschool_coop' | 'tutoring_center' | 'individual';
  adminUids: string[];
  tutorUids: string[];
  studentUids: string[];
  createdAt: number;
}

export interface Cohort {
  cohortId: string;
  orgId: string;
  name: string;
  level: LevelCode;
  tutorUids: string[];
  studentUids: string[];
  createdAt: number;
}

export type QuestInstanceStatus = 'ACTIVE' | 'MASTERED' | 'ARCHIVED';

export interface QuestInstance {
  questInstanceId: string; // e.g., 'L3UM-CORE-{studentUid}' or ULID
  questId: string; // Reference to QuestTemplate
  studentUid: string;
  cohortId?: string;
  assignedAt: number; // Unix timestamp
  startedAt?: number;
  status: QuestInstanceStatus;
  progress: {
    completedCount: number; // Number of challenges completed
    requiredCompleted: boolean; // All required checkpoints done?
    mastered: boolean; // Tutor confirmed mastery?
    tutorConfirmed: boolean; // Same as mastered (redundant but clear)
  };
  masteredAt?: number; // When tutor confirmed
  certificateIssued?: boolean;
}

export type ChallengeInstanceStatus = 
  | 'TODO' 
  | 'IN_PROGRESS' 
  | 'SUBMITTED' 
  | 'COMPLETE';

export interface ChallengeInstance {
  challengeInstanceId: string; // e.g., 'L3UM-CORE-08-{studentUid}' or ULID
  challengeId: string; // Reference to ChallengeTemplate
  questInstanceId: string; // Parent quest instance
  studentUid: string;
  status: ChallengeInstanceStatus;
  startedAt?: number;
  completedAt?: number;
  evidence?: {
    type: EvidenceType;
    value?: string; // URL or text content
    uploadedAt?: number;
  };
  tutorFeedback?: string;
  reviewedAt?: number;
  reviewedBy?: string; // Tutor UID
  xpAwarded?: number; // Track XP awarded for this challenge
}

export interface Submission {
  submissionId: string;
  challengeInstanceId: string;
  studentUid: string;
  submittedAt: number;
  evidenceType: EvidenceType;
  evidenceUrl?: string; // Firebase Storage URL
  evidenceText?: string;
  notes?: string; // Student notes
  status: 'PENDING' | 'REVIEWED' | 'APPROVED' | 'NEEDS_REVISION';
  tutorFeedback?: string;
  reviewedAt?: number;
  reviewedBy?: string;
}

export type XPEventType =
  | 'VIDEO_COMPLETE'
  | 'LESSON_COMPLETE'
  | 'QUIZ_CORRECT'
  | 'EFFORT_BONUS'
  | 'BADGE_AWARDED'
  | 'CHALLENGE_COMPLETE'
  | 'QUEST_COMPLETE'
  | 'STREAK_BONUS'
  | 'LEVEL_UP';

export interface XPEvent {
  xpEventId: string;
  studentUid: string;
  questInstanceId?: string;
  challengeInstanceId?: string;
  type: XPEventType;
  xp: number; // Always positive - XP never decreases
  createdAt: number; // Unix timestamp
  createdBy: string; // UID of tutor/system that awarded XP
  description?: string; // Human-readable description
}

export interface BadgeEarned {
  badgeEarnedId: string;
  badgeId: string; // Reference to BadgeTemplate
  studentUid: string;
  questInstanceId?: string; // If earned from quest completion
  earnedAt: number;
  awardedBy: string; // Tutor UID or 'SYSTEM'
}

// ============================================================================
// FIRESTORE COLLECTION NAMES (Constants)
// ============================================================================

export const COLLECTIONS = {
  // Curriculum (Read-Only)
  CURRICULUM_PROGRAMS: 'curriculumPrograms',
  CURRICULUM_LEVELS: 'curriculumLevels',
  QUEST_TEMPLATES: 'questTemplates',
  CHALLENGE_TEMPLATES: 'challengeTemplates',
  STANDARDS: 'standards',
  BADGE_TEMPLATES: 'badgeTemplates',
  
  // Runtime (Mutable)
  USERS: 'users',
  ORGANIZATIONS: 'orgs',
  COHORTS: 'cohorts',
  QUEST_INSTANCES: 'questInstances',
  CHALLENGE_INSTANCES: 'challengeInstances',
  SUBMISSIONS: 'submissions',
  XP_EVENTS: 'xpEvents',
  BADGES_EARNED: 'badgesEarned',
} as const;

// ============================================================================
// ID GENERATION HELPERS
// ============================================================================

/**
 * Generate quest template ID
 * Format: L{level}{unit}-{overlay}
 * Example: L3UM-CORE, L3UM-PRAXIS
 */
export function generateQuestTemplateId(
  level: LevelCode,
  unit: UnitCode,
  overlay: OverlayCode
): string {
  return `${level}${unit}-${overlay}`;
}

/**
 * Generate challenge template ID
 * Format: {questId}-{number:02d}
 * Example: L3UM-CORE-08
 */
export function generateChallengeTemplateId(
  questId: string,
  number: number
): string {
  return `${questId}-${String(number).padStart(2, '0')}`;
}

/**
 * Generate quest instance ID
 * Format: {questId}-{studentUid}
 * Example: L3UM-CORE-abc123
 */
export function generateQuestInstanceId(
  questId: string,
  studentUid: string
): string {
  return `${questId}-${studentUid}`;
}

/**
 * Generate challenge instance ID
 * Format: {challengeId}-{studentUid}
 * Example: L3UM-CORE-08-abc123
 */
export function generateChallengeInstanceId(
  challengeId: string,
  studentUid: string
): string {
  return `${challengeId}-${studentUid}`;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

/**
 * Convert Firestore timestamp to Unix timestamp (milliseconds)
 */
export function timestampToUnix(timestamp: FirestoreTimestamp | number): number {
  if (typeof timestamp === 'number') return timestamp;
  return timestamp.seconds * 1000;
}

/**
 * Convert Unix timestamp to Date
 */
export function unixToDate(unix: number): Date {
  return new Date(unix);
}

/**
 * Get current Unix timestamp
 */
export function now(): number {
  return Date.now();
}
