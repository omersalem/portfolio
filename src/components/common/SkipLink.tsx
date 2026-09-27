import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { UI_TEXT } from '../../data/translations';

export const SkipLink: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const text = UI_TEXT[language].skipLink;

  return (
    <a
      href="#main-content"
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 ${
        isRTL ? 'focus:right-4' : 'focus:left-4'
      } focus:z-50 focus:px-6 focus:py-3 focus:bg-chrome-orange focus:text-black focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-transform duration-150 rounded-lg font-mono text-sm`}
    >
      {text}
    </a>
  );
};
