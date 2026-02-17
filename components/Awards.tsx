
import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { AWARDS_DATA, getText } from '../constants';
import type { AwardEntry, Language } from '../types';
import ClickRippleEffect from './effects/ClickRippleEffect';
// HoverSectionWrapper import removed

interface AwardItemProps {
  award: AwardEntry;
  isSelected: boolean;
  onHover: () => void;
  language: Language;
}

const AwardItem: React.FC<AwardItemProps> = ({ award, isSelected, onHover, language }) => {
  const rippleColor = "rgba(0, 120, 255, 0.08)";
  const rippleDuration = 0.7;

  return (
    <ClickRippleEffect rippleColor={rippleColor} duration={rippleDuration}>
      <motion.li
        className={`flex items-center space-x-3 p-3 sm:p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 ease-in-out border
                    ${isSelected
            ? 'bg-sky-100 border-sky-400 ring-1 ring-sky-300 scale-[1.02] shadow-lg'
            : 'bg-white border-slate-100 hover:shadow-lg hover:bg-slate-50'
          }`}
        onMouseEnter={() => window.innerWidth > 768 && onHover()}
        onClick={() => window.innerWidth <= 768 && onHover()}
        onFocus={onHover}
        tabIndex={0}
        role="button"
        aria-pressed={isSelected}
        aria-label={getText(award.name, language)}
        layout
      >
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-sky-500' : 'bg-slate-100'}`}>
          <i className={`fas fa-award text-lg ${isSelected ? 'text-white' : 'text-yellow-500'}`}></i>
        </div>
        <span className={`font-bold text-sm sm:text-base flex-grow ${isSelected ? 'text-sky-800' : 'text-slate-700'}`}>
          {getText(award.name, language)}
        </span>
        {isSelected && <i className="fas fa-chevron-right text-sky-400 sm:hidden"></i>}
      </motion.li>
    </ClickRippleEffect>
  );
};

const Awards: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const [selectedAwardId, setSelectedAwardId] = useState<string | null>(null);

  useEffect(() => {
    const initialAward = AWARDS_DATA.find(a => a.id === 'award5' && a.certificateImageUrl);
    if (initialAward) {
      setSelectedAwardId(initialAward.id);
    } else {
      const firstAwardWithCert = AWARDS_DATA.find(a => a.certificateImageUrl);
      if (firstAwardWithCert) {
        setSelectedAwardId(firstAwardWithCert.id);
      }
    }
  }, []);

  const currentAward = AWARDS_DATA.find(award => award.id === selectedAwardId);
  const certificateUrl = currentAward?.certificateImageUrl;
  const certificateAltText = currentAward
    ? getText(currentAward.certificateDescription || currentAward.name, language)
    : getText({ zh: "获奖证书", en: "Award Certificate" }, language);

  const sectionContentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="awards" className="py-16 md:py-24 bg-slate-100 overflow-hidden"> {/* Removed rounded-lg if not intrinsic */}
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText({ zh: '荣誉奖项', en: 'Awards & Honors' }, language)}</span>
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row gap-8 lg:gap-12"
          variants={sectionContentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="md:w-1/2 lg:w-5/12">
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
            >
              {AWARDS_DATA.map((award) => (
                <AwardItem
                  key={award.id}
                  award={award}
                  isSelected={award.id === selectedAwardId}
                  onHover={() => setSelectedAwardId(award.id)}
                  language={language}
                />
              ))}
            </motion.ul>
          </div>

          <div className="md:w-1/2 lg:w-7/12 mt-8 md:mt-0 md:sticky md:top-28 self-start">
            <AnimatePresence mode="wait">
              {certificateUrl ? (
                <motion.div
                  key={certificateUrl}
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <img
                    src={certificateUrl}
                    alt={certificateAltText}
                    className="w-full max-h-[400px] lg:max-h-[500px] object-contain rounded-lg mx-auto"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="w-full h-[300px] md:h-[400px] flex flex-col items-center justify-center bg-slate-200/70 rounded-xl shadow-lg p-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <i className="fas fa-certificate text-5xl text-slate-400 mb-4"></i>
                  <p className="text-slate-600 font-medium">
                    {currentAward
                      ? getText({ zh: "此奖项暂无证书预览", en: "No certificate preview for this award" }, language)
                      : getText({ zh: "请选择一个奖项查看证书", en: "Select an award to view its certificate" }, language)
                    }
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {getText({ zh: "将鼠标悬停或点击左侧奖项列表", en: "Hover or click an item in the list on the left" }, language)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;
