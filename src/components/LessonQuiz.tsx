import { useState } from 'react';
import { CheckCircle2, XCircle, Star, Trophy, ArrowRight } from 'lucide-react';

interface LessonQuizProps {
  lesson: {
    id: number;
    title: string;
    xp: number;
    difficulty: string;
  };
  onComplete: () => void;
}

const quizQuestions = [
  {
    id: 1,
    question: 'What is the value of x in the equation: 2x + 5 = 13?',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    explanation: 'To solve: 2x + 5 = 13, subtract 5 from both sides to get 2x = 8, then divide by 2 to get x = 4.',
  },
  {
    id: 2,
    question: 'Which of the following is equivalent to (x + 3)²?',
    options: ['x² + 6', 'x² + 9', 'x² + 6x + 9', 'x² + 3x + 9'],
    correctAnswer: 2,
    explanation: 'Using the formula (a + b)² = a² + 2ab + b², we get x² + 2(x)(3) + 3² = x² + 6x + 9.',
  },
  {
    id: 3,
    question: 'If f(x) = 2x + 1, what is f(5)?',
    options: ['9', '10', '11', '12'],
    correctAnswer: 2,
    explanation: 'Substitute x = 5 into the function: f(5) = 2(5) + 1 = 10 + 1 = 11.',
  },
];

export default function LessonQuiz({ lesson, onComplete }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const earnedXP = Math.round(lesson.xp * (percentage / 100));

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl mb-4">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-8">You've completed {lesson.title}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-2xl">{score}/{quizQuestions.length}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-2xl">{percentage}%</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-sm text-purple-600 mb-1">XP Earned</p>
              <p className="text-2xl text-purple-600">+{earnedXP}</p>
            </div>
          </div>

          {percentage >= 80 && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-green-800">Excellent work! You've mastered this lesson!</p>
            </div>
          )}

          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl">{lesson.title}</h2>
          <button
            onClick={onComplete}
            className="text-gray-600 hover:text-gray-900"
          >
            Exit
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-2">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all ${
                index < currentQuestion
                  ? 'bg-green-500'
                  : index === currentQuestion
                  ? 'bg-purple-600'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
        <h3 className="text-xl mb-6">{question.question}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            let bgColor = 'bg-gray-50 hover:bg-gray-100';
            let borderColor = 'border-gray-200';
            
            if (showExplanation) {
              if (isCorrectOption) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-500';
              } else if (isSelected && !isCorrect) {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-500';
              }
            } else if (isSelected) {
              bgColor = 'bg-purple-50';
              borderColor = 'border-purple-600';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${bgColor} ${borderColor} ${
                  !showExplanation ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-xl mb-6 ${
            isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'
          }`}>
            <p className={`mb-2 ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
              {isCorrect ? '✓ Correct!' : 'Not quite right'}
            </p>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
