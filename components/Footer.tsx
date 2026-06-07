import React, { useContext } from 'react';
import { FOOTER_STRINGS, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative z-10 py-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-apple-gray text-sm font-medium">
          &copy; {currentYear} {getText(FOOTER_STRINGS.copyrightName, language)}. {getText(FOOTER_STRINGS.rights, language)}.
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-apple-gray">
          <a href="#" className="hover:text-white transition-colors">Back to Top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
