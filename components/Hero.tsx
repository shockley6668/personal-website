
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { PROFILE_DATA, getText } from '../constants';
import CyberpunkParkourAnimation from './CyberpunkParkourAnimation';

const Hero: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatingBadgeVariants = {
    animate: (i: number) => ({
      y: [0, -15, 0],
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 md:pt-0"
      aria-labelledby="hero-title"
    >
      <CyberpunkParkourAnimation />

      {/* Dark Overlay for better text contrast if needed, though Parkour is already darkish */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/80 pointer-events-none" />

      <div className="container mx-auto z-10 relative">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Text Content */}
          <motion.div
            className="w-full max-w-5xl relative z-20 px-4"
            variants={heroContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-xl md:text-2xl font-bold text-sky-400 mb-2 tracking-wide uppercase"
              variants={fadeInUp}
            >
              {getText({ zh: '你好，我是', en: "Hi I'm" }, language)}
            </motion.h2>

            <motion.h1
              id="hero-title"
              className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none"
              variants={fadeInUp}
            >
              <span className="relative inline-block">
                <span className="relative z-10">{getText(PROFILE_DATA.name, language)}</span>
                <span className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 md:h-6 bg-sky-600/50 -skew-x-12 -z-0 transform rotate-[-1deg]"></span>
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {getText(PROFILE_DATA.title, language)}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
              variants={fadeInUp}
            >
              {PROFILE_DATA.downloadResume && (
                <a
                  href="./resume.pdf"
                  download="Shukun_Huang_Resume.pdf"
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 px-8 rounded-full text-lg shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center justify-center gap-2 group"
                >
                  {getText(PROFILE_DATA.downloadResume, language)}
                  <i className="fas fa-download group-hover:animate-bounce"></i>
                </a>
              )}
              <a
                href="#projects"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold py-4 px-8 rounded-full text-lg hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {getText({ zh: '查看项目', en: 'View Projects' }, language)}
                <i className="fas fa-arrow-right"></i>
              </a>
            </motion.div>
          </motion.div>

          {/* Background & Floating Badges distributed around center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Background Blob/Shape centered */}
            <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-sky-600/10 via-indigo-600/10 to-purple-600/10 rounded-full blur-[120px] z-0 animate-pulse"></div>

            <div className="relative w-full h-full">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
