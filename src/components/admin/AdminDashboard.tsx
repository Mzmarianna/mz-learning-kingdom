import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { User } from '../../lib/types';
import { BookOpen, Users, Database, Settings, LogOut, FileText } from 'lucide-react';
import { Button } from '../ui/button';

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-calm-bg">
      {/* Header */}
      <header className="bg-calm-surface border-b-2 border-calm-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl reward-bg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Mz. Marianna's Academy</h1>
                <p className="text-sm text-muted-foreground">Admin Dashboard - {user.displayName}</p>
              </div>
            </div>
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-calm-primary" />
              <h3 className="font-semibold">Total Users</h3>
            </div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-1">All roles</p>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-reward-purple" />
              <h3 className="font-semibold">Active Quests</h3>
            </div>
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground mt-1">In progress</p>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-6 h-6 text-success" />
              <h3 className="font-semibold">Curriculum</h3>
            </div>
            <p className="text-3xl font-bold">L1-L6</p>
            <p className="text-sm text-muted-foreground mt-1">6 levels ready</p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-calm-primary" />
              <h3 className="text-xl font-semibold">User Management</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Manage students, parents, tutors, and administrators
            </p>
            <Button className="w-full reward-bg text-white">Manage Users</Button>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-reward-purple" />
              <h3 className="text-xl font-semibold">Curriculum Editor</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Create and edit quests, challenges, and learning content
            </p>
            <Button className="w-full reward-bg text-white">Edit Curriculum</Button>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-success" />
              <h3 className="text-xl font-semibold">Data & Analytics</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              View platform-wide analytics and student progress
            </p>
            <Button className="w-full reward-bg text-white">View Analytics</Button>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-warning" />
              <h3 className="text-xl font-semibold">System Settings</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Configure platform settings and preferences
            </p>
            <Button className="w-full reward-bg text-white">System Settings</Button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 bg-reward-purple-light border border-reward-purple rounded-xl p-6">
          <h3 className="font-semibold mb-2">🚀 Getting Started</h3>
          <ul className="text-sm space-y-2">
            <li>• <strong>Step 1:</strong> Verify the curriculum is seeded (check Firestore)</li>
            <li>• <strong>Step 2:</strong> Create tutor accounts for your teaching staff</li>
            <li>• <strong>Step 3:</strong> Create student accounts or have students sign up</li>
            <li>• <strong>Step 4:</strong> Assign students to tutors</li>
            <li>• <strong>Step 5:</strong> Tutors can begin assigning quests</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
