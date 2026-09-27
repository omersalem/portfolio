import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. URL Query Parameter: ?lang=ar or ?lang=en
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'ar' || urlLang === 'en') {
        return urlLang;
      }

      // 2. LocalStorage preference
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang === 'ar' || savedLang === 'en') {
        return savedLang;
      }
    }

    return 'ar'; // Default to Arabic version as requested
  });

  const isRTL = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = isRTL ? 'rtl' : 'ltr';

    if (language === 'ar') {
      document.title = 'عمر سالم — مهندس حاسوب | مواقع مهندسة للبيع وبنية تحتية عالية الأداء';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'عمر سالم — مهندس حاسوب. مواقع ويب مهندسة لزيادة المبيعات والتحويل، وتصميم وتطوير متكامل، وبنية تحتية وأمان عالي الأداء.'
        );
      }
    } else {
      document.title = 'Omer Salem — Computer Engineer | Websites Engineered to Sell';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Omer Salem — Computer Engineer. Websites engineered to sell. Design, full-stack development, and high-performance infrastructure.'
        );
      }
    }
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, isRTL, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
