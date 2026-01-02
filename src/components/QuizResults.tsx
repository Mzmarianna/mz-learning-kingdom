import { Sparkles, Heart, Target, Zap, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';

interface QuizResults {
  childAge: string;
  learningChallenges: string[];
  motivation: string;
  struggles: string[];
  goals: string[];
  parentEmail: string;
  parentName: string;
}

interface QuizResultsProps {
  results: QuizResults;
  onStartLearning: () => void;
}

export default function QuizResults({ results, onStartLearning }: QuizResultsProps) {
  const [emailSent, setEmailSent] = useState(false);

  // Generate personalized recommendations based on answers
  const getRecommendations = () => {
    const recs: any = {
      primaryFocus: [],
      startingLevel: '',
      keyFeatures: [],
      encouragement: '',
    };

    // Determine starting level based on age
    const ageMap: Record<string, number> = {
      '5-6': 1,
      '7-8': 2,
      '9-10': 3,
      '11-12': 4,
      '13+': 5,
    };
    recs.startingLevel = ageMap[results.childAge] || 2;

    // Primary focus based on struggles
    if (results.struggles.includes('reading')) {
      recs.primaryFocus.push({
        title: 'Reading Quest',
        emoji: '📚',
        description: 'Start with fun phonics and comprehension challenges designed for dyslexic learners',
      });
    }
    if (results.struggles.includes('math')) {
      recs.primaryFocus.push({
        title: 'Math Quest',
        emoji: '🔢',
        description: 'Build number confidence with visual, game-based math challenges',
      });
    }
    if (results.struggles.includes('organization')) {
      recs.primaryFocus.push({
        title: 'Executive Function Quest',
        emoji: '🧠',
        description: 'Learn planning and organization through interactive projects',
      });
    }

    // If no specific struggles, recommend based on goals
    if (recs.primaryFocus.length === 0) {
      recs.primaryFocus.push({
        title: 'Math Quest',
        emoji: '🔢',
        description: 'Build confidence with our most popular starting quest',
      });
    }

    // Key features based on learning challenges
    if (results.learningChallenges.includes('adhd')) {
      recs.keyFeatures.push({
        icon: '⚡',
        title: 'Instant Dopamine Rewards',
        description: 'Immediate feedback after every challenge - no waiting!',
      });
      recs.keyFeatures.push({
        icon: '🎯',
        title: 'Short, Focused Challenges',
        description: 'Bite-sized tasks that keep attention engaged',
      });
    }
    if (results.learningChallenges.includes('dyslexia')) {
      recs.keyFeatures.push({
        icon: '🎨',
        title: 'Visual Learning',
        description: 'Quest Maps and visual progress tracking',
      });
      recs.keyFeatures.push({
        icon: '🗣️',
        title: 'Multi-Sensory Approach',
        description: 'Audio support and interactive elements',
      });
    }
    if (results.learningChallenges.includes('anxiety')) {
      recs.keyFeatures.push({
        icon: '💜',
        title: 'No Red, No Shame',
        description: 'Calm colors and XP that never decreases',
      });
      recs.keyFeatures.push({
        icon: '🌟',
        title: 'Celebrate Every Step',
        description: 'Progress is progress - no penalties for mistakes',
      });
    }

    // Add motivation-based features
    if (results.motivation === 'games') {
      recs.keyFeatures.push({
        icon: '🎮',
        title: 'Quest Map Adventure',
        description: 'A Candy Crush-style map that lights up with every win',
      });
    }
    if (results.motivation === 'rewards') {
      recs.keyFeatures.push({
        icon: '🏆',
        title: 'XP & Achievements',
        description: 'Earn points and unlock special badges',
      });
    }

    // Personalized encouragement
    if (results.struggles.includes('confidence')) {
      recs.encouragement = `We know it's hard watching your child struggle with confidence. Our system is specifically designed to rebuild self-esteem—celebrating every small win and never taking points away. Parents tell us their kids start believing in themselves again within the first week.`;
    } else if (results.struggles.includes('motivation')) {
      recs.encouragement = `You're not imagining it—traditional schoolwork just doesn't work for some kids. Our gamified approach taps into what naturally motivates children: games, rewards, and instant feedback. Watch them go from "I don't want to" to "Can I do another quest?"`;
    } else {
      recs.encouragement = `Every child learns differently, and that's not just okay—it's wonderful. We've designed Mz. Marianna's Academy to meet your child exactly where they are, celebrate their unique brain, and help them discover that learning can actually be fun.`;
    }

    return recs;
  };

  const recommendations = getRecommendations();

  // Simulate sending welcome email
  const sendWelcomeEmail = () => {
    // In production, this would call your backend API to send email
    console.log('Sending welcome email to:', results.parentEmail);
    console.log('Email sequence triggered for:', results);
    setEmailSent(true);
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => setEmailSent(false), 5000);
  };

  // Trigger email on component mount
  useState(() => {
    sendWelcomeEmail();
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-purple-50 py-12 px-4">
      {/* Email Sent Notification */}
      {emailSent && (
        <div className="fixed top-8 right-8 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <Mail className="w-6 h-6" />
          <div>
            <p>Check your email!</p>
            <p className="text-sm opacity-90">Your personalized plan is on the way ✨</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl md:text-5xl mb-4">
            {results.parentName.split(' ')[0]}, We've Got the Perfect Plan for Your Child!
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Based on your answers, here's a personalized learning path designed just for them
          </p>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 inline-block">
            <p className="text-sm opacity-90 mb-1">We've sent your full plan to:</p>
            <p className="text-lg">📧 {results.parentEmail}</p>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl mb-3">You're Not Alone</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {recommendations.encouragement}
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Starting Quests */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl mb-6 text-center">Recommended Starting Quests</h2>
          <div className="space-y-4">
            {recommendations.primaryFocus.map((quest: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{quest.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2">{quest.title}</h3>
                    <p className="text-gray-700 text-lg">{quest.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-purple-600">
                      <Target className="w-5 h-5" />
                      <span>Starting at Level {recommendations.startingLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features for Your Child */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl mb-6 text-center">Perfect Features for Your Child</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.keyFeatures.map((feature: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl p-5 border border-purple-100"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-lg mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl mb-6 text-center">What Happens Next</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl mb-1">Check Your Email (it's on the way!)</h3>
                <p className="text-gray-600">
                  Your full personalized plan, getting started guide, and first-week tips are in your inbox
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl mb-1">Create Your Free Account</h3>
                <p className="text-gray-600">
                  Set up your child's profile and explore their personalized Quest Map
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl mb-1">Start Your First Quest Together</h3>
                <p className="text-gray-600">
                  Watch their eyes light up as they earn their first XP and unlock achievements!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStartLearning}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-6 rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 text-xl inline-flex items-center gap-3 group mb-4"
          >
            <Sparkles className="w-6 h-6" />
            Create Free Account & Start Learning
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-gray-600">
            No credit card required • Cancel anytime • ESA & Microgrants accepted
          </p>
        </div>

        {/* Weekly Email Preview */}
        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl mb-4 text-center">You'll Also Receive Weekly Encouragement</h2>
          <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Every week in your inbox:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Tips for supporting your neurodivergent learner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Success stories from families just like yours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Encouragement for the hard days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Exclusive resources and activities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
