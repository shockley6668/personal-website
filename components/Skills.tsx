import React, { useContext } from 'react';
import { SKILL_CATEGORIES_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Skills: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="skills" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Skills' : '技能栈'}
      </h2>

      {SKILL_CATEGORIES_DATA.map((category, i) => (
        <div key={i} className="skills-category">
          <div className="skills-cat-name">{getText(category.name, language)}</div>
          <div className="skills-list">
            {category.skills.map((skill, j) => getText(skill.name, language)).join(' · ')}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
