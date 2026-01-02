import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './lib/firebase';
import KingdomEntry from './components/KingdomEntry';
import LandingPageLuxe from './components/LandingPageLuxe';
import PlacementQuiz from './components/PlacementQuiz';
import QuizResults from './components/QuizResults';
import RoleBasedLogin from './components/auth/RoleBasedLogin';
import AuthPage from './components/auth/AuthPage';
import StudentDashboard from './components/student/StudentDashboard';
import TutorDashboard from './components/tutor/TutorDashboard';
import ParentDashboard from './components/parent/ParentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import SchoolDashboard from './components/school/SchoolDashboard';
import LoadingScreen from './components/common/LoadingScreen';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { User, UserRole } from './lib/types';
import { getUserData } from './lib/firestore-helpers';

type AppView = 'kingdom-entry' | 'landing' | 'onboarding' | 'quiz' | 'results' | 'auth' | 'dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('kingdom-entry');
  const [quizResults, setQuizResults] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // If Firebase isn't configured, allow demo mode
    if (!isFirebaseConfigured) {
      setLoading(false);
      setAuthChecked(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user data from Firestore
        try {
          const userData = await getUserData(firebaseUser.uid);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (loading || !authChecked) {
    return <LoadingScreen />;
  }

  // Show Kingdom Entry first (unless user is already logged in)
  if (currentView === 'kingdom-entry' && !currentUser) {
    return (
      <>
        <KingdomEntry
          onStartAdventure={() => setShowLoginModal(true)}
          onNewUser={() => setCurrentView('landing')}
        />
        <RoleBasedLogin 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSelectRole={(role) => {
            setSelectedRole(role);
            setShowLoginModal(false);
            setCurrentView('auth');
          }}
        />
      </>
    );
  }

  // Show landing page with info and quiz when "I'm New Here" is clicked
  if (currentView === 'landing' && !currentUser) {
    return (
      <>
        <LandingPageLuxe 
          onGetStarted={() => setCurrentView('quiz')} 
          onLogin={() => setShowLoginModal(true)}
        />
        <RoleBasedLogin 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSelectRole={(role) => {
            setSelectedRole(role);
            setShowLoginModal(false);
            setCurrentView('auth');
          }}
        />
      </>
    );
  }

  // Show onboarding flow after "Get Started" is clicked
  if (currentView === 'onboarding' && !currentUser) {
    return <OnboardingFlow onComplete={(results) => {
      setQuizResults(results);
      setCurrentView('results');
    }} />;
  }

  // Show placement quiz after "Get Started" is clicked
  if (currentView === 'quiz' && !currentUser) {
    return <PlacementQuiz onComplete={(results) => {
      setQuizResults(results);
      setCurrentView('results');
    }} />;
  }

  // Show quiz results after quiz is completed
  if (currentView === 'results' && !currentUser) {
    return <QuizResults results={quizResults} onStartLearning={() => setCurrentView('auth')} />;
  }

  // Show auth page after results
  if (!currentUser) {
    return <AuthPage />;
  }

  // Role-based routing
  switch (currentUser.role) {
    case 'student':
      return <StudentDashboard user={currentUser} />;
    case 'tutor':
      return <TutorDashboard user={currentUser} />;
    case 'parent':
      return <ParentDashboard user={currentUser} />;
    case 'admin':
      return <AdminDashboard user={currentUser} />;
    case 'teacher':
      return <TeacherDashboard user={currentUser} />;
    case 'school':
      return <SchoolDashboard user={currentUser} />;
    default:
      return <div>Invalid user role</div>;
  }
}