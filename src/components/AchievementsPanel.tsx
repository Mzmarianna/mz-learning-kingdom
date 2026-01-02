import { Trophy, Star, Target, Flame, Award, Crown, Zap, BookOpen, TrendingUp, Users } from 'lucide-react';

const achievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: BookOpen,
    color: 'blue',
    unlocked: true,
    unlockedAt: '2 days ago',
    xp: 50,
  },
  {
    id: 2,
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: Flame,
    color: 'orange',
    unlocked: true,
    unlockedAt: 'Today',
    xp: 200,
  },
  {
    id: 3,
    name: 'Quiz Master',
    description: 'Score 100% on any quiz',
    icon: Trophy,
    color: 'yellow',
    unlocked: true,
    unlockedAt: '1 week ago',
    xp: 150,
  },
  {
    id: 4,
    name: 'Rising Star',
    description: 'Reach Level 10',
    icon: Star,
    color: 'purple',
    unlocked: true,
    unlockedAt: '3 days ago',
    xp: 300,
  },
  {
    id: 5,
    name: 'Speed Demon',
    description: 'Complete 5 lessons in one day',
    icon: Zap,
    color: 'yellow',
    unlocked: false,
    progress: 3,
    total: 5,
    xp: 250,
  },
  {
    id: 6,
    name: 'Subject Expert',
    description: 'Complete all lessons in one subject',
    icon: Award,
    color: 'green',
    unlocked: false,
    progress: 18,
    total: 24,
    xp: 500,
  },
  {
    id: 7,
    name: 'Social Butterfly',
    description: 'Join 3 study groups',
    icon: Users,
    color: 'pink',
    unlocked: false,
    progress: 1,
    total: 3,
    xp: 200,
  },
  {
    id: 8,
    name: 'Top 100',
    description: 'Reach top 100 on the leaderboard',
    icon: TrendingUp,
    color: 'indigo',
    unlocked: false,
    progress: 147,
    total: 100,
    xp: 400,
  },
  {
    id: 9,
    name: 'Champion',
    description: 'Reach Level 25',
    icon: Crown,
    color: 'yellow',
    unlocked: false,
    progress: 12,
    total: 25,
    xp: 1000,
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
  };
  return colors[color];
};

export default function AchievementsPanel() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Achievements</h1>
        <p className="text-gray-600">Track your progress and unlock special badges</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Unlocked</p>
          </div>
          <p className="text-3xl">{unlockedCount}/{achievements.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Total XP from Achievements</p>
          </div>
          <p className="text-3xl">{totalXP.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
          <p className="text-3xl">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
        </div>
      </div>

      {/* Unlocked Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4">Unlocked</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.filter(a => a.unlocked).map((achievement) => {
            const colors = getColorClasses(achievement.color);
            return (
              <div
                key={achievement.id}
                className={`bg-white rounded-2xl p-6 border-2 ${colors.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <achievement.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Unlocked {achievement.unlockedAt}</span>
                      <span className={`text-sm ${colors.text}`}>+{achievement.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Locked Achievements */}
      <div>
        <h2 className="text-2xl mb-4">Locked</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.filter(a => !a.unlocked).map((achievement) => {
            const colors = getColorClasses(achievement.color);
            const progress = achievement.progress && achievement.total 
              ? (achievement.progress / achievement.total) * 100 
              : 0;

            return (
              <div
                key={achievement.id}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 opacity-75"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="w-7 h-7 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1 text-gray-700">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.total !== undefined && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-600">{achievement.progress}/{achievement.total}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${colors.bg.replace('100', '600')} transition-all`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    <span className="text-sm text-gray-500">Reward: +{achievement.xp} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
