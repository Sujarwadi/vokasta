import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang')?.toLowerCase();
        if (urlLang === 'en' || urlLang === 'id') {
          return urlLang;
        }
      }
      const saved = localStorage.getItem('vokasta_language');
      return saved === 'en' || saved === 'id' ? saved : 'id';
    } catch {
      return 'id';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('vokasta_language', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  useEffect(() => {
    try {
      localStorage.setItem('vokasta_language', language);
    } catch {}
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      language: 'id',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: translations.id,
    };
  }
  return context;
};
