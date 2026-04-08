// src/app/hooks/useABTest.ts
import { useSearchParams } from 'react-router';
import { useEffect, useMemo } from 'react';

export type ABVariant = 'A' | 'B';

const getRandomVariant = (): ABVariant => (Math.random() < 0.5 ? 'A' : 'B');

export function useABTest(testName: string): ABVariant {
  const [searchParams, setSearchParams] = useSearchParams();

  const variant = useMemo(() => {
    // 1. Приоритет — URL параметр (удобно для тестирования и шаринга)
    const urlVariant = searchParams.get(testName) as ABVariant | null;
    if (urlVariant === 'A' || urlVariant === 'B') {
      // Сохраняем в localStorage, если пришёл из URL
      localStorage.setItem(`ab_${testName}`, urlVariant);
      return urlVariant;
    }

    // 2. localStorage — чтобы один пользователь всегда видел один и тот же вариант
    const saved = localStorage.getItem(`ab_${testName}`);
    if (saved === 'A' || saved === 'B') {
      return saved as ABVariant;
    }

    // 3. Если ничего нет — генерируем случайный вариант
    const randomVariant = getRandomVariant();
    localStorage.setItem(`ab_${testName}`, randomVariant);
    return randomVariant;
  }, [searchParams, testName]);

  // Синхронизируем URL (для удобства отладки)
  useEffect(() => {
    const currentUrlValue = searchParams.get(testName);
    if (currentUrlValue !== variant) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(testName, variant);
      setSearchParams(newParams, { replace: true });
    }
  }, [variant, testName, searchParams, setSearchParams]);

  return variant;
}