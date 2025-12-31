/**
 * Firestore Helper Functions
 * All database operations go through here
 * Now aligned with the canonical Firestore schema
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  // Import from canonical schema
  COLLECTIONS,
  QuestTemplate,
  ChallengeTemplate,
  QuestInstance,
  ChallengeInstance,
  XPEvent,
  User,
  BadgeEarned,
  timestampToUnix,
  unixToDate,
  now,
  generateQuestInstanceId,
  generateChallengeInstanceId,
} from './types/firestore';

// ============================================================================
// USER OPERATIONS
// ============================================================================

export async function getUserData(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, uid));
    if (!userDoc.exists()) return null;
    
    const data = userDoc.data() as DocumentData;
    return {
      uid,
      ...data,
    } as User;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}

export async function createUser(uid: string, userData: Partial<User>): Promise<void> {
  try {
    const nowTimestamp = now();
    await setDoc(doc(db, COLLECTIONS.USERS, uid), {
      ...userData,
      uid,
      createdAt: nowTimestamp,
      updatedAt: nowTimestamp,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(uid: string, updates: Partial<User>): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.USERS, uid), {
      ...updates,
      updatedAt: now(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// ============================================================================
// QUEST TEMPLATE OPERATIONS (Read-Only)
// ============================================================================

export async function getQuestTemplate(questId: string): Promise<QuestTemplate | null> {
  try {
    const questDoc = await getDoc(doc(db, COLLECTIONS.QUEST_TEMPLATES, questId));
    if (!questDoc.exists()) return null;
    
    return questDoc.data() as QuestTemplate;
  } catch (error) {
    console.error('Error getting quest template:', error);
    throw error;
  }
}

export async function getChallengeTemplate(challengeId: string): Promise<ChallengeTemplate | null> {
  try {
    const challengeDoc = await getDoc(doc(db, COLLECTIONS.CHALLENGE_TEMPLATES, challengeId));
    if (!challengeDoc.exists()) return null;
    
    return challengeDoc.data() as ChallengeTemplate;
  } catch (error) {
    console.error('Error getting challenge template:', error);
    throw error;
  }
}

export async function getQuestTemplatesByLevel(level: string): Promise<QuestTemplate[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.QUEST_TEMPLATES),
      where('level', '==', level),
      orderBy('unit')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as QuestTemplate);
  } catch (error) {
    console.error('Error getting quest templates by level:', error);
    throw error;
  }
}

// ============================================================================
// QUEST INSTANCE OPERATIONS
// ============================================================================

export async function createQuestInstance(
  questId: string,
  studentUid: string,
  cohortId?: string
): Promise<string> {
  try {
    const template = await getQuestTemplate(questId);
    if (!template) throw new Error('Quest template not found');
    
    const questInstanceId = generateQuestInstanceId(questId, studentUid);
    const nowTimestamp = now();
    
    const questInstance: Omit<QuestInstance, 'questInstanceId'> & { questInstanceId: string } = {
      questInstanceId,
      questId,
      studentUid,
      cohortId,
      assignedAt: nowTimestamp,
      status: 'ACTIVE',
      progress: {
        completedCount: 0,
        requiredCompleted: false,
        mastered: false,
        tutorConfirmed: false,
      },
    };
    
    await setDoc(doc(db, COLLECTIONS.QUEST_INSTANCES, questInstanceId), questInstance);
    
    // Create challenge instances for this quest
    for (let i = 1; i <= template.totalChallenges; i++) {
      const challengeId = `${questId}-${String(i).padStart(2, '0')}`;
      const challengeInstanceId = generateChallengeInstanceId(challengeId, studentUid);
      
      const challengeInstance: Omit<ChallengeInstance, 'challengeInstanceId'> & { challengeInstanceId: string } = {
        challengeInstanceId,
        challengeId,
        questInstanceId,
        studentUid,
        status: 'TODO',
      };
      
      await setDoc(doc(db, COLLECTIONS.CHALLENGE_INSTANCES, challengeInstanceId), challengeInstance);
    }
    
    return questInstanceId;
  } catch (error) {
    console.error('Error creating quest instance:', error);
    throw error;
  }
}

export async function getQuestInstance(questInstanceId: string): Promise<QuestInstance | null> {
  try {
    const questDoc = await getDoc(doc(db, COLLECTIONS.QUEST_INSTANCES, questInstanceId));
    if (!questDoc.exists()) return null;
    
    return questDoc.data() as QuestInstance;
  } catch (error) {
    console.error('Error getting quest instance:', error);
    throw error;
  }
}

export async function getStudentQuestInstances(studentUid: string): Promise<QuestInstance[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.QUEST_INSTANCES),
      where('studentUid', '==', studentUid),
      where('status', '==', 'ACTIVE'),
      orderBy('assignedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as QuestInstance);
  } catch (error) {
    console.error('Error getting student quest instances:', error);
    throw error;
  }
}

export async function updateQuestInstanceProgress(
  questInstanceId: string,
  progress: Partial<QuestInstance['progress']>
): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.QUEST_INSTANCES, questInstanceId), {
      progress,
    });
  } catch (error) {
    console.error('Error updating quest instance progress:', error);
    throw error;
  }
}

export async function markQuestAsMastered(
  questInstanceId: string,
  tutorUid: string
): Promise<void> {
  try {
    const nowTimestamp = now();
    await updateDoc(doc(db, COLLECTIONS.QUEST_INSTANCES, questInstanceId), {
      status: 'MASTERED',
      'progress.mastered': true,
      'progress.tutorConfirmed': true,
      masteredAt: nowTimestamp,
      certificateIssued: true,
    });
  } catch (error) {
    console.error('Error marking quest as mastered:', error);
    throw error;
  }
}

// ============================================================================
// CHALLENGE INSTANCE OPERATIONS
// ============================================================================

export async function getChallengeInstance(challengeInstanceId: string): Promise<ChallengeInstance | null> {
  try {
    const challengeDoc = await getDoc(doc(db, COLLECTIONS.CHALLENGE_INSTANCES, challengeInstanceId));
    if (!challengeDoc.exists()) return null;
    
    return challengeDoc.data() as ChallengeInstance;
  } catch (error) {
    console.error('Error getting challenge instance:', error);
    throw error;
  }
}

export async function getQuestChallengeInstances(questInstanceId: string): Promise<ChallengeInstance[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.CHALLENGE_INSTANCES),
      where('questInstanceId', '==', questInstanceId),
      orderBy('challengeId')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ChallengeInstance);
  } catch (error) {
    console.error('Error getting quest challenge instances:', error);
    throw error;
  }
}

export async function updateChallengeInstance(
  challengeInstanceId: string,
  updates: Partial<ChallengeInstance>
): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTIONS.CHALLENGE_INSTANCES, challengeInstanceId), updates);
  } catch (error) {
    console.error('Error updating challenge instance:', error);
    throw error;
  }
}

export async function submitChallengeEvidence(
  challengeInstanceId: string,
  evidenceType: string,
  evidenceValue: string
): Promise<void> {
  try {
    const nowTimestamp = now();
    await updateDoc(doc(db, COLLECTIONS.CHALLENGE_INSTANCES, challengeInstanceId), {
      status: 'SUBMITTED',
      evidence: {
        type: evidenceType,
        value: evidenceValue,
        uploadedAt: nowTimestamp,
      },
    });
  } catch (error) {
    console.error('Error submitting challenge evidence:', error);
    throw error;
  }
}

export async function approveChallengeSubmission(
  challengeInstanceId: string,
  tutorUid: string,
  xpAwarded: number,
  feedback?: string
): Promise<void> {
  try {
    const nowTimestamp = now();
    const challengeInstance = await getChallengeInstance(challengeInstanceId);
    if (!challengeInstance) throw new Error('Challenge instance not found');
    
    // Update challenge instance
    await updateDoc(doc(db, COLLECTIONS.CHALLENGE_INSTANCES, challengeInstanceId), {
      status: 'COMPLETE',
      completedAt: nowTimestamp,
      reviewedAt: nowTimestamp,
      reviewedBy: tutorUid,
      tutorFeedback: feedback,
      xpAwarded,
    });
    
    // Create XP event
    await addXPEvent({
      studentUid: challengeInstance.studentUid,
      challengeInstanceId,
      questInstanceId: challengeInstance.questInstanceId,
      type: 'CHALLENGE_COMPLETE',
      xp: xpAwarded,
      createdBy: tutorUid,
      description: `Completed challenge ${challengeInstance.challengeId}`,
    });
    
    // Update quest progress
    const allChallenges = await getQuestChallengeInstances(challengeInstance.questInstanceId);
    const completedCount = allChallenges.filter(c => c.status === 'COMPLETE').length;
    
    await updateQuestInstanceProgress(challengeInstance.questInstanceId, {
      completedCount,
      requiredCompleted: completedCount >= 16, // Assuming all 16 required
    });
  } catch (error) {
    console.error('Error approving challenge submission:', error);
    throw error;
  }
}

// ============================================================================
// XP OPERATIONS (Append-Only Ledger)
// ============================================================================

export async function addXPEvent(xpEventData: Omit<XPEvent, 'xpEventId' | 'createdAt'>): Promise<string> {
  try {
    // Validate XP is positive
    if (xpEventData.xp <= 0) {
      throw new Error('XP amount must be positive');
    }
    
    const nowTimestamp = now();
    const xpEventId = `xp-${xpEventData.studentUid}-${nowTimestamp}`;
    
    const xpEvent: XPEvent = {
      xpEventId,
      ...xpEventData,
      createdAt: nowTimestamp,
    };
    
    await setDoc(doc(db, COLLECTIONS.XP_EVENTS, xpEventId), xpEvent);
    
    // Update user's total XP
    const totalXP = await calculateStudentTotalXP(xpEventData.studentUid);
    await updateUser(xpEventData.studentUid, { totalXP });
    
    return xpEventId;
  } catch (error) {
    console.error('Error adding XP event:', error);
    throw error;
  }
}

export async function getStudentXPEvents(studentUid: string, limitCount?: number): Promise<XPEvent[]> {
  try {
    const constraints = [
      where('studentUid', '==', studentUid),
      orderBy('createdAt', 'desc'),
    ];
    
    if (limitCount) {
      constraints.push(limit(limitCount));
    }
    
    const q = query(collection(db, COLLECTIONS.XP_EVENTS), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as XPEvent);
  } catch (error) {
    console.error('Error getting student XP events:', error);
    throw error;
  }
}

export async function calculateStudentTotalXP(studentUid: string): Promise<number> {
  try {
    const xpEvents = await getStudentXPEvents(studentUid);
    return xpEvents.reduce((total, event) => total + event.xp, 0);
  } catch (error) {
    console.error('Error calculating student total XP:', error);
    throw error;
  }
}

// ============================================================================
// BADGE OPERATIONS
// ============================================================================

export async function awardBadge(
  badgeId: string,
  studentUid: string,
  questInstanceId: string | undefined,
  awardedBy: string
): Promise<string> {
  try {
    const nowTimestamp = now();
    const badgeEarnedId = `badge-${studentUid}-${badgeId}-${nowTimestamp}`;
    
    const badgeEarned: BadgeEarned = {
      badgeEarnedId,
      badgeId,
      studentUid,
      questInstanceId,
      earnedAt: nowTimestamp,
      awardedBy,
    };
    
    await setDoc(doc(db, COLLECTIONS.BADGES_EARNED, badgeEarnedId), badgeEarned);
    
    return badgeEarnedId;
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
}

export async function getStudentBadges(studentUid: string): Promise<BadgeEarned[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.BADGES_EARNED),
      where('studentUid', '==', studentUid),
      orderBy('earnedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as BadgeEarned);
  } catch (error) {
    console.error('Error getting student badges:', error);
    throw error;
  }
}