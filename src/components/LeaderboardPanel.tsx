import { Trophy, Crown, Medal, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

const leaderboardData = [
  { rank: 1, name: 'Alex Chen', level: 24, xp: 48250, streak: 45, avatar: 'AC' },
  { rank: 2, name: 'Sarah Johnson', level: 23, xp: 45820, streak: 38, avatar: 'SJ' },
  { rank: 3, name: 'Michael Kim', level: 22, xp: 43100, streak: 52, avatar: 'MK' },
  { rank: 4, name: 'Emma Davis', level: 21, xp: 39450, streak: 28, avatar: 'ED' },
  { rank: 5, name: 'David Wilson', level: 20, xp: 37800, streak: 31, avatar: 'DW' },
  { rank: 6, name: 'Lisa Anderson', level: 19, xp: 35200, streak: 24, avatar: 'LA' },
  { rank: 7, name: 'James Brown', level: 18, xp: 33650, streak: 19, avatar: 'JB' },
  { rank: 8, name: 'Sophie Taylor', level: 17, xp: 31900, streak: 42, avatar: 'ST' },
  { rank: 9, name: 'Ryan Martinez', level: 16, xp: 29300, streak: 15, avatar: 'RM' },
  { rank: 10, name: 'Olivia Garcia', level: 16, xp: 28750, streak: 22, avatar: 'OG' },
];

const currentUser = {
  rank: 147,
  name: 'You',
  level: 12,
  xp: 15420,
  streak: 7,
  avatar: 'YU',
};

interface LeaderboardPanelProps {
  currentUserRank: number;
}

export default function LeaderboardPanel({ currentUserRank }: LeaderboardPanelProps) {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gray-100';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you rank against other learners</p>
      </div>

      {/* Timeframe Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTimeframe('weekly')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeframe === 'weekly'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-200'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setTimeframe('monthly')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeframe === 'monthly'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-200'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setTimeframe('alltime')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeframe === 'alltime'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-200'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-2xl p-8 mb-6 border-2 border-gray-100">
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* Second Place */}
          <div className="text-center flex-1">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              {leaderboardData[1].avatar}
            </div>
            <div className="bg-gray-100 rounded-t-2xl p-4 h-32 flex flex-col justify-center">
              <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium mb-1">{leaderboardData[1].name}</p>
              <p className="text-sm text-gray-600">Level {leaderboardData[1].level}</p>
              <p className="text-sm text-purple-600">{leaderboardData[1].xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* First Place */}
          <div className="text-center flex-1">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
              {leaderboardData[0].avatar}
            </div>
            <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-2xl p-4 h-40 flex flex-col justify-center border-2 border-yellow-200">
              <Crown className="w-10 h-10 text-yellow-600 mx-auto mb-2" />
              <p className="font-medium mb-1">{leaderboardData[0].name}</p>
              <p className="text-sm text-gray-600">Level {leaderboardData[0].level}</p>
              <p className="text-sm text-purple-600">{leaderboardData[0].xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Third Place */}
          <div className="text-center flex-1">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              {leaderboardData[2].avatar}
            </div>
            <div className="bg-amber-50 rounded-t-2xl p-4 h-28 flex flex-col justify-center border-2 border-amber-200">
              <Medal className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="font-medium mb-1">{leaderboardData[2].name}</p>
              <p className="text-sm text-gray-600">Level {leaderboardData[2].level}</p>
              <p className="text-sm text-purple-600">{leaderboardData[2].xp.toLocaleString()} XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden mb-6">
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm text-gray-600">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2">Level</div>
            <div className="col-span-2">XP</div>
            <div className="col-span-2">Streak</div>
          </div>
        </div>

        <div className="divide-y">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                user.rank <= 3 ? 'bg-gradient-to-r from-transparent to-yellow-50/30' : ''
              }`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    {getRankIcon(user.rank) || (
                      <span className="text-gray-600">{user.rank}</span>
                    )}
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getRankBadge(user.rank)} rounded-full flex items-center justify-center text-white text-sm`}>
                      {user.avatar}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-sm">Level {user.level}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-purple-600">{user.xp.toLocaleString()}</span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1 text-sm">
                    <span>🔥</span>
                    <span>{user.streak}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current User Position */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg">
              {currentUser.avatar}
            </div>
            <div>
              <p className="text-sm opacity-90">Your Rank</p>
              <p className="text-2xl">#{currentUser.rank}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">Keep learning to climb higher!</p>
            <div className="flex items-center gap-4 justify-end">
              <div>
                <p className="text-xs opacity-75">Level</p>
                <p className="text-lg">{currentUser.level}</p>
              </div>
              <div>
                <p className="text-xs opacity-75">Total XP</p>
                <p className="text-lg">{currentUser.xp.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs opacity-75">Streak</p>
                <p className="text-lg">🔥 {currentUser.streak}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
