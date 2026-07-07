
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
  const language: Language = 'en';
  const setLanguage = () => {};

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
