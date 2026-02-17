
import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageContext } from '../contexts/LanguageContext';
import { PROJECTS_DATA, getText } from '../constants';
import type { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { language } = useContext(LanguageContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const galleryImages = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : project.imageUrl ? [project.imageUrl] : [];

  // Auto-cycle images when flipped
  useEffect(() => {
    if (isFlipped && galleryImages.length > 1) {
      setCurrentImgIdx(0);
      intervalRef.current = setInterval(() => {
        setCurrentImgIdx(prev => (prev + 1) % galleryImages.length);
      }, 2500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentImgIdx(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isFlipped, galleryImages.length]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="relative h-[650px] sm:h-[680px] z-10"
      variants={cardVariants}
      onMouseEnter={() => window.innerWidth > 768 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth > 768 && setIsFlipped(false)}
      onClick={() => window.innerWidth <= 768 && setIsFlipped(!isFlipped)}
      style={{ perspective: '2000px' }}
      whileHover={{
        scale: window.innerWidth > 768 ? 1.05 : 1,
        height: window.innerWidth > 768 ? 850 : 680,
        zIndex: 50,
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
        height: { duration: 0.4, ease: "easeOut" },
        zIndex: { duration: 0 }
      }}
    >
      <motion.div
        className="w-full h-full relative cursor-pointer md:cursor-default"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ===== FRONT SIDE ===== */}
        <div
          className="absolute inset-0 rounded-[2.5rem] shadow-2xl overflow-hidden bg-white flex flex-col border border-slate-100"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {galleryImages.length > 0 && (
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-50 flex-shrink-0">
              <img
                src={galleryImages[0]}
                alt={getText(project.title, language)}
                className="w-full h-full object-contain p-6"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>
          )}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-3xl font-black mb-3 text-sky-950 leading-tight tracking-tight">
              {getText(project.title, language)}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ring-1 ring-sky-100">
                <i className="far fa-calendar-alt mr-1.5 opacity-70"></i>{getText(project.period, language)}
              </span>
            </div>
            <p className="text-slate-600 text-base mb-8 leading-relaxed line-clamp-6">
              {getText(project.description, language)}
            </p>
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={getText(tag, language)} className="inline-block bg-slate-50 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-xl border border-slate-100 uppercase tracking-widest">
                    {getText(tag, language)}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 pt-6 border-t border-slate-50 text-slate-400 text-[10px] gap-4 font-black uppercase tracking-[0.3em]">
              <i className="fas fa-expand-alt text-sky-300 animate-pulse"></i>
              <span>{getText({ zh: '悬停探索深度细节', en: 'Hover to explore details' }, language)}</span>
              <i className="fas fa-expand-alt text-sky-300 animate-pulse rotate-90"></i>
            </div>
          </div>
        </div>

        {/* ===== BACK SIDE ===== */}
        <div
          className="absolute inset-0 rounded-[2.5rem] shadow-2xl overflow-hidden bg-white flex flex-col border-2 border-sky-400/20"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Restored Carousel - Optimized for the new tall layout */}
          {galleryImages.length > 0 && (
            <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950 flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIdx}
                  src={galleryImages[currentImgIdx]}
                  alt={`${getText(project.title, language)} ${currentImgIdx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain p-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

              {/* Pagination Dots */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImgIdx ? 'bg-sky-400 w-8' : 'bg-white/30 w-1.5'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="p-8 overflow-y-auto flex-grow bg-white">
            <h3 className="text-2xl font-black mb-6 text-sky-950 leading-tight flex items-center gap-4">
              <span className="w-2 h-8 bg-sky-500 rounded-full"></span>
              {getText(project.title, language)}
            </h3>

            <div className="space-y-6">
              {project.responsibilities && project.responsibilities.length > 0 && (
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i className="fas fa-microchip text-6xl"></i>
                  </div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-black text-sky-700 mb-5 flex items-center gap-3">
                    <i className="fas fa-terminal"></i>
                    {getText({ zh: '核心职责', en: 'CORE RESPONSIBILITIES' }, language)}
                  </h4>
                  <ul className="text-[15px] text-slate-700 space-y-4 font-medium">
                    {project.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <i className="fas fa-caret-right text-sky-400 mt-1"></i>
                        <span className="leading-relaxed">{getText(resp, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.achievements && project.achievements.length > 0 && (
                <div className="bg-sky-50/50 p-6 rounded-[2rem] border border-sky-100/50 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-emerald-600">
                    <i className="fas fa-rocket text-6xl"></i>
                  </div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-black text-emerald-700 mb-5 flex items-center gap-3">
                    <i className="fas fa-satellite"></i>
                    {getText({ zh: '研究成果', en: 'RESEARCH IMPACT' }, language)}
                  </h4>
                  <ul className="text-[15px] text-slate-700 space-y-4 font-medium">
                    {project.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <i className="fas fa-check-circle text-emerald-400 mt-1"></i>
                        <span className="leading-relaxed">{getText(ach, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-10 mb-4">
              {(project.liveUrl || project.sourceUrl) && (
                <div className="flex w-full gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center text-sm bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest">
                      <i className="fas fa-link"></i>{getText({ zh: '获取详情', en: 'EXPLORE' }, language)}
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center text-sm bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest">
                      <i className="fab fa-github"></i>{getText({ zh: '源码', en: 'CODE' }, language)}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="border-b-4 border-sky-500 pb-2">{getText({ zh: '项目经验', en: 'Project Experience' }, language)}</span>
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS_DATA.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
