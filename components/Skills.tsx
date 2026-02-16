
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { SKILL_CATEGORIES_DATA, getText } from '../constants';
import type { Skill, SkillCategory } from '../types';
import ClickRippleEffect from './effects/ClickRippleEffect';
// HoverSectionWrapper import removed

const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { language } = useContext(LanguageContext);
  const rippleColor = "rgba(0, 120, 255, 0.08)";
  const rippleDuration = 0.7;

  return (
    <ClickRippleEffect rippleColor={rippleColor} duration={rippleDuration}>
      <div className="bg-white p-3.5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center space-x-3 hover:bg-sky-50 h-full">
        {skill.icon && <span className="text-xl md:text-2xl text-sky-500">{skill.icon}</span>}
        <span className="text-slate-700 font-medium text-sm md:text-base">{getText(skill.name, language)}</span>
        {skill.level && (
          <div className="ml-auto flex items-center">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas fa-star text-xs ${i < skill.level! ? 'text-yellow-400' : 'text-slate-300'}`}
              ></i>
            ))}
          </div>
        )}
      </div>
    </ClickRippleEffect>
  );
};

const SkillsCategoryCard: React.FC<{ category: SkillCategory, index: number }> = ({ category, index }) => {
  const { language } = useContext(LanguageContext);
  
  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div 
      className="bg-slate-50 p-6 rounded-xl shadow-lg"
      variants={cardVariants}
    >
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-sky-700 border-l-4 border-sky-500 pl-3">{getText(category.name, language)}</h3>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
      >
        {category.skills.map(skill => (
          <motion.div key={getText(skill.name, language)} variants={skillItemVariants}>
             <SkillItem skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};


const Skills: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, 
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-white"> {/* Removed rounded-lg if not intrinsic */}
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText({ zh: '技能栈', en: 'Skills' }, language)}</span>
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SKILL_CATEGORIES_DATA.map((category, index) => (
            <SkillsCategoryCard key={getText(category.name, language)} category={category} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
