import React, { useContext } from 'react';
import { RESEARCH_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Research: React.FC = () => {
  const { language } = useContext(LanguageContext);

  if (RESEARCH_DATA.length === 0) return null;

  return (
    <section id="research" className="w-full relative z-20 py-32 bg-apple-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-24 md:text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-4">
            {language === 'en' ? 'Publications' : '学术研究'}
          </h2>
          <div className="w-16 h-1 bg-apple-blue md:mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col gap-8">
          {RESEARCH_DATA.map((research) => (
            <div key={research.id} className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="text-apple-blue font-bold tracking-widest uppercase text-sm mb-2 md:mb-0">
                  {getText(research.period, language)}
                </div>
                <div className="text-white font-medium bg-white/10 px-4 py-1 rounded-full text-sm">
                  {getText(research.role, language)}
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                {getText(research.title, language)}
              </h3>
              
              <p className="text-apple-gray-light text-lg mb-8 leading-relaxed">
                {getText(research.description, language)}
              </p>

              {research.publication && (
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-6">
                  <i className="fas fa-book-open text-apple-gray"></i>
                  {research.publication.url ? (
                    <a href={research.publication.url} target="_blank" rel="noreferrer" className="text-apple-blue hover:text-white transition-colors underline underline-offset-4">
                      {getText(research.publication.text, language)}
                    </a>
                  ) : (
                    <span className="text-apple-gray-light">{getText(research.publication.text, language)}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
