import { User, Mail, Calendar, Trophy, TrendingUp, Target, Settings, Edit } from 'lucide-react';

interface ProfilePanelProps {
  userStats: {
    level: number;
    xp: number;
    xpToNext: number;
    streak: number;
    totalPoints: number;
    rank: number;
  };
}

const activityData = [
  { date: '2025-12-29', lessons: 3, xp: 450 },
  { date: '2025-12-28', lessons: 2, xp: 300 },
  { date: '2025-12-27', lessons: 4, xp: 600 },
  { date: '2025-12-26', lessons: 3, xp: 450 },
  { date: '2025-12-25', lessons: 2, xp: 300 },
  { date: '2025-12-24', lessons: 5, xp: 750 },
  { date: '2025-12-23', lessons: 3, xp: 450 },
];

const stats = [
  { label: 'Lessons Completed', value: 127, icon: Trophy, color: 'purple' },
  { label: 'Total Study Time', value: '48h 32m', icon: Calendar, color: 'blue' },
  { label: 'Average Score', value: '87%', icon: Target, color: 'green' },
  { label: 'Subjects Mastered', value: 3, icon: TrendingUp, color: 'orange' },
];

export default function ProfilePanel({ userStats }: ProfilePanelProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and view your progress</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4">
                YU
              </div>
              <h2 className="text-2xl mb-1">John Doe</h2>
              <p className="text-gray-600 mb-4">Level {userStats.level} Learner</p>
              <button className="flex items-center gap-2 mx-auto text-purple-600 hover:text-purple-700 transition-colors">
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit Profile</span>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Joined December 2024</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress to Level {userStats.level + 1}</span>
                <span className="text-sm text-purple-600">{Math.round((userStats.xp / userStats.xpToNext) * 100)}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                  style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">{userStats.xp} / {userStats.xpToNext} XP</p>
            </div>
          </div>

          <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:border-purple-200 hover:text-purple-600 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-100">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Activity Chart */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
            <h3 className="text-xl mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activityData.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-600">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{day.lessons} lessons</span>
                      <span className="text-sm text-purple-600">+{day.xp} XP</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        style={{ width: `${(day.lessons / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Preview */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl">Recent Achievements</h3>
          <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-sm mb-1">Week Warrior</p>
            <p className="text-xs text-gray-600">7-day streak</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-sm mb-1">Quiz Master</p>
            <p className="text-xs text-gray-600">100% on quiz</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-sm mb-1">Rising Star</p>
            <p className="text-xs text-gray-600">Reached Level 10</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-sm mb-1">First Steps</p>
            <p className="text-xs text-gray-600">First lesson</p>
          </div>
        </div>
      </div>
    </div>
  );
}
