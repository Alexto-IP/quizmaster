// src/app/pages/Quiz.tsx
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, X, Loader2, RotateCcw } from 'lucide-react';
import { quizService } from '../services/quizService';
import { Question } from '../data/quizzes';
import { toast } from 'sonner';

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const amount = Number(searchParams.get('amount')) || 10;
  const category = searchParams.get('category') ? Number(searchParams.get('category')) : undefined;
  const difficulty = (searchParams.get('difficulty') as 'easy' | 'medium' | 'hard') || undefined;
  const isRetry = searchParams.get('retry') === 'true'; // ← ключевой флаг

  // Загрузка квиза
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let loadedQuestions: Question[] = [];

        if (isRetry) {
          // Повторяем предыдущий квиз
          const savedQuiz = localStorage.getItem('lastQuiz');
          if (savedQuiz) {
            loadedQuestions = JSON.parse(savedQuiz);
            console.log('♻️ Загружен сохранённый квиз для повтора');
          } else {
            throw new Error('Сохранённый квиз не найден');
          }
        } else {
          // Новый квиз с главной страницы
          console.log('🆕 Генерируем новый квиз');
          loadedQuestions = await quizService.getQuestions({
            amount,
            category,
            difficulty,
          });

          // Сохраняем как последний сыгранный
          localStorage.setItem('lastQuiz', JSON.stringify(loadedQuestions));
        }

        setQuestions(loadedQuestions);
        setUserAnswers(new Array(loadedQuestions.length).fill(null));
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } catch (err: any) {
        setError(err.message || 'Не удалось загрузить квиз');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [amount, category, difficulty, isRetry]);

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
          <p className="text-lg text-gray-600">Загружаем квиз...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Ошибка</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Главная</span>
          </Link>

          <div className="text-center">
            <h1 className="font-bold text-xl">QuizMaster</h1>
            <p className="text-sm text-gray-500">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()} // простой рестарт текущего
            className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <RotateCcw className="w-4 h-4" />
            Заново
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-6 pt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

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

            <div className="space-y-4 mb-10">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-6 text-left rounded-2xl border text-lg font-medium transition-all ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : selectedAnswer === index
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                      : selectedAnswer === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
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
                className={`w-full py-5 rounded-2xl font-bold text-xl ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить квиз'}
              </button>
            )}

            {showFeedback && (
              <div className={`p-6 rounded-2xl text-center text-lg font-semibold ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isCorrect ? '🎉 Правильно!' : '❌ Неправильно'}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}