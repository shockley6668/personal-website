
import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="px-3 py-1.5 border-2 rounded-md text-sm font-medium transition-all duration-300
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                 dark:focus:ring-offset-slate-800
                 hover:bg-opacity-80"
      // Smart styling based on current language and context (scrolled or not)
      // This assumes the parent header handles color changes for 'text-white' or 'text-slate-700'
      // We make border and text color consistent with the current theme context.
      style={{
        borderColor: language === 'zh' ? 'currentColor' : 'currentColor', // Use text color for border
      }}
      // Use current text color from parent for button text
      // e.g., if parent is text-white, button becomes text-white
      // if parent is text-slate-700, button becomes text-slate-700
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === 'zh' ? "Switch to English" : "切换到中文"}
    >
      {language === 'zh' ? 'EN' : '中'}
    </motion.button>
  );
};

export default LanguageSwitcher;
