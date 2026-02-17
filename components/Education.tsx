
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { EDUCATION_DATA, getText } from '../constants';
import type { EducationEntry } from '../types';
import ClickRippleEffect from './effects/ClickRippleEffect';
// HoverSectionWrapper import removed

const EducationCard: React.FC<{ entry: EducationEntry, index: number }> = ({ entry, index }) => {
  const { language } = useContext(LanguageContext);

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const rippleColor = "rgba(0, 120, 255, 0.08)";
  const rippleDuration = 0.7;

  return (
    <ClickRippleEffect rippleColor={rippleColor} duration={rippleDuration}>
      <motion.div
        className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-100"
        variants={cardVariants}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* Logo */}
          {entry.logoUrl && (
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={entry.logoUrl}
                alt={getText(entry.institution, language)}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          {/* Content */}
          <div className="flex-grow min-w-0 text-center sm:text-left w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-1">
              <div className="w-full">
                <h3 className="text-xl md:text-2xl font-bold text-sky-800 leading-tight">{getText(entry.institution, language)}</h3>
                <p className="text-base font-semibold text-sky-600 mt-0.5">{getText(entry.degree, language)} <span className="hidden sm:inline">|</span> <span className="sm:hidden"><br /></span> {getText(entry.major, language)}</p>
              </div>
              <div className="bg-sky-50 px-3 py-1 rounded-full text-xs font-bold text-sky-600 whitespace-nowrap mt-2 sm:mt-0">
                <i className="far fa-calendar-alt mr-1.5 opacity-70"></i>{getText(entry.period, language)}
              </div>
            </div>
            {entry.gpa && (
              <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-md text-xs font-medium text-slate-600 mb-3">
                <i className="fas fa-chart-line text-sky-400"></i>
                {getText(entry.gpa, language)}
              </div>
            )}
            {entry.details && entry.details.length > 0 && (
              <div className="mt-2 mb-4">
                <ul className="text-sm text-slate-600 space-y-1.5 list-none">
                  {entry.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <i className="fas fa-check-circle text-sky-400 text-[10px] mt-1 flex-shrink-0"></i>
                      <span className="leading-relaxed">{getText(detail, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {entry.courses && entry.courses.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-50">
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3 flex items-center justify-center sm:justify-start gap-2">
                  <i className="fas fa-graduation-cap"></i>
                  {getText({ zh: '核心课程', en: 'Core Courses' }, language)}
                </h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {entry.courses.map((course, idx) => (
                    <span key={idx} className="bg-slate-100/80 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-200/50">
                      {getText(course, language)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </ClickRippleEffect>
  );
};

const Education: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="education" className="py-16 md:py-24 bg-slate-100"> {/* Removed rounded-lg if not intrinsic */}
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText({ zh: '教育背景', en: 'Education' }, language)}</span>
        </motion.h2>
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {EDUCATION_DATA.map((entry, index) => (
            <EducationCard key={entry.id} entry={entry} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
