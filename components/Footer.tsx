
import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { SOCIAL_LINKS_DATA, FOOTER_STRINGS, getText } from '../constants';
import type { SocialLink } from '../types';

const Footer: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 md:py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-5 md:space-x-6 mb-6">
          {SOCIAL_LINKS_DATA.map((link: SocialLink) => (
            <a
              key={link.name}
              href={link.url}
              target={link.name === 'Email' || link.name === 'Phone' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              aria-label={getText(link.label, language)}
              className="hover:text-sky-400 transition-colors duration-300 text-xl md:text-2xl"
              title={getText(link.label, language)}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} {getText(FOOTER_STRINGS.copyrightName, language)}. {getText(FOOTER_STRINGS.rights, language)}.
        </p>
        <p className="text-xs mt-2">
          {getText(FOOTER_STRINGS.builtWith, language)} <i className="fab fa-react text-sky-400"></i> React &amp; <span className="font-semibold text-teal-400">Tailwind CSS</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
