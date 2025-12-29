'use client';

import Link from 'next/link';
import { useStudentData } from '@/lib/hooks/use-student-data';
import { StudentDashboard } from './components/student-dashboard';

export default function LmsPage() {
  const { user, quests, xpTotal, loading, error } = useStudentData();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-lg font-semibold animate-pulse">Loading Kingdom...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold">We hit a snag loading your quests.</h1>
          <p className="mt-2 text-slate-400">{error.message}</p>
          <p className="mt-6 text-sm text-slate-500">If this keeps happening, ask your tutor to confirm your custom role and Firestore permissions.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold">Sign in to enter the Kingdom</h1>
          <p className="text-slate-400">
            This dashboard shows live quests, XP, and progress once you authenticate.
            Go to the login page, sign in, and make sure your tutor has assigned your role before returning here.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-amber-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <StudentDashboard displayName={user.displayName ?? user.email} xpTotal={xpTotal} quests={quests} />
    </div>
  );
}
