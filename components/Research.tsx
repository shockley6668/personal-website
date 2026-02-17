
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { RESEARCH_DATA, getText } from '../constants';
import type { ResearchEntry } from '../types';
import ClickRippleEffect from './effects/ClickRippleEffect';
// HoverSectionWrapper import removed

const ResearchCard: React.FC<{ entry: ResearchEntry, index: number }> = ({ entry, index }) => {
  const { language } = useContext(LanguageContext);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: index * 0.15 } }
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
          <h3 className="text-xl md:text-2xl font-bold text-sky-800 leading-tight flex-1">{getText(entry.title, language)}</h3>
          <div className="bg-sky-50 px-3 py-1 rounded-full text-xs font-bold text-sky-600 whitespace-nowrap">
            <i className="far fa-calendar-alt mr-1.5 opacity-70"></i>{getText(entry.period, language)}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded">
              {getText({ zh: "职责角色", en: "Role" }, language)}
            </span>
            <p className="text-sm font-semibold text-slate-700">
              {getText(entry.role, language)}
            </p>
          </div>

          {entry.description && (
            <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-4 py-1 italic">
              {getText(entry.description, language)}
            </p>
          )}

          {entry.publication && (
            <div className="pt-2">
              {entry.publication.url ? (
                <a
                  href={entry.publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-lg transition-colors group"
                  aria-label={`${getText(entry.publication.text, language)} (${getText({ zh: "打开新标签页", en: "opens in new tab" }, language)})`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-file-alt text-sky-400 group-hover:scale-110 transition-transform"></i>
                  {getText(entry.publication.text, language)}
                  <i className="fas fa-external-link-alt text-[10px] opacity-50"></i>
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                  <i className="fas fa-file-alt text-slate-300"></i>
                  {getText(entry.publication.text, language)}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </ClickRippleEffect>
  );
};

const Research: React.FC = () => {
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
    <section id="research" className="py-16 md:py-24 bg-white"> {/* Removed rounded-lg if not intrinsic */}
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText({ zh: '研究经历', en: 'Research Experience' }, language)}</span>
        </motion.h2>
        <motion.div
          className="space-y-8 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {RESEARCH_DATA.map((entry, index) => (
            <ResearchCard key={entry.id} entry={entry} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
