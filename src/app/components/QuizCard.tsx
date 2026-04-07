import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Quiz } from '../data/quizzes';
import { Clock, BookOpen, Trophy } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const difficultyColors = {
    Easy: 'bg-green-500',
    Medium: 'bg-yellow-500',
    Hard: 'bg-red-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/quiz/${quiz.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {/* Image Background */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={quiz.image}
              alt={quiz.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${quiz.gradient} opacity-80`}></div>
          </div>

          {/* Content */}
          <div className="relative p-6 bg-white">
            {/* Difficulty Badge */}
            <div className="absolute -top-4 right-4">
              <span
                className={`${difficultyColors[quiz.difficulty]} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg`}
              >
                {quiz.difficulty}
              </span>
            </div>

            <div className="mb-3">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 text-sm">{quiz.description}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{quiz.questions.length} Questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>~{quiz.questions.length * 30}s</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" style={{ color: quiz.color }} />
                <span>{quiz.category}</span>
              </div>
            </div>
          </div>

          {/* Accent Border */}
          <div className={`h-2 bg-gradient-to-r ${quiz.gradient}`}></div>
        </div>
      </Link>
    </motion.div>
  );
}
