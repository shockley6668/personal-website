
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
              {/* Badge 1: Experience - Top Left */}
              <motion.div
                className="absolute top-[5%] left-[2%] md:top-[12%] md:left-[5%] z-20 bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-2 md:gap-3 pointer-events-auto scale-75 md:scale-100 origin-top-left"
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

              {/* Badge 2: Tech Stack Icon (Python) - Bottom Right */}
              <motion.div
                className="absolute bottom-[2%] right-[2%] md:bottom-[10%] md:right-[5%] z-20 bg-white rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg border border-slate-100 pointer-events-auto scale-75 md:scale-100 origin-bottom-right"
                custom={1}
                variants={floatingBadgeVariants}
                animate="animate"
              >
                <i className="fab fa-python text-3xl md:text-5xl text-yellow-500"></i>
              </motion.div>

              {/* Badge 3: ROS2 - Middle Right Far */}
              <motion.div
                className="absolute top-[50%] right-[0%] md:right-[2%] z-20 bg-slate-900 text-white px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 pointer-events-auto scale-75 md:scale-100 origin-right"
                custom={2}
                variants={floatingBadgeVariants}
                animate="animate"
              >
                <i className="fas fa-robot text-sky-400 text-base md:text-xl"></i>
                <span className="font-bold text-xs md:text-base">ROS 2</span>
              </motion.div>

              {/* Badge 4: Github - Top Right */}
              <motion.div
                className="absolute top-[5%] right-[2%] md:top-[12%] md:right-[5%] z-20 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg pointer-events-auto scale-75 md:scale-100 origin-top-right"
                custom={1.5}
                variants={floatingBadgeVariants}
                animate="animate"
              >
                <i className="fab fa-github text-3xl md:text-5xl text-slate-800"></i>
              </motion.div>

              {/* Badge 5: C++ - Bottom Left */}
              <motion.div
                className="absolute bottom-[5%] left-[2%] md:bottom-[15%] md:left-[5%] z-10 bg-[#00599C] p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg border border-blue-400 pointer-events-auto scale-75 md:scale-100 origin-bottom-left"
                custom={2.5}
                variants={floatingBadgeVariants}
                animate="animate"
              >
                <span className="font-bold text-white text-base md:text-xl">C++</span>
              </motion.div>

              {/* Badge 6: Linux - Middle Left Far */}
              <motion.div
                className="absolute top-[40%] left-[0%] md:left-[2%] z-10 bg-slate-800 p-2 md:p-3 rounded-full shadow-lg border border-slate-600 pointer-events-auto scale-75 md:scale-100 origin-left"
                custom={3}
                variants={floatingBadgeVariants}
                animate="animate"
              >
                <i className="fab fa-linux text-2xl md:text-4xl text-white"></i>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
