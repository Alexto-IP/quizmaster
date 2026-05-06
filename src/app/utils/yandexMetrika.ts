const YM_ID = import.meta.env.VITE_YM_ID;

declare global {
  interface Window {
    ym: any;
  }
}

const isDev = import.meta.env.DEV;

export const initYandexMetrika = () => {
  if (import.meta.env.DEV || !YM_ID) return;

  (function (m: any, e: Document, t: string, r: string, i: string) {
    m[i] =
      m[i] ||
      function (...args: any[]) {
        (m[i].a = m[i].a || []).push(args);
      };
    m[i].l = +new Date();

    const k = e.createElement(t) as HTMLScriptElement;
    const a = e.getElementsByTagName(t)[0];

    k.async = true;
    k.src = r;
    a.parentNode?.insertBefore(k, a);
  })(
    window,
    document,
    "script",
    "https://mc.yandex.ru/metrika/tag.js",
    "ym"
  );

  window.ym(Number(YM_ID), "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
    defer: true,
    trackHash: true,
  });
};

export const metrika = {
  reachGoal: (goal: string, params?: any) => {
    if (!isDev && window.ym && YM_ID) {
      window.ym(Number(YM_ID), 'reachGoal', goal, params);
    }
  }
};