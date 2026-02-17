
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

          {/* LEFT COLUMN: Text Content */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left pt-10 md:pt-0"
            variants={heroContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-sky-400 mb-2 tracking-wide uppercase"
              variants={fadeInUp}
            >
              {getText({ zh: '你好，我是', en: "Hi I'm" }, language)}
            </motion.h2>

            <motion.h1
              id="hero-title"
              className="text-5xl xs:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none"
              variants={fadeInUp}
            >
              <span className="relative inline-block">
                <span className="relative z-10">{getText(PROFILE_DATA.name, language)}</span>
                <span className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 md:h-6 bg-sky-600/50 -skew-x-12 -z-0 transform rotate-[-1deg]"></span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-slate-300 font-medium mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed"
              variants={fadeInUp}
            >
              {getText(PROFILE_DATA.title, language)}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-5"
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

          {/* RIGHT COLUMN: Image & Graphics */}
          <motion.div
            className="w-full md:w-1/2 relative flex justify-center items-center mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background Blob/Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] xs:w-[320px] xs:h-[320px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 rounded-[3rem] md:rounded-[4rem] rotate-[-6deg] opacity-80 blur-0 shadow-2xl z-0 animate-blob"></div>

            {/* Cutout Image with Bottom Fade Mask & Rim Light Effect */}
            <div className="relative z-10 w-auto translate-x-20 md:translate-x-32">
              <img
                src="./hero-cutout.png"
                alt={getText(PROFILE_DATA.name, language)}
                className="w-auto h-[320px] xs:h-[380px] md:h-[650px] object-cover drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:drop-shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:scale-[1.02] transition-all duration-500"
                style={{
                  filter: 'drop-shadow(0 0 2px rgba(14,165,233,0.5)) drop-shadow(0 0 10px rgba(14,165,233,0.3)) contrast(1.1) brightness(1.05)',
                  WebkitFilter: 'drop-shadow(0 0 2px rgba(14,165,233,0.5)) drop-shadow(0 0 10px rgba(14,165,233,0.3)) contrast(1.1) brightness(1.05)'
                }}
              />
              {/* Gradient Mask to hide bottom cut line */}
              <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none"></div>
            </div>

            {/* Floating Badges - Optimized for Mobile */}
            {/* Badge 1: Experience */}
            <motion.div
              className="absolute bottom-4 -left-2 md:bottom-20 md:-left-10 z-20 bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-2 md:gap-3 max-w-[140px] md:max-w-xs scale-90 md:scale-100 origin-bottom-left"
              custom={0}
              variants={floatingBadgeVariants}
              animate="animate"
            >
              <div className="bg-sky-100 text-sky-600 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-2xl">
                <i className="fas fa-code"></i>
              </div>
              <div className="text-left">
                <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{getText({ zh: '经验', en: 'Experience' }, language)}</p>
                <p className="text-slate-800 font-black text-xs md:text-lg whitespace-nowrap">
                  {getText({ zh: '嵌入式 & AI', en: 'Embedded & AI' }, language)}
                </p>
              </div>
            </motion.div>

            {/* Badge 2: Tech Stack Icon (Python) */}
            <motion.div
              className="absolute top-8 right-2 md:top-20 md:right-0 z-20 bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg border border-slate-100 scale-90 md:scale-100"
              custom={1}
              variants={floatingBadgeVariants}
              animate="animate"
            >
              <i className="fab fa-python text-3xl md:text-5xl text-yellow-500"></i>
            </motion.div>

            {/* Badge 3: ROS2 */}
            <motion.div
              className="absolute top-1/2 -right-2 md:-right-12 z-20 bg-slate-900 text-white px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 scale-90 md:scale-100 origin-right"
              custom={2}
              variants={floatingBadgeVariants}
              animate="animate"
            >
              <i className="fas fa-robot text-sky-400 text-base md:text-xl"></i>
              <span className="font-bold text-xs md:text-base">ROS 2</span>
            </motion.div>

            {/* Badge 4: Github */}
            <motion.div
              className="absolute bottom-16 right-0 md:bottom-32 md:right-10 z-0 md:z-20 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg scale-90 md:scale-100"
              custom={1.5}
              variants={floatingBadgeVariants}
              animate="animate"
            >
              <i className="fab fa-github text-3xl md:text-5xl text-slate-800"></i>
            </motion.div>

            {/* Badge 5: C++ (New) */}
            <motion.div
              className="absolute top-20 left-0 md:top-32 md:-left-4 z-10 bg-[#00599C] p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg border border-blue-400 scale-90 md:scale-100"
              custom={2.5}
              variants={floatingBadgeVariants}
              animate="animate"
            >
              <span className="font-bold text-white text-base md:text-xl">C++</span>
            </motion.div>

            {/* Badge 6: Linux (New) */}
            <motion.div
              className="absolute bottom-28 -right-2 md:bottom-48 md:-right-8 z-10 bg-slate-800 p-2 md:p-3 rounded-full shadow-lg border border-slate-600 scale-90 md:scale-100"
              custom={3}
              variants={floatingBadgeVariants}
              animate="animate"
            >
              <i className="fab fa-linux text-2xl md:text-4xl text-white"></i>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
