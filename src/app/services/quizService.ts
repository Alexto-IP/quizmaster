// src/app/services/quizService.ts
import { Question } from '../data/quizzes';

const BASE_URL = 'https://opentdb.com';

export interface QuizParams {
  amount: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const quizService = {
  /**
   * Получить список всех категорий
   */
  async getCategories() {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    const data = await response.json();
    return data.trivia_categories as { id: number; name: string }[];
  },

  /**
   * Получить вопросы по параметрам
   */
  async getQuestions(params: QuizParams): Promise<Question[]> {
    const queryParams = new URLSearchParams({
      amount: params.amount.toString(),
      type: 'multiple', // только вопросы с 4 вариантами
    });

    if (params.category) {
      queryParams.append('category', params.category.toString());
    }
    if (params.difficulty) {
      queryParams.append('difficulty', params.difficulty);
    }

    const response = await fetch(`${BASE_URL}/api.php?${queryParams}`);
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions. Please try again.');
    }

    // Преобразуем вопросы из формата OpenTDB в наш формат
    return data.results.map((item: any, index: number) => {
      const allAnswers = [...item.incorrect_answers, item.correct_answer];
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        id: index,
        question: decodeHtml(item.question),
        options: shuffledAnswers.map(decodeHtml),
        correctAnswer: shuffledAnswers.indexOf(item.correct_answer),
      };
    });
  },
};

// Помощник для декодирования HTML-сущностей (&quot;, &amp; и т.д.)
function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}