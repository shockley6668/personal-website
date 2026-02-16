
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
          <LanguageSwitcher />
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
            className="md:hidden bg-white shadow-lg absolute w-full top-full" // Position below the header bar
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center py-4 space-y-3">
              {NAV_LINKS_DATA.map((link: NavLink) => (
                <a
                  key={getText(link.name, language)}
                  href={link.href}
                  className="text-slate-700 hover:text-sky-500 transition-colors py-1"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  {getText(link.name, language)}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Removed CyberpunkParkourAnimation, Hero Content, and h-screen div */}
    </header >
  );
};

export default Header;
