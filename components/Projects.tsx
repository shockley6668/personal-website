
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
      className="relative h-[580px] sm:h-[560px]"
      variants={cardVariants}
      onMouseEnter={() => window.innerWidth > 768 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth > 768 && setIsFlipped(false)}
      onClick={() => window.innerWidth <= 768 && setIsFlipped(!isFlipped)}
      style={{ perspective: '1200px' }}
      whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      <motion.div
        className="w-full h-full relative cursor-pointer md:cursor-default"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ===== FRONT SIDE ===== */}
        <div
          className="absolute inset-0 rounded-xl shadow-lg overflow-hidden bg-white flex flex-col border border-slate-100"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {galleryImages.length > 0 && (
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
              <img
                src={galleryImages[0]}
                alt={getText(project.title, language)}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 text-sky-800 leading-tight">
              {getText(project.title, language)}
            </h3>
            <p className="text-slate-500 text-xs mb-3 flex items-center">
              <i className="far fa-calendar-alt mr-1.5 opacity-70"></i>{getText(project.period, language)}
            </p>
            <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-4">
              {getText(project.description, language)}
            </p>
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={getText(tag, language)} className="inline-block bg-sky-50 text-sky-600 text-[11px] font-bold px-2.5 py-1 rounded-md border border-sky-100">
                    {getText(tag, language)}
                  </span>
                ))}
              </div>
            </div>
            {/* Interaction hint */}
            <div className="flex items-center justify-center mt-4 pt-3 border-t border-slate-50 text-slate-400 text-[11px] gap-2">
              <i className="fas fa-sync-alt animate-spin-slow"></i>
              <span>{getText({ zh: '点击/悬停查看详情', en: 'Click/Hover for details' }, language)}</span>
            </div>
          </div>
        </div>

        {/* ===== BACK SIDE ===== */}
        <div
          className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden bg-white flex flex-col border border-slate-100"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Image carousel */}
          {galleryImages.length > 0 && (
            <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950 flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIdx}
                  src={galleryImages[currentImgIdx]}
                  alt={`${getText(project.title, language)} ${currentImgIdx + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* Counter badge */}
              {galleryImages.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                  <i className="fas fa-images"></i>
                  <span>{currentImgIdx + 1}/{galleryImages.length}</span>
                </div>
              )}

              {/* Progress indicators */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${idx === currentImgIdx ? 'bg-sky-400 w-6' : 'bg-white/30 w-1.5'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detail content */}
          <div className="p-5 overflow-y-auto flex-grow custom-scrollbar">
            <h3 className="text-xl font-bold mb-2 text-sky-800 leading-tight">
              {getText(project.title, language)}
            </h3>

            <div className="space-y-4">
              {project.responsibilities && project.responsibilities.length > 0 && (
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-sky-600 mb-2 flex items-center gap-2">
                    <i className="fas fa-tools text-[10px]"></i>
                    {getText({ zh: '核心职责', en: 'Core Responsibilities' }, language)}
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 pl-4 list-disc marker:text-sky-400">
                    {project.responsibilities.map((resp, idx) => (
                      <li key={idx} className="leading-relaxed">{getText(resp, language)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.achievements && project.achievements.length > 0 && (
                <div className="bg-amber-50/30 p-3 rounded-lg border border-amber-100/50">
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-amber-600 mb-2 flex items-center gap-2">
                    <i className="fas fa-award text-[10px]"></i>
                    {getText({ zh: '产出成果', en: 'Results & Achievements' }, language)}
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 pl-4 list-disc marker:text-amber-400">
                    {project.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed">{getText(ach, language)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {(project.liveUrl || project.sourceUrl) && (
                <div className="flex w-full gap-3 mt-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center text-xs bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                      <i className="fas fa-external-link-alt"></i>{getText({ zh: '查看演示', en: 'Live Demo' }, language)}
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center text-xs bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                      <i className="fab fa-github"></i>{getText({ zh: '源代码', en: 'Source Code' }, language)}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Tap to return hint */}
            <div className="md:hidden flex items-center justify-center mt-6 text-slate-400 text-[10px] gap-2 py-2 bg-slate-50 rounded-full">
              <i className="fas fa-chevron-left animate-pulse"></i>
              <span>{getText({ zh: '再次点击返回正面', en: 'Tap again to go back' }, language)}</span>
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
