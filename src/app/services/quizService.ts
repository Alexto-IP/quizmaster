// src/app/services/quizService.ts
import { Question } from '../data/quizzes';

const BASE_URL = 'https://the-trivia-api.com/v2';

export interface QuizParams {
  amount: number;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const quizService = {
  /**
   * Получить список всех категорий
   */
  async getCategories() {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(`Не удалось загрузить категории (${response.status})`);
    }

    const data: Record<string, string[]> = await response.json();

    return Object.entries(data).map(([name, slugs]) => ({
      id: slugs[0] as string,
      name: name,
    })) as { id: string; name: string }[];
  },

  /**
   * Получить вопросы по параметрам
   */
  async getQuestions(params: QuizParams): Promise<Question[]> {
    const queryParams = new URLSearchParams({
      amount: params.amount.toString(),
    });

    if (params.category) {
      queryParams.append('categories', params.category);
    }

    if (params.difficulty) {
      queryParams.append('difficulty', params.difficulty);
    }

    const url = `${BASE_URL}/questions?${queryParams}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}. Попробуйте позже.`);
    }

    const rawQuestions: any[] = await response.json();

    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      throw new Error('Не удалось получить вопросы. Попробуйте другую категорию.');
    }

    return rawQuestions.map((item, index: number) => {
      const questionText = typeof item.question === 'object' 
        ? item.question.text 
        : item.question;   // на всякий случай

      const correctAnswer = item.correctAnswer;
      const incorrectAnswers = item.incorrectAnswers || [];

      const allAnswers = [...incorrectAnswers, correctAnswer];
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        id: index,
        question: decodeHtml(questionText),
        options: shuffledAnswers.map(decodeHtml),
        correctAnswer: shuffledAnswers.indexOf(correctAnswer),
      };
    });
  },
};

// Помощник для декодирования HTML-сущностей
function decodeHtml(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}