import React, { useContext } from 'react';
import { ABOUT_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="about" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'About Me' : '关于我'}
      </h2>
      <div className="about-text">
        {ABOUT_DATA.paragraphs.map((para, i) => (
          <p key={i}>{getText(para, language)}</p>
        ))}
      </div>
    </section>
  );
};

export default About;