import React, { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INTERNSHIPS_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Internships: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main vertical line
      gsap.fromTo(timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );

      // Animate each item
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        const period = item.querySelector('.timeline-period');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        if (dot) {
          tl.fromTo(dot, 
            { scale: 0, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }

        if (period) {
          tl.fromTo(period,
            { x: index % 2 === 0 ? 50 : -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }

        if (content) {
          tl.fromTo(content,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="experience" ref={containerRef} className="w-full relative py-32 z-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-24 md:text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-4">
            {language === 'en' ? 'Experience' : '工作经历'}
          </h2>
          <div className="w-16 h-1 bg-apple-blue md:mx-auto rounded-full"></div>
        </div>

        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
          {/* Vertical timeline line */}
          <div 
            ref={timelineLineRef}
            className="absolute border-opacity-20 border-white h-full border" 
            style={{ left: '50%' }}
          ></div>

          {INTERNSHIPS_DATA.map((internship, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={internship.id}
                ref={el => itemRefs.current[index] = el}
                className={`mb-16 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}
              >
                <div className="order-1 w-5/12 hidden md:block">
                  <div className={`text-apple-blue font-bold text-xl md:text-3xl ${isEven ? 'text-left' : 'text-right'} timeline-period`}>
                    {getText(internship.period, language)}
                  </div>
                </div>
                
                <div className="z-20 flex items-center order-1 bg-apple-bg shadow-xl w-8 h-8 rounded-full border-4 border-apple-blue timeline-dot">
                </div>
                
                <div className={`order-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-full md:w-5/12 px-6 py-8 timeline-content ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="md:hidden text-apple-blue font-bold text-lg mb-2">
                    {getText(internship.period, language)}
                  </div>
                  <h3 className="font-bold text-white text-2xl md:text-3xl tracking-tight mb-2">
                    {getText(internship.company, language)}
                  </h3>
                  <h4 className="text-apple-gray-light text-lg mb-6 font-medium">
                    {getText(internship.role, language)}
                  </h4>
                  
                  <ul className="space-y-4">
                    {internship.responsibilities.map((resp, i) => (
                      <li key={i} className="text-apple-gray text-base leading-relaxed flex items-start">
                        <span className="mr-3 text-apple-gray-light mt-1.5">•</span>
                        <span>{getText(resp, language)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Internships;
