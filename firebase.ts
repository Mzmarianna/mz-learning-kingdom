
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  projectId: "mz-marianna-kingdom-learning",
  appId: "1:102564887145:web:19c7a5262abaeb1e0140f8",
  storageBucket: "mz-marianna-kingdom-learning.firebasestorage.app",
  apiKey: "AIzaSyD3y0PAKH97pYnh5RqCxFzTPzYWuHn8YHo",
  authDomain: "mz-marianna-kingdom-learning.firebaseapp.com",
  messagingSenderId: "102564887145",
  databaseURL: "https://mz-marianna-kingdom-learning-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, db, storage, database };
