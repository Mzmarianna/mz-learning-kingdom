'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/firebase';

export type QuestStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface QuestInstance {
  questInstanceId: string;
  questId: string;
  studentUid: string;
  title?: string;
  status: QuestStatus;
  progress?: {
    completedCount: number;
    totalChallenges: number;
  };
  assignedAt?: unknown;
}

interface StudentDataState {
  user: User | null;
  quests: QuestInstance[];
  xpTotal: number;
  loading: boolean;
  error: Error | null;
}

const initialState: StudentDataState = {
  user: null,
  quests: [],
  xpTotal: 0,
  loading: true,
  error: null,
};

export function useStudentData() {
  const [{ user, quests, xpTotal, loading, error }, setState] = useState<StudentDataState>(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setState((prev) => ({
        ...prev,
        user: firebaseUser,
        quests: firebaseUser ? prev.quests : [],
        xpTotal: firebaseUser ? prev.xpTotal : 0,
        loading: firebaseUser ? prev.loading : false,
      }));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const questQuery = query(
      collection(db, 'questInstances'),
      where('studentUid', '==', user.uid),
      where('status', '==', 'ACTIVE'),
    );

    const xpQuery = query(collection(db, 'xpEvents'), where('studentUid', '==', user.uid));

    const unsubscribeQuests = onSnapshot(
      questQuery,
      (snapshot) => {
        const questData: QuestInstance[] = snapshot.docs.map((doc) => ({
          questInstanceId: doc.id,
          ...doc.data(),
        })) as QuestInstance[];

        setState((prev) => ({ ...prev, quests: questData }));
      },
      (questError) => {
        setState((prev) => ({ ...prev, error: questError }));
      },
    );

    const unsubscribeXp = onSnapshot(
      xpQuery,
      (snapshot) => {
        const totalXp = snapshot.docs.reduce((sum, doc) => {
          const data = doc.data();
          const xp = typeof data.xp === 'number' ? data.xp : 0;
          return sum + xp;
        }, 0);

        setState((prev) => ({ ...prev, xpTotal: totalXp, loading: false }));
      },
      (xpError) => {
        setState((prev) => ({ ...prev, error: xpError, loading: false }));
      },
    );

    return () => {
      unsubscribeQuests();
      unsubscribeXp();
    };
  }, [user]);

  return { user, quests, xpTotal, loading, error };
}
