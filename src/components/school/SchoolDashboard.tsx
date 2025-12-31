import { User } from '../../lib/types';
import { School } from 'lucide-react';

interface SchoolDashboardProps {
  user: User;
}

export default function SchoolDashboard({ user }: SchoolDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <School className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl">Welcome, {user.displayName}!</h1>
            <p className="text-gray-600">School Partnership Dashboard</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <p className="text-lg text-gray-700">
            Your school partnership dashboard is being prepared. You'll have access to professional development resources, student reports, and implementation guidance here soon!
          </p>
        </div>
      </div>
    </div>
  );
}
