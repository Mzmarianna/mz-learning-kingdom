import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { User, QuestInstance, XPSummary } from '../../lib/types';
import { getStudentQuestInstances } from '../../lib/firestore-helpers';
import { convertQuestInstances, generateXPSummary } from '../../lib/data-adapters';
import { generateMockQuestLegacy, generateMockXPSummary, shouldUseMockData } from '../../lib/mock-data';
import { BookOpen, Trophy, Calendar, Settings, LogOut, Target, Map, Sparkles, FolderOpen } from 'lucide-react';
import XPDisplay from '../common/XPDisplay';
import CurrentQuestCard from './CurrentQuestCard';
import WeeklyRhythm from './WeeklyRhythm';
import AchievementsList from './AchievementsList';
import QuestMap from './QuestMap';
import AvatarDisplay from './AvatarDisplay';
import AvatarCustomizer from './AvatarCustomizer';
import PortfolioSubmission from './PortfolioSubmission';
import PortfolioGallery from './PortfolioGallery';
import WowlAIChat from './WowlAIChat';
import LoadingScreen from '../common/LoadingScreen';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface StudentDashboardProps {
  user: User;
}

export default function StudentDashboard({ user }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'quest' | 'weekly' | 'achievements' | 'portfolio'>('quest');
  const [questInstances, setQuestInstances] = useState<QuestInstance[]>([]);
  const [xpSummary, setXpSummary] = useState<XPSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('unicorn');
  const [avatarName, setAvatarName] = useState('');

  useEffect(() => {
    loadData();
  }, [user.uid]);

  const loadData = async () => {
    try {
      // Use mock data if Firebase is not configured
      if (shouldUseMockData()) {
        const mockQuest = generateMockQuestLegacy(user.uid);
        const mockXP = generateMockXPSummary(user.uid);
        setQuestInstances([mockQuest]);
        setXpSummary(mockXP);
      } else {
        // Fetch from Firestore and convert to legacy format
        const firestoreQuests = await getStudentQuestInstances(user.uid);
        const legacyQuests = await convertQuestInstances(firestoreQuests);
        const xp = await generateXPSummary(user.uid);
        setQuestInstances(legacyQuests);
        setXpSummary(xp);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
      // Fallback to mock data on error
      const mockQuest = generateMockQuestLegacy(user.uid);
      const mockXP = generateMockXPSummary(user.uid);
      setQuestInstances([mockQuest]);
      setXpSummary(mockXP);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Find current active quest
  const currentQuest = questInstances.find(
    (q) => q.status === 'in_progress' || q.status === 'not_started'
  );

  return (
    <div className="min-h-screen bg-calm-bg">
      {/* Avatar Customizer Modal */}
      {showAvatarCustomizer && xpSummary && (
        <AvatarCustomizer
          currentXP={xpSummary.totalXP}
          selectedAvatar={selectedAvatar}
          avatarName={avatarName}
          onSelectAvatar={(avatarId) => {
            setSelectedAvatar(avatarId);
          }}
          onNameAvatar={(name) => {
            setAvatarName(name);
            // TODO: Deduct 50 XP when implemented with backend
          }}
          onClose={() => setShowAvatarCustomizer(false)}
        />
      )}

      {/* Header */}
      <header className="bg-calm-surface border-b-2 border-calm-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl reward-bg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Mz. Marianna's Academy</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.displayName}!</p>
              </div>
            </div>

            {/* Settings & Sign Out */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - XP & "What's Next" */}
          <div className="space-y-6">
            {/* Avatar Display */}
            <div className="bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl p-6">
              <div className="flex flex-col items-center">
                <AvatarDisplay
                  avatarId={selectedAvatar}
                  avatarName={avatarName}
                  size="lg"
                  showEdit={true}
                  onEdit={() => setShowAvatarCustomizer(true)}
                />
                {!avatarName && (
                  <button
                    onClick={() => setShowAvatarCustomizer(true)}
                    className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Customize Your Avatar!
                  </button>
                )}
              </div>
            </div>

            {/* XP Display */}
            {xpSummary && (
              <XPDisplay
                totalXP={xpSummary.totalXP}
                xpToNextLevel={xpSummary.xpToNextLevel}
                percentToNextLevel={xpSummary.percentToNextLevel}
                level={xpSummary.currentLevel}
                size="lg"
              />
            )}

            {/* What's Next - ADHD-Friendly */}
            <div className="bg-calm-surface border-2 border-calm-primary rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-calm-primary" />
                <h2 className="text-xl font-semibold">What do I do next?</h2>
              </div>
              {currentQuest ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Your current quest:</p>
                  <p className="text-lg mb-3">{currentQuest.templateId}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Progress: {currentQuest.progress} / 16 challenges
                  </p>
                  <div className="h-2 bg-calm-border rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full reward-bg transition-all"
                      style={{ width: `${(currentQuest.progress / 16) * 100}%` }}
                    />
                  </div>
                  <Button
                    className="w-full reward-bg hover:opacity-90 text-white"
                    onClick={() => setActiveTab('quest')}
                  >
                    Continue Quest
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    No active quest. Ask your tutor to assign one!
                  </p>
                  <div className="text-4xl mb-2">🎯</div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success-light border border-success rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Completed Quests</p>
                <p className="text-2xl font-semibold text-success">
                  {questInstances.filter((q) => q.status === 'completed' || q.status === 'mastered').length}
                </p>
              </div>
              <div className="bg-reward-purple-light border border-reward-purple rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Achievements</p>
                <p className="text-2xl font-semibold text-reward-purple">0</p>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('quest')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'quest'
                    ? 'bg-calm-primary text-white'
                    : 'bg-calm-surface border-2 border-calm-border text-foreground hover:border-calm-primary'
                }`}
              >
                <Map className="w-5 h-5" />
                <span>Quest Map</span>
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'weekly'
                    ? 'bg-calm-primary text-white'
                    : 'bg-calm-surface border-2 border-calm-border text-foreground hover:border-calm-primary'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Weekly Rhythm</span>
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'achievements'
                    ? 'bg-calm-primary text-white'
                    : 'bg-calm-surface border-2 border-calm-border text-foreground hover:border-calm-primary'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Achievements</span>
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  activeTab === 'portfolio'
                    ? 'bg-calm-primary text-white'
                    : 'bg-calm-surface border-2 border-calm-border text-foreground hover:border-calm-primary'
                }`}
              >
                <FolderOpen className="w-5 h-5" />
                <span>Portfolio</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'quest' && currentQuest && (
              <QuestMap questInstance={currentQuest} onUpdate={loadData} />
            )}
            {activeTab === 'quest' && !currentQuest && (
              <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl mb-2">No Active Quest</h3>
                <p className="text-muted-foreground">
                  Your tutor will assign you a quest soon. Check back later!
                </p>
              </div>
            )}
            {activeTab === 'weekly' && <WeeklyRhythm studentId={user.uid} />}
            {activeTab === 'achievements' && <AchievementsList studentId={user.uid} />}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-6">
                  <h2 className="text-2xl mb-4">📁 Add to Your Portfolio</h2>
                  <PortfolioSubmission 
                    studentId={user.uid} 
                    studentName={user.displayName || 'Student'}
                    challengeId={currentQuest?.id}
                    challengeTitle={currentQuest ? currentQuest.templateId : undefined}
                  />
                </div>
                
                <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-6">
                  <h2 className="text-2xl mb-6">My Portfolio Gallery</h2>
                  <PortfolioGallery studentId={user.uid} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Wowl AI Chat - Always available */}
      <WowlAIChat
        studentName={user.displayName || 'Student'}
        interests={[]} // TODO: Get from user profile
        learningStyle="visual" // TODO: Get from user profile
        currentLevel={xpSummary?.currentLevel || 1}
        recentTopics={currentQuest ? [currentQuest.templateId] : []}
      />
    </div>
  );
}