
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { Language } from '../types';
import { INITIAL_LANGUAGE } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: INITIAL_LANGUAGE,
  setLanguage: () => console.warn('Language provider not found'),
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(INITIAL_LANGUAGE);

  useEffect(() => {
    let preferredLang = INITIAL_LANGUAGE; // Default to INITIAL_LANGUAGE
    try {
      const storedLang = localStorage.getItem('preferredLanguage') as Language;
      if (storedLang && (storedLang === 'zh' || storedLang === 'en')) {
        preferredLang = storedLang; // Use stored language if valid
      }
      // If no valid storedLang, preferredLang remains INITIAL_LANGUAGE ('en')
      // The browser's language will no longer override this default for new users.
    } catch (error) {
      console.warn('Could not access localStorage:', error);
      // Falls back to INITIAL_LANGUAGE set in useState/preferredLang
    }
    setLanguageState(preferredLang);
  }, []); // Empty dependency array ensures this runs only once on mount

  const setLanguage = (newLanguage: Language) => {
    try {
      localStorage.setItem('preferredLanguage', newLanguage);
    } catch (error) {
      console.warn('Could not save language to localStorage:', error);
    }
    document.documentElement.lang = newLanguage;
    setLanguageState(newLanguage);
  };
  
  // Effect to update document lang attribute whenever language state changes
  // This is important if the initial state derived from useEffect differs from INITIAL_LANGUAGE
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
