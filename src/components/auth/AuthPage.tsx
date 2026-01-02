import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../../lib/firebase';
import { createUser } from '../../lib/firestore-helpers';
import { UserRole } from '../../lib/types';
import { BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Please check your .env.local file.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user document in Firestore
        await createUser(userCredential.user.uid, {
          email,
          displayName: displayName || email.split('@')[0],
          role,
          preferences: {
            fontSize: 'medium',
            highContrast: false,
            reducedMotion: false,
            focusMode: false,
            soundEffects: true,
            notifications: {
              email: true,
              inApp: true,
              weeklyDigest: true,
            },
          },
          ...(role === 'student' && {
            currentLevel: 1,
            currentProgram: 'CORE' as const,
            totalXP: 0,
          }),
        });
      } else {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-calm-bg p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl reward-bg mb-4">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl mb-2">Mz. Marianna's Academy</h1>
          <p className="text-muted-foreground">Where learning becomes an adventure</p>
        </div>

        {/* Firebase Warning if not configured */}
        {!isFirebaseConfigured && (
          <div className="bg-warning-light border-2 border-warning rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Firebase Not Configured</p>
              <p>Please configure your Firebase project to use authentication.</p>
            </div>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                !isSignUp
                  ? 'bg-calm-primary text-white'
                  : 'bg-calm-bg text-foreground hover:bg-calm-border'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                isSignUp
                  ? 'bg-calm-primary text-white'
                  : 'bg-calm-bg text-foreground hover:bg-calm-border'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1"
                  disabled={!isFirebaseConfigured}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="mt-1"
                disabled={!isFirebaseConfigured}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1"
                disabled={!isFirebaseConfigured}
              />
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="role">I am a...</Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full mt-1 px-3 py-2 bg-input-background border border-calm-border rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-primary"
                  disabled={!isFirebaseConfigured}
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            )}

            {error && (
              <div className="bg-warning-light border border-warning text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !isFirebaseConfigured}
              className="w-full reward-bg hover:opacity-90 text-white disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </span>
              )}
            </Button>
          </form>

          {!isSignUp && isFirebaseConfigured && (
            <div className="mt-4 text-center">
              <button className="text-sm text-calm-primary hover:underline">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>A neurodivergent-first learning experience</p>
          <p className="mt-1">🌟 Designed for ADHD & Dyslexic learners</p>
        </div>
      </div>
    </div>
  );
}