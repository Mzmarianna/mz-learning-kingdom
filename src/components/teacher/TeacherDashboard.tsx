import { User } from '../../lib/types';
import { BookOpen } from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl">Welcome back, {user.displayName}!</h1>
            <p className="text-gray-600">Teacher Dashboard</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-lg text-gray-700">
            Your teacher dashboard is being prepared. You'll be able to lead live classes and create challenges here soon!
          </p>
        </div>
      </div>
    </div>
  );
}
