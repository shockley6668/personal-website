import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageContext } from '../contexts/LanguageContext';

const WhatIDo: React.FC = () => {
  const { language } = useContext(LanguageContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Apple-style sticky scrub animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // 3 screens tall for scrubbing
          scrub: 1,
          pin: true,
        }
      });

      // Text 1
      tl.fromTo(text1Ref.current, 
        { opacity: 0, y: 50, scale: 0.9, backgroundPosition: '0% 50%' },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      )
      .to(text1Ref.current, { backgroundPosition: '100% 50%', duration: 1.5 })
      .to(text1Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=0.5");

      // Text 2
      tl.fromTo(text2Ref.current, 
        { opacity: 0, y: 50, scale: 0.9, backgroundPosition: '0% 50%' },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      )
      .to(text2Ref.current, { backgroundPosition: '100% 50%', duration: 1.5 })
      .to(text2Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=0.5");

      // Text 3
      tl.fromTo(text3Ref.current, 
        { opacity: 0, y: 50, scale: 0.9, backgroundPosition: '0% 50%' },
        { opacity: 1, y: 0, scale: 1, duration: 1 }
      )
      .to(text3Ref.current, { backgroundPosition: '100% 50%', duration: 1.5 })
      .to(text3Ref.current, { opacity: 0, y: -50, scale: 1.1, duration: 1 }, "+=1"); // Holds a bit longer at the end

    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <section ref={containerRef} className="w-full h-screen relative flex items-center justify-center overflow-hidden z-0 bg-black">
      
      <h2 
        ref={text1Ref} 
        className="absolute text-4xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight apple-gradient-text px-4 leading-tight opacity-0"
      >
        {language === 'en' ? 'I build robots.' : '我创造机器人'}
      </h2>

      <h2 
        ref={text2Ref} 
        className="absolute text-4xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight apple-gradient-text px-4 leading-tight opacity-0"
      >
        {language === 'en' ? 'I deploy AI to the edge.' : '我将AI部署到边缘端'}
      </h2>

      <h2 
        ref={text3Ref} 
        className="absolute text-4xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight apple-gradient-text px-4 leading-tight opacity-0"
      >
        {language === 'en' ? 'I make machines walk.' : '我让机器行走于现实'}
      </h2>

    </section>
  );
};

export default WhatIDo;
