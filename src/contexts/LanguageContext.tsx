import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lang, availableLangs } from '@/lib/i18n';

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('lang');
      if (stored && availableLangs.includes(stored as Lang)) return stored as Lang;
    } catch {}
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {}
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};