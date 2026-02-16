
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
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        variants={cardVariants}
      >
        <div className="flex items-start gap-5">
          {/* Logo */}
          {entry.logoUrl && (
            <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shadow-sm">
              <img
                src={entry.logoUrl}
                alt={getText(entry.institution, language)}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          {/* Content */}
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="text-xl font-semibold text-sky-700">{getText(entry.institution, language)}</h3>
                <p className="text-md text-sky-600">{getText(entry.degree, language)} - {getText(entry.major, language)}</p>
              </div>
              <span className="text-sm text-slate-500 whitespace-nowrap ml-4">{getText(entry.period, language)}</span>
            </div>
            {entry.gpa && <p className="text-sm text-slate-600 mb-1">{getText(entry.gpa, language)}</p>}
            {entry.details && entry.details.length > 0 && (
              <div className="mt-1 mb-1">
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-0.5">
                  {entry.details.map((detail, idx) => (
                    <li key={idx}>{getText(detail, language)}</li>
                  ))}
                </ul>
              </div>
            )}
            {entry.courses && entry.courses.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-slate-700 mt-2 mb-1">{getText({ zh: '核心课程:', en: 'Core Courses:' }, language)}</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-0.5">
                  {entry.courses.map((course, idx) => (
                    <li key={idx}>{getText(course, language)}</li>
                  ))}
                </ul>
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
