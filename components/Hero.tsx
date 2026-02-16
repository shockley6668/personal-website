
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { PROFILE_DATA, getText } from '../constants';
import CyberpunkParkourAnimation from './CyberpunkParkourAnimation';

const Hero: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const heroContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5, // Increased delay slightly for animation to load
        duration: 0.5
      }
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="hero" // Common ID for the top hero section
      className="relative flex flex-col justify-center items-center text-center h-screen text-white overflow-hidden"
      aria-labelledby="hero-title"
    >
      <CyberpunkParkourAnimation />
      <motion.div
        className="container mx-auto px-6 z-10 relative" // Ensure content is above canvas
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={PROFILE_DATA.avatarUrl}
          alt={getText(PROFILE_DATA.name, language)}
          className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover mb-6 border-4 border-sky-400 shadow-xl mx-auto"
          variants={heroItemVariants}
        />
        <motion.h1 
          id="hero-title"
          className="text-4xl md:text-5xl font-bold mb-3" 
          variants={heroItemVariants}
        >
          {getText(PROFILE_DATA.heroTitle, language)}
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-sky-200 mb-8 max-w-2xl mx-auto" variants={heroItemVariants}>
          {getText(PROFILE_DATA.heroSubtitle, language)}
        </motion.p>
        <motion.a
          href="#about" // This will trigger smooth scroll to the About section
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg inline-block"
          variants={heroItemVariants}
        >
          {getText(PROFILE_DATA.heroButton, language)} <i className="fas fa-arrow-down ml-2"></i>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
