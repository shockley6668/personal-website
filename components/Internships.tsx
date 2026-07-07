import React, { useContext } from 'react';
import { INTERNSHIPS_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Internships: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="internships" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Work Experience' : '工作经历'}
      </h2>

      {INTERNSHIPS_DATA.map((intern) => (
        <div key={intern.id} className="exp-entry">
          <div className="exp-header">
            <span className="exp-company">{getText(intern.company, language)}</span>
            <span className="exp-period">{getText(intern.period, language)}</span>
          </div>
          <div className="exp-role">{getText(intern.role, language)}</div>
          <ul className="exp-bullets">
            {intern.responsibilities.map((resp, i) => (
              <li key={i}>{getText(resp, language)}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Internships;
