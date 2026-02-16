
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
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        variants={cardVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
          <div className="mb-2 sm:mb-0 flex-grow min-w-0">
            <h3 className="text-xl font-semibold text-sky-700">{getText(entry.role, language)}</h3>
            <p className="text-md text-slate-600 break-all indent-0">
              {getText(entry.company, language)}
              {entry.department && <span className="text-sm text-slate-500"> - {getText(entry.department, language)}</span>}
            </p>
          </div>
          <span className="text-sm text-slate-500 whitespace-nowrap sm:ml-4 sm:mt-0.5">{getText(entry.period, language)}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-1">{getText({ zh: '主要职责:', en: 'Responsibilities:' }, language)}</h4>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
            {entry.responsibilities.map((resp, idx) => (
              <li key={idx}>{getText(resp, language)}</li>
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
