/**
 * Data Adapters
 * Bridge between canonical Firestore schema and legacy component types
 * This allows gradual migration to the new schema
 */

import * as FirestoreTypes from './types/firestore';
import * as LegacyTypes from './types';
import {
  getChallengeTemplate,
  getQuestChallengeInstances,
  getStudentXPEvents,
  calculateStudentTotalXP,
} from './firestore-helpers';

/**
 * Convert Firestore ChallengeInstance status to legacy status
 */
function mapChallengeStatus(
  firestoreStatus: FirestoreTypes.ChallengeInstanceStatus
): LegacyTypes.ChallengeStatus {
  const statusMap: Record<FirestoreTypes.ChallengeInstanceStatus, LegacyTypes.ChallengeStatus> = {
    'TODO': 'locked',
    'IN_PROGRESS': 'in_progress',
    'SUBMITTED': 'submitted',
    'COMPLETE': 'approved',
  };
  return statusMap[firestoreStatus] || 'locked';
}

/**
 * Convert Firestore QuestInstance status to legacy status
 */
function mapQuestStatus(
  firestoreStatus: FirestoreTypes.QuestInstanceStatus
): LegacyTypes.QuestStatus {
  const statusMap: Record<FirestoreTypes.QuestInstanceStatus, LegacyTypes.QuestStatus> = {
    'ACTIVE': 'in_progress',
    'MASTERED': 'mastered',
    'ARCHIVED': 'completed',
  };
  return statusMap[firestoreStatus] || 'not_started';
}

/**
 * Convert Firestore ChallengeInstance to legacy format
 */
async function convertChallengeInstance(
  firestoreChallenge: FirestoreTypes.ChallengeInstance,
  challengeNumber: number
): Promise<LegacyTypes.ChallengeInstance> {
  // Extract challenge number from challengeId if available
  const match = firestoreChallenge.challengeId.match(/-(\d+)$/);
  const num = match ? parseInt(match[1], 10) : challengeNumber;
  
  return {
    id: firestoreChallenge.challengeInstanceId,
    templateId: firestoreChallenge.challengeId,
    questInstanceId: firestoreChallenge.questInstanceId,
    challengeNumber: num,
    status: mapChallengeStatus(firestoreChallenge.status),
    xpAwarded: firestoreChallenge.xpAwarded || 0,
    startedAt: firestoreChallenge.startedAt ? new Date(firestoreChallenge.startedAt) : undefined,
    submittedAt: firestoreChallenge.completedAt ? new Date(firestoreChallenge.completedAt) : undefined,
    reviewedAt: firestoreChallenge.reviewedAt ? new Date(firestoreChallenge.reviewedAt) : undefined,
    approvedAt: firestoreChallenge.status === 'COMPLETE' && firestoreChallenge.completedAt
      ? new Date(firestoreChallenge.completedAt)
      : undefined,
    reviewedBy: firestoreChallenge.reviewedBy,
    tutorFeedback: firestoreChallenge.tutorFeedback,
    evidence: firestoreChallenge.evidence ? [{
      id: `evidence-${firestoreChallenge.challengeInstanceId}`,
      type: firestoreChallenge.evidence.type.toLowerCase() as any,
      content: firestoreChallenge.evidence.value || '',
      uploadedAt: firestoreChallenge.evidence.uploadedAt
        ? new Date(firestoreChallenge.evidence.uploadedAt)
        : new Date(),
    }] : undefined,
  };
}

/**
 * Convert Firestore QuestInstance to legacy format with embedded challenges
 */
export async function convertQuestInstance(
  firestoreQuest: FirestoreTypes.QuestInstance,
  challengeInstances?: FirestoreTypes.ChallengeInstance[]
): Promise<LegacyTypes.QuestInstance> {
  // Fetch challenge instances if not provided
  let challenges = challengeInstances;
  if (!challenges) {
    try {
      challenges = await getQuestChallengeInstances(firestoreQuest.questInstanceId);
    } catch (error) {
      console.error('Error fetching challenge instances:', error);
      challenges = [];
    }
  }
  
  // Convert challenge instances to legacy format
  const legacyChallenges = await Promise.all(
    challenges.map((c, i) => convertChallengeInstance(c, i + 1))
  );
  
  // Sort by challenge number
  legacyChallenges.sort((a, b) => a.challengeNumber - b.challengeNumber);
  
  return {
    id: firestoreQuest.questInstanceId,
    templateId: firestoreQuest.questId,
    studentId: firestoreQuest.studentUid,
    tutorId: 'tutor-assigned', // TODO: Get from cohort or assignment
    status: mapQuestStatus(firestoreQuest.status),
    progress: firestoreQuest.progress.completedCount,
    assignedAt: new Date(firestoreQuest.assignedAt),
    startedAt: firestoreQuest.startedAt ? new Date(firestoreQuest.startedAt) : undefined,
    submittedAt: undefined,
    completedAt: firestoreQuest.masteredAt ? new Date(firestoreQuest.masteredAt) : undefined,
    challenges: legacyChallenges,
    requiresTutorConfirmation: true,
    certificateIssued: firestoreQuest.certificateIssued || false,
    tutorConfirmedAt: firestoreQuest.masteredAt ? new Date(firestoreQuest.masteredAt) : undefined,
  };
}

/**
 * Convert Firestore XPEvent to legacy format
 */
function convertXPEvent(firestoreEvent: FirestoreTypes.XPEvent): LegacyTypes.XPEvent {
  const typeMap: Record<FirestoreTypes.XPEventType, LegacyTypes.XPEventType> = {
    'VIDEO_COMPLETE': 'challenge_complete',
    'LESSON_COMPLETE': 'challenge_complete',
    'QUIZ_CORRECT': 'challenge_complete',
    'EFFORT_BONUS': 'special_achievement',
    'BADGE_AWARDED': 'special_achievement',
    'CHALLENGE_COMPLETE': 'challenge_complete',
    'QUEST_COMPLETE': 'quest_complete',
    'STREAK_BONUS': 'streak_bonus',
    'LEVEL_UP': 'level_up',
  };
  
  return {
    id: firestoreEvent.xpEventId,
    studentId: firestoreEvent.studentUid,
    type: typeMap[firestoreEvent.type] || 'challenge_complete',
    amount: firestoreEvent.xp,
    timestamp: new Date(firestoreEvent.createdAt),
    challengeInstanceId: firestoreEvent.challengeInstanceId,
    questInstanceId: firestoreEvent.questInstanceId,
    description: firestoreEvent.description || `Earned ${firestoreEvent.xp} XP`,
    celebrationShown: false, // Default to false, can be tracked separately
  };
}

/**
 * Generate legacy XPSummary from Firestore data
 */
export async function generateXPSummary(
  studentUid: string
): Promise<LegacyTypes.XPSummary> {
  const totalXP = await calculateStudentTotalXP(studentUid);
  const currentLevel = Math.floor(totalXP / 1000) + 1;
  const xpInCurrentLevel = totalXP % 1000;
  const xpToNextLevel = 1000 - xpInCurrentLevel;
  const percentToNextLevel = (xpInCurrentLevel / 1000) * 100;
  
  return {
    studentId: studentUid,
    totalXP,
    currentLevel: Math.min(currentLevel, 6) as LegacyTypes.LevelNumber,
    xpToNextLevel,
    percentToNextLevel,
    lastCalculatedAt: new Date(),
  };
}

/**
 * Convert multiple quest instances
 */
export async function convertQuestInstances(
  firestoreQuests: FirestoreTypes.QuestInstance[]
): Promise<LegacyTypes.QuestInstance[]> {
  return Promise.all(
    firestoreQuests.map(q => convertQuestInstance(q))
  );
}
