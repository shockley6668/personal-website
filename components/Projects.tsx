
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
      className="relative h-[560px]"
      variants={cardVariants}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: '1200px' }}
      whileHover={{ scale: 1.05 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ===== FRONT SIDE ===== */}
        <div
          className="absolute inset-0 rounded-xl shadow-lg overflow-hidden bg-white flex flex-col"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {galleryImages.length > 0 && (
            <img
              src={galleryImages[0]}
              alt={getText(project.title, language)}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg lg:text-xl font-bold mb-1.5 text-sky-700 leading-tight">
              {getText(project.title, language)}
            </h3>
            <p className="text-slate-500 text-xs mb-2">
              <i className="far fa-calendar-alt mr-1"></i>{getText(project.period, language)}
            </p>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">
              {getText(project.description, language)}
            </p>
            <div className="mt-auto">
              {project.tags.map(tag => (
                <span key={getText(tag, language)} className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full">
                  {getText(tag, language)}
                </span>
              ))}
            </div>
            {/* Hover hint */}
            <div className="flex items-center justify-center mt-3 text-slate-400 text-xs gap-1.5">
              <i className="fas fa-hand-pointer"></i>
              <span>{getText({ zh: '悬停查看详情', en: 'Hover for details' }, language)}</span>
            </div>
          </div>
        </div>

        {/* ===== BACK SIDE ===== */}
        <div
          className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden bg-white flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Image carousel */}
          {galleryImages.length > 0 && (
            <div className="relative h-56 overflow-hidden bg-slate-900 flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIdx}
                  src={galleryImages[currentImgIdx]}
                  alt={`${getText(project.title, language)} ${currentImgIdx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Counter badge */}
              {galleryImages.length > 1 && (
                <div className="absolute top-2.5 right-2.5 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <i className="fas fa-images text-[10px]"></i>
                  <span>{currentImgIdx + 1}/{galleryImages.length}</span>
                </div>
              )}

              {/* Progress bar */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {galleryImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${idx === currentImgIdx ? 'bg-white w-5' : 'bg-white/40 w-1.5'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Detail content */}
          <div className="p-4 overflow-y-auto flex-grow custom-scrollbar">
            <h3 className="text-lg font-bold mb-1 text-sky-700 leading-tight">
              {getText(project.title, language)}
            </h3>
            <p className="text-slate-500 text-xs mb-2">
              <i className="far fa-calendar-alt mr-1"></i>{getText(project.period, language)}
            </p>

            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="mb-2.5">
                <h4 className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <i className="fas fa-tasks text-sky-500 text-[10px]"></i>
                  {getText({ zh: '个人职责', en: 'Responsibilities' }, language)}
                </h4>
                <ul className="text-xs text-slate-600 space-y-0.5 pl-3.5 list-disc">
                  {project.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-snug">{getText(resp, language)}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.achievements && project.achievements.length > 0 && (
              <div className="mb-2.5">
                <h4 className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <i className="fas fa-trophy text-amber-500 text-[10px]"></i>
                  {getText({ zh: '项目业绩', en: 'Achievements' }, language)}
                </h4>
                <ul className="text-xs text-slate-600 space-y-0.5 pl-3.5 list-disc">
                  {project.achievements.map((ach, idx) => (
                    <li key={idx} className="leading-snug">{getText(ach, language)}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-slate-100">
              {project.tags.map(tag => (
                <span key={getText(tag, language)} className="inline-block bg-sky-100 text-sky-700 text-[10px] font-semibold mr-1.5 mb-1.5 px-2 py-0.5 rounded-full">
                  {getText(tag, language)}
                </span>
              ))}
            </div>

            {(project.liveUrl || project.sourceUrl) && (
              <div className="mt-2 flex space-x-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-medium py-1.5 px-3 rounded-md transition-colors flex items-center">
                    <i className="fas fa-external-link-alt mr-1.5"></i>{getText({ zh: '演示', en: 'Demo' }, language)}
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs bg-slate-700 hover:bg-slate-800 text-white font-medium py-1.5 px-3 rounded-md transition-colors flex items-center">
                    <i className="fab fa-github mr-1.5"></i>{getText({ zh: '源码', en: 'Code' }, language)}
                  </a>
                )}
              </div>
            )}
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
