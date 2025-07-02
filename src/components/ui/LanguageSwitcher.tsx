import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'ru' | 'uz') => {
    i18n.changeLanguage(lng);
  };

  const languages: ('ru' | 'uz')[] = ['ru', 'uz'];

  return (
    <div className={`relative flex items-center bg-background/20 dark:bg-gray-800/50 p-1 rounded-full ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`relative z-10 w-10 h-7 flex items-center justify-center text-xs font-bold uppercase transition-colors duration-300
            ${i18n.language.startsWith(lang) ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          aria-label={`Switch to ${lang}`}
        >
          {lang}
        </button>
      ))}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="absolute z-0 w-10 h-7 bg-primary rounded-full"
        style={{
          left: i18n.language.startsWith('ru') ? '4px' : '44px',
        }}
      />
    </div>
  );
};

export default LanguageSwitcher; 