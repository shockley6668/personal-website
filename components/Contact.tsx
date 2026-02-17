
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { SOCIAL_LINKS_DATA, CONTACT_STRINGS, getText } from '../constants';
import type { SocialLink } from '../types';
// HoverSectionWrapper import removed

const Contact: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const sectionContentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.7, ease: "easeIn" } }
  };

  const contentContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };


  return (
    <motion.section
      id="contact"
      className="py-16 md:py-24 bg-slate-800 text-slate-100" // Removed rounded-lg if not intrinsic
      variants={sectionContentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="container mx-auto px-4 sm:px-6 text-center"
        variants={contentContainerVariants}
      >
        <motion.h2 className="text-3xl md:text-5xl font-extrabold mb-8 md:mb-12 tracking-tight" variants={itemVariants}>
          <span className="border-b-4 border-sky-500 pb-2">{getText(CONTACT_STRINGS.title, language)}</span>
        </motion.h2>
        <motion.p className="text-base sm:text-lg md:text-xl mb-12 text-slate-300 max-w-2xl mx-auto leading-relaxed px-2" variants={itemVariants}>
          {getText(CONTACT_STRINGS.intro, language)}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 px-4"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {SOCIAL_LINKS_DATA.map((link: SocialLink) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.name === 'Email' || link.name === 'Phone' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={getText(link.label, language)}
              className="text-slate-300 hover:text-white transition-all duration-300 text-2xl sm:text-4xl p-4 sm:p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-sky-500 rounded-2xl shadow-xl transform hover:scale-110 active:scale-95 group"
              variants={iconVariants}
              title={getText(link.label, language)}
            >
              <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">{link.icon}</span>
            </motion.a>
          ))}
        </motion.div>
        <motion.p className="text-slate-500 text-sm font-medium tracking-wide uppercase italic" variants={itemVariants}>
          {getText(CONTACT_STRINGS.cta, language)}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
