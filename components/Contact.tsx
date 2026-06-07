import React, { useContext } from 'react';
import { SOCIAL_LINKS_DATA, CONTACT_STRINGS, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="contact" className="w-full relative z-20 py-32 bg-apple-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-8">
          {getText(CONTACT_STRINGS.title, language)}
        </h2>
        
        <p className="text-xl md:text-2xl text-apple-gray-light leading-relaxed mb-16 font-medium max-w-2xl mx-auto">
          {getText(CONTACT_STRINGS.intro, language)}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {SOCIAL_LINKS_DATA.map((link, i) => (
            <a 
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md font-bold text-lg text-white"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
