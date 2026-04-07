// src/app/pages/Results.tsx
import { useSearchParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Trophy, Home, RotateCcw, Star, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const score = Number(searchParams.get('score')) || 0;
  const total = Number(searchParams.get('total')) || 10;
  const percentage = Math.round((score / total) * 100);

  const amount = searchParams.get('amount') || '10';
  const category = searchParams.get('category') || '';
  const difficulty = searchParams.get('difficulty') || 'medium';

  // Конфетти при хорошем результате
  useEffect(() => {
    if (percentage >= 70) {
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [percentage]);

  const getMessage = () => {
    if (percentage === 100) return "Идеально! Ты гений! 🏆";
    if (percentage >= 80) return "Отличный результат! 🔥";
    if (percentage >= 60) return "Хорошо! Молодец 👏";
    if (percentage >= 40) return "Неплохо, можно лучше 💪";
    return "В следующий раз получится лучше 📚";
  };

  const getColor = () => {
    if (percentage >= 80) return 'from-emerald-500 to-teal-500';
    if (percentage >= 60) return 'from-blue-500 to-cyan-500';
    if (percentage >= 40) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  // Перейти на тот же квиз заново
  const retrySameQuiz = () => {
    const params = new URLSearchParams({
      amount,
      difficulty,
    });
    if (category) params.append('category', category);

    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Верхний баннер */}
          <div className={`bg-gradient-to-r ${getColor()} p-10 text-white text-center`}>
            <Trophy className="w-20 h-20 mx-auto mb-4 opacity-90" />
            <h1 className="text-5xl font-bold mb-2">Квиз завершён!</h1>
            <p className="text-2xl opacity-90">{getMessage()}</p>
          </div>

          {/* Результат */}
          <div className="p-10 text-center">
            <div className="inline-block bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl px-16 py-10 mb-10">
              <div className="text-8xl font-bold text-gray-900 mb-1">{percentage}%</div>
              <div className="text-xl text-gray-600">
                {score} из {total} правильных
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-green-700">{score}</div>
                <div className="text-sm text-green-600">Правильно</div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-red-700">{total - score}</div>
                <div className="text-sm text-red-600">Неправильно</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-4xl font-bold text-blue-700">{total}</div>
                <div className="text-sm text-blue-600">Всего</div>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="flex-1 bg-white border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600 text-gray-700 font-bold py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-3"
              >
                <Home className="w-5 h-5" />
                На главную
              </Link>

              <button
                onClick={() => navigate('/quiz?retry=true')}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-5 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <RotateCcw className="w-5 h-5" />
                Пройти этот квиз заново
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}