import React, { useContext } from 'react';
import { PROJECTS_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <section id="projects" className="academic-section">
      <h2 className="section-title">
        {language === 'en' ? 'Projects' : '项目经验'}
      </h2>

      <div className="proj-cards">
        {PROJECTS_DATA.map((proj) => {
          const images = proj.galleryImages && proj.galleryImages.length > 0
            ? proj.galleryImages
            : proj.imageUrl
              ? [proj.imageUrl]
              : [];

          return (
            <div key={proj.id} className="proj-card">

              {/* Title */}
              <h3 className="proj-card-title">{getText(proj.title, language)}</h3>

              {/* Meta: period */}
              <div className="proj-card-meta">{getText(proj.period, language)}</div>

              {/* Responsibilities */}
              {proj.responsibilities && proj.responsibilities.length > 0 && (
                <ul className="proj-card-bullets">
                  {proj.responsibilities.map((resp, i) => (
                    <li key={i}>{getText(resp, language)}</li>
                  ))}
                </ul>
              )}

              {/* Achievements */}
              {proj.achievements && proj.achievements.length > 0 && (
                <ul className="proj-card-bullets">
                  {proj.achievements.map((ach, i) => (
                    <li key={i} className="proj-card-achievement">
                      {getText(ach, language)}
                    </li>
                  ))}
                </ul>
              )}

              {/* Key Technologies */}
              {proj.tags && proj.tags.length > 0 && (
                <div className="proj-card-tech">
                  <span className="proj-card-tech-label">
                    {language === 'en' ? 'Key Technologies:' : '核心技术：'}
                  </span>{' '}
                  {proj.tags.map((tag, i) => (
                    <React.Fragment key={i}>
                      <span className="proj-card-tech-tag">{getText(tag, language)}</span>
                      {i < proj.tags.length - 1 && (
                        <span className="proj-card-tech-sep">, </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Media strip */}
              {images.length > 0 && (
                <div className="proj-media">
                  <div className="proj-media-header">
                    <span className="proj-media-label">MEDIA</span>
                    {images.length > 1 && (
                      <span className="proj-media-scroll-hint">scroll →</span>
                    )}
                  </div>
                  <div className="proj-media-scroll-wrap">
                    <div className="proj-media-track">
                      {images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${getText(proj.title, language)} ${i + 1}`}
                          className="proj-media-img"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Link */}
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-card-link"
                >
                  {language === 'en' ? '→ View Project' : '→ 查看项目'}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
