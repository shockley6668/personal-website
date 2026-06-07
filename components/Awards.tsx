import React, { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AWARDS_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const Awards: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Count the number of awards
  const awardsCount = AWARDS_DATA.length;

  // Let's create some fake stats for Apple-style presentation based on projects/awards
  const stats = [
    { value: awardsCount, suffix: 'x', label: { en: 'National Awards', zh: '国家级奖项' } },
    { value: 6, suffix: '+', label: { en: 'Core Projects', zh: '核心开源项目' } },
    { value: 100, suffix: '%', label: { en: 'Passion for Robotics', zh: '对机器人的热忱' } }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      statRefs.current.forEach((statEl, index) => {
        if (!statEl) return;
        
        const targetValue = stats[index].value;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statEl,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          onUpdate: () => {
            if (statEl) {
              statEl.innerText = Math.floor(obj.val).toString() + stats[index].suffix;
            }
          }
        });
        
        // Fade up the labels
        const label = statEl.nextElementSibling;
        if (label) {
          gsap.fromTo(label, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out",
              scrollTrigger: {
                trigger: statEl,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Animate awards list items
      document.querySelectorAll('.award-item').forEach((item) => {
        gsap.fromTo(item,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="awards" ref={containerRef} className="w-full relative z-20 py-32 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-4">
            {language === 'en' ? 'By The Numbers' : '数据一览'}
          </h2>
          <div className="w-16 h-1 bg-apple-blue mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <h3 
                ref={el => statRefs.current[i] = el}
                className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-apple-gray mb-4"
              >
                0{stat.suffix}
              </h3>
              <p className="text-xl md:text-2xl font-medium tracking-tight text-apple-gray-light">
                {getText(stat.label, language)}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline of Awards */}
        <div className="mt-32 max-w-5xl mx-auto pb-32">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-20 text-center">
            {language === 'en' ? 'Major Recognitions' : '主要荣誉'}
          </h3>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2 z-0"></div>

            <div className="space-y-16 md:space-y-32">
              {AWARDS_DATA.map((award, i) => {
                const isEven = i % 2 === 0;

                return (
                  <div key={award.id} className="award-item relative flex flex-col md:flex-row items-center w-full z-10">
                    
                    {/* Mobile timeline dot */}
                    <div className="md:hidden absolute left-[24px] top-6 w-3 h-3 rounded-full bg-apple-blue -translate-x-1/2 shadow-[0_0_15px_rgba(41,151,255,0.6)]"></div>

                    {/* Left Column (Content if Even) */}
                    <div className={`w-full pl-[56px] md:pl-0 md:w-1/2 flex flex-col ${isEven ? 'md:items-end md:pr-16 md:text-right' : 'md:items-start opacity-0 hidden md:flex'}`}>
                      {isEven && (
                        <>
                          <div className="flex items-center gap-3 text-white text-xl md:text-2xl font-bold mb-6">
                            <i className="fas fa-trophy text-apple-blue"></i>
                            <span>{getText(award.name, language)}</span>
                          </div>
                          {award.certificateImageUrl && (
                            <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl shadow-apple-blue/10 border border-white/10 bg-[#111] p-2 hover:scale-[1.02] transition-transform duration-500">
                              <img
                                src={award.certificateImageUrl}
                                alt={getText(award.name, language)}
                                className="w-full h-auto object-contain rounded-lg"
                                style={{ maxHeight: '40vh' }}
                                loading="lazy"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Desktop Center Dot */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black bg-apple-blue shadow-[0_0_15px_rgba(41,151,255,0.6)] z-20"></div>

                    {/* Right Column (Content if Odd) */}
                    <div className={`w-full pl-[56px] mt-8 md:mt-0 md:pl-16 md:w-1/2 flex flex-col ${!isEven ? 'md:items-start md:text-left' : 'hidden'}`}>
                      {!isEven && (
                        <>
                          <div className="flex items-center gap-3 text-white text-xl md:text-2xl font-bold mb-6">
                            <i className="fas fa-trophy text-apple-blue"></i>
                            <span>{getText(award.name, language)}</span>
                          </div>
                          {award.certificateImageUrl && (
                            <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl shadow-apple-blue/10 border border-white/10 bg-[#111] p-2 hover:scale-[1.02] transition-transform duration-500">
                              <img
                                src={award.certificateImageUrl}
                                alt={getText(award.name, language)}
                                className="w-full h-auto object-contain rounded-lg"
                                style={{ maxHeight: '40vh' }}
                                loading="lazy"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
