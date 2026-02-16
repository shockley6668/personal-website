
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { NAV_LINKS_DATA, PROFILE_DATA, getText } from '../constants';
import type { NavLink } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
// CyberpunkParkourAnimation import removed

const Header: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjust threshold if needed, e.g., to trigger when hero is mostly out of view
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page loads scrolled
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3, // Adjusted delay
        duration: 0.3
      }
    })
  };

  // Hero content variants are removed from here

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                 ${isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <motion.a
          href="#"
          className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-sky-600' : 'text-white'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} // Adjusted delay
        >
          {getText(PROFILE_DATA.name, language)}
        </motion.a>
        <nav className="hidden md:flex items-center space-x-5">
          {NAV_LINKS_DATA.map((link: NavLink, index: number) => (
            <motion.a
              key={getText(link.name, language)}
              href={link.href}
              className={`text-sm font-medium hover:text-sky-500 transition-colors duration-300 ${isScrolled ? 'text-slate-700' : 'text-slate-100'}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={navLinkVariants}
            >
              {getText(link.name, language)}
            </motion.a>
          ))}
          <LanguageSwitcher />
        </nav>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className={`ml-3 transition-colors duration-300 ${isScrolled ? 'text-slate-700' : 'text-white'} focus:outline-none`}
            aria-label={getText({ zh: "切换菜单", en: "Toggle menu" }, language)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl shadow-2xl absolute w-full top-full border-t border-slate-100 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col items-stretch py-6 px-4 space-y-1">
              {NAV_LINKS_DATA.map((link: NavLink, idx: number) => (
                <motion.a
                  key={getText(link.name, language)}
                  href={link.href}
                  className="text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-all py-3.5 px-6 rounded-xl font-semibold text-lg flex items-center justify-between group"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <span>{getText(link.name, language)}</span>
                  <i className="fas fa-chevron-right text-slate-300 group-hover:text-sky-400 transition-colors text-sm"></i>
                </motion.a>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-center">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Removed CyberpunkParkourAnimation, Hero Content, and h-screen div */}
    </header >
  );
};

export default Header;
