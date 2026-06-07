import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { Language } from '../types';

const Header: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${
        scrolled ? 'py-4 backdrop-blur-md bg-apple-bg/70 border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl px-6 md:px-12 flex justify-between items-center">
        {/* Logo / Name */}
        <a href="#" className="text-xl md:text-2xl font-bold tracking-tight text-white hover:text-apple-blue transition-colors">
          SHUKUN HUANG
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-apple-gray-light">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleLanguage}
            className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
          >
            {language === 'en' ? '中' : 'EN'}
          </button>
          
          {/* Mobile menu trigger could go here */}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
