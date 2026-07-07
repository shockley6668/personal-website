import React, { useContext } from 'react';
import { FOOTER_STRINGS, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      paddingTop: '24px',
      marginTop: '16px',
      fontSize: '13px',
      color: 'var(--text-muted)',
    }}>
      © {currentYear} {getText(FOOTER_STRINGS.copyrightName, language)}.{' '}
      {getText(FOOTER_STRINGS.rights, language)}.
    </footer>
  );
};

export default Footer;
