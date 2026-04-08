// src/app/pages/Home.tsx
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Brain, Sparkles, Play } from 'lucide-react';
import { quizService } from '../services/quizService';

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    amount: 10,
    category: '', 
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
  });

  useEffect(() => {
    quizService.getCategories().then((cats) => {
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const handleStartQuiz = () => {
    const params = new URLSearchParams({
      amount: form.amount.toString(),
      difficulty: form.difficulty,
    });

    if (form.category) {
      params.append('category', form.category);
    }

    navigate(`/quiz?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                QuizMaster
              </h1>
              <p className="text-sm text-gray-600 -mt-1">Endless Trivia</p>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold text-gray-900 mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate unlimited quizzes on any topic with real questions from the Open Trivia Database.
          </p>
        </motion.div>

        {/* Generator Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Количество вопросов */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {[5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>{n} questions</option>
                ))}
              </select>
            </div>

            {/* Сложность */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value as any })}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              >
                <option value="">Any Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="mt-10 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <Play className="w-6 h-6" />
            Start Quiz Now
          </button>
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Powered by Open Trivia Database • Unlimited free questions
        </p>
      </div>
    </div>
  );
}