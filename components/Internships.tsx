
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { INTERNSHIPS_DATA, getText } from '../constants';
import type { InternshipEntry } from '../types';
import ClickRippleEffect from './effects/ClickRippleEffect';
// HoverSectionWrapper import removed

const InternshipCard: React.FC<{ entry: InternshipEntry, index: number }> = ({ entry, index }) => {
  const { language } = useContext(LanguageContext);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: index * 0.1 } }
  };

  const rippleColor = "rgba(0, 120, 255, 0.08)";
  const rippleDuration = 0.7;

  return (
    <ClickRippleEffect rippleColor={rippleColor} duration={rippleDuration}>
      <motion.div
        className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100"
        variants={cardVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
          <div className="flex-grow min-w-0">
            <h3 className="text-xl md:text-2xl font-bold text-sky-800 leading-tight">{getText(entry.role, language)}</h3>
            <div className="flex flex-wrap items-center gap-x-2 mt-1">
              <p className="text-base font-medium text-slate-700">
                {getText(entry.company, language)}
              </p>
              {entry.department && (
                <span className="text-sm text-slate-400 font-normal">
                  / {getText(entry.department, language)}
                </span>
              )}
            </div>
          </div>
          <div className="bg-sky-50 px-3 py-1 rounded-full text-xs font-bold text-sky-600 whitespace-nowrap">
            <i className="far fa-calendar-alt mr-1.5 opacity-70"></i>{getText(entry.period, language)}
          </div>
        </div>
        <div className="pt-3 border-t border-slate-50">
          <h4 className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center gap-2">
            <i className="fas fa-tasks text-[10px]"></i>
            {getText({ zh: '项目详情与职责', en: 'Responsibilities & Projects' }, language)}
          </h4>
          <ul className="text-sm text-slate-600 space-y-2.5">
            {entry.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <i className="fas fa-arrow-right text-sky-300 text-[10px] mt-1.5 flex-shrink-0"></i>
                <span className="leading-relaxed">{getText(resp, language)}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </ClickRippleEffect>
  );
};

const Internships: React.FC = () => {
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
    <section id="internships" className="py-16 md:py-24 bg-white"> {/* Removed rounded-lg if not intrinsic */}
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText({ zh: '实习经历', en: 'Internships' }, language)}</span>
        </motion.h2>
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {INTERNSHIPS_DATA.map((entry, index) => (
            <InternshipCard key={entry.id} entry={entry} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Internships;
