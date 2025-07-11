import { useState, useEffect } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh';

interface LanguageText {
  ko: string;
  en: string;
  ja?: string;
  zh?: string;
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
    const languages: Language[] = ['ko', 'en', 'ja', 'zh'];
    const currentIndex = languages.indexOf(language);
    const newLanguage = languages[(currentIndex + 1) % languages.length];
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const setSpecificLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (text: LanguageText) => text[language] || text.ko;

  return { language, toggleLanguage, setSpecificLanguage, t };
}