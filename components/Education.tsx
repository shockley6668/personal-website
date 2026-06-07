import React, { useContext } from 'react';
import { EDUCATION_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Education: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="education" className="w-full relative z-20 py-32 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-24 md:text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-4">
            {language === 'en' ? 'Education' : '教育背景'}
          </h2>
          <div className="w-16 h-1 bg-apple-blue md:mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col gap-12">
          {EDUCATION_DATA.map((edu, i) => (
            <div key={edu.id} className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-24 h-24 rounded-2xl bg-white/10 overflow-hidden flex-shrink-0 p-2">
                {edu.logoUrl && (
                  <img src={edu.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{getText(edu.institution, language)}</h3>
                    <p className="text-apple-blue font-medium">{getText(edu.degree, language)} - {getText(edu.major, language)}</p>
                  </div>
                  <div className="text-apple-gray font-bold mt-2 md:mt-0 tracking-widest uppercase text-sm">
                    {getText(edu.period, language)}
                  </div>
                </div>

                {edu.gpa && <p className="text-white font-medium mb-4">{getText(edu.gpa, language)}</p>}
                
                {edu.courses && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.courses.map((course, j) => (
                      <span key={j} className="text-sm px-3 py-1 rounded-full bg-black/50 text-apple-gray-light border border-white/10">
                        {getText(course, language)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
