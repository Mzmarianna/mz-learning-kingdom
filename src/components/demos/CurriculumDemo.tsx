import { useState } from 'react';
import CurriculumViewer from '@/components/curriculum/CurriculumViewer';
import L1UM, { Lesson } from '@/lib/curriculum-data';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

/**
 * Demo component showing the L1UM curriculum in action
 * This demonstrates how the curriculum system works with simulated student progress
 */
export default function CurriculumDemo() {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  const handleStartLesson = (lesson: Lesson) => {
    setCurrentLessonId(lesson.id);
    toast.success(`Starting: ${lesson.title}`, {
      description: 'In a real app, this would navigate to the lesson activity.',
    });

    // Simulate auto-complete after 2 seconds (for demo purposes)
    setTimeout(() => {
      handleCompleteLesson(lesson);
    }, 2000);
  };

  const handleContinueLesson = (lesson: Lesson) => {
    toast.info(`Continuing: ${lesson.title}`, {
      description: 'Picking up where you left off...',
    });
  };

  const handleReviewLesson = (lesson: Lesson) => {
    toast.info(`Reviewing: ${lesson.title}`, {
      description: 'Going over what you learned...',
    });
  };

  const handleCompleteLesson = (lesson: Lesson) => {
    setCompletedLessonIds(prev => [...prev, lesson.id]);
    setCurrentLessonId(null);
    
    toast.success(`✨ ${lesson.badge.name} Badge Earned!`, {
      description: `+${lesson.badge.robuxValue} Robux! Great job mastering ${lesson.title}!`,
    });

    // Check if redemption threshold reached
    const newTotal = (completedLessonIds.length + 1) * 100;
    if (newTotal === 800) {
      setTimeout(() => {
        toast.success('🎊 Redemption Unlocked!', {
          description: 'You can now redeem your Robux for awesome rewards!',
          duration: 5000,
        });
      }, 1000);
    }
  };

  const resetDemo = () => {
    setCompletedLessonIds([]);
    setCurrentLessonId(null);
    toast.info('Demo reset', { description: 'Starting fresh!' });
  };

  return (
    <div className="min-h-screen bg-calm-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Demo Header */}
        <div className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Level 1 Math Curriculum Demo</h1>
              <p className="text-purple-100">
                This is a working demo of the L1UM curriculum system. Click lessons to simulate 
                completion and see the reward system in action!
              </p>
            </div>
            <Button
              onClick={resetDemo}
              variant="secondary"
              size="lg"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Demo
            </Button>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="mb-6 bg-calm-surface border-2 border-calm-border rounded-xl p-4">
          <h3 className="font-semibold mb-3">Quick Actions (Demo Only):</h3>
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => {
                // Complete first 3 lessons
                setCompletedLessonIds(['L1UM-01', 'L1UM-02', 'L1UM-03']);
                toast.success('Completed first 3 lessons!');
              }}
              size="sm"
            >
              Complete First 3 Lessons
            </Button>
            <Button
              onClick={() => {
                // Complete first 8 lessons (800 Robux - redemption threshold)
                const first8 = L1UM.lessons.slice(0, 8).map(l => l.id);
                setCompletedLessonIds(first8);
                toast.success('Completed 8 lessons - Redemption unlocked!');
              }}
              size="sm"
            >
              Unlock Redemption (8 lessons)
            </Button>
            <Button
              onClick={() => {
                // Complete all lessons
                const allIds = L1UM.lessons.map(l => l.id);
                setCompletedLessonIds(allIds);
                toast.success('All lessons completed! 🎉');
              }}
              size="sm"
            >
              Complete All Lessons
            </Button>
          </div>
        </div>

        {/* Curriculum Viewer */}
        <CurriculumViewer
          level={L1UM}
          completedLessonIds={completedLessonIds}
          currentLessonId={currentLessonId}
          onStartLesson={handleStartLesson}
          onContinueLesson={handleContinueLesson}
          onReviewLesson={handleReviewLesson}
        />

        {/* Demo Instructions */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use This Demo:</h3>
          <ol className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Click the <strong>Overview</strong> tab to see learning objectives and reward info</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Click the <strong>Lessons</strong> tab to see all 16 lessons</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Click <strong>Start Lesson</strong> on an available lesson (it will auto-complete after 2 seconds for demo purposes)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Watch your Robux count increase as you complete lessons</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">5.</span>
              <span>Click the <strong>Rewards</strong> tab after earning 800 Robux to see redemption options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">6.</span>
              <span>Use the quick action buttons above to test different scenarios</span>
            </li>
          </ol>
        </div>

        {/* Integration Notes */}
        <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Integration Notes:</h3>
          <ul className="space-y-2 text-purple-800 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>All curriculum data is in <code className="bg-purple-100 px-2 py-0.5 rounded">/lib/curriculum-data.ts</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Components are in <code className="bg-purple-100 px-2 py-0.5 rounded">/components/curriculum/</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Full integration guide: <code className="bg-purple-100 px-2 py-0.5 rounded">/CURRICULUM_INTEGRATION.md</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Replace demo handlers with real Firestore operations for production</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Create interactive lesson activities (counting games, math challenges, etc.)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
