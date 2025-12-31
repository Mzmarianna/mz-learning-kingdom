import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { User } from '../../lib/types';
import { BookOpen, Users, ClipboardCheck, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';

interface TutorDashboardProps {
  user: User;
}

export default function TutorDashboard({ user }: TutorDashboardProps) {
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
                <p className="text-sm text-muted-foreground">Tutor Dashboard - {user.displayName}</p>
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
          {/* Quick Stats */}
          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-calm-primary" />
              <h3 className="font-semibold">My Students</h3>
            </div>
            <p className="text-3xl font-bold">
              {user.assignedStudentIds?.length || 0}
            </p>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardCheck className="w-6 h-6 text-reward-purple" />
              <h3 className="font-semibold">Pending Reviews</h3>
            </div>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-calm-surface border-2 border-calm-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-success" />
              <h3 className="font-semibold">Active Quests</h3>
            </div>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-8">
          <h2 className="text-2xl mb-6">My Students</h2>
          {(!user.assignedStudentIds || user.assignedStudentIds.length === 0) ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl mb-2">No Students Assigned Yet</h3>
              <p className="text-muted-foreground">
                Students will appear here once they are assigned to you by an administrator.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {user.assignedStudentIds.map((studentId) => (
                <div
                  key={studentId}
                  className="bg-calm-bg border-2 border-calm-border rounded-xl p-6 hover:border-calm-primary transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Student {studentId.substring(0, 8)}</h3>
                      <p className="text-sm text-muted-foreground">Click to view details</p>
                    </div>
                    <Button className="reward-bg text-white">View Progress</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
