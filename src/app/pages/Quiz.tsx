// src/app/pages/Quiz.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Loader2, RotateCcw } from 'lucide-react';
import { quizService } from '../services/quizService';
import { Question } from '../data/quizzes';
import { toast } from 'sonner';
import { useABTest } from '../hooks/useABTest';   // ← новый импорт

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // A/B тесты
  const progressVariant = useABTest('progress');   // A = без, B = с прогресс-баром
  //const layoutVariant = useABTest('layout');       // A = горизонтально, B = вертикально

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const amount = Number(searchParams.get('amount')) || 10;
  const category = searchParams.get('category') || undefined;
  const difficulty = (searchParams.get('difficulty') as 'easy' | 'medium' | 'hard') || undefined;
  const isRetry = searchParams.get('retry') === 'true';

  // Загрузка вопросов
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let loadedQuestions: Question[] = [];

        if (isRetry) {
          const saved = localStorage.getItem('lastQuiz');
          if (saved) loadedQuestions = JSON.parse(saved);
          else throw new Error('Saved quiz not found');
        } else {
          loadedQuestions = await quizService.getQuestions({ amount, category, difficulty });
          localStorage.setItem('lastQuiz', JSON.stringify(loadedQuestions));
        }

        setQuestions(loadedQuestions);
        setUserAnswers(new Array(loadedQuestions.length).fill(null));
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } catch (err: any) {
        setError(err.message || "Couldn't load quiz");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [amount, category, difficulty, isRetry]);

  const currentQuestion = questions[currentQuestionIndex];
  const remaining = questions.length - currentQuestionIndex - 1;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        const score = newAnswers.filter((ans, i) => ans === questions[i].correctAnswer).length;
        navigate(`/results?score=${score}&total=${questions.length}`);
      }
    }, 1600);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-purple-600 mb-4" />
          <p className="text-lg text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold">
            Main page
          </Link>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // Класс для контейнера кнопок
  //const answersClass = layoutVariant === 'B'
  //  ? "flex flex-col gap-4"                    // Вертикально
  //  : "grid grid-cols-1 md:grid-cols-4 gap-4"; // Горизонтально

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Main page</span>
          </Link>

          <div className="text-center">
            <h1 className="font-bold text-xl">QuizMaster</h1>
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </header>

      {/* === ПРОГРЕСС-БАР (гипотеза 1) === */}
      {progressVariant === 'B' && (
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <div className="flex justify-between text-sm mb-2 text-gray-600">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-medium">Remaining: {remaining}</span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {currentQuestionIndex + 1}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>

            {/* Кнопки ответов — здесь применяется A/B тест */}
            {/*
            <div className={answersClass}>
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-6 text-left rounded-2xl border text-lg font-medium transition-all ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white border-green-500'
                        : selectedAnswer === index
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                      : selectedAnswer === index
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            */}

            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-6 text-left rounded-2xl border text-lg font-medium transition-all ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white border-green-500'
                        : selectedAnswer === index
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                      : selectedAnswer === index
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {!showFeedback && (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`mt-8 w-full py-5 rounded-2xl font-bold text-xl transition-all ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next question' : 'Finish quiz'}
              </button>
            )}

            {showFeedback && (
              <div className={`mt-8 p-6 rounded-2xl text-center text-lg font-semibold ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}