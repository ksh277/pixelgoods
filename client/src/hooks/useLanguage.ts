import { useState, useEffect } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh';

interface TranslationMap {
  ko: string;
  en: string;
  ja?: string;
  zh?: string;
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ko');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['ko', 'en', 'ja', 'zh'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (translations: TranslationMap) => {
    return translations[language] || translations.ko || translations.en;
  };

  return {
    language,
    setLanguage: changeLanguage,
    t,
  };
}