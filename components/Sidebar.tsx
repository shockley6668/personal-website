import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { PROFILE_DATA, SOCIAL_LINKS_DATA, NAV_LINKS_DATA, getText } from '../constants';

const Sidebar: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const { isDark, toggleTheme } = useTheme();

  const emailLink = SOCIAL_LINKS_DATA.find(l => l.name === 'Email');
  const githubLink = SOCIAL_LINKS_DATA.find(l => l.name === 'GitHub');
  const linkedinLink = SOCIAL_LINKS_DATA.find(l => l.name === 'LinkedIn');

  return (
    <aside className="academic-sidebar">
      {/* Avatar */}
      <img
        src={PROFILE_DATA.avatarUrl}
        alt={getText(PROFILE_DATA.name, language)}
        className="sidebar-avatar"
      />

      {/* Name */}
      <div className="sidebar-name">
        {language === 'en' ? 'Shukun Huang' : '黄树坤'}
      </div>

      {/* Title */}
      <div className="sidebar-title">{getText(PROFILE_DATA.title, language)}</div>

      {/* Affiliation */}
      <div className="sidebar-affiliation">
        {language === 'en' ? (
          <>
            D-Robotics · Robotics App Eng.<br />
            Incoming: U. Waterloo ECE (Sep 2026)<br />
            B.Eng. SZTU (Top 15%)
          </>
        ) : (
          <>
            地瓜机器人 · 机器人应用工程师<br />
            即将就读：滑铁卢大学 ECE 硕士<br />
            深圳技术大学 本科（前15%）
          </>
        )}
      </div>

      {/* Download CV */}
      <div className="sidebar-cv">
        <a href="./Shukun_Huang_CV_ZH.pdf" target="_blank" rel="noreferrer" className="cv-btn">
          <i className="fas fa-file-pdf" style={{ marginRight: '6px' }} />
          {language === 'en' ? 'Download CV' : '下载简历'}
        </a>
      </div>

      <hr className="sidebar-divider" />

      {/* Contact links */}
      <div className="sidebar-contacts">
        {emailLink && (
          <div className="sidebar-contact-item">
            <i className="fas fa-envelope" />
            <a href={emailLink.url}>{emailLink.url.replace('mailto:', '')}</a>
          </div>
        )}
        {githubLink && (
          <div className="sidebar-contact-item">
            <i className="fab fa-github" />
            <a href={githubLink.url} target="_blank" rel="noreferrer">shockley6668</a>
          </div>
        )}
        {linkedinLink && (
          <div className="sidebar-contact-item">
            <i className="fab fa-linkedin" />
            <a href={linkedinLink.url} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        )}
        <div className="sidebar-contact-item">
          <i className="fas fa-map-marker-alt" />
          <span>{language === 'en' ? 'Shenzhen, China' : '中国深圳'}</span>
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Section navigation */}
      <nav className="sidebar-nav">
        {NAV_LINKS_DATA.map((link) => (
          <a key={link.href} href={link.href}>
            {getText(link.name, language)}
          </a>
        ))}
        <a href="#highlights">
          {language === 'en' ? 'Highlights' : '精彩时刻'}
        </a>
      </nav>

      {/* Controls */}
      <div className="sidebar-controls">
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle dark mode" style={{ width: '100%' }}>
          {isDark ? '☀ Light' : '● Dark'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
