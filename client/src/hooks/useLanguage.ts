import { useState, useEffect } from 'react';

export type Language = 'ko' | 'en';

interface LanguageText {
  ko: string;
  en: string;
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ko');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (text: LanguageText) => text[language];

  return { language, toggleLanguage, t };
}