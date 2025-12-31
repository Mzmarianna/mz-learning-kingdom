import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Heart, CheckCircle, Mail } from 'lucide-react';
import { SEOHead, SEO_PRESETS } from './common/SEOHead';

interface QuizAnswer {
  questionId: string;
  answer: string;
}

interface QuizResults {
  childAge: string;
  learningChallenges: string[];
  motivation: string;
  struggles: string[];
  goals: string[];
  parentEmail: string;
  parentName: string;
}

interface PlacementQuizProps {
  onComplete: (results: QuizResults) => void;
}

export default function PlacementQuiz({ onComplete }: PlacementQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-purple-50 to-white">
      <SEOHead {...SEO_PRESETS.quiz} />
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {currentQuestion.type === 'welcome' ? (
            <div className="text-center">
              <div className="text-7xl mb-6">{currentQuestion.emoji}</div>
              <h1 className="text-4xl md:text-5xl mb-4">{currentQuestion.title}</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {currentQuestion.subtitle}
              </p>
              <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4 text-left">
                  <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>You're in the right place.</strong> We understand the unique challenges of raising a neurodivergent child.
                    </p>
                    <p className="text-gray-600">
                      This quick quiz helps us create a personalized learning path that celebrates your child's strengths and supports their growth—without tears, pressure, or daily battles.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-12 py-5 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105 text-xl inline-flex items-center gap-3 group"
              >
                Let's Begin
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : currentQuestion.type === 'contact' ? (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{currentQuestion.emoji}</div>
                <h2 className="text-3xl md:text-4xl mb-3">{currentQuestion.question}</h2>
                <p className="text-lg text-gray-600">{currentQuestion.subtitle}</p>
              </div>

              <div className="space-y-6 max-w-md mx-auto">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="bg-cyan-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="mb-1">
                        <strong>You'll receive:</strong>
                      </p>
                      <ul className="space-y-1 text-gray-600">
                        <li>✨ Your child's personalized learning plan</li>
                        <li>💌 Weekly encouragement and tips</li>
                        <li>🎯 Success stories from other families</li>
                        <li>🎁 Exclusive resources and activities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-5 rounded-2xl hover:shadow-xl transition-all transform hover:scale-105 text-xl flex items-center justify-center gap-3 group"
                >
                  <Sparkles className="w-6 h-6" />
                  Get My Personalized Plan
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-gray-500">
                  We respect your privacy. Unsubscribe anytime. No spam, ever.
                </p>
              </div>
            </form>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{currentQuestion.emoji}</div>
                <h2 className="text-3xl md:text-4xl mb-3">{currentQuestion.question}</h2>
                <p className="text-lg text-gray-600">{currentQuestion.subtitle}</p>
              </div>

              <div className="space-y-3 mb-8">
                {currentQuestion.options?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all text-left ${
                      isSelected(option.value)
                        ? 'border-purple-500 bg-gradient-to-r from-cyan-50 to-purple-50 shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected(option.value)
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected(option.value) && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-lg">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {currentQuestion.type === 'multiple' && (
                <p className="text-sm text-gray-500 text-center mb-6">
                  Select all that apply
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          {currentQuestion.type !== 'welcome' && currentQuestion.type !== 'contact' && (
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProgress()}
                className={`flex-1 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  canProgress()
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Trust Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}