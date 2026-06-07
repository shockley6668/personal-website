import React, { useContext } from 'react';
import { SKILL_CATEGORIES_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Skills: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="skills" className="w-full relative z-20 py-32 bg-apple-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-24 md:text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-4">
            {language === 'en' ? 'Core Capabilities' : '核心技能'}
          </h2>
          <div className="w-16 h-1 bg-apple-blue md:mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {SKILL_CATEGORIES_DATA.map((category, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10">
                {getText(category.name, language)}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, j) => (
                  <div 
                    key={j} 
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
                  >
                    <span className="text-xl text-apple-gray-light">{skill.icon}</span>
                    <span className="font-medium text-white">{getText(skill.name, language)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
