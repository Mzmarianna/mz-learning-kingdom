import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase configuration with production credentials
const firebaseConfig = {
  apiKey: "AIzaSyD3y0PAKH97pYnh5RqCxFzTPzYWuHn8YHo",
  authDomain: "mz-marianna-kingdom-learning.firebaseapp.com",
  databaseURL: "https://mz-marianna-kingdom-learning-default-rtdb.firebaseio.com",
  projectId: "mz-marianna-kingdom-learning",
  storageBucket: "mz-marianna-kingdom-learning.firebasestorage.app",
  messagingSenderId: "102564887145",
  appId: "1:102564887145:web:19c7a5262abaeb1e0140f8",
  measurementId: "G-14DW5GV1CH"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, db, storage, database, analytics };
