/**
 * Firebase Configuration and Initialization
 * DO NOT commit this file with real credentials
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getFunctions, type Functions } from 'firebase/functions';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Safe environment variable access
const getEnvVar = (key: string, fallback: string = ''): string => {
  if (!isBrowser) return fallback;
  try {
    return (import.meta as any).env?.[key] || fallback;
  } catch {
    return fallback;
  }
};

// Firebase configuration
// In production, these should come from environment variables
// For development, you can use placeholder values
const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'YOUR_API_KEY'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'YOUR_PROJECT.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'YOUR_PROJECT_ID'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'YOUR_PROJECT.appspot.com'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', 'YOUR_SENDER_ID'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', 'YOUR_APP_ID'),
  databaseURL: getEnvVar('VITE_FIREBASE_DATABASE_URL', ''),
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey !== 'YOUR_API_KEY' && 
                              firebaseConfig.projectId !== 'YOUR_PROJECT_ID';

// Only show setup info once and make it less prominent
let hasShownSetupInfo = false;

if (!isFirebaseConfigured && isBrowser && !hasShownSetupInfo) {
  hasShownSetupInfo = true;
  console.info(
    '%c🎓 Mz. Marianna\'s Academy - Demo Mode',
    'background: linear-gradient(90deg, #06b6d4, #8b5cf6); color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold;',
    '\n\n' +
    'Firebase not configured - running in demo mode.\n' +
    'To enable full features, set up Firebase:\n' +
    '1. Create .env.local file\n' +
    '2. Add your Firebase credentials\n' +
    '3. Restart the dev server\n\n' +
    'See the setup guide for details.'
  );
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let functions: Functions;

try {
  if (!getApps().length && isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
  } else if (getApps().length > 0) {
    app = getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
  } else {
    // Firebase not configured - using demo mode with placeholders
    app = null as any;
    auth = null as any;
    db = null as any;
    storage = null as any;
    functions = null as any;
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  app = null as any;
  auth = null as any;
  db = null as any;
  storage = null as any;
  functions = null as any;
}

export { app, auth, db, storage, functions, isFirebaseConfigured };

// Export initialized instances
export default app;

/**
 * Helper function to check if mock data should be used
 * Returns true if Firebase is not configured
 */
export function shouldUseMockData(): boolean {
  return !isFirebaseConfigured;
}