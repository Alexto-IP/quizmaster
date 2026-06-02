const YM_ID = import.meta.env.VITE_YM_ID;

declare global {
  interface Window {
    ym: any;
  }
}

export const initYandexMetrika = () => {
  if (!YM_ID) {
    console.warn('Yandex Metrika: VITE_YM_ID is not set');
    return;
  }

  // Официальная инициализация
  (function (m: any, e: Document, t: string, r: string, i: string) {
    m[i] = m[i] || function (...args: any[]) {
      (m[i].a = m[i].a || []).push(args);
    };
    m[i].l = 1 * new Date();
    const k = e.createElement(t) as HTMLScriptElement;
    const a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode?.insertBefore(k, a);
  })(window, document, 'script', `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`, 'ym');

  window.ym(Number(YM_ID), 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    ssr: true,       
    defer: true,
  });

  console.log(`✅ Yandex Metrika initialized with ID: ${YM_ID}`);
};

export const metrika = {
  reachGoal: (goal: string, params?: any) => {
    if (window.ym) {
      window.ym(Number(YM_ID), 'reachGoal', goal, params);
    }
  }
};
