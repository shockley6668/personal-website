import React, { useContext } from 'react';
import { AWARDS_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Awards: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="awards" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Honors & Awards' : '荣誉奖项'}
      </h2>

      {AWARDS_DATA.map((award) => (
        <div key={award.id} className="award-entry">
          <span>{getText(award.name, language)}</span>
        </div>
      ))}
    </section>
  );
};

export default Awards;
