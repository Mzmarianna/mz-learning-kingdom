import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { User } from '../../lib/types';
import { BookOpen, Users, TrendingUp, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';

interface ParentDashboardProps {
  user: User;
}

export default function ParentDashboard({ user }: ParentDashboardProps) {
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
                <p className="text-sm text-muted-foreground">Parent Dashboard - {user.displayName}</p>
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
        <div className="bg-calm-surface border-2 border-calm-border rounded-2xl p-8">
          <h2 className="text-2xl mb-6">My Children</h2>
          {(!user.studentIds || user.studentIds.length === 0) ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl mb-2">No Children Linked</h3>
              <p className="text-muted-foreground mb-6">
                Link your children's accounts to track their progress and achievements.
              </p>
              <Button className="reward-bg text-white">Add Child Account</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {user.studentIds.map((studentId) => (
                <div
                  key={studentId}
                  className="bg-calm-bg border-2 border-calm-border rounded-xl p-6 hover:border-calm-primary transition-colors cursor-pointer"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">
                      Student {studentId.substring(0, 8)}
                    </h3>
                    <p className="text-sm text-muted-foreground">Level 1 • CORE Program</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">This Week</span>
                      <span className="font-medium">3 challenges completed</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total XP</span>
                      <span className="font-medium xp-display text-reward-purple">450</span>
                    </div>
                  </div>

                  <Button className="w-full reward-bg text-white">View Full Progress</Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Summary */}
        <div className="mt-8 bg-calm-surface border-2 border-calm-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-success" />
            <h2 className="text-2xl">Weekly Summary</h2>
          </div>
          <p className="text-muted-foreground text-center py-8">
            Weekly summaries will be delivered to your email every Sunday evening.
          </p>
        </div>
      </main>
    </div>
  );
}
