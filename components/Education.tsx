import React, { useContext } from 'react';
import { EDUCATION_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Education: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="education" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Education' : '教育背景'}
      </h2>

      {EDUCATION_DATA.map((edu) => (
        <div key={edu.id} className="edu-entry">
          {edu.logoUrl && (
            <img
              src={edu.logoUrl}
              alt={getText(edu.institution, language)}
              className="edu-logo"
            />
          )}
          <div className="edu-content">
            <div className="edu-institution">{getText(edu.institution, language)}</div>
            <div className="edu-degree">
              {getText(edu.degree, language)} · {getText(edu.major, language)}
            </div>
            <div className="edu-period">{getText(edu.period, language)}</div>
            {edu.gpa && (
              <div className="edu-gpa">{getText(edu.gpa, language)}</div>
            )}
            {edu.details && edu.details.map((d, i) => (
              <div key={i} className="edu-gpa" style={{ color: '#888', fontStyle: 'italic' }}>
                {getText(d, language)}
              </div>
            ))}
            {edu.courses && edu.courses.length > 0 && (
              <div className="course-tags">
                {edu.courses.map((c, i) => (
                  <span key={i} className="course-tag">{getText(c, language)}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Education;
