'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Star,
  Trophy,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { useStudentData } from '@/lib/hooks/use-student-data';

export function StudentDashboard() {
  const { user, quests, xpTotal, loading } = useStudentData();
  const [quietMode, setQuietMode] = useState(false);

  const activeQuest = quests.length ? quests[0] : null;

  const { completionPercent, remainingChallenges } = useMemo(() => {
    const completed = activeQuest?.progress?.completedCount ?? 0;
    const total = activeQuest?.progress?.totalChallenges ?? 1;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completionPercent: Math.min(100, percent),
      remainingChallenges: Math.max(total - completed, 0),
    };
  }, [activeQuest]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E0F7FA] text-[#0288D1]">
        <div className="flex flex-col items-center animate-pulse">
          <Star className="mb-4 h-12 w-12" />
          <p className="font-fredoka text-xl">Loading your Kingdom...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-500 ${quietMode ? 'bg-[#F5F7F8]' : 'bg-[#E0F7FA]'}`}
    >
      <header className="mx-auto mb-8 flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white text-3xl shadow-md">
            🦊
          </div>
          <div>
            <h1 className="font-fredoka text-2xl font-bold text-[#263238]">
              Hi, {(user?.displayName?.split(' ')[0] ?? user?.email?.split('@')[0]) || 'Explorer'}!
            </h1>
            <p className="font-lexend text-sm text-[#546E7A]">Level 5 Explorer</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setQuietMode((prev) => !prev)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
            quietMode ? 'bg-[#CFD8DC] text-[#546E7A]' : 'bg-white text-[#0288D1] shadow-sm hover:shadow-md'
          }`}
        >
          {quietMode ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span className="hidden text-sm font-bold sm:inline">Quiet Mode</span>
        </button>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          <div className="relative overflow-hidden rounded-3xl border border-[#E1F5FE] bg-white p-8 shadow-lg">
            {!quietMode && (
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-bl-full bg-gradient-to-br from-[#E0F7FA] to-transparent opacity-50 transition-transform duration-700 group-hover:scale-110" />
            )}

            <div className="relative z-10">
              <div className="mb-6 flex items-start justify-between">
                <span className="rounded-full bg-[#E0F2F1] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00695C]">
                  Current Mission
                </span>
                {!quietMode && (
                  <span className="flex items-center gap-1 font-bold text-[#D500F9]">
                    <Zap size={16} className="fill-current" /> +50 XP
                  </span>
                )}
              </div>

              {activeQuest ? (
                <>
                  <h2 className="font-fredoka text-3xl font-black text-[#263238]">
                    {activeQuest.title ?? activeQuest.questId}
                  </h2>
                  <p className="mt-2 max-w-md leading-relaxed text-[#546E7A]">
                    Continue your journey! You have {remainingChallenges} challenges left to unlock the next badge.
                  </p>

                  <div className="mt-8">
                    <div className="mb-2 flex justify-between text-sm font-bold text-[#546E7A]">
                      <span>Progress</span>
                      <span>{completionPercent}%</span>
                    </div>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          quietMode ? 'bg-[#0288D1]' : 'bg-gradient-to-r from-[#0288D1] to-[#29B6F6]'
                        }`}
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-black transition-transform hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                      quietMode
                        ? 'bg-[#0288D1] text-white'
                        : 'bg-[#0288D1] text-white shadow-[0_10px_20px_rgba(2,136,209,0.3)]'
                    }`}
                  >
                    Continue Quest <ArrowRight size={24} />
                  </button>
                </>
              ) : (
                <div className="py-8 text-center">
                  <h3 className="text-xl font-bold text-[#546E7A]">All caught up! 🎉</h3>
                  <p className="text-[#78909C]">Ask your tutor for a new mission.</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
              <div className={`rounded-full p-3 ${quietMode ? 'bg-orange-100' : 'bg-orange-50 text-orange-500'}`}>
                <Flame size={24} className={!quietMode ? 'fill-current' : undefined} />
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#263238]">12</div>
                <div className="text-xs font-bold uppercase text-[#90A4AE]">Day Streak</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
              <div className={`rounded-full p-3 ${quietMode ? 'bg-purple-100' : 'bg-purple-50 text-[#D500F9]'}`}>
                <Zap size={24} className={!quietMode ? 'fill-current' : undefined} />
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#263238]">{xpTotal}</div>
                <div className="text-xs font-bold uppercase text-[#90A4AE]">Total XP</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#F1F5F9] bg-white p-4 shadow-sm">
              <div className={`rounded-full p-3 ${quietMode ? 'bg-green-100' : 'bg-green-50 text-green-500'}`}>
                <CheckCircle2 size={24} />
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#263238]">8</div>
                <div className="text-xs font-bold uppercase text-[#90A4AE]">Quests Done</div>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-8">
          <div className="rounded-3xl border border-[#F1F5F9] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Trophy className="text-[#FFC107]" size={24} />
              <h3 className="text-lg font-bold text-[#263238]">Recent Badges</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="group flex cursor-pointer flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E1] text-2xl shadow-sm transition-transform group-hover:scale-110">
                  🍕
                </div>
                <span className="text-center text-[10px] font-bold leading-tight text-[#546E7A]">
                  Fraction Pizza
                </span>
              </div>
              <div className="group flex cursor-pointer flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E3F2FD] text-2xl shadow-sm transition-transform group-hover:scale-110">
                  🚀
                </div>
                <span className="text-center text-[10px] font-bold leading-tight text-[#546E7A]">
                  Blast Off
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-50">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-[#CFD8DC] text-xl">
                  🏰
                </div>
                <span className="text-center text-[10px] font-bold leading-tight text-[#90A4AE]">
                  Locked
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-[#E1F5FE] py-2 text-sm font-bold text-[#0288D1] transition-colors hover:bg-[#B3E5FC]"
            >
              View All Badges
            </button>
          </div>

          <div className="rounded-3xl border border-[#E0F7FA] bg-white/50 p-6">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#90A4AE]">
              Coming Up
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1F5FE] bg-white">
                  📚
                </div>
                <div>
                  <div className="text-sm font-bold text-[#455A64]">Reading Giant</div>
                  <div className="text-xs text-[#90A4AE]">Tomorrow</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1F5FE] bg-white">
                  🎨
                </div>
                <div>
                  <div className="text-sm font-bold text-[#455A64]">Color Theory</div>
                  <div className="text-xs text-[#90A4AE]">Friday</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
