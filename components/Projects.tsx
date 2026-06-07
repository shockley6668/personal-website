import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';
import { Project } from '../types';

// ─── Coverflow Carousel ──────────────────────────────────────────────────────
const CoverflowCarousel: React.FC<{ project: Project; language: string }> = ({ project, language }) => {
  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.imageUrl];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setInterval(advance, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance, images.length]);

  // Card layout constants
  const CARD_W = 680;
  const CARD_H = 480;
  const SIDE_SCALE = 0.75;
  const SIDE_OFFSET = 420; // px shift for adjacent cards
  const SIDE_ROT = 45;     // deg rotateY for side cards
  const FAR_SCALE = 0.5;
  const FAR_OFFSET = 640;
  const FAR_ROT = 60;

  function getStyle(idx: number) {
    const diff = idx - active;
    const n = images.length;
    // Wrap diff for circular effect
    let d = ((diff + n) % n);
    if (d > n / 2) d -= n;

    if (d === 0) {
      return {
        transform: `translateX(-50%) translateZ(0px) rotateY(0deg) scale(1)`,
        opacity: 1,
        zIndex: 10,
        filter: 'brightness(1)',
        transition: 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
      };
    }
    const sign = d > 0 ? 1 : -1;
    const abs = Math.abs(d);
    if (abs === 1) {
      return {
        transform: `translateX(calc(-50% + ${sign * SIDE_OFFSET}px)) translateZ(-120px) rotateY(${-sign * SIDE_ROT}deg) scale(${SIDE_SCALE})`,
        opacity: 0.7,
        zIndex: 5,
        filter: 'brightness(0.55)',
        transition: 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
      };
    }
    if (abs === 2) {
      return {
        transform: `translateX(calc(-50% + ${sign * FAR_OFFSET}px)) translateZ(-220px) rotateY(${-sign * FAR_ROT}deg) scale(${FAR_SCALE})`,
        opacity: 0.35,
        zIndex: 1,
        filter: 'brightness(0.35)',
        transition: 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
      };
    }
    return { display: 'none' };
  }

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div
        className="coverflow-stage relative w-full overflow-hidden"
        style={{ height: `${CARD_H + 60}px` }}
      >
        {images.map((imgSrc, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              cursor: 'pointer',
              ...getStyle(i),
            }}
          >
            <img
              src={imgSrc}
              alt={`${getText(project.title, language)} ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: '14px',
                background: '#111',
                display: 'block',
                boxShadow: i === active
                  ? '0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)'
                  : '0 10px 40px rgba(0,0,0,0.6)',
              }}
              draggable={false}
            />
          </div>
        ))}

        {/* Left / Right click areas */}
        <button
          onClick={() => setActive((active - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 flex items-center justify-center text-white transition-all z-20"
          style={{ opacity: images.length > 1 ? 1 : 0 }}
        >
          <i className="fas fa-chevron-left text-sm"></i>
        </button>
        <button
          onClick={() => setActive((active + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 flex items-center justify-center text-white transition-all z-20"
          style={{ opacity: images.length > 1 ? 1 : 0 }}
        >
          <i className="fas fa-chevron-right text-sm"></i>
        </button>
      </div>

      {/* ── Reflection ── */}
      <div
        className="coverflow-stage relative w-full pointer-events-none"
        style={{ height: '0px', marginTop: '2px' }}
        aria-hidden
      >
        {images.map((imgSrc, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              ...getStyle(i),
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%)',
            }}
          >
            <img
              src={imgSrc}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: '14px',
                background: '#111',
                transform: 'scaleY(-1)',
                display: 'block',
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ── Dots ── */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === active ? '22px' : '7px',
                height: '7px',
                background: i === active ? '#2997ff' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      )}

      {/* Pause state hint */}
      {images.length > 1 && (
        <p className="mt-3 text-[11px] text-[#444] tracking-widest uppercase">
          {paused ? '· paused ·' : '· auto ·'}
        </p>
      )}
    </div>
  );
};


// ─── Main Projects Section ────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.projects-title', start: 'top 85%' }
        }
      );

      document.querySelectorAll('.project-info-panel').forEach((panel) => {
        gsap.fromTo(panel.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: { trigger: panel, start: 'top 90%', toggleActions: 'play none none reverse' }
          }
        );
      });

      document.querySelectorAll('.project-carousel-wrap').forEach((wrap) => {
        gsap.fromTo(wrap,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.55,
            scrollTrigger: { trigger: wrap, start: 'top 75%', toggleActions: 'play none none reverse' }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="projects" ref={containerRef} className="w-full relative z-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <h2 className="projects-title text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-4">
          {language === 'en' ? 'Selected Works' : '精选项目'}
        </h2>
        <div className="w-16 h-1 bg-apple-blue rounded-full"></div>
      </div>

      <div className="flex flex-col">
        {PROJECTS_DATA.map((project, projectIndex) => (
          <div
            key={project.id}
            className={`w-full border-t border-white/10 ${projectIndex === PROJECTS_DATA.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex flex-col lg:flex-row">

              {/* ─── Left: Sticky Info ─── */}
              <div className="lg:w-[42%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 md:px-12 py-16 lg:py-0">
                <div className="project-info-panel flex flex-col">
                  <div className="text-apple-blue font-bold tracking-widest text-xs mb-3 uppercase">
                    {String(projectIndex + 1).padStart(2, '0')} — {getText(project.period, language)}
                  </div>
                  <h3 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                    {getText(project.title, language)}
                  </h3>
                  <p className="text-[#86868b] text-base md:text-lg leading-relaxed mb-8">
                    {getText(project.description, language)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full border border-white/15 bg-white/5 text-[#d2d2d7]">
                        {getText(tag, language)}
                      </span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white hover:text-black border border-white/20 px-6 py-3 rounded-full w-max transition-all duration-300 font-medium text-sm"
                    >
                      {language === 'en' ? 'View Project' : '查看项目'}
                      <i className="fas fa-arrow-right text-xs"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* ─── Right: Coverflow Carousel ─── */}
              <div className="lg:w-[58%] lg:border-l border-white/10 py-16 px-4 md:px-6 flex flex-col justify-center">
                <div className="project-carousel-wrap">
                  <CoverflowCarousel project={project} language={language} />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="h-24" />
    </section>
  );
};

export default Projects;
