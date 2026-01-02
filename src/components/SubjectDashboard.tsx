import { useState } from 'react';
import { BookOpen, Brain, Calculator, Atom, Globe, Palette, Music, Code, ChevronRight, Star, Lock, CheckCircle2 } from 'lucide-react';
import LessonQuiz from './LessonQuiz';

const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: Calculator,
    color: 'blue',
    progress: 75,
    lessons: 24,
    completed: 18,
    xpEarned: 3200,
  },
  {
    id: 'science',
    name: 'Science',
    icon: Atom,
    color: 'green',
    progress: 60,
    lessons: 20,
    completed: 12,
    xpEarned: 2100,
  },
  {
    id: 'history',
    name: 'History',
    icon: Globe,
    color: 'amber',
    progress: 45,
    lessons: 18,
    completed: 8,
    xpEarned: 1450,
  },
  {
    id: 'literature',
    name: 'Literature',
    icon: BookOpen,
    color: 'purple',
    progress: 85,
    lessons: 16,
    completed: 14,
    xpEarned: 2800,
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: Code,
    color: 'indigo',
    progress: 30,
    lessons: 30,
    completed: 9,
    xpEarned: 1200,
  },
  {
    id: 'art',
    name: 'Art & Design',
    icon: Palette,
    color: 'pink',
    progress: 50,
    lessons: 12,
    completed: 6,
    xpEarned: 980,
  },
];

const lessons = {
  math: [
    { id: 1, title: 'Algebra Basics', completed: true, locked: false, xp: 100, difficulty: 'Easy' },
    { id: 2, title: 'Quadratic Equations', completed: true, locked: false, xp: 150, difficulty: 'Medium' },
    { id: 3, title: 'Trigonometry Fundamentals', completed: false, locked: false, xp: 200, difficulty: 'Medium' },
    { id: 4, title: 'Calculus Introduction', completed: false, locked: true, xp: 300, difficulty: 'Hard' },
  ],
  science: [
    { id: 1, title: 'The Scientific Method', completed: true, locked: false, xp: 100, difficulty: 'Easy' },
    { id: 2, title: 'Cell Biology', completed: true, locked: false, xp: 150, difficulty: 'Medium' },
    { id: 3, title: 'Laws of Motion', completed: false, locked: false, xp: 200, difficulty: 'Medium' },
    { id: 4, title: 'Quantum Mechanics', completed: false, locked: true, xp: 350, difficulty: 'Hard' },
  ],
};

export default function SubjectDashboard() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
    };
    return colors[color][type];
  };

  if (activeLesson) {
    return <LessonQuiz lesson={activeLesson} onComplete={() => setActiveLesson(null)} />;
  }

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return null;

    const subjectLessons = lessons[selectedSubject as keyof typeof lessons] || [];

    return (
      <div>
        <button
          onClick={() => setSelectedSubject(null)}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
        >
          ← Back to Subjects
        </button>

        <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${getColorClasses(subject.color, 'bg')} rounded-2xl flex items-center justify-center`}>
                <subject.icon className={`w-8 h-8 ${getColorClasses(subject.color, 'text')}`} />
              </div>
              <div>
                <h2 className="text-3xl mb-2">{subject.name}</h2>
                <p className="text-gray-600">{subject.completed} of {subject.lessons} lessons completed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total XP Earned</p>
              <p className="text-2xl">{subject.xpEarned.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Overall Progress</span>
              <span className={getColorClasses(subject.color, 'text')}>{subject.progress}%</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getColorClasses(subject.color, 'bg').replace('100', '600')} transition-all rounded-full`}
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {subjectLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`bg-white rounded-xl p-6 border-2 transition-all ${
                lesson.locked
                  ? 'border-gray-200 opacity-60'
                  : lesson.completed
                  ? 'border-green-200 hover:shadow-lg'
                  : 'border-gray-200 hover:border-purple-200 hover:shadow-lg cursor-pointer'
              }`}
              onClick={() => {
                if (!lesson.locked && !lesson.completed) {
                  setActiveLesson(lesson);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    lesson.completed
                      ? 'bg-green-100'
                      : lesson.locked
                      ? 'bg-gray-100'
                      : getColorClasses(subject.color, 'bg')
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : lesson.locked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : (
                      <BookOpen className={`w-6 h-6 ${getColorClasses(subject.color, 'text')}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{lesson.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {lesson.xp} XP
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        lesson.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : lesson.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                {!lesson.locked && !lesson.completed && (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
                {lesson.completed && (
                  <span className="text-sm text-green-600">Completed</span>
                )}
                {lesson.locked && (
                  <span className="text-sm text-gray-400">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Choose Your Subject</h1>
        <p className="text-gray-600">Select a subject to continue your learning journey</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => setSelectedSubject(subject.id)}
            className={`bg-white rounded-2xl p-6 border-2 ${getColorClasses(subject.color, 'border')} hover:shadow-xl transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 ${getColorClasses(subject.color, 'bg')} rounded-2xl flex items-center justify-center`}>
                <subject.icon className={`w-7 h-7 ${getColorClasses(subject.color, 'text')}`} />
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
            
            <h3 className="text-xl mb-3">{subject.name}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className={getColorClasses(subject.color, 'text')}>{subject.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getColorClasses(subject.color, 'bg').replace('100', '600')} transition-all`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{subject.completed}/{subject.lessons} lessons</span>
              <span className={getColorClasses(subject.color, 'text')}>{subject.xpEarned} XP</span>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Goal */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl mb-2">Daily Goal</h3>
            <p className="opacity-90">Complete 3 lessons today to maintain your streak!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl mb-1">2/3</div>
            <p className="text-sm opacity-75">Lessons completed</p>
          </div>
        </div>
        <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: '66%' }} />
        </div>
      </div>
    </div>
  );
}
