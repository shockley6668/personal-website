
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
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        variants={cardVariants}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-sky-700 flex-1 mr-4">{getText(entry.title, language)}</h3>
          <span className="text-sm text-slate-500 whitespace-nowrap">{getText(entry.period, language)}</span>
        </div>
        <p className="text-md text-slate-600 mb-1">
          <span className="font-medium">{getText({zh: "角色:", en:"Role:"}, language)}</span> {getText(entry.role, language)}
        </p>
        {entry.description && <p className="text-sm text-slate-500 mb-2">{getText(entry.description, language)}</p>}
        
        {entry.publication && (
          entry.publication.url ? (
            <a 
              href={entry.publication.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-sky-600 hover:text-sky-700 hover:underline inline-flex items-center"
              aria-label={`${getText(entry.publication.text, language)} (${getText({zh: "打开新标签页", en:"opens in new tab"}, language)})`}
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-book-open mr-2"></i>
              {getText(entry.publication.text, language)}
            </a>
          ) : (
            <p className="text-sm text-sky-600 inline-flex items-center">
              <i className="fas fa-book-open mr-2"></i>
              {getText(entry.publication.text, language)}
            </p>
          )
        )}
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
            <ResearchCard key={entry.id} entry={entry} index={index}/>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
