
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
      className="relative flex flex-col justify-center items-center text-center min-h-screen h-[100dvh] text-white overflow-hidden px-4"
      aria-labelledby="hero-title"
    >
      <CyberpunkParkourAnimation />
      <motion.div
        className="container mx-auto z-10 relative" // Ensure content is above canvas
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={PROFILE_DATA.avatarUrl}
          alt={getText(PROFILE_DATA.name, language)}
          className="w-28 h-28 xs:w-36 xs:h-36 md:w-44 md:h-44 rounded-full object-cover mb-6 border-4 border-sky-400 shadow-xl mx-auto"
          variants={heroItemVariants}
        />
        <motion.h1
          id="hero-title"
          className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
          variants={heroItemVariants}
        >
          {getText(PROFILE_DATA.heroTitle, language)}
        </motion.h1>
        <motion.p className="text-base xs:text-lg md:text-xl text-sky-100/90 mb-10 max-w-xl mx-auto leading-relaxed" variants={heroItemVariants}>
          {getText(PROFILE_DATA.heroSubtitle, language)}
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-2">
          <motion.a
            href="#about" // This will trigger smooth scroll to the About section
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.4)] inline-block w-full sm:w-auto"
            variants={heroItemVariants}
          >
            {getText(PROFILE_DATA.heroButton, language)} <i className="fas fa-arrow-down ml-2"></i>
          </motion.a>

          {PROFILE_DATA.downloadResume && (
            <motion.a
              href="./resume.pdf"
              download="Shukun_Huang_Resume.pdf"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold py-3.5 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl inline-block w-full sm:w-auto"
              variants={heroItemVariants}
            >
              {getText(PROFILE_DATA.downloadResume, language)} <i className="fas fa-download ml-2"></i>
            </motion.a>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
