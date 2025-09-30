
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // Create a new document for the user in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          avatar: { // Default avatar
            hair: 'hair1',
            eyes: 'eyes1',
            mouth: 'mouth1',
            skin: 'skin1'
          }
        });
      }
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Kingdom</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Enter the Kingdom
          </button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>
        <div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C14.03,4.73 15.6,5.33 16.89,6.48L19.33,4.04C17.5,2.18 15,1 12.19,1C6.95,1 2.56,5.25 2.56,12C2.56,18.75 6.95,23 12.19,23C17.64,23 21.74,18.88 21.74,12.38C21.74,11.88 21.5,11.45 21.35,11.1Z" />
            </svg>
            Sign in with Google
          </button>
        </div>
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-400 hover:underline">Join the adventure!</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
