const YM_ID = import.meta.env.VITE_YM_ID;

declare global {
  interface Window {
    ym: any;
  }
}

const isDev = import.meta.env.DEV;

export const initYandexMetrika = () => {
  if (isDev || !YM_ID) {
    console.log('🟡 Yandex Metrika отключена в режиме разработки');
    return;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';

  script.onload = () => {
    window.ym(Number(YM_ID), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: false,     
      defer: true,
      trackHash: true,
    });
  };

  document.head.appendChild(script);
};

export const metrika = {
  reachGoal: (goal: string, params?: any) => {
    if (!isDev && window.ym && YM_ID) {
      window.ym(Number(YM_ID), 'reachGoal', goal, params);
    }
  }
};