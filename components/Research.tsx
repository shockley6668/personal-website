import React, { useContext } from 'react';
import { RESEARCH_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Research: React.FC = () => {
  const { language } = useContext(LanguageContext);

  if (RESEARCH_DATA.length === 0) return null;

  return (
    <section id="research" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Publications' : '学术成果'}
      </h2>

      {RESEARCH_DATA.map((pub) => (
        <div key={pub.id} className="pub-entry">
          <div className="pub-title">{getText(pub.title, language)}</div>
          <div className="pub-meta">
            {getText(pub.role, language)} · {getText(pub.period, language)}
          </div>
          {pub.description && (
            <div className="pub-venue">{getText(pub.description, language)}</div>
          )}
          {pub.publication && (
            pub.publication.url ? (
              <a
                href={pub.publication.url}
                target="_blank"
                rel="noreferrer"
                className="pub-link"
              >
                {getText(pub.publication.text, language)}
              </a>
            ) : (
              <span className="pub-venue">{getText(pub.publication.text, language)}</span>
            )
          )}
        </div>
      ))}
    </section>
  );
};

export default Research;
