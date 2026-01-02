import { useState } from 'react';
import { BookOpen, Trophy, Target, User, Home, TrendingUp, Award, Flame, Crown, Zap } from 'lucide-react';
import SubjectDashboard from './SubjectDashboard';
import AchievementsPanel from './AchievementsPanel';
import LeaderboardPanel from './LeaderboardPanel';
import ProfilePanel from './ProfilePanel';

interface TutoringAppProps {
  onBackToHome: () => void;
}

export default function TutoringApp({ onBackToHome }: TutoringAppProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'achievements' | 'leaderboard' | 'profile'>('learn');
  const [userStats] = useState({
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    streak: 7,
    totalPoints: 15420,
    rank: 147,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span>LearnQuest</span>
              </button>
            </div>

            <div className="flex items-center gap-6">
              {/* Streak */}
              <div className="hidden sm:flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-600">Streak</p>
                  <p className="text-sm">{userStats.streak} days</p>
                </div>
              </div>

              {/* Level & XP */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Level {userStats.level}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                        style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{userStats.xp}/{userStats.xpToNext}</span>
                  </div>
                </div>
              </div>

              {/* Points */}
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="text-sm">{userStats.totalPoints.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'learn'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'achievements'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>Achievements</span>
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'leaderboard'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'learn' && <SubjectDashboard />}
        {activeTab === 'achievements' && <AchievementsPanel />}
        {activeTab === 'leaderboard' && <LeaderboardPanel currentUserRank={userStats.rank} />}
        {activeTab === 'profile' && <ProfilePanel userStats={userStats} />}
      </main>
    </div>
  );
}
