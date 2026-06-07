import React, { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_DATA, getText } from '../constants';
import { LanguageContext } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Stagger paragraphs
      if (textRef.current) {
        tl.fromTo(textRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }

      // Parallax and scale on image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 1.2, y: 50 },
          { 
            scale: 1, 
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section id="about" ref={containerRef} className="w-full relative z-20 py-32 bg-apple-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Text Column */}
          <div ref={textRef} className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight apple-gradient-text apple-gradient-section-title mb-12">
              {getText(ABOUT_DATA.title, language)}
              <div className="w-16 h-1 bg-apple-blue mt-4 rounded-full"></div>
            </h2>
            
            {ABOUT_DATA.paragraphs.map((para, i) => (
              <p key={i} className="text-xl md:text-2xl text-apple-gray-light leading-relaxed mb-8 font-medium tracking-tight">
                {getText(para, language)}
              </p>
            ))}
          </div>

          {/* Right Image Column */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-[80vh] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20 z-10"></div>
            <img 
              ref={imageRef}
              src={ABOUT_DATA.imageUrl} 
              alt="Shukun Huang"
              className="w-full h-[120%] object-cover object-center relative -top-[10%]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;